import { FormEvent, useState } from "react"
import EditInputs from "../../UI/EditInputs"
import { editProductDetails } from "../../hooks/interfaces"
import { addProductMutation } from "../../hooks/mutations"
import Button from "../../UI/Button"

const AddProduct = () => {
    const [addInputs, setAddInputs] = useState<editProductDetails>({
        title: '',
        price: null,
        description: ''
    })
    const changeValueOfInputs = (e: FormEvent<HTMLInputElement>) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setAddInputs((prevValue) => ({...prevValue, [name]: value}))
    }
    const canBeAdded = [addInputs.description, addInputs.price, addInputs.title].every(Boolean);
    const { mutate, isLoading} = addProductMutation( setAddInputs );
    const addProductFn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(addInputs)
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={addProductFn} className="w-2/4">
                <div className="flex flex-col">
                    <EditInputs
                    name="title"
                    nameOfLabel="Title"
                    value={addInputs.title}
                    type="text"
                    onChangeFn={changeValueOfInputs}
                    placeholder="Title of product"
                    />
                    <EditInputs
                    name="description"
                    nameOfLabel="Description"
                    value={addInputs.description}
                    type="text"
                    onChangeFn={changeValueOfInputs}
                    placeholder="Description of product"
                    />
                    <EditInputs
                    name="price"
                    nameOfLabel="Price"
                    value={addInputs.price!}
                    type="number"
                    onChangeFn={changeValueOfInputs}
                    placeholder="Price of product"
                    />
                </div>
                <Button 
                name='Add Product'
                canBeAdded={canBeAdded}
                isLoading={isLoading}
                />
            </form>
        </div>
    )
}

export default AddProduct