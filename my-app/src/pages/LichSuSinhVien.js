import { useEffect, useState } from "react";
import HeaderSinhVien from "../layouts/headerSinhVien";
import axios from "axios";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
export default function LichSu() {
    const [list, setList] = useState([]);
    const id = user.id;
    useEffect(() => {
        const tai = async () => {
            try {
                const res = await axios.post("http://localhost:8080/sinh-vien/lich-su", { id }, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                console.log(res.data);
                setList(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        tai();
    }, []);
    return (
        <div className="borrow-container">
            <HeaderSinhVien />
            <table className="borrow-table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Ngày mượn</th>
                        <th>Ngày trả</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((ls, idx) => (
                        <tr key={idx}>
                            <td>{ls.name}</td>
                            <td>{new Date(ls.ngayMuon).toLocaleString()}</td>
                            <td>{ls.ngayTra && new Date(ls.ngayTra).toLocaleString()}</td>
                            <td>{ls.trangThai}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}
