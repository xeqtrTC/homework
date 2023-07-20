import LoadingSpinner from "./LoadingSpinner";
import { ImSpinner10 } from 'react-icons/im'

const Button = ({ name, canBeAdded, isLoading, loadMore }: { name: string, canBeAdded?: boolean, isLoading?:boolean, loadMore?: () => void }) => {
    return (
        <div className="py-2 flex justify-end">
            <button 
            className="button" 
            onClick={loadMore ? loadMore : undefined} 
            disabled={canBeAdded ? !canBeAdded : false}>
                { isLoading ? <ImSpinner10 className="w-6 animate-spin h-6 text-center text-blue-600" /> : name}
            </button>
        </div>
    )
}

export default Button;