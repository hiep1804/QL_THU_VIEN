import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminHome";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register";
import UserDashboard from "../pages/SinhVienHome";
import Logout from "../pages/Logout";
import ThuThuHome from "../pages/ThuThuHome";
import ThuThuSach from "../pages/ThuThuSach";
import Xin from "../pages/SinhVienXinTT";
import DuyetDon from "../pages/DuyetDonAdmin";
import ThuThuGuiThongBao from "../pages/ThuThuGuiThongBao";
import MuonSach from "../pages/SinhVienMuonSach";
import Sach from "../pages/SinhVienSach";
import Duyet from "../pages/ThuThuDuyetYeuCau";
import LichSu from "../pages/LichSuSinhVien";
import Chat from "../pages/Chat";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                {/* Trang dành cho Admin */}
                <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/profile" element={<AdminDashboard />} />
                    <Route path="/admin/duyet-don-thu-thu" element={<DuyetDon />} />
                </Route>

                {/* Trang dành cho Sinh viên */}
                <Route element={<PrivateRoute allowedRoles={["sinh_vien", "thu_thu"]} />}>
                    <Route path="/sinh-vien/profile" element={<UserDashboard />} />
                    <Route path="/sinh-vien/xin-lam-thu-thu" element={<Xin />} />
                    <Route path="/sinh-vien/muon-sach" element={<MuonSach />} />
                    <Route path="/sinh-vien/muon-sach/:id" element={<Sach />} />
                    <Route path="/sinh-vien/lich-su-muon-tra" element={<LichSu />} />
                    <Route path="/sinh-vien/chat" element={<Chat />} />
                </Route>
                <Route element={<PrivateRoute allowedRoles={["thu_thu"]} />}>
                    <Route path="/thu-thu/profile" element={<ThuThuHome />} />
                    <Route path="/thu-thu/sach" element={<ThuThuSach />} />
                    <Route path="/thu-thu/gui-thong-bao" element={<ThuThuGuiThongBao />} />
                    <Route path="/thu-thu/duyet-yeu-cau" element={<Duyet />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
