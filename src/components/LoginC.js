import { useState } from "react";
import { useDispatch } from "react-redux";
import {  NavLink, useNavigate } from "react-router-dom";
import { login,  } from "../firebase";
import { login as loginHandle } from "../store/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginC() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [name]=useState("")
  const notifyError = (message) => toast.error(`Hata: ${message}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password,name);
      dispatch(loginHandle(user));
      navigate("/", { replace: true });
    } catch (error) {
      notifyError(error.message);

    }
   
  };

  return (
    <>
      <div className="login_general">
        <form onSubmit={handleSubmit}>
        {/* <div className="login_name">
            <label> Adı:</label>
            <input
              type="text"
              placeholder="e-posta adresi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}
          <div className="login_name">
            <label>Kullanıcı Adı:</label>
            <input
              type="text"
              placeholder="e-posta adresi"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login_password">
            <label>Şifre:</label>
            <input
              type="password"
              placeholder="Şifren"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Giriş Yap</button>
          <div>
        Hesabın yok mu hemen <NavLink to="/signup">kayıt ol</NavLink> 
      </div>
        </form>
      </div>
     
      <ToastContainer/>
    </>
  );
}
