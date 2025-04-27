import axios from "axios";
import HeaderAdmin from "../layouts/HeaderAdmin";
import { useState,useEffect } from "react";
const DuyetDon=()=>{
    const [list,setList]=useState(null);
    const token=localStorage.getItem("token");
    useEffect(()=>{
        const goi=async ()=>{
            try{
                const res=await axios.post("http://localhost:8080/admin/duyet-don-xin-thu-thu",{},
                    {
                        headers:{
                            Authorization: token
                        }
                    }
                );
                setList(res.data);
                console.log(res.data);
            }
            catch(err){
                console.log(err);
            }
        };
        goi();
    },[]);
    const handle=async (e,loai,id,i)=>{
        e.preventDefault();
        try{
            const res=await axios.get("http://localhost:8080/admin/duyet-don-xin-thu-thu/xu-li",{
                params:{loai,id,i},
                headers:{
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            alert(res.data);
        }
        catch(err){
            console.log(err);
        }
        setList(list.filter(l=>l.i!==i));
    }
    return(
        <div className="duyet_thu_thu">
            <HeaderAdmin/>
            <table style={{width:"60%"}}>
                <tr>
                    <th>ID sinh viên</th>
                    <th style={{width:"40%"}}>Lý do</th>
                    <th>Thời gian</th>
                    <th style={{width:"10%"}}>Đồng ý</th>
                    <th style={{width:"10%"}}>Từ chối</th>
                </tr>
                {list&&list.map((l)=>(
                    <tr key={l.id}>
                        <td style={{textAlign:"center"}}>{l.id}</td>
                        <td>{l.noiDung}</td>
                        <td style={{textAlign:"center"}}>{new Date(l.date).toLocaleString()}</td>
                        <td><button type="button" style={{width:"100%"}} onClick={(e)=>handle(e,'dy',l.id,l.i)}>Đồng ý</button></td>
                        <td><button type="button" style={{width:"100%"}} onClick={(e)=>handle(e,'tc',l.id,l.i)}>Từ chối</button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
export default DuyetDon;