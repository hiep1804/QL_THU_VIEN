import { useEffect, useState } from "react";
import HeaderSinhVien from "../layouts/headerSinhVien";
import axios from "axios";

const Xin = () => {
    const [rong, setRong] = useState(window.innerHeight);
    const [noiDung, setNd] = useState("");
    const [err, setErr] = useState("");
    const handle = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const id = JSON.parse(localStorage.getItem("user")).sdt;
        const yc = { id, noiDung };
        try {
            const res = await axios.post("http://localhost:8080/sinh-vien/xin-lam-thu-thu", yc,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
            alert(res.data);
        }
        catch (error) {
            setErr(error.response.data);
        }
    }
    useEffect(() => {
        setRong(window.innerHeight);
    }, []);
    return (
        <div className="apply-container">
            <HeaderSinhVien />
            <div className="form-wrapper">
                <form onSubmit={handle} className="apply-form">
                    <h1 className="form-title">Xin làm thủ thư</h1>
                    <textarea
                        className="form-textarea"
                        rows="3"
                        placeholder="Tại sao bạn muốn làm thủ thư?"
                        onChange={(e) => setNd(e.target.value)}
                        value={noiDung}
                        minLength={10}
                        maxLength={100}
                    ></textarea>
                    <button type="submit" className="form-button">Gửi</button>
                    <p className="form-error">{err}</p>
                </form>
            </div>
        </div>

    );
}
export default Xin;