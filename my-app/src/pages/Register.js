import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [sdt, setSdt] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [imageSrc, setImageSrc] = useState("images/hien.png");
    const [pwSrc, setPwSrc] = useState("password");
    const navigate = useNavigate();
    const changemk = function () {
        if (imageSrc === "images/hien.png") {
            setPwSrc("text");
            setImageSrc("images/ko_hien.png");
        }
        else {
            setPwSrc("password");
            setImageSrc("images/hien.png");
        }
    };
    const handleReg = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/register",{sdt,password,name});
            const user = JSON.stringify(res.data);
            localStorage.setItem('user', user);
            const token = res.headers["authorization"];
            localStorage.setItem('token', token);
            console.log(user, token);
            navigate('/sinh-vien/profile');
        }
        catch (err) {
            setError("Số điện thoại đã tồn tại!");
        }
    };
    return (
        <div className="login">
            <h2>Register</h2>
            <form onSubmit={handleReg}>
                <input type="text" value={sdt} onChange={(e) => setSdt(e.target.value)} placeholder="SDT" required id="id" />
                <div className="pw">
                    <input type={pwSrc} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" required id="pw" />
                    <img src={imageSrc} alt="mk" onClick={changemk} />
                </div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" required id="id" />
                <div className="c2nut">
                    <button type="submit">Đăng Kí</button>
                    <button type="button" onClick={()=> navigate('/login')} id="nut_dn">Đăng nhập</button>
                </div>
                <p id="h">{error}</p>
            </form>
        </div>
    );
};
export default Register;