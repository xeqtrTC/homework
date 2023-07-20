import { useQuery } from "react-query";
import { searchProductsAPI, getAllProducts, getSingleProduct, listAllCategoriesAPI, getProductsOfCategoryAPI } from "./api";

export const getAllProductsQuery = ({ isTrue}: { isTrue: boolean}) => {
    return useQuery({
        queryKey: ['allProducts'],
        queryFn: getAllProducts,
        enabled: isTrue
    })
}

export const getSingleProductQuery = (id: number) => {
    return useQuery({
        queryKey: ['singleProduct', id],
        queryFn: () => getSingleProduct(id),
        retry: false
    })
}

export const searchProductsQuery = ({ searchValue, inputOpen}: {
    searchValue: string, inputOpen: boolean 
    }) => {
    return useQuery({
        queryKey: ['allCategories', searchValue],
        queryFn: () => searchProductsAPI(searchValue),
        enabled: inputOpen
    })
}

export const getAllCategoriesQuery = () => {
    return useQuery({
        queryKey: ['allCategories'],
        queryFn: listAllCategoriesAPI
    })
}

export const getProductsOfCategoryQuery = ({ categoryValue, productsOfCategory} : { categoryValue: string, productsOfCategory: boolean}) => {
    return useQuery({
        queryKey: ['productsOfCategory', categoryValue],
        queryFn: () => getProductsOfCategoryAPI(categoryValue),
        enabled: productsOfCategory
    })
}