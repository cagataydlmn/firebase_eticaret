import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../firebase";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("")
  const [lastName,setLastName]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password, name, lastName);
  };

  return (
    <>
      <div className="login_general">
        <form onSubmit={handleSubmit}>
        <div className="login_name">
            <label> Adı:</label>
            <input
              type="text"
              placeholder=" adresi"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="login_name">
            <label> soyad:</label>
            <input
              type="text"
              placeholder=" soyadı"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <button type="submit">Kayıt ol</button>
        </form>
      </div>
    </>
  );
}
