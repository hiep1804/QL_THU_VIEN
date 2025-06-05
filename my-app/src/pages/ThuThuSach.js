import HeaderThuThu from "../layouts/headerThuThu";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Right = () => {
    const [name, setName] = useState("");
    const [err, setErr] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState(null);
    const [avt, setAvt] = useState("/images/sachMD.jpg");
    const [sl, setSl] = useState(1);
    const [danhMuc, setDanhMuc] = useState("");
    const [tacGia, setTacGia] = useState("");
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(event.target.files[0]);
        if (selectedFile) {
            console.log(selectedFile.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e.target.result);
                setPreview(e.target.result); // Lưu URL của ảnh vào state
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    useEffect(() => {
        if (file) {
            setAvt("/images/" + file.name);
        }
    }, [file]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");
        const sach = { name, sl, danhMuc, tacGia, avt }
        formData.append("sach", new Blob([JSON.stringify(sach)], { type: "application/json" }));
        try {
            const res = await axios.post("http://localhost:8080/thu-thu/sach",
                formData,
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert(res.data);
        }
        catch (error) {
            setErr(error.message);
        }
    };
    return (
        <div className="tt_sach_r">
            <h2>Thêm sách</h2>
            <form onSubmit={handleSubmit}>
                {!preview && <img src={avt} alt="Xem trước ảnh" />}
                {preview && <img src={preview} alt="Xem trước ảnh" />}
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*"
                /><br />
                <label>Tên sách: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required /></label><br />
                <label>Số lượng: <input type="number" value={sl} onChange={(e) => { setSl(e.target.value) }} min="1" max="30" required /></label><br />
                <label>Danh mục: <input type="text" value={danhMuc} onChange={(e) => { setDanhMuc(e.target.value) }} required /></label><br />
                <label>Tác giả: <input type="text" value={tacGia} onChange={(e) => { setTacGia(e.target.value) }} required /></label><br />
                <button type="submit">Thêm sách</button>
            </form>
            <p>{err}</p>
        </div>
    );
}
const Left = () => {
    const [sach, setSach] = useState([]);
    const [timKiem, setTimKiem] = useState("");
    const [tim, setTim] = useState("");
    const token = localStorage.getItem("token");
    const [soTrang, setSoTrang] = useState(0);
    const [allSach, setAllSach] = useState([]);
    useEffect(() => {
        const layData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/thu-thu/sach/data", {
                    params: { tim },
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json"
                    }
                });
                setSoTrang(Math.ceil(res.data.length / 8));
                setAllSach(res.data);

                if (Math.ceil(res.data.length / 8) === 1) {
                    setSach(res.data);
                }
                if (Math.ceil(res.data.length / 8) > 1) {
                    setSach(res.data.slice(0, 8));
                }
            } catch (err) {
                console.log(err);
            }
        }
        layData();
    }, [tim]);
    const [index, setIndex] = useState(0);

    const truoc = async (e) => {
        e.preventDefault();
        setIndex(index - 1);
    }
    const sau = async (e) => {
        e.preventDefault();
        setIndex(index + 1);
    }
    const chuyen = async (e, so) => {
        e.preventDefault();
        setIndex(so);
    }
    useEffect(()=>{
        setSach(allSach.slice(index * 8, index * 8 + 8));
    },[index]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setTim(timKiem);
    }
    const items = Array.from({ length: soTrang }, (_, i) => (
        <button key={i + 1} onClick={(e)  => chuyen(e, i)} className="pagination-btn so-btn">{i + 1}</button>
    ));
    return (
        <div className="tt_sach_l">
            <form className='tim_kiem' onSubmit={handleSubmit}>
                <input type="search" placeholder="Tìm kiếm sách" onChange={(e) => { setTimKiem(e.target.value) }} />
                <button type="submit">
                    <img src="/images/tim_kiem.png" alt="tìm kiếm" />
                </button>
            </form>
            <div>
                {soTrang > 0 ? sach.map((s) => (
                    <div className="sach" key={s.id}>
                        <Link to={`/sinh-vien/muon-sach/${s.id}`}>
                            <img src={s.avt} alt="avt" />
                            <div className="sach_info">
                                <p className="sach_name">{s.name}</p>
                                <p><strong>Danh mục:</strong> {s.danhMuc}</p>
                                <p><strong>Tác giả:</strong> {s.tacGia}</p>
                                <p><strong>Số lượng:</strong> {s.sl}</p>
                            </div>
                        </Link>
                    </div>
                )) :
                    (<p>Không tìm thấy sách</p>)}
                {soTrang > 0 && (
                    <div className="pagination-container">
                        <button
                            className="pagination-btn prev-btn"
                            onClick={truoc}
                            disabled={index === 0}
                        >
                            {"<<"}
                        </button>

                        <div >
                            {items}
                        </div>

                        <button
                            className="pagination-btn next-btn"
                            onClick={sau}
                            disabled={index === soTrang-1}
                        >
                            {">>"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
const Sua = () => {
    const [timKiem, setTimKiem] = useState("");
    const token = localStorage.getItem("token");
    const [sach, setSach] = useState("");
    const [err, setErr] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState(null);
    const [avt, setAvt] = useState("/images/sachMD.jpg");
    const [sl, setSl] = useState(1);
    const [danhMuc, setDanhMuc] = useState("");
    const [tacGia, setTacGia] = useState("");
    const [id, setId] = useState(0);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(event.target.files[0]);
        if (selectedFile) {
            console.log(selectedFile.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e.target.result);
                setPreview(e.target.result); // Lưu URL của ảnh vào state
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    useEffect(() => {
        if (file) {
            setAvt("/images/" + file.name);
        }
    }, [file]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:8080/thu-thu/sach/sua", {
                params: { timKiem },
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            });
            console.log(res.data);
            const s = res.data;
            setSach(s);
            if (s === "") setErr("Không tìm thấy sách này");
            else {
                setId(s.id);
                setAvt(s.avt);
                setName(s.name);
                setSl(s.sl);
                setDanhMuc(s.danhMuc);
                setTacGia(s.tacGia);
                setErr("");
            }
        }
        catch (error) {
            setErr(error.response.data.error);
        }
    }
    const handle = async (e) => {
        e.preventDefault();
        const bam = e.nativeEvent.submitter.value;
        console.log(bam);
        if (bam === 'sua') {
            const formData = new FormData();
            formData.append("file", file);
            const token = localStorage.getItem("token");
            const sach = { id, name, sl, danhMuc, tacGia, avt }
            formData.append("sach", new Blob([JSON.stringify(sach)], { type: "application/json" }));
            try {
                const res = await axios.post("http://localhost:8080/thu-thu/sach/sua/sach",
                    formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                alert(res.data);
            }
            catch (error) {
            }
        }
        else {
            const token = localStorage.getItem("token");
            const sach = { id, name, sl, danhMuc, tacGia, avt }
            try {
                const res = await axios.post("http://localhost:8080/thu-thu/sach/xoa",
                    sach,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setErr("");
                setSach("");
                alert(res.data);
            }
            catch (error) {
            }
        }
    }
    return (
        <div className="tt_sach_sua">
            <form className='tim_kiem' onSubmit={handleSubmit}>
                <input type="search" placeholder="Tìm kiếm sách" onChange={(e) => { setTimKiem(e.target.value) }} />
                <button type="submit">
                    <img src="/images/tim_kiem.png" alt="tìm kiếm" />
                </button>
            </form>
            <div >
                {sach.name && (
                    <form className="sua_xoa_sach_tt" onSubmit={handle}>
                        {!preview && <img src={avt} alt="Xem trước ảnh" />}
                        {preview && <img src={preview} alt="Xem trước ảnh" />}
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            accept="image/*"
                        /><br />
                        <label>Tên sách: <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required /></label><br />
                        <label>Số lượng: <input type="number" value={sl} onChange={(e) => { setSl(e.target.value) }} min="1" max="30" required /></label><br />
                        <label>Danh mục: <input type="text" value={danhMuc} onChange={(e) => { setDanhMuc(e.target.value) }} required /></label><br />
                        <label>Tác giả: <input type="text" value={tacGia} onChange={(e) => { setTacGia(e.target.value) }} required /></label><br />
                        <button type="submit" value="sua">Sửa sách</button>
                        <button type="submit" value="xoa">Xóa sách</button>
                    </form>
                )}
                <p>{err}</p>
            </div>
        </div>
    );
}
const Menu = ({ setChon }) => {
    return (
        <div className="menuSachTT" onSubmit={(e) => e.preventDefault()}>
            <p onClick={() => { setChon("1") }}>Tìm kiếm</p>
            <p onClick={() => { setChon("2") }}>Thêm</p>
            <p onClick={() => { setChon("3") }}>Sửa & Xóa</p>
        </div>
    );
}
const ThuThuSach = () => {
    const [chon, setChon] = useState("1");
    const [cpn, setCpm] = useState(<Right />);
    useEffect(() => {
        if (chon === '1') setCpm(<Left />);
        else if (chon === '2') setCpm(<Right />)
        else if (chon === '3') setCpm(<Sua />)
    }, [chon]);
    return (
        <div>
            <HeaderThuThu />
            <Menu setChon={setChon} />
            <div>{cpn}</div>
        </div>
    );
}
export default ThuThuSach;