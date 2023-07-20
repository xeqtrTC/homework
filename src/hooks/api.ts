import { allProductsInterface, editProductDetails, singleProductDetails } from "./interfaces";

const dummyurl = 'https://dummyjson.com'
export const getAllProducts = async (): Promise<singleProductDetails[]> => {
    const response = await fetch(`${dummyurl}/products`);
    const jsonPr = await response.json()
    return jsonPr.products
}

export const getSingleProduct = async (id: number): Promise<singleProductDetails> => {
    const response = await fetch(`${dummyurl}/products/${id}`);
    const jsonR = await response.json();
    return jsonR;
}

export const editProductDetailsAPI = async ({ data, id}: { data: editProductDetails, id: number}) => {
    const updateProduct = await fetch(`${dummyurl}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: data.price
        })
    })
    const waitForUpdate = await updateProduct.json();
    return waitForUpdate
}

export const addProductAPI = async (data: editProductDetails) => {
    const response = await fetch(`${dummyurl}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: data.price
        })
    })
    const jsonR = await response.json();
    return jsonR
}

export const deleteProductAPI = async (id: number) => {
    const response = await fetch(`${dummyurl}/products/${id}`)
    const jsonR = await response.json()
    return jsonR
}

export const searchProductsAPI = async (searchValue: string): Promise<singleProductDetails[]> => {
    const response = await fetch(`${dummyurl}/products/search?q=${searchValue}`);
    const jsonR = await response.json();
    return jsonR.products
}

export const listAllCategoriesAPI = async (): Promise<string[]> => {
    const response = await fetch(`${dummyurl}/products/categories`)
    return response.json();
}

export const getProductsOfCategoryAPI = async (category: string): Promise<singleProductDetails[]> => {
    const response = await fetch(`${dummyurl}/products/category/${category}`);
    const jsonR = await response.json();
    return jsonR.products
}