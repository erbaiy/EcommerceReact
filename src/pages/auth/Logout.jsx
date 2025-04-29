import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";

function Logout() {
  const Auth = AuthService();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
        await Auth.logout();
        navigate("/login");
    }
    logout();
  }, []);
  return;
}

export default Logout;
