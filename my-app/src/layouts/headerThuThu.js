import '../assets/headerThuThu.css';
import { useEffect, useState } from 'react';

/**
 * Component menu avatar cho thủ thư
 */
const AvatarMenu = () => {
    return (
        <div>
            <a href="/thu-thu/profile">Hồ sơ</a>
            <a href="/sinh-vien/profile">Chuyển sang sinh viên</a>
            <a href="/logout">Đăng xuất</a>
        </div>
    );
};

/**
 * Component header cho thủ thư
 */
const HeaderThuThu = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState('/images/avtMD.png');

    // Tải avatar người dùng từ localStorage khi component mount
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            if (userData.avt && userData.avt !== 'none') {
                setAvatarUrl(userData.avt);
            }
        }
    }, []);

    /**
     * Bật/tắt menu
     * @param {string} menuType - Loại menu cần bật/tắt
     */
    const handleMenuToggle = (menuType) => {
        setActiveMenu(activeMenu === menuType ? null : menuType);
    };

    return (
        <div className="header">
            <a href="/thu-thu/duyet-yeu-cau">Duyệt yêu cầu</a>
            <a href="/thu-thu/gui-thong-bao">Gửi thông báo</a>
            <a href="/thu-thu/sach">Xử lí sách</a>
            <img
                src={avatarUrl}
                alt="avatar"
                id="avt"
                onClick={() => handleMenuToggle('avt')}
            />
            <div className="phu">
                {/* Hiển thị menu avatar khi activeMenu = 'avt' */}
                {activeMenu === 'avt' && <AvatarMenu />}
            </div>
        </div>
    );
};

export default HeaderThuThu;