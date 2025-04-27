import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Logout=()=>{
    
  const navigate = useNavigate();
    useEffect(() => {

        // Xóa dữ liệu đăng nhập
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    
        // Chuyển hướng về trang đăng nhập
        navigate("/login");
      }, [navigate]);
}
export default Logout;