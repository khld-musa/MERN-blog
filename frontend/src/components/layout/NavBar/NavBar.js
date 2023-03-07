import { Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userActions";

import "./Nav.css";

function NavBar(props) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);


  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out successfully.");
  };
  return (
    <nav class="limiter-menu-desktop container">
      <a href="/" class="logo">
        <img src="images/icons/logo.png" alt="IMG-LOGO" />
      </a>

      {user ? (
        <div class="wrap-icon-header flex-w flex-r-m">

          <div class="menu-desktop">
            <ul class="main-menu">
              <li>
                <a
                  href="#"
                  class="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 "
                >
                  <figure className="avatar avatar-nav nav__link">
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </figure>
                </a>
                <ul class="sub-menu">
                  <li>
                    <a href="/me"> {user && user.name}</a>
                  </li>

                  <li>
                    {" "}
                    <Link
                      className="nav__link text-danger"
                      to="/"
                      onClick={logoutHandler}
                    >
                      <i class="fa fa-sign-out" aria-hidden="true"></i>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        !loading && (
          <li>
            <Link to="/login" className="btn ml-4" id="login_btn">
              Login
            </Link>
          </li>
        )
      )}
    </nav>
  );
}

export default NavBar;