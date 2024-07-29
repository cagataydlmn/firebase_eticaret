import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useSite } from "../context/AppContext";
import { addComment, getComment, getUsers } from "../firebase";

export default function ProductDetail({ productItem }) {
  const { setSelectProductItems, selectProductItems, setTotalPrice } =
    useSite();
  const { user } = useSelector((state) => state.auth);
  const { productItems } = useSite();
  const { productId } = useParams();
  const [comments, setComments] = useState("");
  const [users, setUsers] = useState([]);

  const [commentList, setCommentList] = useState([]);
  const thisProduct = productItems.find(
    (product) => product.id === Number(productId)
  );
    console.log(users);
  useEffect(() => {
    getComment(setCommentList);
    getUsers().then(setUsers);
  }, []);

  const addProduct = (product) => {
    const findProduct = selectProductItems.find(
      (item) => item.id === product.id
    );
    if (findProduct) {
      setSelectProductItems((prevProducts) =>
        prevProducts.map((product2) =>
          product2.id === findProduct.id
            ? { ...product2, quantity: product2.quantity + 1 }
            : product2
        )
      );
    } else {
      let quantity = 1;
      const productObj = { ...product, quantity };
      setSelectProductItems([...selectProductItems, productObj]);
    }
    setTotalPrice((prevPrice) => (prevPrice += Number(product.price)));
  };

  if (!thisProduct) {
    return null;
  }

  const submitHandle = async (e) => {
    e.preventDefault();
    await addComment({
      comments,
      email: user.email,
      uid: user.uid,
      productId,
    });
  };
  return (
    <>
      <div className="product-detail">
        {thisProduct.images && (
          <div className="product-detail-image">
            <img
              src={thisProduct.images[0]
                .replace("[", "")
                .replace("]", "")
                .replaceAll('"', "")}
                alt="resims"
            />
          </div>
        )}
        <div className="product-detail-right">
          <h1>{thisProduct.title}</h1>
          <p>Price: ${thisProduct.price}</p>
          {thisProduct.description && <p>{thisProduct.description}</p>}
          <button
            className="animated-button"
            onClick={() => {
              addProduct(thisProduct);
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="arr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
            {window.getCookie("is_logged_in") === "false" ||
            window.getCookie("is_logged_in") === undefined ? (
              <Link to="/login">
                <span className="text"> Sepete Ekle !</span>
              </Link>
            ) : (
              <span className="text"> Sepete Ekle !</span>
            )}
            <span className="circle"></span>
            <svg
              viewBox="0 0 24 24"
              className="arr-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
<div className="comments">
        <form className="comments_form" onSubmit={submitHandle}>
          <div className="comments_top">Ürüne Yorum Yapın</div>
          <div className="comments_general">
            <div className="comments_input">
            <input
            onChange={(e) => setComments(e.target.value)}
            placeholder="ürüne yorum yazın"
            value={comments}
          />
            </div>
         
          <div className="comments_button">
            <button>yorum yap</button>

            </div>
          </div>
          
            
        </form>
        <div className="comments_all">
          <div className="comments_all_top">Tüm Yorumlar</div>
          <div className="comments_all_list">
            {commentList.map((comment) =>
              comment.productId === productId ? (
                <div className="comments_all_list_general" key={comment.id}>
                  <div className="comments_all_list_email">
                    <div>{comment.email}</div>
                    {/* <div className="comments_all_list_name">
                      Yorum Yapanın Adı:{users.find((user) => user.uid === comment.uid)?.name}
                    </div> */}
                  </div>
                  <div className="comments_all_list_comments">{comment.comments}</div>
                </div>
              ) : null
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
