import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ProductCart from "./ProductCart";
import Loading from "./Loading";
import HomeProduct from "./HomeProduct";
import { ToastContainer } from "react-toastify";

export function CategoryList() {
    const [products, setProducts] = useState([]);
    const [loading,setLoading]=useState(false);
    
    const { data } = useFetch('https://dummyjson.com/products')

    useEffect(() => {
        setLoading(true)

        if (data) {
            setProducts(data.products)
            setLoading(false)
        }
        else{
            <Loading/>
        }
    }, [data])

    const categories = [...new Set(products.map(product => product.category))];

    return (
        <>
        {loading ? (<Loading/>):(
            <>
        <ul className="categories">
                {categories.map((categoryItem, index) => (
                    <li key={index}>
                        <Link className="categories-link" to={`/categories/${categoryItem}`}>
                            <div className="categories-general">
                                <div className="categories-title">
                                        {categoryItem}
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
                    <h2>
                    Tüm ürünler

                    </h2>
            <ul>
                {products.map((productItem, productItemIndex) => {
                    return (
                       <HomeProduct/>
                    )
                })}
            </ul>
            </>
)}       
        </>
    );
}
