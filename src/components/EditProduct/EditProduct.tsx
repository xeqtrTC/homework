import { useNavigate, useParams } from "react-router-dom"
import { getSingleProductQuery } from "../../hooks/query";
import { FormEvent, useEffect, useState } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import EditInputs from "../../UI/EditInputs";
import { editProductDetails } from "../../hooks/interfaces";
import { editProductDetailsMutation } from "../../hooks/mutations";
import Button from "../../UI/Button";
import { toast } from "react-toastify";
import useCurrentLocation from "../../hooks/currentLocation";

const EditProduct = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState<editProductDetails>({
        title: '',
        price: null,
        description: ''
    })
    let content = null;
    const pathname = useCurrentLocation();
    const { data, isLoading, isSuccess } = getSingleProductQuery(parseInt(id!));
    const navigate = useNavigate();
    const { mutate } = editProductDetailsMutation({ data: productDetails, id: parseInt(id!)});
    useEffect(() => {
        if (data) {
            setProductDetails({
                title: data.title,
                price: data.price,
                description: data.description!
            })
        }
    }, [data])
    const changeValueOfInputs = (e: FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setProductDetails((prevValue) => ({...prevValue, [name]: value}))
    }
    const editProductFn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            mutate();
            navigate('/')
        } catch (error) {
            toast.error('Error!')
        }
    }
    if (isLoading) {
        content = <LoadingSpinner />
    } else if (isSuccess) {
        content = (
            <div className="w-2/4">
                <form onSubmit={editProductFn}>

                <div className="text-center py-2">
                    <span className="font-bold text-xl ">Edit product, ID of product {id}</span>
                </div>
                <EditInputs 
                onChangeFn={changeValueOfInputs}
                name='title'
                nameOfLabel='Title'
                type="text"
                value={productDetails.title}
                />
                 <EditInputs 
                onChangeFn={changeValueOfInputs}
                name='description'
                nameOfLabel='Description'
                type="text"
                value={productDetails.description}
                />
                <EditInputs 
                onChangeFn={changeValueOfInputs}
                name='price'
                nameOfLabel='Price'
                type="number"
                value={productDetails.price!}
                />
                <Button
                name='Edit product'
                />
                </form>
            </div>
        )
    }
    return (
        <div className="flex items-center justify-center h-screen">
            {content}
        </div>
    )
}

export default EditProduct