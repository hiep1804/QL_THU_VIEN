import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState("images/hien.png");
    const [pwSrc,setPwSrc]=useState("password");
    const [error, setError] = useState(null);
    const changemk=function(){
        console.log(document.getElementById("pw").type);
        if(imageSrc==="images/hien.png"){
            setPwSrc("text");
            setImageSrc("images/ko_hien.png");
        }
        else{
            setPwSrc("password");
            setImageSrc("images/hien.png");
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login",{email,password});
            const token=response.headers.get("Authorization");
            console.log(token);
            localStorage.setItem("token", token);
            localStorage.setItem("user",JSON.stringify(response.data) );
            if(response.data.role === "admin"){
                navigate('/admin/profile');
            }
            else if(response.data.role==='sinh_vien'){
                localStorage.setItem("sv",JSON.stringify(response.data))
                navigate('/sinh-vien/profile');
            }
            else    navigate('/thu-thu/profile');
        } catch (error) {
            setError("Sai tên đăng nhập hoặc mật khẩu");
        }
    };

    return (
        <div className="login">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ID" required id="id"/>
                <br/>
                <div className="pw">
                    <input type={pwSrc} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" required id="pw"/>
                    <img src={imageSrc} alt="mk"  onClick={changemk}/>
                </div>
                <div className="c2nut">
                    <button type="submit">Đăng Nhập</button>
                    <button type="button" onClick={()=>navigate('/register')}>Đăng ký</button>
                </div>
                <p id="h">{error}</p>
            </form>
        </div>
    );
};

export default Login;
