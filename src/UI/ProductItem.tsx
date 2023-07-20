import { FormEvent } from "react";
import { singleProductDetails } from "../hooks/interfaces";
import { deleteProductMutation } from "../hooks/mutations";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai'
import { GrEdit } from 'react-icons/gr'
import UseItems from "../hooks/useItems";

const ProductItem = ({title, price, images, id}: singleProductDetails) => {
    const { mutate } = deleteProductMutation(id!);
    const { deleteProduct } = UseItems();
    const deleteProductFn = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutate();
        if (id! > 100) {
            deleteProduct(id!)
        }
    }
    console.log(images);
    return (
        <div className=" py-1  border border-[#f3f3f3] rounded-md ">
            <div className="flex flex-col space-y-5">
                <div className="flex justify-center">
                    <img src={`${images ? images[0] : 'https://cdn-icons-png.flaticon.com/512/4129/4129528.png'}`}  className="w-20 h-20 rounded-full object-cover"/>
                </div>
                <div className="bg-[#FAFAFC] text-center w-full text-[#4F4F6A] font-medium">
                    <p>{title}</p>
                    <p>{price}$</p>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col space-y-3">
                        <div className="productItemsDivs">
                            <div>
                            <AiFillDelete className="productItemIcons" />
                            </div>
                            <div>
                                <button onClick={deleteProductFn}>Delete</button>
                            </div>
                        </div>
                        <div className="productItemsDivs ">
                        <div className=" ">
                                <AiFillEdit className="productItemIcons" />
                            </div>
                            <div className="">
                            <Link to={`/product/edit/${id}`}>Edit</Link>
                            </div>
                        </div>
                        <div className="productItemsDivs ">
                            <div>
                                <AiFillEye  className="productItemIcons" />
                            </div>
                            <div>
                                <Link to={`/product/${id}`}>View details</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProductItem;