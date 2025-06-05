import HeaderThuThu from "../layouts/headerThuThu";
import axios from "axios";
import { useState,useEffect,useRef } from "react";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
export default function Duyet(){
    const [list,setList]=useState(null);
    const token=localStorage.getItem("token");
    const clientRef = useRef(null);
    useEffect(()=>{
        const goi=async ()=>{
            try{
                const res=await axios.post("http://localhost:8080/thu-thu/duyet-yeu-cau",{},
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
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket đánh giá');
                client.subscribe('/topic/gui-yeu-cau', (message) => {
                    const data = JSON.parse(message.body)
                    setList((prev) => [...prev,data]);
                });
            },
            onDisconnect: () => console.log('Disconnected đánh giá'),
            debug: (str) => console.log(str),
        });
        
        client.activate();
        clientRef.current = client;
        
        return () => {
            client.deactivate();
        };
    },[]);
    const handle=async (e,loai,id,i,mt)=>{
        e.preventDefault();
        try{
            const res=await axios.get("http://localhost:8080/thu-thu/duyet-yeu-cau/xu-li",{
                params:{loai,id,i,mt},
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
            <HeaderThuThu/>
            <table>
                <tr>
                    <th>ID sinh viên</th>
                    <th>Lý do</th>
                    <th>Loại</th>
                    <th>Thời gian</th>
                    <th>Đồng ý</th>
                    <th>Từ chối</th>
                </tr>
                {list&&list.map((l)=>(
                    <tr key={l.id}>
                        <td>{l.id}</td>
                        <td>{l.noiDung}</td>
                        <td>{l.loai}</td>
                        <td>{new Date(l.date).toLocaleString()}</td>
                        <td><button type="button" onClick={(e)=>handle(e,'dy',l.id,l.i,l.loai)}>Đồng ý</button></td>
                        <td><button type="button" onClick={(e)=>handle(e,'tc',l.id,l.i,l.loai)}>Từ chối</button></td>
                    </tr>
                ))}
            </table>
        </div>
    );
}