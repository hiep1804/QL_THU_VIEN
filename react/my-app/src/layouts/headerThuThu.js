import '../assets/headerThuThu.css';
import { useEffect, useState } from 'react';
const Avt=()=>{
    return(
        <div>
            <a href='/thu-thu/profile'>Hồ sơ</a>
            <a href='/sinh-vien/profile'>Chuyển sang sinh viên</a>
            <a href='/logout'>Đăng xuất</a>
        </div>
    );
}
const HeaderThuThu=()=>{
    const [menu, setMenu] = useState(null);
    const [avtMD,setAvtMD]=useState("/images/avtMD.png");
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
    return (
        <div className='header'>
            <a href='/thu-thu/duyet-yeu-cau'>Duyệt yêu cầu</a>
            <a href='/thu-thu/gui-thong-bao'>Gửi thông báo</a>
            <a href='/thu-thu/sach'>Xử lí sách</a>
            <img src={avtMD} alt='avatar' id='avt' onClick={()=>{bam('avt')}}/>
            <div className="phu">
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
export default HeaderThuThu;