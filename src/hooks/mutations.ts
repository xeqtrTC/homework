import { useMutation } from "react-query"
import { addProductAPI, deleteProductAPI, editProductDetailsAPI } from "./api"
import { editProductDetails } from "./interfaces"
import UseItems from "./useItems"
import { Dispatch, SetStateAction } from "react"
import { toast } from 'react-toastify'

export const editProductDetailsMutation = ({ data, id}: { data: editProductDetails, id: number}) => {
    const { updateProduct } = UseItems();
    return useMutation(() => editProductDetailsAPI({ id, data}), {
        onSuccess: (data) => {
            updateProduct(data)
            toast.success('Uspesno si editovao produkt!')
        },
        onError: () => {
        toast.error('Error! Nisi promenio produkt!')
        }
    })
}
export const addProductMutation = ( setAddInputs: Dispatch<SetStateAction<editProductDetails>>)=> {
    const {addProduct} = UseItems();
    return useMutation(addProductAPI, {
        onSuccess: (data) => {
            addProduct(data);
            toast.success('Uspesno si dodao produkt!')
            setAddInputs({
                title: '',
                price: null,
                description: ''
            })
        },
        onError: () => {
            toast.error('Error! Nisi dodao produkt!')
        }
    })
}

export const deleteProductMutation = (id: number) => {
    const { deleteProduct } = UseItems();
    return useMutation(() => deleteProductAPI(id), {
        onSuccess: (data) => {
            deleteProduct(id)
            toast.success('Uspesno si izbrisao produkt!');
            },
        onError: () => {
            toast.error('Error! Nisi izbrisao produkt!')
        }
    })
}