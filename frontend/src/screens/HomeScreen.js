import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Card, Pagination } from "react-bootstrap";

// 组件导入
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TopRatedProducts from "../components/TopRatedProducts";
import ServiceBanner from "../components/ServiceBanner";
import NoProductFound from "../components/NoProductFound";
import Meta from "../components/Meta";

// Actions 导入
import { listProducts } from "../actions/productActions";
const HomeScreen = ({ match }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const keyword = match.params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // 筛选函数
  const getFilteredProducts = () => {
    let filtered = [...products];

    // 类别筛选
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory,
      );
    }

    // 价格筛选
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under50":
          filtered = filtered.filter((product) => product.price < 50);
          break;
        case "50to100":
          filtered = filtered.filter(
            (product) => product.price >= 50 && product.price <= 100,
          );
          break;
        case "over100":
          filtered = filtered.filter((product) => product.price > 100);
          break;
        default:
          break;
      }
    }

    // 评分筛选
    if (ratingFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.rating >= Number(ratingFilter),
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <TopRatedProducts />
        </>
      ) : (
        <Link className="btn btn-primary btn-sm mb-3" to="/">
          <i className="fas fa-home mr-1"></i>
          Home
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="mb-5">
            <Row>
              <Col md={12}>
                <h2 className="sub-heading mb-4" style={{marginTop: '27px',
                  marginLeft: '450px'}}>
                  {selectedCategory
                    ? `${selectedCategory} Products`
                    : "New Products"}
                </h2>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm={12} md={4} className="mb-2">
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion and Apparel">
                      Fashion and Apparel
                    </option>
                    <option value="Home and Living">Home and Living</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={12} md={4} className="mb-2">
                <Form.Group>
                  <Form.Label>Price Range</Form.Label>
                  <Form.Control
                    as="select"
                    value={priceRange}
                    onChange={(e) => {
                      setPriceRange(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="all">All Prices</option>
                    <option value="under50">Under $50</option>
                    <option value="50to100">$50 - $100</option>
                    <option value="over100">Over $100</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={12} md={4} className="mb-2">
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={ratingFilter}
                    onChange={(e) => {
                      setRatingFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="all">All Ratings</option>
                    <option value="4">4★ & Above</option>
                    <option value="3">3★ & Above</option>
                    <option value="2">2★ & Above</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* 产品展示 */}
            <Row>
              {filteredProducts.length > 0 ? (
                filteredProducts
                  .slice(
                    (currentPage - 1) * productsPerPage,
                    currentPage * productsPerPage,
                  )
                  .map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))
              ) : (
                <Col md={12}>
                  <NoProductFound />
                </Col>
              )}
            </Row>

            {/* 分页 保持原样 */}
            {filteredProducts.length > productsPerPage && (
              <Pagination className="mt-3">
                {Array.from({
                  length: Math.ceil(filteredProducts.length / productsPerPage),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </div>
        </>
      )}
      <ServiceBanner />
    </>
  );
};

export default HomeScreen;
