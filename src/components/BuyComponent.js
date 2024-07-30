import { useEffect, useState } from "react";
import { addAdress, deleteAdress, getAdress } from "../firebase";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import $ from "jquery";
import "jquery-mask-plugin";

export default function BuyComponent() {
  const { user } = useSelector((state) => state.auth);

  const [adresName, setAdresName] = useState("");
  const [adresLastName, setAdresLastName] = useState("");
  const [adresPhone, setAdresPhone] = useState("");
  const [adresCity, setAdresCity] = useState("");
  const [adresTown, setAdresTown] = useState("");
  const [adresDistrict, setAdresDistrict] = useState("");
  const [adresGeneral, setAdresGeneral] = useState("");
  const [adresTitle, setAdresTitle] = useState("");
  const [adressesList, setAdressesList] = useState([]);

  const addAdresses = async (e) => {
    e.preventDefault();
    if (
      !adresTitle ||
      !adresName ||
      !adresLastName ||
      !adresPhone ||
      !adresCity ||
      !adresTown ||
      !adresDistrict ||
      !adresGeneral
    ) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }
    if (user && user.uid) {
      await addAdress(
        {
          adresTitle,
          adresName,
          adresLastName,
          adresPhone,
          adresCity,
          adresTown,
          adresDistrict,
          adresGeneral,
          uid: user.uid,
        },
        user.uid
      );
      notify();
      resetForm();
      console.log("Adres başarıyla eklendi");
    } else {
      console.log("User UID is undefined. Cannot add address item.");
    }
  };

  useEffect(() => {
    $("#phoneInput").mask("(500) 000 00 00");

    return () => {
      $("#phoneInput").unmask();
    };
  }, []);

  const notify = () => toast.success("Adres Başarıyla Eklendi!");

  const resetForm = () => {
    setAdresTitle("");
    setAdresName("");
    setAdresLastName("");
    setAdresPhone("");
    setAdresCity("");
    setAdresTown("");
    setAdresDistrict("");
    setAdresGeneral("");
  };

  useEffect(() => {
    getAdress(setAdressesList);
  }, []);

  const handleChange = async (uid) => {
    await deleteAdress(uid);
  };

  return (
    <div className="buy">
      <div className="buy_general">
        <form onSubmit={addAdresses} className="buy_general_form">
          Adres Ekle
          <div className="buy_general_form_title">
            <input
              value={adresTitle}
              onChange={(e) => setAdresTitle(e.target.value)}
              placeholder="Adres Başlığı"
            />
          </div>
          <div className="buy_general_form_name">
            <input
              value={adresName}
              onChange={(e) => setAdresName(e.target.value)}
              className="buy_general_form_ad"
              placeholder="Ad"
            />{" "}
            <input
              value={adresLastName}
              onChange={(e) => setAdresLastName(e.target.value)}
              className="buy_general_form_lastname"
              placeholder="Soyad"
            />
          </div>
          <div>
            <input
              id="phoneInput"
              value={adresPhone}
              onChange={(e) => setAdresPhone(e.target.value)}
              className="buy_general_form_phone"
              placeholder="Cep Telefonu (Başında 0 olmadan )"
            />
          </div>
          <div className="buy_general_form_live">
            <input
              value={adresCity}
              onChange={(e) => setAdresCity(e.target.value)}
              className="buy_general_form_live_city"
              placeholder="Şehir"
            />
            <input
              value={adresTown}
              onChange={(e) => setAdresTown(e.target.value)}
              className="buy_general_form_live_town"
              placeholder="İlçe"
            />
          </div>
          <div className="buy_general_form_district">
            <input
              value={adresDistrict}
              onChange={(e) => setAdresDistrict(e.target.value)}
              className="buy_general_form_district_district_area"
              placeholder="Mahalle"
            />
          </div>
          <div className="buy_general_form_text">
            <input
              value={adresGeneral}
              onChange={(e) => setAdresGeneral(e.target.value)}
              placeholder="Adres Detayları"
            />
          </div>
          <div className="buy_general_form_button">
            <button type="submit">Adresi kaydet</button>
          </div>
        </form>
        <div className="buy_general_saved">
          KAYITLI ADRESLERİM:
          {adressesList.map((adres) => (
            <div className="adres_cart" key={adres.id}>
              <div className="adres_cart_carts">
                <div className="adres_cart_carts_title">{adres.adresTitle}</div>
                <div className="adres_cart_carts_id">
                  <div className="adres_cart_carts_id_name">
                    {adres.adresName}
                  </div>
                  <div className="adres_cart_carts_id_name">
                    {adres.adresLastName}
                  </div>
                  <div className="adres_cart_carts_id_phone">
                    {adres.adresPhone}
                  </div>
                </div>
                <div className="adres_cart_carts_live">
                  <div className="adres_cart_carts_live_city">
                    {adres.adresCity}
                  </div>
                  /
                  <div className="adres_cart_carts_live_town">
                    {adres.adresTown}
                  </div>
                </div>
                <div className="adres_cart_carts_district">
                  {adres.adresDistrict}
                </div>
                <div className="adres_cart_carts_general">
                  {adres.adresGeneral}
                </div>
              </div>
              <div className="adres_cart_check">
                <input className="adres_cart_check_ok" type="checkbox" />
                <button
                  onClick={() => handleChange(adres.id)}
                  className="adres_cart_check_delete"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>Kredi Kartı Alanı</div>
      <div>
        <button>Onayla</button>
      </div>
      <ToastContainer />
    </div>
  );
}
