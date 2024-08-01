import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const AppContext = createContext();

const Provider = ({ children }) => {
  const [productItems, setProductItems] = useState([]);
  const [selectProductItems, setSelectProductItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [likeItems, setLikeItems] = useState([]);

  const data = {
    productItems,
    setProductItems,
    selectProductItems,
    setSelectProductItems,
    totalPrice,
    setTotalPrice,
    likeItems,
    setLikeItems,
  };
  
  
 

  const { data: productData } = useFetch("https://dummyjson.com/products");

  useEffect(() => {
    if (productData && productData.products) {
      productData.products.forEach((element) => {
      });
      setProductItems(productData.products);
    }
  }, [productData]);


  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useSite = () => useContext(AppContext);
export default Provider;
