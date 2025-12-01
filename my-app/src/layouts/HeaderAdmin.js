import '../assets/headerAdmin.css';
import { useEffect, useState } from 'react';

/**
 * Component menu avatar cho admin
 */
const AvatarMenu = () => {
    return (
        <div>
            <a href="/admin/profile">Hồ sơ</a>
            <a href="/logout">Đăng xuất</a>
        </div>
    );
};

/**
 * Component header cho admin
 */
const HeaderAdmin = () => {
    const [avatarUrl, setAvatarUrl] = useState('/images/avtMD.png');
    const [activeMenu, setActiveMenu] = useState(null);

    // Tải avatar người dùng từ localStorage khi component mount
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            if (user.avt && user.avt !== 'none') {
                setAvatarUrl(user.avt);
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
            <a href="/admin/duyet-don-thu-thu">Duyệt đơn làm thủ thư</a>
            <a href="/">Thiết lập cấu hình</a>
            <a href="/">Theo dõi báo cáo và thống kê</a>
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

export default HeaderAdmin;