import React from "react";
import "./style.css";

const AtSignUp = (props:any) => {

	// 共用參數
	interface State {
		reLoginCallBack:Function ;
		containerClass:string;
	}
	const [states, setValues] = React.useState<State>({
		reLoginCallBack : function(){props.reLoginCallBack},
		containerClass : props.className,
	  });

	//--------------------------------------------



  return (
    <div className={"container " + states.containerClass}>
      <div className="card bg-light">
        <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
          {/* <p>
		<a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i>   Login via Twitter</a>
		<a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>   Login via facebook</a>
	</p> */}
          <p className="divider-text">
            <span className="bg-light">新建一個帳號</span>
          </p>
          <form>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="全名"
                type="text"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
                </span>
              </div>
              <input
                name=""
                className="form-control"
                placeholder="Email信箱"
                type="email"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-phone"></i>{" "}
                </span>
              </div>
              <select className="custom-select" style={{ maxWidth: "120px" }}>
                <option selected>09</option>
                <option value="1">02</option>
                <option value="2">06</option>
                <option value="3">04</option>
              </select>
              <input
                name=""
                className="form-control"
                placeholder="連絡電話"
                type="text"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-building"></i>{" "}
                </span>
              </div>
              <select className="form-control">
                <option selected>--選擇欄位--</option>
                <option>男的</option>
                <option>女的</option>
                <option>不清楚的</option>
              </select>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="密碼"
                type="password"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="請重複輸入密碼"
                type="password"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                建立帳號
              </button>
            </div>
            <p className="text-center">
              如有帳號了?
              <a href="#!" onClick={states.reLoginCallBack()}>
                　　重新登入
              </a>{" "}
            </p>
          </form>
        </article>
      </div>
    </div>
  );
};

export default AtSignUp;
