import { useState } from "react";
import HeaderThuThu from "../layouts/headerThuThu";
import axios from "axios";

export default function ThuThuGuiThongBao() {
    const [tb, setTb] = useState({ "header": "", "nd": "", "id_nguoi_nhan": "" });
    const token = localStorage.getItem("token");
    const handle = async (e) => {
        e.preventDefault();
        if (isNaN(Number(tb.id_nguoi_nhan))) {
            alert("Id chỉ có số thôi!");
            return;
        }
        try {
            const res = await axios.post("http://localhost:8080/thu-thu/gui-thong-bao", tb,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                }
            );
            alert(res.data);
        }
        catch (err) {
            alert(err.response.data);
        }
    }
    return (
        <div>
            <HeaderThuThu />
            <div className="thu-thu-gui-thong-bao">
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Thủ thư thông báo</h1>
                <form onSubmit={handle}>
                    <label>Header: <input type="text" placeholder="Nhập tiêu đề" onChange={(e) => setTb({ ...tb, "header": e.target.value })} required /> </label><br /><br />
                    <label>Nội dung: <textarea placeholder="Nhập nội dung" rows={5} cols={100} onChange={(e) => setTb({ ...tb, "nd": e.target.value })} required /> </label><br /><br />
                    <label>ID sinh viên: <input type="text" placeholder="Nhập id sinh viên" onChange={(e) => setTb({ ...tb, "id_nguoi_nhan": e.target.value })} required /></label><br /><br />
                    <button type="submit">Gửi</button>
                </form>
            </div>
        </div>
    );
}