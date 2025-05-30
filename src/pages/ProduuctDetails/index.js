import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux-setup/reducers/cart";
import {
  getProduct,
  getCommentsProduct,
  createCommentProduct,
} from "../../services/Api";
import { useParams } from "react-router-dom";
import { getImageProduct } from "../../shared/ultils";
import moment from "moment";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [inputsForm, setInputsForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const changeInputs = (e) => {
    const { name, value } = e.target;
    return setInputsForm({ ...inputsForm, [name]: value });
  };

  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
      })
    );
    if (type === "buy-now") return navigate("/Cart");
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    // Create comment
    createCommentProduct(id, inputsForm)
      .then(({ data }) => {
        if (data.status === "success") {
          getComments(id);
          return setInputsForm({});
        }
      })
      .catch((error) => console.log(error));
  };

  const getComments = (id) => {
    getCommentsProduct(id)
      .then(({ data }) => setComments(data.data.docs))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // Get product
    getProduct(id)
      .then(({ data }) => setProduct(data.data))
      .catch((error) => console.log(error));

    // Get comments
    getComments(id);
  }, []);
  return (
    <>
      {/*	List Product	*/}
      <div id="product">
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img src={getImageProduct(product.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{product.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {product.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{product.price}đ</li>
              <li className={product.is_stock ? "" : "text-danger"} id="status">
                {product.is_stock ? "Còn hàng" : "Hết hàng"}
              </li>
            </ul>
            {product.is_stock && (
              <div id="add-cart">
                <button
                  onClick={() => clickAddToCart("buy-now")}
                  className="btn btn-warning mr-2"
                >
                  Mua ngay
                </button>

                <button onClick={clickAddToCart} className="btn btn-info">
                  Thêm vào giỏ hàng
                </button>
              </div>
            )}
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {product.name}</h3>
            {product.details}
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  onChange={changeInputs}
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  value={inputsForm.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  onChange={changeInputs}
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  value={inputsForm.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  onChange={changeInputs}
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  value={inputsForm.content || ""}
                />
              </div>
              <button
                onClick={clickSubmit}
                type="submit"
                name="sbm"
                className="btn btn-primary"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {comments.map((item, index) => (
              <div key={index} className="comment-item">
                <ul>
                  <li>
                    <b>{item.name}</b>
                  </li>
                  <li>
                    {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </li>
                  <li>
                    <p>{item.content}</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/*	End Comments List	*/}
      </div>
      {/*	End Product	*/}
      <div id="pagination">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Trang trước
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Trang sau
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default ProductDetails;
