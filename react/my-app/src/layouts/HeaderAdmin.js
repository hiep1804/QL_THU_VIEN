import '../assets/headerAdmin.css';
import { useEffect, useState } from 'react';
const Avt=()=>{
    return(
        <div>
            <a href='/admin/profile'>Hồ sơ</a>
            <a href='/logout'>Đăng xuất</a>
        </div>
    );
}
const HeaderAdmin=()=>{
    const [avtMD,setAvtMD]=useState("/images/avtMD.png");
    const [menu, setMenu] = useState(null);
    useEffect(()=>{
        const user=localStorage.getItem('user');
        if(user &&JSON.parse(user).avt!=='none'){
            setAvtMD(JSON.parse(user).avt);
        }
    },[]);
    const bam=(type)=>{
        if(type===menu){
            setMenu(null);
        }
        else{
            setMenu(type);
        }
    }
    return(
        <div className="header">
            <a href='/admin/duyet-don-thu-thu'>Duyệt đơn làm thủ thư</a>
            <a href='/'>Thiết lập cấu hình</a>
            <a href='/'>Theo dõi báo cáo và thống kê</a>
            <img src={avtMD} alt='avatar' id='avt' onClick={()=>{bam('avt')}}/>
            <div class="phu">
                {(() => {
                    if (menu === "avt") {
                        return <Avt />;
                    }
                    else {
                        return null;
                    }
                })()}
            </div>
        </div>
    );
}
export default HeaderAdmin;