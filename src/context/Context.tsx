import { createContext, ReactElement, useEffect, useState, useReducer } from "react";
import { getAllProductsQuery, getProductsOfCategoryQuery } from "../hooks/query";
import { booleansPathNames, singleProductDetails } from "../hooks/interfaces";
import useCurrentLocation from "../hooks/currentLocation";

const initStateReducer: booleansPathNames = {
    productName: false,
    categoryName: false
}

type actions = | { type: 'productName' } | { type: 'categoryName'}

const reducer = (state: typeof initStateReducer, action: actions): typeof initStateReducer => {
    switch(action.type) {
        case 'categoryName':
            return {
                categoryName: true,
                productName: false
            };
        case 'productName':
            return {
                productName: true,
                categoryName: false
            }
        default: return state
    }
}
const HomeworkContext = () => {
    const [error, setError] = useState<string>('');
    const [state, dispatch] = useReducer(reducer, initStateReducer)
    const [products, setProducts] = useState<singleProductDetails[]>([])
    const [pathname, setPathName] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [allProducts, setAllProducts] = useState<boolean>(false);
    const [productsOfCategory, setProductsOfCategory] = useState<boolean>(false);
    const { data, isLoading, isError, error: errorAllProductsQuery, isSuccess } = getAllProductsQuery({ isTrue: state.productName});
    const { data: productsOfCategoryData} = getProductsOfCategoryQuery({categoryValue, productsOfCategory: state.categoryName});
    const switchToProperPathname = (type: 'productName' | 'categoryName' ) => {
        dispatch({ type })
    }
    console.log('sTATE, stae', state, productsOfCategoryData, data)
    useEffect(() => {
        if (pathname === 'categories') {
            switchToProperPathname('categoryName')
        } else if (pathname === 'homepage') {
            switchToProperPathname('productName')
        }
    }, [pathname])
    useEffect(() => {
        if (data) {
            setProducts(data)
        } else if (productsOfCategory) {
            setProducts(productsOfCategoryData!)
        }
    }, [data, productsOfCategoryData])

    const addItems = (data: singleProductDetails[]) => {
        setProducts(data)
    }
    const addProduct = (data: singleProductDetails) => {
        setProducts((prevValue) => [...prevValue, data])
    }
    const updateProduct = (data: singleProductDetails) => {
        const updatedItems = products?.map((item) => 
            item.id === data.id ? data : item
        )
        setProducts(updatedItems);
    }
    const deleteProduct = (id: number) => {
        const remove = products?.filter((item) => item.id !== id);
        setProducts(remove);
    }

    return { categoryValue, setCategoryValue, error, setError, products, isLoading, isError, errorAllProductsQuery, isSuccess, addItems, addProduct, updateProduct, deleteProduct, setPathName};
}

export type UseContextType = ReturnType<typeof HomeworkContext>

export const initState: UseContextType = {
    error: '',
    setError: () => {},
    addItems: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    products: [],
    isError: false,
    isLoading: false,
    errorAllProductsQuery: false,
    isSuccess: false,
    setPathName: () => {},
    setCategoryValue: () => {}, 
    categoryValue: ''
}
const ContextStateAPI = createContext<UseContextType>(initState);
type ChildrenType = { children?: ReactElement | ReactElement[],   
pathname?: string; 
};

export const ContextStateProvider = ({ children }: ChildrenType ): ReactElement  => {
     const contextValue = HomeworkContext();
    return (
        <ContextStateAPI.Provider value={contextValue}>
            {children}
        </ContextStateAPI.Provider>
    )
}

export default ContextStateAPI