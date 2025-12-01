import { useEffect, useState } from 'react';
import '../assets/headerSinhVien.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const token = localStorage.getItem('token');

/**
 * Component menu avatar cho sinh viên
 */
const AvatarMenu = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        setUserRole(JSON.parse(user).role);
    }, []);

    return (
        <div className="phu">
            <a href="/sinh-vien/profile">Hồ sơ</a>
            {userRole === 'thu_thu' && <a href="/thu-thu/profile">Chuyển sang thủ thư</a>}
            <a href="/logout">Đăng xuất</a>
        </div>
    );
};

/**
 * Component modal hiển thị chi tiết thông báo
 */
const NotificationModal = ({ isOpen, onClose, notification }) => {
    if (!isOpen) return null;

    const formattedDate = new Date(notification.time).toLocaleString();

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    <h2>{notification.header}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <p>{notification.nd}</p>
                    <p>{formattedDate}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

/**
 * Component danh sách thông báo
 */
const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;

    useEffect(() => {
        // Tải danh sách thông báo ban đầu
        const fetchNotifications = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/sinh-vien/thong-bao',
                    { id: userId },
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setNotifications(response.data);
            } catch (error) {
                console.error('Lỗi khi tải thông báo:', error);
            }
        };

        fetchNotifications();

        // Kết nối WebSocket để nhận thông báo real-time
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: () => {
                console.log('Kết nối WebSocket thành công');

                stompClient.subscribe('/topic/thong-bao', (message) => {
                    const newNotification = JSON.parse(message.body);
                    if (newNotification.userId === userId) {
                        setNotifications((prevNotifications) => [
                            newNotification,
                            ...prevNotifications,
                        ]);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('Lỗi STOMP:', frame);
            },
            reconnectDelay: 5000,
        });

        stompClient.activate();

        // Cleanup: Ngắt kết nối khi component unmount
        return () => {
            stompClient.deactivate();
        };
    }, []);

    /**
     * Xử lý click vào thông báo để mở modal
     */
    const handleNotificationClick = (notification) => {
        setSelectedNotification(notification);
        setIsModalOpen(true);
    };

    return (
        <div className="phu p2">
            {notifications.map((notification, index) => (
                <p
                    key={index}
                    onClick={() => handleNotificationClick(notification)}
                >
                    {notification.header}
                </p>
            ))}
            {isModalOpen && (
                <NotificationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    notification={selectedNotification}
                />
            )}
        </div>
    );
};

/**
 * Component header cho sinh viên
 */
const HeaderSinhVien = () => {
    const [avatarUrl, setAvatarUrl] = useState('/images/avtMD.png');
    const [activeMenu, setActiveMenu] = useState(null);
    const userRole = JSON.parse(localStorage.getItem('user')).role;

    // Tải avatar người dùng từ localStorage khi component mount
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            if (userData.avt && userData.avt !== 'none') {
                setAvatarUrl(userData.avt);
            }
        }
    }, []);

    /**
     * Bật/tắt menu
     * @param {string} menuType - Loại menu: 'avt' (avatar) hoặc 'tb' (thông báo)
     */
    const handleMenuToggle = (menuType) => {
        setActiveMenu(activeMenu === menuType ? null : menuType);
    };

    return (
        <div className="header">
            <a href="/sinh-vien/muon-sach">Mượn sách</a>
            <a href="/sinh-vien/lich-su-muon-tra">Lịch sử mượn trả</a>
            {userRole === 'sinh_vien' && (
                <a href="/sinh-vien/xin-lam-thu-thu">Làm thủ thư</a>
            )}
            <a href="/sinh-vien/chat">Chat</a>
            <img
                src={avatarUrl}
                alt="avatar"
                id="avt"
                onClick={() => handleMenuToggle('avt')}
            />
            <img
                src="/images/tb.png"
                alt="thông báo"
                id="tb"
                onClick={() => handleMenuToggle('tb')}
            />
            <div>
                {/* Hiển thị menu avatar */}
                {activeMenu === 'avt' && <AvatarMenu />}
                {/* Hiển thị danh sách thông báo */}
                {activeMenu === 'tb' && <NotificationList />}
            </div>
        </div>
    );
};

export default HeaderSinhVien;