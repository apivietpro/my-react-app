import { useState } from "react";
import { loginCustomer } from "../../services/Api";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux-setup/reducers/auth";
const Login = () => {
  const [inputsLogin, setInputsLogin] = useState({});
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const changeInputs = (e) => {
    const { name, value } = e.target;
    return setInputsLogin({
      ...inputsLogin,
      [name]: value,
    });
  };
  const clickLogin = (e) => {
    e.preventDefault();
    loginCustomer(inputsLogin)
      .then(({ data }) => {
        setAlert("Đăng nhập hệ thống thành công!");
        setStatus(true);
        setInputsLogin({});
        return dispatch(loggedIn(data));
        // return console.log(data);
      })
      .catch((error) => {
        if (error.response.data === "email not valid")
          return setAlert("Email không tồn tại!");
        if (error.response.data === "password not valid")
          return setAlert("Mật khẩu không tồn tại!");
        console.log(error);
      });
  };
  return (
    <>
      {/*	Login Form	*/}
      <div id="customer">
        {alert && (
          <div
            className={`alert ${
              status ? "alert-success" : "alert-danger"
            } text-center`}
          >
            {alert}
          </div>
        )}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputsLogin.email || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                value={inputsLogin.password || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickLogin} href="#">
              <b>Đăng nhập ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
      {/*	End Login Form	*/}
    </>
  );
};
export default Login;
