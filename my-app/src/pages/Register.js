import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Component trang đăng ký
 */
const Register = () => {
    const [sdt, setSdt] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [passwordIconSrc, setPasswordIconSrc] = useState('images/hien.png');
    const navigate = useNavigate();

    // URL API
    const REGISTER_API_URL = 'http://localhost:8080/register';
    const SHOW_PASSWORD_ICON = 'images/hien.png';
    const HIDE_PASSWORD_ICON = 'images/ko_hien.png';

    /**
     * Bật/tắt hiển thị mật khẩu
     */
    const handleTogglePasswordVisibility = () => {
        if (passwordInputType === 'password') {
            setPasswordInputType('text');
            setPasswordIconSrc(HIDE_PASSWORD_ICON);
        } else {
            setPasswordInputType('password');
            setPasswordIconSrc(SHOW_PASSWORD_ICON);
        }
    };

    /**
     * Xử lý đăng ký
     * @param {Event} e - Sự kiện submit form
     */
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(REGISTER_API_URL, {
                sdt,
                password,
                name,
            });

            // Lưu user info vào localStorage
            const userInfo = JSON.stringify(response.data);
            localStorage.setItem('user', userInfo);

            // Lưu token vào localStorage
            const token = response.headers['authorization'];
            localStorage.setItem('token', token);

            console.log('Đăng ký thành công:', userInfo);

            // Điều hướng tới trang hồ sơ sinh viên
            navigate('/sinh-vien/profile');
        } catch (err) {
            console.error('Lỗi đăng ký:', err);
            setError('Số điện thoại đã tồn tại!');
        }
    };

    /**
     * Điều hướng tới trang đăng nhập
     */
    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="login">
            <h2>Đăng Ký</h2>
            <form onSubmit={handleRegister}>
                {/* Input số điện thoại */}
                <input
                    type="text"
                    id="id"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                    placeholder="Số điện thoại"
                    required
                />
                <br />

                {/* Input mật khẩu */}
                <div className="pw">
                    <input
                        type={passwordInputType}
                        id="pw"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mật khẩu"
                        required
                    />
                    <img
                        src={passwordIconSrc}
                        alt="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {/* Input tên */}
                <input
                    type="text"
                    id="id"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tên"
                    required
                />
                <br />

                {/* Buttons */}
                <div className="c2nut">
                    <button type="submit">Đăng Ký</button>
                    <button type="button" onClick={handleNavigateToLogin} id="login-btn">
                        Đăng Nhập
                    </button>
                </div>

                {/* Error message */}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Register;