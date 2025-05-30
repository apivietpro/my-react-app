import { useState } from "react";
import { registerCustomer } from "../../services/Api";
const Register = () => {
  const [inputsForm, setInputsForm] = useState({});
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState(false);
  const changeInputs = (e) => {
    const { name, value } = e.target;
    return setInputsForm({ ...inputsForm, [name]: value });
  };
  const clickRegister = (e) => {
    e.preventDefault();
    registerCustomer(inputsForm)
      .then(({ data }) => {
        setAlert("Đăng ký tài khoản thành công");
        setStatus(true);
        setInputsForm({});
      })
      .catch((error) => {
        if (error.response.data === "email exists")
          return setAlert("Email đã tồn tại!");
        if (error.response.data === "phone exists")
          return setAlert("Số điện thoại đã tồn tại!");
        return console.log(error);
      });
  };
  return (
    <>
      {/*	Register Form	*/}
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
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                value={inputsForm.fullName || ""}
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
                value={inputsForm.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputsForm.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                value={inputsForm.phone || ""}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputs}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                value={inputsForm.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={clickRegister} href="#">
              <b>Đăng ký ngay</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
};
export default Register;
