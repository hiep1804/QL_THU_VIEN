import { useEffect, useState } from 'react';
import HeaderSinhVien from '../layouts/HeaderSinhVien';
import axios from 'axios';

/**
 * Component form xin làm thủ thư
 */
const SinhVienXinTT = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    // API URL
    const REQUEST_API_URL = 'http://localhost:8080/sinh-vien/xin-lam-thu-thu';
    const MIN_CONTENT_LENGTH = 10;
    const MAX_CONTENT_LENGTH = 100;

    /**
     * Xử lý submit form xin làm thủ thư
     */
    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        setError('');

        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.sdt;

        const request = {
            id: userId,
            noiDung: content,
        };

        try {
            const response = await axios.post(REQUEST_API_URL, request, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data);
            setContent('');
        } catch (err) {
            console.error('Lỗi gửi đơn xin làm thủ thư:', err);
            setError(err.response?.data || 'Lỗi gửi đơn');
        }
    };

    /**
     * Cập nhật chiều cao cửa sổ khi resize
     */
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div className="apply-container">
            <HeaderSinhVien />
            <div className="form-wrapper" style={{ minHeight: `${windowHeight}px` }}>
                <form onSubmit={handleSubmitRequest} className="apply-form">
                    <h1 className="form-title">Xin làm thủ thư</h1>
                    <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder="Tại sao bạn muốn làm thủ thư?"
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        minLength={MIN_CONTENT_LENGTH}
                        maxLength={MAX_CONTENT_LENGTH}
                        required
                    />
                    <button type="submit" className="form-button">
                        Gửi
                    </button>
                    {/* Hiển thị lỗi nếu có */}
                    {error && <p className="form-error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default SinhVienXinTT;