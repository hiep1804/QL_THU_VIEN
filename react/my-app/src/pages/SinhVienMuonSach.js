import HeaderSinhVien from "../layouts/headerSinhVien";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function MuonSach(){
    const [sach,setSach]=useState([]);
    const [timKiem,setTimKiem]=useState("");
    const [tim,setTim]=useState("");
    const token=localStorage.getItem("token");
    const navigate=useNavigate();
    useEffect(()=>{
        const layData=async () => {
            try {
                const res = await axios.get("http://localhost:8080/sinh-vien/sach", {
                    params: { tim },
                    headers: {
                      Authorization: token,
                      "Content-Type": "application/json"
                    }
                });
                setSach(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        layData();
    },[tim]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        setTim(timKiem);
    }
    return(
        <div>
            <HeaderSinhVien/>
            <div className="tt_sach_l" style={{width:"100%"}}>
                <form className='tim_kiem' onSubmit={handleSubmit}>
                    <input type="search" placeholder="Tìm kiếm sách" onChange={(e)=>{setTimKiem(e.target.value)}}/>
                    <button type="submit">
                        <img src="/images/tim_kiem.png" alt="tìm kiếm"/>
                    </button>
                </form>
                <div>
                    {sach.length>0?sach.map((s)=>(
                        <div className="sach" key={s.id} style={{cursor:"pointer"}} onClick={()=>navigate(`/sinh-vien/muon-sach/${s.id}`)}>
                            <img src={s.avt} alt="avt" />
                            <div className="sach_info">
                                <p className="sach_name">{s.name}</p>
                                <p><strong>Danh mục:</strong> {s.danhMuc}</p>
                                <p><strong>Tác giả:</strong> {s.tacGia}</p>
                            </div>
                        </div>
                    )):
                    (<p>Không tìm thấy sách</p>)}
                </div>
            </div>
        </div>
    );
}