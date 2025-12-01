import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * Component trang đăng nhập
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passwordInputType, setPasswordInputType] = useState('password');
    const [passwordIconSrc, setPasswordIconSrc] = useState('images/hien.png');
    const [error, setError] = useState(null);

    // URL API
    const LOGIN_API_URL = 'http://localhost:8080/login';
    const SHOW_PASSWORD_ICON = 'images/hien.png';
    const HIDE_PASSWORD_ICON = 'images/ko_hien.png';

    // Route mapping
    const ROLE_ROUTES = {
        admin: '/admin/profile',
        sinh_vien: '/sinh-vien/profile',
        thu_thu: '/thu-thu/profile',
    };

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
     * Xử lý đăng nhập
     * @param {Event} e - Sự kiện submit form
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(LOGIN_API_URL, { email, password });
            const token = response.headers.get('Authorization');

            // Lưu token và user info vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(response.data));

            // Nếu là sinh viên, lưu thêm vào sv key
            if (response.data.role === 'sinh_vien') {
                localStorage.setItem('sv', JSON.stringify(response.data));
            }

            // Điều hướng theo role
            const redirectUrl = ROLE_ROUTES[response.data.role] || '/';
            navigate(redirectUrl);
        } catch (err) {
            console.error('Lỗi đăng nhập:', err);
            setError('Sai tên đăng nhập hoặc mật khẩu');
        }
    };

    /**
     * Điều hướng tới trang đăng ký
     */
    const handleNavigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
                {/* Input email/ID */}
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ID"
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

                {/* Buttons */}
                <div className="c2nut">
                    <button type="submit">Đăng Nhập</button>
                    <button type="button" onClick={handleNavigateToRegister}>
                        Đăng Ký
                    </button>
                </div>

                {/* Error message */}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Login;