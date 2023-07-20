import { useState, useRef, useEffect } from "react";
import { getAllProductsQuery } from "../../hooks/query"
import UseItems from "../../hooks/useItems"
import LoadingSpinner from "../../UI/LoadingSpinner";
import ProductItem from "../../UI/ProductItem";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";

const initialCount = 9;
const Homepage = () => {
    const { products, allProductsIsLoading, allProductsIsSuccess, setPathName } = UseItems();
    useEffect(() => {
        setPathName('homepage')
    }, [])
    const [displayCount, setDisplayCount] = useState(initialCount);
    const divRef = useRef<HTMLDivElement>(null);

    let content = null;
    if (allProductsIsLoading) {
        content = (
            <div className="h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    } else if (allProductsIsSuccess && products?.length === 0) {
        content = (
            <p>Nema produkata</p>
        )
    } else if (allProductsIsSuccess && products?.length! > 0) {
        const totalProducts = products?.length
        const loadMore = () => {
            const newDisplayCount = Math.min(displayCount + initialCount, totalProducts!);
            setDisplayCount(newDisplayCount);
        };

        const displayedProducts = products?.slice(0, displayCount);
        content = (
            <div>
                <div className="gridResponsive" >
                    {
                        displayedProducts?.map((item) => {
                            const { title, price, id, images} = item;
                            return (
                                <ProductItem 
                                title={title}
                                price={price}
                                images={images}
                                id={id}
                                key={id}                      
                                />
                            )
                        })
                    }
                </div>
                <div>
                    {
                        displayCount < totalProducts! && (
                            <Button 
                            loadMore={loadMore}
                            name="Load more"
                            />
                        )
                    }
                </div>
            </div>
        )
    }
   
    return (
        <div className="w-[70%] m-auto">
            <div className="py-5">
                <Link to='/product/add' className="button">Add product</Link>
            </div>
            <div ref={divRef} className="overflow-y-auto h-full">
            {
                content
            }
            </div>

        </div>
    )
}

export default Homepage