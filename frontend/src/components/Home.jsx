import React, { Fragment, useState, useEffect } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/product'
import Loader from './layout/loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, error, products, productsCount, resPerPage } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(currentPage));

    }, [dispatch, error, alert, currentPage])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title='All Products' />
                    <h1 id='products_heading'>Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}




                        </div>
                    </section>

                    {resPerPage < productsCount && (
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