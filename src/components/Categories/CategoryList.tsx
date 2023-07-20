import ProductItem from "../../UI/ProductItem";
import { useEffect, Fragment } from 'react'
import useCurrentLocation from "../../hooks/currentLocation";
import { getAllCategoriesQuery, getProductsOfCategoryQuery } from "../../hooks/query"
import { useState } from 'react'
import UseItems from "../../hooks/useItems";
import LoadingSpinner from "../../UI/LoadingSpinner";
const CategoryList = () =>  {
    const { setPathName, 
        setCategoryValue, 
        categoryValue, 
        products,
        productsOfCategoryIsLoading,
        productsOfCategoryIsSuccess
    } = UseItems();
    const {  data, isLoading, isSuccess } = getAllCategoriesQuery();
    useEffect(() => {
        setPathName('categories')
    }, [])
    useEffect(() => {
        if (data) {
            setCategoryValue(data[0])
        }
    }, [data])
    let content = null;
    let secondContent = null;
    if (isLoading ) {
        content = (
            <div className="flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    } else if ( isSuccess ) {
        if (productsOfCategoryIsLoading ) {
            secondContent = (
                <div className="flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )
        } else if (productsOfCategoryIsSuccess) {
            secondContent = (
                <div className="gridResponsive">
                    {
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
                    }
                </div>
            )
        }
        content = (
            <div className="space-y-5">
                <div className="gridResponsiveCategories">
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
                       secondContent
                    }
                </div>
            </div>
        )
    }
    // const { data: categoryData} = getProductsOfCategoryQuery(categoryValue)
    return (
        <div className="w-[60%] m-auto overflow-hidden py-5 ">
            {content}
        </div>
    )
}

export default CategoryList