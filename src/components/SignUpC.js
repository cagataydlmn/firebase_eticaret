import { useState } from "react";
import { register } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]=useState("")
  const [lastName,setLastName]=useState("")

  const notifySuccess = () => toast.success("Kayıt başarıyla tamamlandı!");
  const notifyError = (message) => toast.error(`Hata: ${message}`);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(email, password, name, lastName);
      notifySuccess()
    } catch (error) {
        notifyError(error.message);
    }
   
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
            <label> Soyadı:</label>
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
      <ToastContainer />
    </>
  );
}
