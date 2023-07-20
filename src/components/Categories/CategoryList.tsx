import ProductItem from "../../UI/ProductItem";
import { useEffect } from 'react'
import useCurrentLocation from "../../hooks/currentLocation";
import { getAllCategoriesQuery, getProductsOfCategoryQuery } from "../../hooks/query"
import { useState } from 'react'
import UseItems from "../../hooks/useItems";
const CategoryList = () =>  {
    const { setPathName, setCategoryValue, categoryValue, products } = UseItems();
    const location = useCurrentLocation();
    useEffect(() => {
        setPathName('categories')
    }, [])
    console.log('products', products)
    const {  data } = getAllCategoriesQuery();
    // const { data: categoryData} = getProductsOfCategoryQuery(categoryValue)
    return (
        <div className="w-[60%] m-auto overflow-hidden py-5">
            <div className="grid grid-cols-5 gap-3">
                {
                    data?.map((item) => {
                        return (
                            <div 
                            onClick={() => setCategoryValue(item)}
                            className={`border
                            ${categoryValue === item ? 'bg-red-500' : ''}
                            hover:bg-red-500 hover:text-white font-medium smoothTransition cursor-pointer flex items-center justify-center rounded-md  px-5 py-2`}>
                                <span>{item}</span>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {
                    products ? (
                        products?.map((item) => {
                            const { title, price, images, id } = item;
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
                    ) : null
                }
            </div>
            a
        </div>
    )
}

export default CategoryList