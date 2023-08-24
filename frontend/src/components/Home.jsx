import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// import Tooltip from 'rc-tooltip';
// import 'rc-tooltip/assets/bootstrap.css'

import { getProducts } from '../actions/productActions'
import Product from './product/product'
import Loader from './layout/loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'

// const SliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = Slider.Range;


const Home = () => {
    const params = useParams();

    const keyword = params.keyword

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1,1000])



    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, error, products, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price));

    }, [dispatch, error, alert, keyword, currentPage, price])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title='All Products' />
                    <h1 id='products_heading'>Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {
                                products && products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </section>

                    {productsCount > resPerPage && (
                        <div className="d-flex justify-content-center mt-5" >
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />

                        </div>
                    )}


                </Fragment>
            )}

        </Fragment>
    )
}

export default Home