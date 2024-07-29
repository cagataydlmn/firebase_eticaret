import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteLike, getLikeItems } from "../firebase";
import { setLikeItems } from "../store/likeItemsReducer";

export default function LikeList() {
  const likeItems = useSelector((state) => state.likeItems.items);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const result = await deleteLike(id);
    return result;
  };
  useEffect(() => {
    getLikeItems((items) => {
      dispatch(setLikeItems(items));
    });
  }, [dispatch]);
  const user = localStorage.getItem("user");

  if (user == null) {
    return (
      <div>
        Sepeti ürün ekleyebilmek için önce giriş Yap
        <NavLink to="/login">Giriş yapmak için tıkla</NavLink>{" "}
      </div>
    );
  }

  likeItems.forEach(function (number) {
    const q=[number.productId] 
    return q
   
  });
  return (
    <div className="like-list">
      <ul>
        {likeItems.map((item, index) => (
          <li
            style={{ border: "1px solid black", listStyle: "none" }}
            key={index}
          >
            <div>{item.productName}</div>
            <div>{item.productId}</div>
            <div>
              <img style={{ width: "20%" }} src={item.productImage} alt={item.productName}/>
            </div>
            <div>{item.productPrice}</div>
            <div>{item.productDescription}</div>
            <button onClick={() => handleDelete(item.id)}>
              favorilerden kaldır
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}