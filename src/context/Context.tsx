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
    const [state, dispatch] = useReducer(reducer, initStateReducer)
    const [products, setProducts] = useState<singleProductDetails[]>([])
    const [pathname, setPathName] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const { data: allProductsData, isLoading: allProductsIsLoading, isError, error: errorAllProducts, isSuccess: allProductsIsSuccess } = getAllProductsQuery({ isTrue: state.productName});
    const { data: productsOfCategoryData, isLoading: productsOfCategoryIsLoading, isSuccess: productsOfCategoryIsSuccess } = getProductsOfCategoryQuery({categoryValue, productsOfCategory: state.categoryName});
    const switchToProperPathname = (type: 'productName' | 'categoryName' ) => {
        dispatch({ type })
    }
    console.log('sTATE, stae', state, productsOfCategoryData, allProductsData)
    useEffect(() => {
        if (pathname === 'categories') {
            switchToProperPathname('categoryName')
        } else if (pathname === 'homepage') {
            switchToProperPathname('productName')
        }
    }, [pathname])
    useEffect(() => {
        if (state.productName) {
            setProducts(allProductsData!)
        } else if (state.categoryName) {
            setProducts(productsOfCategoryData!)
        }
    }, [allProductsData, productsOfCategoryData, state.categoryName, state.productName])

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

    return { categoryValue, 
        setCategoryValue, 
        addItems,  
        addProduct, 
        updateProduct,
        deleteProduct, 
        setPathName,
        products, 
        allProductsIsLoading, 
        allProductsIsSuccess, 
        errorAllProducts, 
        productsOfCategoryIsLoading,
        productsOfCategoryIsSuccess
        
    };
}

export type UseContextType = ReturnType<typeof HomeworkContext>

export const initState: UseContextType = {
    addItems: () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    products: [],
    allProductsIsLoading: false,
    errorAllProducts: false,
    allProductsIsSuccess: false,
    productsOfCategoryIsSuccess: false,
    productsOfCategoryIsLoading: false,
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