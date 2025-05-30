import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loggedOut } from "../../../redux-setup/reducers/auth";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeKeyword = (e) => setKeyword(e.target.value);
  const login = useSelector(({ Auth }) => Auth.login);
  const logged = login.logged;
  const id = login.currentCustomer?.customer._id;
  const totalCart = useSelector(({ Cart }) =>
    Cart.items.reduce((total, item) => total + item.qty, 0)
  );
  const clickSearch = (e) => {
    e.preventDefault();
    return navigate(`/Search?keyword=${keyword}`);
  };
  const clickLogout = (e) => {
    e.preventDefault();
    dispatch(loggedOut());
    return navigate("/Login");
  };
  return (
    <>
      {/*	Header	*/}
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/">
                  <img className="img-fluid" src="images/logo.png" />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  onChange={changeKeyword}
                  className="form-control mt-3"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                <button
                  onClick={clickSearch}
                  className="btn btn-danger mt-3"
                  type="submit"
                >
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              <i className="fa-solid fa-user mr-1" />
              {logged ? (
                <>
                  <Link className="mr-2" to={`/UpdateCustomer-${id}`}>
                    {login.currentCustomer.customer?.fullName}
                  </Link>
                  |
                  <a onClick={clickLogout} className="mr-2 ml-2" href="#">
                    đăng xuất
                  </a>
                </>
              ) : (
                <>
                  <Link className="mr-2" to="/Login">
                    đăng nhập
                  </Link>
                  |
                  <Link className="mr-2 ml-2" to="/Register">
                    đăng ký
                  </Link>
                </>
              )}
              |
              <a className="mt-4 mr-2 ml-2" href="#">
                giỏ hàng
                <ul>
                  <li>
                    <Link to="/Cart">
                      <i className="fas fa-shopping-cart" /> Giỏ hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link to="/Orders">
                      <i className="fas fa-file-alt" /> Đơn hàng đã mua
                    </Link>
                  </li>
                </ul>
              </a>
              <span className="mt-3">{totalCart}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      {/*	End Header	*/}
    </>
  );
};

export default Header;
