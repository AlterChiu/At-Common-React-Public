import React from "react";
import "./style.css";
import Modal from "@mui/material/Modal";

import AtSignUp from "../SignUp/AtSignUp";

const AtLogin = () => {
  // 共用參數
  //-----------------------------------------------------
  interface State {
    account: string;
    password: string;
    showPassword: boolean;

    showSignUp: boolean; // 是否顯示註冊modal
    showForget: boolean; //是否顯示忘記密碼 modal
  }
  const [values, setValues] = React.useState<State>({
    account: "",
    password: "",
    showPassword: false,

    showSignUp: false,
    showForget: false,
  });

  // 動作
  // ------------------------------------------------------
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSignUp = () => {
    setValues({
      ...values,
      showSignUp: !values.showSignUp,
    });
  };

  const handelForget = () => {
    setValues({
      ...values,
      showForget: !values.showForget,
    });
  };

  return (
    <section className="at-login-container">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src={
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              }
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <div className="input-container">
                  <i className="fa fa-user icon"></i>
                  <input
                    type="email"
                    id="at-login-account"
                    className="form-control form-control-lg at-login-input-text"
                    placeholder="登入帳號"
                  />
                </div>
                {/* <label className="form-label" htmlFor="at-login-account">
                  登入帳號
                </label> */}
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <div className="input-container">
                  <i className="fa fa-lock icon"></i>
                  <input
                    type={values.showPassword ? "text" : "password"}
                    id="at-login-password"
                    className="form-control form-control-lg at-login-input-text"
                    placeholder="登入密碼"
                  />
                  <i
                    className="fa fa-eye icon 
                  form-control form-control-lg at-login-input-text 
                  at-login-icon-visible"
                    aria-hidden="true"
                    hidden={!values.showPassword}
                    onClick={handleClickShowPassword}
                  ></i>
                  <i
                    className="fa fa-eye-slash icon 
                  form-control form-control-lg at-login-input-text 
                  at-login-icon-visible"
                    aria-hidden="true"
                    hidden={values.showPassword}
                    onClick={handleClickShowPassword}
                  ></i>
                </div>
                {/* <label className="form-label" htmlFor="at-login-account">
                  登入密碼
                </label> */}
              </div>

              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* <!-- Checkbox --> */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="true"
                    id="at-login-remember"
                    checked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="at-login-remember"
                  >
                    {" "}
                    記住我{" "}
                  </label>
                </div>
                <a href="#!">忘記密碼?</a>
                <a href="#!" onClick={handleSignUp}>註冊帳號</a>
              </div>

              {/* <!-- Submit button --> */}
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                登入
              </button>

              {
                // 第三方登入
                /* <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>

              <a
                className="btn btn-primary btn-lg btn-block"
                href="#!"
                role="button"
              >
                <style>{"background-color: #3b5998"}</style>
                <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
              </a>
              <a
                className="btn btn-primary btn-lg btn-block"
                href="#!"
                role="button"
              >
                <style>{"background-color: #55acee"}</style>
                <i className="fab fa-twitter me-2"></i>Continue with Twitter
              </a> */
              }
            </form>
          </div>
        </div>
      </div>
      
      {/* {註冊帳號密碼} */}
      <Modal
        open={values.showSignUp}
        onClose={handleSignUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AtSignUp />
      </Modal>
    </section>
  );
};

export default AtLogin;