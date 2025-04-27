import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import HeaderSinhVien from "../layouts/headerSinhVien";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
export default function Sach() {
    const { id } = useParams();
    const [sach, setSach] = useState(null);
    const [comments, setComments] = useState([]);
    const [inp, setInp] = useState('');
    const clientRef = useRef(null);
    const id_nguoi = user.id;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    useEffect(() => {
        const s = async () => {
            try {
                const res = await axios.get("http://localhost:8080/sinh-vien/data-sach", {
                    params: { id },
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setSach(res.data);
                const res1 = await axios.post("http://localhost:8080/sinh-vien/comment-sach", { id }, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setComments(res1.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        s();
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket đánh giá');
                client.subscribe('/topic/danh-gia', (message) => {
                    const data = JSON.parse(message.body);
                    console.log(data.id_sach, id);
                    if (data.id_sach + '' === id) setComments((prev) => [data, ...prev]);
                });
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
    useEffect(() => {
        const totalPages = Math.ceil(comments.length / itemsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages === 0 ? 1 : totalPages);
        }
    }, [comments, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(comments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedComments = comments.slice(startIndex, startIndex + itemsPerPage);
    const sendMessage = (e) => {
        e.preventDefault();
        if (clientRef.current && inp.trim() !== '') {
            const dg = {
                id_nguoi: id_nguoi,
                id_sach: id,
                nd: inp
            };
            clientRef.current.publish({
                destination: '/app/nhan-danh-gia',
                body: JSON.stringify(dg),
            });
            setInp('');
        }
    };
    const muon = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8080/sinh-vien/muon-sach", {
                params: { id, id_nguoi },
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            alert(res.data);
        }
        catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    }
    const tra = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8080/sinh-vien/tra-sach", {
                params: { id, id_nguoi },
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            alert(res.data);
        }
        catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    }
    const time = (s) => {
        const date = new Date(s).toLocaleString();
        return date
    }
    return (
        <div>
            <HeaderSinhVien />
            <div style={{ padding: "20px" }} className="sinh-vien-sach">
                {sach && (
                    <div className="sach">
                        <img src={sach.avt} alt="sach" />
                        <div className="sach-info">
                            <p>{sach.name}</p>
                            <p>{sach.danhMuc}</p>
                            <p>{sach.tacGia}</p>
                            <div className="sach-buttons">
                                <button type="button" onClick={(e) => muon(e)}>Mượn sách</button>
                                <button type="button" onClick={(e) => tra(e)}>Trả sách</button>
                            </div>
                        </div>
                    </div>
                )}
                <form className="danh-gia">
                    <input
                        type="text"
                        value={inp}
                        onChange={(e) => setInp(e.target.value)}
                        placeholder="Nhập tin nhắn"
                    />
                    <button onClick={(e) => sendMessage(e)}>Gửi</button>
                </form>
                {comments && selectedComments.map((cm, idx) => (<div key={idx} className="comment">
                    <p>{cm.name}</p>
                    <p>{time(cm.time)}</p>
                    <p>{cm.nd}</p>
                </div>))}
                {comments.length > 4 && <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            style={{
                                backgroundColor: currentPage === i + 1 ? "orange" : "#eee",
                                borderRadius: "50%",
                                width: 30, height: 30
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                }
            </div>
        </div>
    );
}