import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import all_product from '../assets/all_product'
import breadCrums_icon from '../assets/breadcrum_arrow.png'

const Breadcrumbs = () => {

    const location = useLocation()

    const paths = location.pathname.split('/').filter((x) => x)


    return (
        <div className='text-sm breadcrumbs text-black px-4 py-2 flex flex-wrap gap-x-2 gap-y-1 items-center'>

            <Link to='/' className="hover:underline uppercase whitespace-nowrap">Home</Link>

            {
                paths.map((path, index) => {
                    const fullPath = `/${paths.slice(0, index + 1).join('/')}`
                    const isLast = index === paths.length - 1


                    const isProductPage = paths[0] === 'product'
                    const product = isProductPage ? all_product.find(p => p.id.toString() === paths[1]) : null


                    const category = product?.category
                    const showCategoryLink = isProductPage && category && index === 0

                    return (
                        <span key={index} className='flex items-center gap-1 whitespace-nowrap'>
                            <img src={breadCrums_icon} className='w-2 h-4 shrink-0' />

                            {

                                showCategoryLink ? (
                                    <>
                                        <Link to={`/${category}`} className='uppercase hover:underline'>{category}</Link>
                                        {
                                            isLast && (
                                                <span className='text-black truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-none'>
                                                    {product.name}
                                                </span>
                                            )
                                        }
                                    </>
                                ) : (
                                    isLast ? (
                                        <span className='text-black truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-none'>
                                            {product ? product.name : path}
                                        </span>
                                    ) : (
                                        <Link to={fullPath} className='uppercase hover:underline'>{path}</Link>
                                    )
                                )
                            }
                        </span>
                    )
                })
            }

        </div>

    )
}

export default Breadcrumbs
