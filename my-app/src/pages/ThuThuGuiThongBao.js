import { useState } from 'react';
import HeaderThuThu from '../layouts/HeaderThuThu';
import axios from 'axios';

/**
 * Component gửi thông báo cho sinh viên
 */
export default function ThuThuGuiThongBao() {
    const [notification, setNotification] = useState({
        header: '',
        nd: '',
        id_nguoi_nhan: '',
    });
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    // API URL
    const SEND_NOTIFICATION_API_URL = 'http://localhost:8080/thu-thu/gui-thong-bao';

    /**
     * Xử lý submit form gửi thông báo
     */
    const handleSendNotification = async (e) => {
        e.preventDefault();
        setError('');

        // Kiểm tra ID sinh viên
        if (isNaN(Number(notification.id_nguoi_nhan))) {
            setError('ID sinh viên chỉ được phép chứa số!');
            return;
        }

        try {
            const response = await axios.post(SEND_NOTIFICATION_API_URL, notification, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data);

            // Reset form
            setNotification({
                header: '',
                nd: '',
                id_nguoi_nhan: '',
            });
        } catch (err) {
            console.error('Lỗi gửi thông báo:', err);
            setError(err.response?.data || 'Lỗi gửi thông báo');
        }
    };

    /**
     * Xử lý thay đổi input
     */
    const handleInputChange = (e, field) => {
        setNotification({
            ...notification,
            [field]: e.target.value,
        });
    };

    return (
        <div>
            <HeaderThuThu />
            <div className="thu-thu-gui-thong-bao">
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Gửi thông báo cho sinh viên</h1>
                <form onSubmit={handleSendNotification}>
                    {/* Trường tiêu đề */}
                    <label htmlFor="header">
                        Tiêu đề:
                        <input
                            id="header"
                            type="text"
                            placeholder="Nhập tiêu đề"
                            value={notification.header}
                            onChange={(e) => handleInputChange(e, 'header')}
                            required
                        />
                    </label>
                    <br />

                    {/* Trường nội dung */}
                    <label htmlFor="content">
                        Nội dung:
                        <textarea
                            id="content"
                            placeholder="Nhập nội dung"
                            rows={5}
                            cols={100}
                            value={notification.nd}
                            onChange={(e) => handleInputChange(e, 'nd')}
                            required
                        />
                    </label>
                    <br />

                    {/* Trường ID sinh viên */}
                    <label htmlFor="studentId">
                        ID sinh viên:
                        <input
                            id="studentId"
                            type="text"
                            placeholder="Nhập ID sinh viên"
                            value={notification.id_nguoi_nhan}
                            onChange={(e) => handleInputChange(e, 'id_nguoi_nhan')}
                            required
                        />
                    </label>
                    <br />

                    {/* Nút gửi */}
                    <button type="submit" className="submit-button">
                        Gửi
                    </button>
                </form>

                {/* Hiển thị lỗi nếu có */}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}