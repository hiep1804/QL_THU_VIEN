import HeaderThuThu from '../layouts/HeaderThuThu';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

/**
 * Component duyệt yêu cầu từ sinh viên
 */
export default function ThuThuDuyetYeuCau() {
    const [requestList, setRequestList] = useState(null);
    const token = localStorage.getItem('token');
    const clientRef = useRef(null);

    // API URL
    const REQUEST_API_URL = 'http://localhost:8080/thu-thu/duyet-yeu-cau';
    const HANDLE_REQUEST_API_URL = 'http://localhost:8080/thu-thu/duyet-yeu-cau/xu-li';

    // Action types
    const ACTION_APPROVE = 'dy';
    const ACTION_REJECT = 'tc';
    const APPROVE_TEXT = 'Đồng ý';
    const REJECT_TEXT = 'Từ chối';

    useEffect(() => {
        /**
         * Tải danh sách yêu cầu từ API
         */
        const fetchRequests = async () => {
            try {
                const response = await axios.post(REQUEST_API_URL, {}, {
                    headers: {
                        Authorization: token,
                    },
                });
                setRequestList(response.data);
                console.log('Danh sách yêu cầu:', response.data);
            } catch (error) {
                console.error('Lỗi tải danh sách yêu cầu:', error);
            }
        };

        fetchRequests();

        // Kết nối WebSocket để nhận yêu cầu real-time
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Kết nối WebSocket yêu cầu thành công');
                client.subscribe('/topic/gui-yeu-cau', (message) => {
                    const data = JSON.parse(message.body);
                    setRequestList((prev) => [...prev, data]);
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
     * Xử lý duyệt/từ chối yêu cầu
     * @param {Event} e - Sự kiện click button
     * @param {string} actionType - Loại hành động: 'dy' (đồng ý) hoặc 'tc' (từ chối)
     * @param {number} studentId - ID sinh viên
     * @param {number} requestIndex - Chỉ số yêu cầu trong danh sách
     * @param {string} requestType - Loại yêu cầu
     */
    const handleRequestDecision = async (e, actionType, studentId, requestIndex, requestType) => {
        e.preventDefault();
        try {
            const response = await axios.get(HANDLE_REQUEST_API_URL, {
                params: {
                    loai: actionType,
                    id: studentId,
                    i: requestIndex,
                    mt: requestType,
                },
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data);

            // Xóa yêu cầu khỏi danh sách
            setRequestList(requestList.filter((request) => request.i !== requestIndex));
        } catch (error) {
            console.error('Lỗi xử lý yêu cầu:', error);
        }
    };

    return (
        <div className="duyet_thu_thu">
            <HeaderThuThu />
            <table>
                <thead>
                    <tr>
                        <th>ID sinh viên</th>
                        <th>Lý do</th>
                        <th>Loại</th>
                        <th>Thời gian</th>
                        <th>Đồng ý</th>
                        <th>Từ chối</th>
                    </tr>
                </thead>
                <tbody>
                    {requestList && requestList.map((request) => (
                        <tr key={request.id}>
                            <td style={{ textAlign: 'center' }}>{request.id}</td>
                            <td>{request.noiDung}</td>
                            <td style={{ textAlign: 'center' }}>{request.loai}</td>
                            <td style={{ textAlign: 'center' }}>
                                {new Date(request.date).toLocaleString('vi-VN')}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-approve"
                                    onClick={(e) =>
                                        handleRequestDecision(e, ACTION_APPROVE, request.id, request.i, request.loai)
                                    }
                                >
                                    {APPROVE_TEXT}
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn-reject"
                                    onClick={(e) =>
                                        handleRequestDecision(e, ACTION_REJECT, request.id, request.i, request.loai)
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
}