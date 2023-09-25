import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'


import { getProducts } from '../actions/productActions'
import Product from './product/product'
import Loader from './layout/Loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'




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

    const { loading, error, products, productsCount, resPerPage } = useSelector(state => state.products)
    const {isAuthenticated, user} = useSelector(state => state.auth);

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
                    <MetaData title={'Buy Best Products Online' } />
                    <h1 id='products_heading'>Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                        {keyword ? (
                                <Fragment>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products && products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))
                                )}
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