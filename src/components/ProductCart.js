// import { useSite } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBasket, addLike } from "../firebase";
import { useSelector } from "react-redux";

export default function ProductCart({
  productItem,
  productItemIndex,
  findProduct = undefined,
}) {
  // const {
  //   likeItems,
  //   setLikeItems,
  // } = useSite();
  const [sizeOpen, setSizeOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const showToastMessage = () => {
    toast.success("Ürün Sepete Eklendi!");
  };

  const handleSizeOpen = () => {
    setSizeOpen(!sizeOpen);
  };

  const addProduct = async (e) => {
    if (user && user.uid) {
      await addBasket(
        {
          productId: productItem.id,
          productName: productItem.title,
          productImage: productItem.images,
          productDescription: productItem.description,
          productPrice: productItem.price,
          productQuantity:productItem.quantity
        },
        user.uid
      );
    } else {
      console.log("User UID is undefined. Cannot add like item.");
    }
  };


  // const likeUnLike = (product) => {
  //   const isLiked = likeItems.find((item) => item.id === product.id);
  //   if (isLiked) {
  //     setLikeItems((prevItems) =>
  //       prevItems.filter((item) => item.id !== product.id)
  //     );
  //   } else {
  //     setLikeItems([...likeItems, product]);
  //   }
  // };

  const likeadd = async (e) => {
    e.preventDefault();
    if (user && user.uid) {
      await addLike(
        {
          productId: productItem.id,
          productName: productItem.title,
          productImage: productItem.images,
          productDescription: productItem.description,
          productPrice: productItem.price,
        },
        user.uid
      );
    } else {
      console.log("User UID is undefined. Cannot add like item.");
    }
  };

  return (
    <li className="products_li" key={productItemIndex}>
      <div className="products">
        <div className="products-title">{productItem.title}</div>
        <div className="products-images">
          <div className="products-image">
            <Link to={`products/${productItem.id}`}>
              <img
                src={productItem.images[0]
                  .replace("[", "")
                  .replace("]", "")
                  .replaceAll('"', "")}
                  alt={productItem.title}
              />
            </Link>
            {sizeOpen && (
              <div className="popup-active">
                <button
                  onClick={() => { addProduct(); showToastMessage() }
                  }
                >
                  sepete ekle
                </button>
              </div>
            )}
          </div>
          <div className="products-buttons">
            {!localStorage.getItem("user") ? (
              <div className="products-add-basket-button">
                <Link to="/login" className="basket-shopping">
                  <FontAwesomeIcon icon={faBasketShopping} />
                </Link>
              </div>
            ) : (
              <button
                className="basket-shopping"
                onClick={() => handleSizeOpen(true)}
              >
                <FontAwesomeIcon icon={faBasketShopping} />
              </button>
            )}

            {!localStorage.getItem("user") ? (
              <div className="products-add-like-button">
                <Link to="/login">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </div>
            ) : (
              <div className="products-add-like-button">
                <button
                  className={findProduct ? "active" : ""}
                  onClick={likeadd}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="products-description">{productItem.description}</div>
        <div className="products-price">{productItem.price}TL</div>
      </div>
    </li>
  );
}
