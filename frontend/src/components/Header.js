import HeaderNavBar from "./HeaderNavBar.js";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Nav>
        <Logo>
          <Link to="/">
            <img
              src="../images/movieCommunity.png"
              alt="Movie Community Logo"
            />
          </Link>
        </Logo>
        {/* <HeaderNavBar /> */}
        <NavMenu>
          <nav>
            <ul>
              <li>
                <Link to="/movielist">영화리스트</Link>
              </li>
              <li>
                <Link to="/meetlist">모임리스트</Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            </ul>
          </nav>
        </NavMenu>
        <Badge>
          <div className="notice">
            <img src="../images/bell.png" alt="Notification bell" width={40} />

            <span className="badge">1</span>
          </div>
        </Badge>
        <div className="login-buttons">
          <button className="login-btn">로그인</button>
          <button className="logout-btn">로그아웃</button>
        </div>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 1px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Badge = styled.span`
  margin-right: 20px;
`;

export default Header;
