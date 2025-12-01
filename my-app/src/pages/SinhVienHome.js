import axios from 'axios';
import HeaderSinhVien from '../layouts/HeaderSinhVien';
import { useState, useEffect } from 'react';
import '../assets/profile.css';

/**
 * Component hồ sơ cá nhân sinh viên
 */
const Profile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id, sdt, name: initialName, password: initialPassword, avt: initialAvt, role } = user;

    const [name, setName] = useState(initialName);
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(initialAvt);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const token = localStorage.getItem('token');

    /**
     * Xử lý khi người dùng chọn file ảnh
     * @param {Event} event - Sự kiện input file
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Cập nhật đường dẫn avatar khi file thay đổi
     */
    useEffect(() => {
        if (selectedFile) {
            setAvatar(`/images/${selectedFile.name}`);
        }
    }, [selectedFile]);

    /**
     * Xử lý submit form cập nhật hồ sơ
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        const updatedUser = { id, name, password, sdt, role, avt: avatar };
        formData.append(
            'user',
            new Blob([JSON.stringify(updatedUser)], { type: 'application/json' })
        );

        try {
            const response = await axios.post(
                'http://localhost:8080/sinh-vien/profile',
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Cập nhật localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert(response.data);
        } catch (err) {
            console.error('Lỗi cập nhật hồ sơ:', err);
            setError(err.message);
        }
    };

    return (
        <div className="than">
            <h2>Trang cá nhân</h2>
            <form onSubmit={handleSubmit}>
                {/* Hiển thị ảnh avatar */}
                <img
                    src={previewUrl || avatar}
                    alt="Avatar"
                    id="avt1"
                />

                {/* Input chọn file ảnh */}
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <br />

                {/* Các trường thông tin */}
                <label>
                    ID:
                    <input
                        type="text"
                        id="id"
                        value={id}
                        disabled
                    />
                </label>
                <br />

                <label>
                    Tên:
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br />

                <label>
                    SĐT:
                    <input
                        type="text"
                        id="sdt"
                        value={sdt}
                        disabled
                    />
                </label>
                <br />

                <label>
                    Mật khẩu:
                    <input
                        type="password"
                        id="pw"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />

                <button type="submit">Sửa hồ sơ</button>
            </form>

            {/* Hiển thị lỗi nếu có */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

/**
 * Component dashboard cho sinh viên
 */
const SinhVienHome = () => {
    return (
        <div>
            <HeaderSinhVien />
            <Profile />
        </div>
    );
};

export default SinhVienHome;