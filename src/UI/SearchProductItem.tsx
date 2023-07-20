import { Link } from "react-router-dom"
import { singleProductDetails } from "../hooks/interfaces"

const SearchProductItem = ({ title, images, price, id, navigateToProduct}: {
    title: string,
    images: string[],
    price: number,
    id: number,
    navigateToProduct: (id: number) => void
}) => {
    return (    
        <div  
        className="flex font-medium items-center space-x-2 hover:bg-black/20 smoothTransition p-2 cursor-pointer "
        onClick={() => navigateToProduct(id)}
        >
            <img src={`${images ? images[0] : ''}`} className="w-10 h-10 object-cover rounded-lg" />
            <div className="w-3/4">
                <span>{title}</span>
            </div>
            <div>
                <span>{price}$</span>
            </div>
        </div>
    )
}

export default SearchProductItem