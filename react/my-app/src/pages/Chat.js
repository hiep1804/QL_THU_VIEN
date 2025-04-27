import { useEffect, useRef, useState } from "react";
import HeaderSinhVien from "../layouts/headerSinhVien";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const TinNhan = ({ id1, id2 }) => {
    const [mess, setMess] = useState([]);
    const [anh, setAnh] = useState(null);
    const clientRef = useRef(null);
    const [tn, setTn] = useState(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        const lay = async () => {
            try {
                const res = await axios.post(`http://localhost:8080/sinh-vien/mess/${id1}/${id2}`, {}, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setMess(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        lay();
    }, [id2]);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAnh(e.target.result); // Lưu URL của ảnh vào state
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log("Connected to WebSocket chat");
                client.subscribe('/topic/chat', (message) => {
                    const data = JSON.parse(message.body);
                    if (data.id_gui === id1 || data.id_nhan === id1) setMess((prev) => [...prev, data]);
                })
            },
            onDisconnect: () => console.log('Disconnected đánh giá'),
            debug: (str) => console.log(str),
        });
        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, []);
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);  // Đưa file vào FormData

        try {
            // Gửi yêu cầu POST tới API để upload ảnh
            const response = await axios.post("http://localhost:8080/sinh-vien/upload/images", formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data; // Nhận về đường dẫn ảnh từ backend
        } catch (error) {
            console.error("Lỗi khi upload ảnh:", error);
            throw new Error("Upload ảnh thất bại");
        }
    };

    const gui = async (e) => {
        e.preventDefault();
        if (clientRef.current) {
            if (file) {
                try {
                    // Upload ảnh
                    const path = await uploadImage(file);

                    const tin = {
                        nguoi_gui: id1,
                        nguoi_nhan: id2,
                        loai: 'file',
                        nd: path // Đường dẫn ảnh đã upload
                    };

                    // Gửi qua WebSocket
                    clientRef.current.publish({
                        destination: '/app/nhan-tin-nhan',
                        body: JSON.stringify(tin)
                    });
                    setFile(null);
                    setAnh(null);
                } catch (error) {
                    console.error("Lỗi khi gửi ảnh:", error);
                }
            }
            else if (tn && tn.trim() !== '') {
                const tin = {
                    nguoi_gui: id1,
                    nguoi_nhan: id2,
                    loai: 'string',
                    nd: tn
                };
                console.log(tin);
                clientRef.current.publish({
                    destination: '/app/nhan-tin-nhan',
                    body: JSON.stringify(tin)
                });
                setTn('');
            }
        }
    }
    let tg = null;
    const thu = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
    const time = (t) => {
        const now = new Date();
        const truoc = new Date(t);
        if (!tg) {
            tg = truoc;
            const hieu = now - tg;
            const ngay = Math.floor(hieu / (1000 * 60 * 60 * 24));
            const hours = String(tg.getHours()).padStart(2, '0');
            const minutes = String(tg.getMinutes()).padStart(2, '0');
            if (ngay >= 7) {
                return `${hours}:${minutes} ${tg.getDate()} Tháng ${tg.getMonth()}, ${tg.getFullYear()}`
            }
            else if (ngay < 7 && ngay >= 1) {
                return `${hours}:${minutes} ${thu[tg.getDay()]}`
            }
            else {
                return `${hours}:${minutes}`
            }
        }
        else {
            const h = truoc - tg;
            if (Math.floor(h / (1000 * 60)) < 20) {
                return ''
            }
            else {
                tg = truoc;
                const hieu = now - tg;
                const ngay = Math.floor(hieu / (1000 * 60 * 60 * 24));
                const hours = String(tg.getHours()).padStart(2, '0');
                const minutes = String(tg.getMinutes()).padStart(2, '0');
                if (ngay >= 7) {
                    return `${hours}:${minutes} ${tg.getDate()} Tháng ${tg.getMonth()}, ${tg.getFullYear()}`
                }
                else if (ngay < 7 && ngay >= 1) {
                    return `${hours}:${minutes} ${thu[tg.getDay()]}`
                }
                else {
                    return `${hours}:${minutes}`
                }
            }
        }
    }
    return <div>
        <div className="tin-nhan">
            <ul class="chat-box">
                {mess.map((m, idx) =>
                    <div key={idx} className="message-wrapper">
                        <p className="message-time">{time(m.time)}</p>
                        <li >
                            {m.loai === 'string' && <p className={`message ${m.id_gui === id1 ? "right" : "left"}`}>{m.nd}</p>}
                            {m.loai === 'file' && <img src={m.nd} alt="img" className={`img ${m.id_gui === id1 ? "right" : "left"}`} />}
                        </li>
                    </div>
                )}
            </ul>
        </div>
        <div className="gui-tin-nhan">
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            <label htmlFor="fileInput">
                <p>+</p>
            </label>
            {!anh && <input type="text" value={tn} onChange={(e) => setTn(e.target.value)} placeholder="Nhập tin nhắn" />}
            {anh && <img src={anh} alt="anh" style={{ width: "30px" }} />}
            <button type="button" onClick={gui}>Gửi</button>
        </div>
    </div>
}
export default function Chat() {
    const id = user.id;
    const [listUser, setListUser] = useState([]);
    const [id1, setId1] = useState(null);
    const [tk, setTk] = useState(null);
    const [list, setList] = useState([]);
    const clientRef = useRef(null);
    const [cuaAi, setCuaAi] = useState(null);

    useEffect(() => {
        const lay = async () => {
            try {
                const res = await axios.post("http://localhost:8080/sinh-vien/chat/" + id, {}, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setListUser(res.data);
                if (res.data.length > 0) {
                    setId1(res.data[0].id);
                    setCuaAi(res.data[0].id);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        lay();
    }, []);
    useEffect(() => {
        axios.post(`http://localhost:8080/sinh-vien/chat/user/${id}`, { tk }, {
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        }).then(res => setList(res.data)).catch(console.log);
    }, [tk]);
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log("Connected to WebSocket chat user");
                client.subscribe('/topic/user', (message) => {
                    const data = JSON.parse(message.body);
                    console.log(data);
                    if (data.id_gui === id) {
                        console.log(data);
                        setCuaAi(data.id);
                        setListUser(prev => {
                            const filtered = prev.filter(item => item.id !== data.id);
                            return [data, ...filtered];
                        });

                    }
                    if (data.id === id) {
                        data.id = data.id_gui;
                        data.name = data.name_gui;
                        data.avt = data.avt_gui;
                        setListUser(prev => {
                            const filtered = prev.filter(item => item.id !== data.id);
                            return [data, ...filtered];
                        });

                    }
                })
            },
            onDisconnect: () => console.log('Disconnected đánh giá'),
            debug: (str) => console.log(str),
        });
        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [])
    const bam = (e, id2) => {
        e.preventDefault();
        setId1(id2);
        setTk('');
        setCuaAi(id2);
    }
    const onBam = (e, id) => {
        setId1(id);
        setCuaAi(id);
    }
    const black = "rgba(0,0,0,0.1)";
    return <div>
        <HeaderSinhVien />
        <div className="chat-left">
            <div className="tim-kiem">
                <input type="text" value={tk} onChange={(e) => setTk(e.target.value)} />
                <div> {list && list.map((l, idx) => <p key={idx} onClick={(e) => bam(e, l.id)}>{l.name}</p>)}</div>
            </div>
            <div className="nguoi">
                <ul>
                    {listUser && listUser.map((u, idx) => (
                        <li key={idx} onClick={(e) => onBam(e, u.id)} style={{ backgroundColor: cuaAi && cuaAi === u.id ? black : "white" }}>
                            <img src={u.avt} alt={u.name} />
                            <p><b>{u.name}</b></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div style={{ backgroundColor: "rgba(0,0,0,0.05)", height: "679px", width: "76%", float: "left" }}>
            <div className="chat-right">
                {id1 && <TinNhan id1={id} id2={id1} />}
            </div>
        </div>
    </div>;
}