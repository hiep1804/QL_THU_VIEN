import { useEffect, useState } from 'react';
import '../assets/headerSinhVien.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
const token = localStorage.getItem("token");
const Avt = () => {
    const [sv, setSv] = useState("");
    useEffect(() => {
        const user = localStorage.getItem("user");
        setSv(JSON.parse(user).role)
    }, []);
    return (
        <div className="phu">
            <a href='/sinh-vien/profile'>Hồ sơ</a>
            {sv === 'thu_thu' && <a href='/thu-thu/profile'>Chuyển sang thủ thư</a>}
            <a href='/logout'>Đăng xuất</a>
        </div>
    );
}
const MH = ({ isOpen, onClose, tb }) => {
    if (!isOpen) return null;
    const date = new Date(tb.time).toLocaleString();
    return (
        <div className='modal-overlay'>
            <div className='modal-box'>
                <div className='modal-header'>
                    <h2>{tb.header}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className='modal-body'>
                    <p>{tb.nd}</p>
                    <p>{date}</p>
                </div>
                <div className='modal-footer'>
                    <button className="btn" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
}
const TB = () => {
    const [notifications, setNotifications] = useState([]);
    const [selectedTB, setSelectedTB] = useState(false);
    const [tb1, setTb1] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    useEffect(() => {
        const goi = async () => {
            try {
                const res = await axios.post("http://localhost:8080/sinh-vien/thong-bao", { id }, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setNotifications(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        goi();
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            onConnect: () => {
                console.log("Connected to WebSocket");

                stompClient.subscribe('/topic/thong-bao', (message) => {
                    const notification = JSON.parse(message.body);
                    if (notification.userId === id) {
                        setNotifications(prevNotifications => [notification, ...prevNotifications]);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
            reconnectDelay: 5000,
        });
        stompClient.activate();
        return () => {
            stompClient.deactivate();
        };
    }, []);
    return (
        <div className="phu p2">
            {notifications.map((tb, idx) => <p key={idx} onClick={() => {setTb1(tb);setSelectedTB(true)}}>{tb.header}</p>)}
            {selectedTB && <MH isOpen={selectedTB} onClose={() => setSelectedTB(false)} tb={tb1} />}
        </div>
    );
}
const HeaderSinhVien = () => {
    const [avtMD, setAvtMD] = useState("/images/avtMD.png");
    const [menu, setMenu] = useState(null);
    const role = JSON.parse(localStorage.getItem("user")).role;
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user && JSON.parse(user).avt !== 'none') {
            setAvtMD(JSON.parse(user).avt);
        }
    }, []);
    const bam = (type) => {
        if (type === menu) {
            setMenu(null);
        }
        else {
            setMenu(type); 
        }
    }
    return (
        <div className='header'>
            <a href='/sinh-vien/muon-sach'>Mượn sách</a>
            <a href='/sinh-vien/lich-su-muon-tra'>Lịch sử mượn trả</a>
            {role === 'sinh_vien' && (<a href='/sinh-vien/xin-lam-thu-thu'>Làm thủ thư</a>)}
            <a href='/sinh-vien/chat'>Chat</a>
            <img src={avtMD} alt='avatar' id='avt' onClick={() => { bam('avt') }} />
            <img src='/images/tb.png' alt='tb' id='tb' onClick={() => { bam('tb') }} />
            <div>
                {(() => {
                    if (menu === "avt") {
                        return <Avt />;
                    } else if (menu === "tb") {
                        return <TB />;
                    } else {
                        return null;
                    }
                })()}
            </div>
        </div>
    );
}
export default HeaderSinhVien;