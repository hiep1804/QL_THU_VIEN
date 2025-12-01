import axios from 'axios';
import { useState, useEffect } from 'react';
import HeaderAdmin from '../layouts/HeaderAdmin';

/**
 * Component duyệt đơn xin làm thủ thư
 */
const DuyetDonAdmin = () => {
    const [applicationList, setApplicationList] = useState(null);
    const token = localStorage.getItem('token');

    // Tải danh sách đơn xin làm thủ thư
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8080/admin/duyet-don-xin-thu-thu',
                    {},
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setApplicationList(response.data);
                console.log('Danh sách đơn:', response.data);
            } catch (error) {
                console.error('Lỗi tải danh sách đơn:', error);
            }
        };

        fetchApplications();
    }, []);

    /**
     * Xử lý duyệt/từ chối đơn xin
     * @param {Event} e - Sự kiện click button
     * @param {string} actionType - Loại hành động: 'dy' (đồng ý) hoặc 'tc' (từ chối)
     * @param {number} studentId - ID sinh viên
     * @param {number} applicationIndex - Chỉ số đơn xin trong danh sách
     */
    const handleApplicationDecision = async (e, actionType, studentId, applicationIndex) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                'http://localhost:8080/admin/duyet-don-xin-thu-thu/xu-li',
                {
                    params: {
                        loai: actionType,
                        id: studentId,
                        i: applicationIndex,
                    },
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert(response.data);

            // Xóa đơn xin khỏi danh sách
            setApplicationList(
                applicationList.filter((application) => application.i !== applicationIndex)
            );
        } catch (error) {
            console.error('Lỗi xử lý đơn xin:', error);
        }
    };

    const ACTION_APPROVE = 'dy';
    const ACTION_REJECT = 'tc';
    const APPROVE_TEXT = 'Đồng ý';
    const REJECT_TEXT = 'Từ chối';

    return (
        <div className="duyet_thu_thu">
            <HeaderAdmin />
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID sinh viên</th>
                        <th style={{ width: '40%' }}>Lý do</th>
                        <th>Thời gian</th>
                        <th style={{ width: '10%' }}>Đồng ý</th>
                        <th style={{ width: '10%' }}>Từ chối</th>
                    </tr>
                </thead>
                <tbody>
                    {applicationList && applicationList.map((application) => (
                        <tr key={application.id}>
                            <td style={{ textAlign: 'center' }}>{application.id}</td>
                            <td>{application.noiDung}</td>
                            <td style={{ textAlign: 'center' }}>
                                {new Date(application.date).toLocaleString('vi-VN')}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    style={{ width: '100%' }}
                                    onClick={(e) =>
                                        handleApplicationDecision(e, ACTION_APPROVE, application.id, application.i)
                                    }
                                >
                                    {APPROVE_TEXT}
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    style={{ width: '100%' }}
                                    onClick={(e) =>
                                        handleApplicationDecision(e, ACTION_REJECT, application.id, application.i)
                                    }
                                >
                                    {REJECT_TEXT}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DuyetDonAdmin;