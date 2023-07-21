import { Link, useParams } from "react-router-dom"
import { useState } from 'react'
import { getSingleProductQuery } from "../../hooks/query";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const ViewDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error, isSuccess, isFetched } = getSingleProductQuery(parseInt(id!))
    const [currentPhoto, setCurrentPhoto] = useState<number>(1);
    const nextPhoto = () => {
       const lastSlide = currentPhoto === data?.images.length! - 1;
       const newIndex = lastSlide ? 0 : currentPhoto + 1
       setCurrentPhoto(newIndex);
      };
      const prevPhoto = () => {
        const firstPhoto = currentPhoto === 0;
        const newIndex = firstPhoto ? data?.images.length! - 1 : currentPhoto - 1
        setCurrentPhoto(newIndex)
      };  
    let content = null;
    if (isLoading) {
        content = (
            <div className="h-screen flex justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }
    if (isError) {
        content = <p>That product doesnt exist</p>
    }
    if (isSuccess) {
        const { brand, category, description, price, images, rating, stock, thumbnail, title, message} = data;
        if (message) {
            content = (
                <div className="flex justify-center items-center ">
                    <p className="text-xl text-black font-medium">Produkt pod ovim idom ne postoji</p>
                </div>
            )
        } else (
            content = (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 border h-screen">
                        <div className='flex relative items-center justify-center bg-[#F7F7F7]/60'>
                            <div 
                            className="absolute top-50 left-9 md:left-1 lg:left-9 bg-black rounded-full text-white p-2 hover:scale-110 smoothTransition cursor-pointer"
                            onClick={prevPhoto}
                            >
                                <AiOutlineArrowLeft className="w-7 h-7" />
                            </div>
                            <img src={`${images ? images[currentPhoto] : 'https://cdn-icons-png.flaticon.com/512/4129/4129528.png'}`} className="object-cover flex items-center" />
                            <div 
                            className="absolute top-50 right-4 md:right-1 lg:right-9 bg-black rounded-full text-white p-2 hover:scale-110 smoothTransition cursor-pointer"
                            onClick={nextPhoto}
                            >
                                <AiOutlineArrowRight className="w-7 h-7" />
                            </div>
                        </div>
                        <div className="py-5 space-y-3">
                            <div>
                                <Link to='/' className="bg-black text-white px-5 rounded-md font-medium py-2">Go back</Link>
                            </div>
                            <div className="flex flex-col space-y-">
                                <div className="flex flex-col">
                                    <span className="text-[#7c7c7c] font-medium text-lg">Category:</span>
                                    <span className="text-2xl font-bold">{category}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#7c7c7c] font-medium text-lg">Title:</span>
                                    <span className="text-2xl font-bold">{title}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#7c7c7c] font-medium text-lg">Price:</span>
                                    <span className="text-2xl font-bold">{price}$</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#7c7c7c] font-medium text-lg">Brand:</span>
                                    <span className="text-2xl font-bold">{brand}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#7c7c7c] font-medium text-lg">Description:</span>
                                    <span className="text-2xl font-bold">{description}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[#7c7c7c] font-medium text-lg">Stock:</span>
                                    <span className="text-2xl font-bold">{stock}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )
        }
    return (
        <div className="h-full">
            {content}
        </div>
    )
}

export default ViewDetails