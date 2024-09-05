import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

function Header() {
  const { isLoggedIn, logout } = useAuth(); // 전역 상태 사용
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 시 로컬 스토리지에서 토큰 제거
    logout();
    // navigate("/");
  };

  return (
    <div className="header-container">
      <h1 className="th">
        <Link to="/">TH</Link>
      </h1>
      <div className="menu">
        <nav>
          <ul className="header-nav">
            <li>
              <button>
                <NavLink exact="true" to="/">
                  홈
                </NavLink>
              </button>
            </li>
            <li>
              <button>
                <NavLink to="/list">내역</NavLink>
              </button>
            </li>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            ) : (
              <li>
                <button>
                  <NavLink to="/login">로그인</NavLink>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
