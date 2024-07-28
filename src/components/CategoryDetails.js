import { Link, useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import Loading from "./Loading";

export function CategoryDetails() {
    const { category } = useParams()
    const [products, setProducts] = useState([])
    const [searchParams] = useSearchParams();
    const [searchQuery] = useState(searchParams.get("brand") || "");
    const [loading, setLoading] = useState(false);
    const [noProducts, setNoProducts] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const filteredProductsByCat = data.products.filter(productItem => productItem.category === category)
                    if (searchQuery === '') {
                        setProducts(filteredProductsByCat)
                    } else {
                        const filteredProductsByBrand = filteredProductsByCat.filter(productItem => productItem.brand === searchQuery)
                        setProducts(filteredProductsByBrand)
                    }
                }
                setLoading(false)
            })
    }, [])
    const brands = [...new Set(products.map(productItem => productItem.brand))]

    function handleFilterBrand(brand) {
        const filteredProductsByBrand = products.filter(productItem => productItem.brand === brand)
        setProducts(filteredProductsByBrand)
    }

    function filteredPrice(minPrice, maxPrice) {
        const filteredProductsByPrice = products.filter(productItem => (productItem.price >= minPrice) && (productItem.price < maxPrice));
        setProducts(filteredProductsByPrice);
        setNoProducts(filteredProductsByPrice.length === 0);
    }
 const productPriceFilterData = [{min:0, max:50},{min:50, max:250},{min:250, max:500},{min:500, max:9999}]
    return (
        <>
            <h1>{category}</h1>
            {loading ? (<Loading />) : (
                <>
                    <div className="brands">
                        {brands.map((brandItem, brandItemIndex) => (
                            <span onClick={() => handleFilterBrand(brandItem)} style={{ marginRight: '20px' }} key={brandItemIndex}>{brandItem}</span>
                        ))}
                    </div>
                    <div className="categori-detail-buttons">
                        {
                            productPriceFilterData.map((item,itemindex)=> (
                                <li key={itemindex}>
                               < button  onClick={() => filteredPrice(item.min,item.max)}>{item.min}-{item.max}</button>

                                </li>
                            ))
                        }
                        {/* <button onClick={() => filteredPrice(0, 50)}>0-50</button>
                        <button onClick={() => filteredPrice(50, 100)}>50-100</button>
                        <button onClick={() => filteredPrice(100, 250)}>100-250</button>
                        <button onClick={() => filteredPrice(250, 500)}>250-500</button>
                        <button onClick={() => filteredPrice(500, 999999999999)}>500-</button> */}
                    </div>
                    {noProducts ? (<><div>Böyle bir ürün yok </div><Link to="/categories">Kategoriler sayfasına geri dön</Link></>) : (<div className="categori-detail">
                        {products.map((productItem, productItemIndex) => {
                            return (
                                <div className="categori-detail-general">
                                    <div className="categori-detail-general-denemee">
                                        <ul>
                                            <li key={productItemIndex}>
                                                <div className="categori-detail-general-top">
                                                    <div className="categori-detail-general-top-title">
                                                        {productItem.title}
                                                    </div>
                                                    <div className="categori-detail-general-top-image">
                                                        <img src={productItem.images[0].replace('[', '').replace(']', '').replaceAll('"', '')} />
                                                    </div>
                                                    <div className="categori-detail-general-top-description">
                                                        {productItem.description}
                                                    </div>
                                                    <div className="categori-detail-general-top-price">
                                                        {productItem.price} TL
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>)}

                </>)}

        </>
    )
}
