import axios from "axios";
import HeaderSinhVien from "../layouts/headerSinhVien";
import { useState, useEffect } from "react";
import '../assets/profile.css';
const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    const sdt = user.sdt;
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState(user.password);
    const [avt, setAvt] = useState(user.avt);
    const role = user.role;
    const [err, setErr] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(event.target.files[0]);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result); // Lưu URL của ảnh vào state
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    useEffect(() => {
        if (file) {
            setAvt("/images/" + file.name);
        }
    }, [file]);
    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        const user1 = { id, name, password, sdt, role, avt }
        formData.append("user", new Blob([JSON.stringify(user1)], { type: "application/json" }));
        try {
            const res = await axios.post("http://localhost:8080/sinh-vien/profile",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            localStorage.setItem("user", JSON.stringify(user1));
            alert(res.data);
        }
        catch (error) {
            setErr(error.message);
        }
    };
    return (
        <div className="than">
            <h2>Trang cá nhân</h2>
            <form onSubmit={handleSubmit}>
                {!preview && <img src={avt} alt="Xem trước ảnh"  id="avt1"/>}
                {preview && <img src={preview} alt="Xem trước ảnh"  id="avt1" />}
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                /><br/>
                <label>ID: <input type="text" disabled id='id' value={id}></input></label><br />
                <label>Name: <input type="text" id='name' onChange={(e) => { setName(e.target.value) }} value={name} required></input></label><br />
                <label>SĐT: <input type="text" id="SDT" disabled value={sdt}></input></label><br />
                <label>Password: <input type="text" id="pw" onChange={(e) => { setPassword(e.target.value) }} required></input></label><br />
                <button type="submit">Sửa hồ sơ</button>
            </form>
            <p>{err}</p>
        </div>
    );
}
const UserDashboard = () => {
    return (
        <div>
            <HeaderSinhVien />
            <Profile />
        </div>
    );
};

export default UserDashboard;
