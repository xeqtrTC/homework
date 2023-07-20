export interface allProductsInterface {
    products: singleProductDetails[]
}
export interface singleProductDetails {
    brand?: string,
    category?: string,
    description?: string,
    discountPercentage?: number,
    id?: number,
    images: string[],
    price: number,
    rating?: number,
    stock?: number,
    thumbnail?: string,
    title: string
}

export interface editProductDetails {
    title: string,
    price: number | null,
    description: string
}

export interface booleansPathNames {
    productName: boolean,
    categoryName: boolean
}