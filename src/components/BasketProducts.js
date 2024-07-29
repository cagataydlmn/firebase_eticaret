import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useSite } from "../context/AppContext";
import {
  deleteBasketItem,
  getBasketItems,
  updateBasketItemQuantity,
} from "../firebase";
import { setBasketItems } from "../store/basketItemsReducer";

export default function BasketProducts() {
  const { setSelectProductItems, setTotalPrice } =
    useSite();
  const basketItems = useSelector((state) => state.basketItems.items);
  const dispatch = useDispatch();

  const increaseQuantity = async (selectedProduct) => {
    try {
      await updateBasketItemQuantity(
        selectedProduct.id,
        selectedProduct.productQuantity + 1
      );
      const updatedItems = basketItems.map((product) =>
        product.productId === selectedProduct.productId
          ? { ...product, productQuantity: product.productQuantity + 1 }
          : product
      );
      setSelectProductItems(updatedItems);
    } catch (error) {
      console.error("Ürün miktarı arttırılırken hata oluştu: ", error);
    }
  };

  const decreaseQuantity = async (selectedProduct) => {
    if (selectedProduct.productQuantity > 1) {
      await updateBasketItemQuantity(
        selectedProduct.id,
        selectedProduct.productQuantity - 1
      );
      const updatedItems = basketItems.map((product) =>
        product.productId === selectedProduct.productId
          ? { ...product, productQuantity: product.productQuantity - 1 }
          : product
      );
      setSelectProductItems(updatedItems);
    } else {
      await deleteBasketItem(selectedProduct.id);
      const updatedItems = basketItems.filter(
        (product) => product.productId !== selectedProduct.productId
      );
      setSelectProductItems(updatedItems);
    }
    setTotalPrice((prevPrice) => prevPrice - selectedProduct.productPrice);
  };
  useEffect(() => {
    getBasketItems((items) => {
      dispatch(setBasketItems(items));
    });
  }, [dispatch]);

  const deleteItem = async (selectedProduct) => {
    await deleteBasketItem(selectedProduct.id);
  };
  const user = localStorage.getItem("user");

  if (user == null) {
    return (
      <div>
        Sepeti ürün ekleyebilmek için önce giriş Yap
        <NavLink to="/login">Giriş yapmak için tıkla</NavLink>{" "}
      </div>
    );
  }

  const totalPrice = basketItems.reduce(
    (total, item) => total + item.productPrice * item.productQuantity,
    0
  );
  return (
    <div className="basket">
      <ul>
        {basketItems?.map((selectProductItem, selectProductItemsIndex) => (
          <li key={selectProductItemsIndex}>
            <div className="basket-items">
              <div className="basket-items-general">
                <div className="basket-items-image">
                  <img
                    src={selectProductItem.productImage[0]
                      .replace("[", "")
                      .replace("]", "")
                      .replaceAll('"', "")}
                      alt={selectProductItem.productname}
                  />
                </div>
                <div className="basket-items-info">
                  <div className="basket-items-text">
                    <div className="basket-items-title">
                      {selectProductItem.productName}
                      <div>{selectProductItem.productId}</div>
                    </div>
                    <div className="basket-items-description">
                      {selectProductItem.productDescription}
                    </div>
                  </div>
                  <div className="basket-items-features">
                    <div className="basket-items-quantities">
                      <span>normal fiyat:{selectProductItem.productPrice}</span>
                      <span className="quantity">
                        Adet: {selectProductItem.productQuantity}
                      </span>
                      <div className="product-items-plus">
                        <button
                          onClick={() => increaseQuantity(selectProductItem)}
                        >
                          Arttır
                        </button>
                        <button
                          onClick={() => decreaseQuantity(selectProductItem)}
                        >
                          azalt
                        </button>
                      </div>
                    </div>
                    <div className="product-items-price">
                      Ücret:
                      {selectProductItem.productPrice *
                        selectProductItem.productQuantity}
                      $
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-items-delete">
                <button onClick={() => deleteItem(selectProductItem)}>
                  Ürünü Sil
                </button>
              </div>
            </div>
          </li>
        ))}
        <div className="total-price">
          <div>ToplamFiyatı:{totalPrice}</div>
        </div>
        <div><button><Link to="/buy">Satın al </Link> </button></div>
      </ul>
    </div>
  );
}
