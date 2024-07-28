import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { login, register } from "../firebase";
import { login as loginHandle } from "../store/auth";

export default function LoginC() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [name,setName]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password,name);
    dispatch(loginHandle(user));
    navigate("/", { replace: true });
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
        </form>
      </div>
      <div>
        Hesabın yok mu hemen <NavLink to="/signup">kayıt ol</NavLink> 
      </div>
    </>
  );
}
