import { useEffect, useState } from "react";
import { addAdress, deleteAdress, getAdress } from "../firebase";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import $ from "jquery";
import "jquery-mask-plugin";

export default function BuyComponent({ totalPrice }) {
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
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartData, setCartData] = useState({
    cartName: "",
    cartNo: "",
    cartMount: "",
    cartSecurity: "",
    cartData: "",
    cartYear: "",
  });
  const [allData, setAllData] = useState(null);

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

  useEffect(() => {
    $("#cartInput").mask("0000 0000 0000 0000");

    return () => {
      $("#cartInput").unmask();
    };
  }, []);

  useEffect(() => {
    getAdress(setAdressesList);
  }, []);

  const handleChangeCart = (e) => {
    const { name, value } = e.target;
    setCartData({
      ...cartData,
      [name]: value,
    });
  };

  const handleAddressSelect = (adresId) => {
    setSelectedAddress(adresId);
  };

  const handleSubmitCart = (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      toast.error("Lütfen bir adres seçin.");
      return;
    }
    if (
      !cartData.cartName ||
      !cartData.cartNo ||
      !cartData.cartMount ||
      !cartData.cartYear ||
      !cartData.cartSecurity
    ) {
      toast.error("Lütfen tüm kart bilgilerini doldurun.");
      return;
    }
    console.log("Seçilen adres ID:", selectedAddress);
    console.log("Kart Bilgileri:", cartData);
  };

  const handleSaveAllData = () => {
    if (!selectedAddress) {
      toast.error("Lütfen bir adres seçin.");
      return;
    }
    if (
      !cartData.cartName ||
      !cartData.cartNo ||
      !cartData.cartMount ||
      !cartData.cartYear ||
      !cartData.cartSecurity
    ) {
      toast.error("Lütfen tüm kart bilgilerini doldurun.");
      return;
    }
    const selectedAddressData = adressesList.find(
      (adres) => adres.id === selectedAddress
    );
    const allFormData = {
      address: selectedAddressData,
      cart: cartData,
    };
    setAllData(allFormData);
    console.log("Tüm Veriler:", allFormData);
    toast.success("Sipariş alındı.");
    console.log(allData);
  };

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

  const handleChange = async (uid) => {
    await deleteAdress(uid);
  };

  return (
    <div className="buy">
      <div className="buy_general">
        <div className="buy_top">
          <form onSubmit={handleSubmitCart} className="buy_general_form">
            <h2>Adres Ekle</h2>
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
              <button type="button" onClick={addAdresses}>
                Adresi kaydet
              </button>
            </div>

            <h2>Kart Bilgileri</h2>
            <div className="buy_general_form_cart_name">
              <input
                type="text"
                name="cartName"
                value={cartData.cartName}
                onChange={handleChangeCart}
                placeholder="Kartın üstündeki isim"
              />
            </div>
            <div className="buy_general_form_cart_no">
              <input
                id="cartInput"
                name="cartNo"
                value={cartData.cartNo}
                onChange={handleChangeCart}
                placeholder="Kart No"
              />
            </div>
            <div className="buy_general_form_cart_date">
              <input
                type="number"
                name="cartMount"
                value={cartData.cartMount}
                onChange={handleChangeCart}
                className="buy_general_form_cart_date_mount"
                placeholder="Ay"
              />
              <input
                type="number"
                name="cartYear"
                value={cartData.cartYear}
                onChange={handleChangeCart}
                placeholder="Yıl"
                className="buy_general_form_cart_date_year"
              />
            </div>
            <div>
              <input
                type="number"
                name="cartSecurity"
                value={cartData.cartSecurity}
                onChange={handleChangeCart}
                className="buy_general_form_cart_cvv"
                placeholder="Güvenlik Kodu CVV"
              />
            </div>
            <div className="buy_general_form_cart_button">
              <button onClick={handleSaveAllData} type="submit">Onayla</button>
            </div>
          </form>
        </div>
        <h2>Kayıtlı Adreslerim</h2>

        <div className="buy_general_saved">
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
                <div className="adres_cart_carts_text">
                  {adres.adresGeneral}
                </div>
                <div className="adres_cart_carts_radio">
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={adres.id}
                    checked={selectedAddress === adres.id}
                    onChange={() => handleAddressSelect(adres.id)}
                  />
                  Bu adresi seç
                </div>
                <div className="adres_cart_carts_delete">
                  <MdDelete
                    onClick={() => handleChange(adres.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
