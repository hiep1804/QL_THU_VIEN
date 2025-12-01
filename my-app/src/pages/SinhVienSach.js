import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import HeaderSinhVien from '../layouts/HeaderSinhVien';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

/**
 * Component chi tiết sách và đánh giá
 */
export default function SinhVienSach() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const clientRef = useRef(null);
    const userId = user.id;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // API URLs
    const BOOK_API_URL = 'http://localhost:8080/sinh-vien/data-sach';
    const COMMENTS_API_URL = 'http://localhost:8080/sinh-vien/comment-sach';
    const BORROW_API_URL = 'http://localhost:8080/sinh-vien/muon-sach';
    const RETURN_API_URL = 'http://localhost:8080/sinh-vien/tra-sach';

    // Tải dữ liệu sách và bình luận
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const bookResponse = await axios.get(BOOK_API_URL, {
                    params: { id },
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                setBook(bookResponse.data);

                const commentsResponse = await axios.post(
                    COMMENTS_API_URL,
                    { id },
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Lỗi tải dữ liệu sách:', error);
            }
        };

        fetchBookData();

        // Kết nối WebSocket để nhận đánh giá real-time
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Kết nối WebSocket đánh giá thành công');
                client.subscribe('/topic/danh-gia', (message) => {
                    const data = JSON.parse(message.body);
                    if (data.id_sach + '' === id) {
                        setComments((prev) => [data, ...prev]);
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

    // Kiểm tra và cập nhật trang hiện tại khi comments thay đổi
    useEffect(() => {
        const totalPages = Math.ceil(comments.length / itemsPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages === 0 ? 1 : totalPages);
        }
    }, [comments, currentPage, itemsPerPage]);

    /**
     * Format thời gian bình luận
     * @param {string} timestamp - Thời gian từ server
     * @returns {string} - Thời gian đã format
     */
    const formatCommentTime = (timestamp) => {
        return new Date(timestamp).toLocaleString('vi-VN');
    };

    /**
     * Gửi bình luận/đánh giá
     */
    const handleSendComment = (e) => {
        e.preventDefault();
        if (clientRef.current && commentInput.trim() !== '') {
            const review = {
                id_nguoi: userId,
                id_sach: id,
                nd: commentInput,
            };
            clientRef.current.publish({
                destination: '/app/nhan-danh-gia',
                body: JSON.stringify(review),
            });
            setCommentInput('');
        }
    };

    /**
     * Xử lý mượn sách
     */
    const handleBorrowBook = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(BORROW_API_URL, {
                params: { id, id_nguoi: userId },
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data);
        } catch (error) {
            console.error('Lỗi mượn sách:', error);
            alert(error.response?.data || 'Lỗi mượn sách');
        }
    };

    /**
     * Xử lý trả sách
     */
    const handleReturnBook = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(RETURN_API_URL, {
                params: { id, id_nguoi: userId },
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data);
        } catch (error) {
            console.error('Lỗi trả sách:', error);
            alert(error.response?.data || 'Lỗi trả sách');
        }
    };

    // Tính toán phân trang
    const totalPages = Math.ceil(comments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedComments = comments.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <HeaderSinhVien />
            <div style={{ padding: '20px' }} className="sinh-vien-sach">
                {/* Thông tin sách */}
                {book && (
                    <div className="sach">
                        <img src={book.avt} alt={book.name} />
                        <div className="sach-info">
                            <p>{book.name}</p>
                            <p>{book.danhMuc}</p>
                            <p>{book.tacGia}</p>
                            <div className="sach-buttons">
                                <button type="button" onClick={handleBorrowBook}>
                                    Mượn sách
                                </button>
                                <button type="button" onClick={handleReturnBook}>
                                    Trả sách
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form bình luận */}
                <form className="danh-gia">
                    <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Nhập bình luận"
                    />
                    <button type="button" onClick={handleSendComment}>
                        Gửi
                    </button>
                </form>

                {/* Danh sách bình luận */}
                <div>
                    {comments && selectedComments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.name}</p>
                            <p>{formatCommentTime(comment.time)}</p>
                            <p>{comment.nd}</p>
                        </div>
                    ))}
                </div>

                {/* Phân trang */}
                {comments.length > itemsPerPage && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentPage(index + 1)}
                                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                style={{
                                    backgroundColor: currentPage === index + 1 ? 'orange' : '#eee',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}