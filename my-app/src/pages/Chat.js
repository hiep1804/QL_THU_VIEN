import { useEffect, useRef, useState } from 'react';
import HeaderSinhVien from '../layouts/HeaderSinhVien';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

/**
 * Component hiển thị tin nhắn giữa 2 người
 */
const MessageList = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const clientRef = useRef(null);
    const [messageText, setMessageText] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Tải tin nhắn lịch sử từ API
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8080/sinh-vien/mess/${senderId}/${receiverId}`,
                    {},
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setMessages(response.data);
            } catch (error) {
                console.error('Lỗi tải tin nhắn:', error);
            }
        };

        fetchMessages();
    }, [receiverId]);

    /**
     * Xử lý khi người dùng chọn file ảnh
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Kết nối WebSocket để nhận tin nhắn real-time
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Kết nối WebSocket chat thành công');
                client.subscribe('/topic/chat', (message) => {
                    const data = JSON.parse(message.body);
                    if (data.id_gui === senderId || data.id_nhan === senderId) {
                        setMessages((prev) => [...prev, data]);
                    }
                });
            },
            onDisconnect: () => console.log('Ngắt kết nối WebSocket'),
            debug: (str) => console.log(str),
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, []);

    /**
     * Upload ảnh lên server
     */
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'http://localhost:8080/sinh-vien/upload/images',
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Lỗi upload ảnh:', error);
            throw new Error('Upload ảnh thất bại');
        }
    };

    /**
     * Gửi tin nhắn (văn bản hoặc ảnh)
     */
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (clientRef.current) {
            // Gửi ảnh
            if (selectedFile) {
                try {
                    const imagePath = await uploadImage(selectedFile);

                    const message = {
                        nguoi_gui: senderId,
                        nguoi_nhan: receiverId,
                        loai: 'file',
                        nd: imagePath,
                    };

                    clientRef.current.publish({
                        destination: '/app/nhan-tin-nhan',
                        body: JSON.stringify(message),
                    });

                    setSelectedFile(null);
                    setImagePreview(null);
                } catch (error) {
                    console.error('Lỗi gửi ảnh:', error);
                }
            }
            // Gửi văn bản
            else if (messageText && messageText.trim() !== '') {
                const message = {
                    nguoi_gui: senderId,
                    nguoi_nhan: receiverId,
                    loai: 'string',
                    nd: messageText,
                };

                clientRef.current.publish({
                    destination: '/app/nhan-tin-nhan',
                    body: JSON.stringify(message),
                });

                setMessageText('');
            }
        }
    };

    /**
     * Format thời gian tin nhắn
     */
    const formatMessageTime = (messageTime) => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        let lastDisplayTime = null;

        return (currentTime) => {
            const now = new Date();
            const messageDate = new Date(currentTime);

            if (!lastDisplayTime) {
                lastDisplayTime = messageDate;
                const timeDifference = now - lastDisplayTime;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = String(messageDate.getHours()).padStart(2, '0');
                const minutes = String(messageDate.getMinutes()).padStart(2, '0');

                if (daysDifference >= 7) {
                    return `${hours}:${minutes} ${messageDate.getDate()} Tháng ${messageDate.getMonth()}, ${messageDate.getFullYear()}`;
                } else if (daysDifference >= 1) {
                    return `${hours}:${minutes} ${days[messageDate.getDay()]}`;
                } else {
                    return `${hours}:${minutes}`;
                }
            } else {
                const hoursDifference = messageDate - lastDisplayTime;
                if (Math.floor(hoursDifference / (1000 * 60)) < 20) {
                    return '';
                }

                lastDisplayTime = messageDate;
                const timeDifference = now - lastDisplayTime;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = String(messageDate.getHours()).padStart(2, '0');
                const minutes = String(messageDate.getMinutes()).padStart(2, '0');

                if (daysDifference >= 7) {
                    return `${hours}:${minutes} ${messageDate.getDate()} Tháng ${messageDate.getMonth()}, ${messageDate.getFullYear()}`;
                } else if (daysDifference >= 1) {
                    return `${hours}:${minutes} ${days[messageDate.getDay()]}`;
                } else {
                    return `${hours}:${minutes}`;
                }
            }
        };
    };

    return (
        <div>
            <div className="tin-nhan">
                <ul className="chat-box">
                    {messages.map((message, index) => (
                        <div key={index} className="message-wrapper">
                            <p className="message-time">{formatMessageTime(message.time)(message.time)}</p>
                            <li>
                                {/* Hiển thị tin nhắn văn bản */}
                                {message.loai === 'string' && (
                                    <p className={`message ${message.id_gui === senderId ? 'right' : 'left'}`}>
                                        {message.nd}
                                    </p>
                                )}
                                {/* Hiển thị tin nhắn ảnh */}
                                {message.loai === 'file' && (
                                    <img
                                        src={message.nd}
                                        alt="img"
                                        className={`img ${message.id_gui === senderId ? 'right' : 'left'}`}
                                    />
                                )}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>

            <div className="gui-tin-nhan">
                {/* Input file ảnh */}
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label htmlFor="fileInput">
                    <p>+</p>
                </label>

                {/* Input văn bản hoặc preview ảnh */}
                {!imagePreview ? (
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Nhập tin nhắn"
                    />
                ) : (
                    <img src={imagePreview} alt="preview" style={{ width: '30px' }} />
                )}

                {/* Nút gửi */}
                <button type="button" onClick={handleSendMessage}>
                    Gửi
                </button>
            </div>
        </div>
    );
};

/**
 * Component chính cho trang chat
 */
export default function Chat() {
    const userId = user.id;
    const [userList, setUserList] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const clientRef = useRef(null);
    const [currentChatUser, setCurrentChatUser] = useState(null);

    // Tải danh sách người dùng có thể chat
    useEffect(() => {
        const fetchUserList = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8080/sinh-vien/chat/${userId}`,
                    {},
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setUserList(response.data);
                if (response.data.length > 0) {
                    setSelectedUserId(response.data[0].id);
                    setCurrentChatUser(response.data[0].id);
                }
            } catch (error) {
                console.error('Lỗi tải danh sách người dùng:', error);
            }
        };

        fetchUserList();
    }, []);

    // Tìm kiếm người dùng
    useEffect(() => {
        axios
            .post(`http://localhost:8080/sinh-vien/chat/user/${userId}`, { tk: searchKeyword }, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => setSearchResults(res.data))
            .catch(console.error);
    }, [searchKeyword]);

    // Kết nối WebSocket để nhận cập nhật chat real-time
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Kết nối WebSocket người dùng thành công');
                client.subscribe('/topic/user', (message) => {
                    const data = JSON.parse(message.body);

                    if (data.id_gui === userId) {
                        setCurrentChatUser(data.id);
                        setUserList((prev) => {
                            const filtered = prev.filter((item) => item.id !== data.id);
                            return [data, ...filtered];
                        });
                    }

                    if (data.id === userId) {
                        data.id = data.id_gui;
                        data.name = data.name_gui;
                        data.avt = data.avt_gui;
                        setUserList((prev) => {
                            const filtered = prev.filter((item) => item.id !== data.id);
                            return [data, ...filtered];
                        });
                    }
                });
            },
            onDisconnect: () => console.log('Ngắt kết nối WebSocket'),
            debug: (str) => console.log(str),
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, []);

    /**
     * Xử lý khi click vào kết quả tìm kiếm
     */
    const handleSelectSearchResult = (e, userId) => {
        e.preventDefault();
        setSelectedUserId(userId);
        setSearchKeyword('');
        setCurrentChatUser(userId);
    };

    /**
     * Xử lý khi click vào người dùng trong danh sách
     */
    const handleSelectUser = (e, userId) => {
        setSelectedUserId(userId);
        setCurrentChatUser(userId);
    };

    const activeUserBackground = 'rgba(0,0,0,0.1)';
    const chatContainerBackground = 'rgba(0,0,0,0.05)';

    return (
        <div>
            <HeaderSinhVien />
            <div className="chat-left">
                {/* Thanh tìm kiếm */}
                <div className="tim-kiem">
                    <input
                        type="text"
                        value={searchKeyword || ''}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Tìm kiếm người dùng"
                    />
                    <div>
                        {/* Hiển thị kết quả tìm kiếm */}
                        {searchResults &&
                            searchResults.map((result, index) => (
                                <p key={index} onClick={(e) => handleSelectSearchResult(e, result.id)}>
                                    {result.name}
                                </p>
                            ))}
                    </div>
                </div>

                {/* Danh sách người dùng */}
                <div className="nguoi">
                    <ul>
                        {userList &&
                            userList.map((user, index) => (
                                <li
                                    key={index}
                                    onClick={(e) => handleSelectUser(e, user.id)}
                                    style={{
                                        backgroundColor: currentChatUser && currentChatUser === user.id ? activeUserBackground : 'white',
                                    }}
                                >
                                    <img src={user.avt} alt={user.name} />
                                    <p>
                                        <b>{user.name}</b>
                                    </p>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>

            {/* Khu vực chat */}
            <div
                style={{
                    backgroundColor: chatContainerBackground,
                    height: '679px',
                    width: '76%',
                    float: 'left',
                }}
            >
                <div className="chat-right">
                    {selectedUserId && <MessageList senderId={userId} receiverId={selectedUserId} />}
                </div>
            </div>
        </div>
    );
}