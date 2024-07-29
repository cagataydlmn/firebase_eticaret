import { NavLink, Outlet } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { BsBasket } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";



export default function Nav() {
const {user}=useSelector(state=>state.auth)
    const logout = () => {
        localStorage.removeItem('user');
        document.location.href = '/'
        
    }


    return (
        <>
            <nav className="nav mx-auto w-75">
                <div className="nav-icons">
                    <NavLink to='/like'>
                        <div className="icons-under">
                            <div className="icons-text">
                                Favoriler
                            </div>
                            <div className="icons-licons">
                                <FcLike className="icons-licons-font" />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/basket'>
                        <div className="icons-under">
                            <div className="icons-text">
                                Sepet sayfası
                            </div>
                            <div className="icons-licons">
                                <BsBasket className="icons-licons-font" />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to='/search'>
                        <div className="icons-under">
                            <div className="icons-text">
                                Arama
                            </div>
                            <div className="icons-licons">
                                <BiSearchAlt className="icons-licons-font" />
                            </div>
                        </div>
                    </NavLink>
                </div>
                <NavLink to='/' ><img className="nav-img" src="https://www.sorsware.com/images/product/eticaret_logo_buyuk.png" alt="logo" /></NavLink>
                <div className="nav-router">
                    <NavLink to='/' className="nav-link">Tüm Ürünler</NavLink>
                    {/* <NavLink to='/basket' className="nav-link">Sepet</NavLink> */}
                    <NavLink to='/categories' className="nav-link">Kategoriler</NavLink>
                    <NavLink to='/contact' className="nav-link">İletişim</NavLink>
                    {/* <NavLink to='/login' className="nav-link">Üye ol</NavLink> */}
                    {user === ''? (
                        <NavLink to='/login' className="nav-link">Giriş Yap</NavLink>
                    ) : <NavLink className="nav-link" to='/'><button onClick={logout} className="nav-link-quit">Çıkış Yap</button></NavLink>}
                    <NavLink to='/signup' className="nav-link">KAYIT OL </NavLink>

                </div>
            </nav>
            <Outlet />
        </>
    )
}
