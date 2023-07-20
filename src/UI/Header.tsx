import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { searchProductsQuery } from '../hooks/query';
import SearchProductItem from './SearchProductItem';
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const [inputOpen, setInputOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const { data, isLoading } = searchProductsQuery({ searchValue, inputOpen })
    const navigate = useNavigate();
    const closeOrOpenInput = () => {
        setInputOpen((prev) => !prev)
    }
    const navigateToProduct = (id: number) => {
        navigate(`/product/${id}`)
        setSearchValue('');
    }
    let content = null;
    if (isLoading) {
        content = (
            <div className='flex justify-center items-center'>
                <LoadingSpinner />
            </div>
        )
    } else  if (data?.length === 0) {
        content = <p>Nema produkta pod tim imenom</p>
    } else if (data) {
        content = (
            data?.map((item) => {
                const { title, images, price, id } = item;
                return (
                    <SearchProductItem id={id!} navigateToProduct={navigateToProduct} title={title} images={images} price={price} key={id} />
                )
            })
        )
    }
    
    return (
        <div className="bg-black/80 ">
            <div className="w-3/4 m-auto h-20 relative">
                <div className='flex items-center space-x-5 h-full'>
                    <div>
                        <AiOutlineSearch 
                        onClick={closeOrOpenInput}
                        className='w-6 h-6 text-white hover:scale-110 smoothTransition cursor-pointer' />
                    </div>
                    {
                        inputOpen ? (
                            <input 
                            className='outline-none py-2 px-10 rounded-md text-[#0E111E] placeholder:font-medium placeholder:text-[#0E111E] placeholder:text-sm"'
                            type='text' 
                            placeholder='Search product'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.currentTarget.value)}
                            />
                        ) : null
                    }
                </div>
                {
                    searchValue.length > 2 ? (
                        <div className={` ${isLoading || data?.length === 0 ? 'p-10' : 'p-2'} z-50 absolute bg-white md:w-2/5 border mt-1 rounded-md space-y-2`}>
                            {content}
                         </div>
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default Header