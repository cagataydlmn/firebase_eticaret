import { useEffect, useState } from "react";
import { useSite } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function AutoComplate({}) {
    const { productItems } = useSite();
    const [searchProduct, setSearchProduct] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (search !== "") {
            const filteredProducts = productItems.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase()) // includes belirtilen değerin içinde geçmesini değil, tam olarak eşleşip eşleşmediğini kontrol eder.
            );
            setSearchProduct(filteredProducts);
        } else {
            setSearchProduct([]);
        }
    }, [search, productItems]);
    return (
        <div className="input-general">
            <input className="input" placeholder="Arama yap.." onChange={(e) => setSearch(e.target.value)} />
            <div className="inputs">
                {searchProduct.map((item, itemindex) => (
                    <li key={itemindex}>
                        <div className="products">
                            <div className="products-title">
                                {item.title}
                            </div>
                            <div className="products-image">
                            <Link to={`products/${item.id}`}><img src={item.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} /></Link>

                            </div>
                            <div className="products-description">
                                {item.description}
                            </div>
                            <div className="products-price">
                                {item.price}$
                            </div>

                        </div>
                    </li>
                ))}
            </div>
        </div>
    )
}