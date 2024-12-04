import React, { useEffect } from 'react';
import { Row, Col, Card, Image, Badge, Button, Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const TopRatedProducts = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
      // 修改成一个轮播图
    <>
      <Row>
        <Col >
          <Carousel>
            <Carousel.Item>
              <Card className='box top-big py-4 mb-4' style = {{ width: '100%', height: '100%', margin: 0}}>
                <Badge pill variant='warning' className='text-white' style = {{backgroundColor: '#f77e2d'}}>
                  Hot
                </Badge>
                <Row>
                  <Col xs={7}>
                    <Link to={`/product/${products[0]?._id}`}>
                      <Image
                          src={products[0]?.image}
                          fluid
                          className='my-1'
                          style={{ paddingTop: 2 }}
                      />
                    </Link>
                  </Col>
                  <Col xs={5}>
                    <div className='product-info mb-4 pt-4 pb-3'>
                      <p className='pro-name mt-4 line-clamp-2'>
                        <Link to={`/product/${products[0]?._id}`}>
                          {products[0]?.name}
                        </Link>
                      </p>
                      <div className='pro-rivew my-3'>
                        <Rating
                            value={products[0]?.rating}
                            text={`(${products[0]?.numReviews} Reviews)`}
                        />
                      </div>
                      <p className='pro-price'>Price: ${products[0]?.price}</p>
                    </div>
                    <Link to={`/product/${products[0]?._id}`}>
                      <Button variant='outline-primary'>
                        <i class='fas fa-plus mr-2'></i>
                        Add To Cart
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card>
            </Carousel.Item>
            <Carousel.Item>
              <Card className='box top-big py-4 mb-4' style = {{ width: '100%', height: '100%', margin: 0}}>
                <Badge pill variant='warning' className='text-white' style = {{backgroundColor: '#f77e2d'}}>
                  Hot
                </Badge>
                <Row>
                  <Col xs={7}>
                    <Link to={`/product/${products[0]?._id}`}>
                      <Image
                          src={products[0]?.image}
                          fluid
                          className='my-1'
                          style={{ paddingTop: 2 }}
                      />
                    </Link>
                  </Col>
                  <Col xs={5}>
                    <div className='product-info mb-4 pt-4 pb-3'>
                      <p className='pro-name mt-4 line-clamp-2'>
                        <Link to={`/product/${products[0]?._id}`}>
                          {products[0]?.name}
                        </Link>
                      </p>
                      <div className='pro-rivew my-3'>
                        <Rating
                            value={products[0]?.rating}
                            text={`(${products[0]?.numReviews} Reviews)`}
                        />
                      </div>
                      <p className='pro-price'>Price: ${products[0]?.price}</p>
                    </div>
                    <Link to={`/product/${products[0]?._id}`}>
                      <Button variant='outline-primary'>
                        <i class='fas fa-plus mr-2'></i>
                        Add To Cart
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card>
            </Carousel.Item>
          </Carousel>
          {/*<Card className='box top-big py-4 mb-4'>*/}
          {/*  <Badge pill variant='warning' className='text-white'>*/}
          {/*    Top Rated*/}
          {/*  </Badge>*/}
          {/*  <Row>*/}
          {/*    <Col xs={7}>*/}
          {/*      <Link to={`/product/${products[0]?._id}`}>*/}
          {/*        <Image*/}
          {/*          src={products[0]?.image}*/}
          {/*          fluid*/}
          {/*          className='my-1'*/}
          {/*          style={{ paddingTop: 2 }}*/}
          {/*        />*/}
          {/*      </Link>*/}
          {/*    </Col>*/}
          {/*    <Col xs={5}>*/}
          {/*      <div className='product-info mb-4 pt-4 pb-3'>*/}
          {/*        <p className='pro-name mt-4 line-clamp-2'>*/}
          {/*          <Link to={`/product/${products[0]?._id}`}>*/}
          {/*            {products[0]?.name}*/}
          {/*          </Link>*/}
          {/*        </p>*/}
          {/*        <div className='pro-rivew my-3'>*/}
          {/*          <Rating*/}
          {/*            value={products[0]?.rating}*/}
          {/*            text={`(${products[0]?.numReviews} Reviews)`}*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*        <p className='pro-price'>Price: ${products[0]?.price}</p>*/}
          {/*      </div>*/}
          {/*      <Link to={`/product/${products[0]?._id}`}>*/}
          {/*        <Button variant='outline-primary'>*/}
          {/*          <i class='fas fa-plus mr-2'></i>*/}
          {/*          Add To Cart*/}
          {/*        </Button>*/}
          {/*      </Link>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*</Card>*/}
        </Col>
        {/*<Col lg={5}>*/}
        {/*  <Card className='box mb-4'>*/}
        {/*    <Badge pill variant='warning' className='text-white'>*/}
        {/*      Top Rated*/}
        {/*    </Badge>*/}
        {/*    <Row>*/}
        {/*      <Col xs={5}>*/}
        {/*        <Link to={`/product/${products[1]?._id}`}>*/}
        {/*          <Image src={products[1]?.image} fluid />*/}
        {/*        </Link>*/}
        {/*      </Col>*/}
        {/*      <Col xs={7}>*/}
        {/*        <div className='product-info'>*/}
        {/*          <p className='pro-name mt-2 line-clamp-2'>*/}
        {/*            <Link to={`/product/${products[1]?._id}`}>*/}
        {/*              {products[1]?.name}*/}
        {/*            </Link>*/}
        {/*          </p>*/}
        {/*          <div className='pro-rivew my-2'>*/}
        {/*            <Rating*/}
        {/*              value={products[1]?.rating}*/}
        {/*              text={`(${products[1]?.numReviews} Reviews)`}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <p className='pro-price mb-3'>Price: ${products[1]?.price}</p>*/}
        {/*          <Link to={`/product/${products[1]?._id}`}>*/}
        {/*            <Button variant='outline-primary' size='sm'>*/}
        {/*              <i class='fas fa-plus mr-2'></i>*/}
        {/*              Add To Cart*/}
        {/*            </Button>*/}
        {/*          </Link>*/}
        {/*        </div>*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*  </Card>*/}
        {/*  <Card className='box mb-4'>*/}
        {/*    <Badge pill variant='warning' className='text-white'>*/}
        {/*      Top Rated*/}
        {/*    </Badge>*/}
        {/*    <Row>*/}
        {/*      <Col xs={5}>*/}
        {/*        <Link to={`/product/${products[2]?._id}`}>*/}
        {/*          <Image src={products[2]?.image} fluid />*/}
        {/*        </Link>*/}
        {/*      </Col>*/}
        {/*      <Col xs={7}>*/}
        {/*        <div className='product-info'>*/}
        {/*          <p className='pro-name mt-2 line-clamp-2'>*/}
        {/*            <Link to={`/product/${products[2]?._id}`}>*/}
        {/*              {products[2]?.name}*/}
        {/*            </Link>*/}
        {/*          </p>*/}
        {/*          <div className='pro-rivew my-2'>*/}
        {/*            <Rating*/}
        {/*              value={products[2]?.rating}*/}
        {/*              text={`(${products[2]?.numReviews} Reviews)`}*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*          <p className='pro-price mb-3'>Price: ${products[2]?.price}</p>*/}
        {/*          <Link to={`/product/${products[2]?._id}`}>*/}
        {/*            <Button variant='outline-primary' size='sm'>*/}
        {/*              <i class='fas fa-plus mr-2'></i>*/}
        {/*              Add To Cart*/}
        {/*            </Button>*/}
        {/*          </Link>*/}
        {/*        </div>*/}
        {/*      </Col>*/}
        {/*    </Row>*/}
        {/*  </Card>*/}
        {/*</Col>*/}
      </Row>
    </>
      // <>
      //   <Row>
      //     {/* 左侧大特色商品区 */}
      //     <Col lg={8}>
      //       <Card className="feature-card p-4 mb-4 shadow-sm rounded">
      //         <Badge pill bg="warning" className="text-white mb-3">
      //           Top Rated
      //         </Badge>
      //         <Row>
      //           <Col md={6}>
      //             <Link to={`/product/${products[0]?._id}`}>
      //               <Image
      //                   src={products[0]?.image}
      //                   fluid
      //                   className="rounded feature-image"
      //               />
      //             </Link>
      //           </Col>
      //           <Col md={6} className="d-flex flex-column justify-content-center">
      //             <h5 className="pro-name mb-3">
      //               <Link to={`/product/${products[0]?._id}`} className="text-dark">
      //                 {products[0]?.name}
      //               </Link>
      //             </h5>
      //             <div className="pro-review mb-2">
      //               <Rating
      //                   value={products[0]?.rating}
      //                   text={`(${products[0]?.numReviews} Reviews)`}
      //               />
      //             </div>
      //             <h6 className="pro-price mb-4 text-success">
      //               Price: ${products[0]?.price}
      //             </h6>
      //             <Link to={`/product/${products[0]?._id}`}>
      //               <Button variant="primary" className="btn-custom">
      //                 <i className="fas fa-plus-circle me-2"></i>
      //                 Add To Cart
      //               </Button>
      //             </Link>
      //           </Col>
      //         </Row>
      //       </Card>
      //     </Col>
      //
      //     {/* 右侧特色商品列表 */}
      //     <Col lg={4}>
      //       {products.slice(1, 3).map((product) => (
      //           <Card
      //               key={product?._id}
      //               className="feature-list-card mb-4 p-3 shadow-sm rounded"
      //           >
      //             <Row>
      //               <Col xs={5}>
      //                 <Link to={`/product/${product?._id}`}>
      //                   <Image
      //                       src={product?.image}
      //                       fluid
      //                       className="rounded small-feature-image"
      //                   />
      //                 </Link>
      //               </Col>
      //               <Col xs={7}>
      //                 <h6 className="pro-name mb-2">
      //                   <Link to={`/product/${product?._id}`} className="text-dark">
      //                     {product?.name}
      //                   </Link>
      //                 </h6>
      //                 <div className="pro-review mb-2">
      //                   <Rating
      //                       value={product?.rating}
      //                       text={`(${product?.numReviews} Reviews)`}
      //                   />
      //                 </div>
      //                 <p className="pro-price mb-2 text-success">
      //                   Price: ${product?.price}
      //                 </p>
      //                 <Link to={`/product/${product?._id}`}>
      //                   <Button variant="outline-primary" size="sm" className="btn-sm">
      //                     <i className="fas fa-plus-circle me-1"></i>
      //                     Add To Cart
      //                   </Button>
      //                 </Link>
      //               </Col>
      //             </Row>
      //           </Card>
      //       ))}
      //     </Col>
      //   </Row>
      // </>
  );
};

export default TopRatedProducts;
