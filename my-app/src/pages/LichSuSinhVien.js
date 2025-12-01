import { useEffect, useState } from 'react';
import HeaderSinhVien from '../layouts/HeaderSinhVien';
import axios from 'axios';

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

/**
 * Component hiển thị lịch sử mượn trả sách của sinh viên
 */
export default function LichSuSinhVien() {
    const [borrowHistory, setBorrowHistory] = useState([]);
    const userId = user.id;

    // Tải lịch sử mượn trả từ API
    useEffect(() => {
        const fetchBorrowHistory = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/sinh-vien/lich-su',
                    { id: userId },
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setBorrowHistory(response.data);
                console.log('Lịch sử mượn trả:', response.data);
            } catch (error) {
                console.error('Lỗi tải lịch sử mượn trả:', error);
            }
        };

        fetchBorrowHistory();
    }, []);

    /**
     * Format trạng thái mượn trả
     * @param {string} status - Trạng thái từ server
     * @returns {string} - Trạng thái đã format
     */
    const formatStatus = (status) => {
        const statusMap = {
            'dang_muon': 'Đang mượn',
            'da_tra': 'Đã trả',
            'qua_han': 'Quá hạn',
        };
        return statusMap[status] || status;
    };

    return (
        <div className="borrow-container">
            <HeaderSinhVien />
            <table className="borrow-table">
                <thead>
                    <tr>
                        <th>Tên sách</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowHistory && borrowHistory.length > 0 ? (
                        borrowHistory.map((record, index) => (
                            <tr key={index}>
                                <td>{record.name}</td>
                                <td>{new Date(record.ngayMuon).toLocaleString('vi-VN')}</td>
                                <td>
                                    {record.ngayTra
                                        ? new Date(record.ngayTra).toLocaleString('vi-VN')
                                        : 'Chưa trả'}
                                </td>
                                <td>{formatStatus(record.trangThai)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                Không có lịch sử mượn trả
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}