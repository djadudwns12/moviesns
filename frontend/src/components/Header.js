import HeaderNavBar from "./HeaderNavBar.js";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Header = () => {
  const [user, setUser] = useState(null); // user 상태: null이면 로그아웃 상태, 객체면 로그인 상태

  // 로그인 모달창
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setFormData({ userId: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!formData.userId || !formData.password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8200/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("로그인 실패. 아이디와 비밀번호를 확인해주세요.");
      }
      const data = await response.json();
      //setUser(data.user); // 서버에서 반환된 사용자 정보를 저장
      setUser({ name: "user123" });
      console.log(user);
      closeLoginModal(); // 로그인 성공 시 모달 닫기
    } catch (error) {
      setError(error.message); // 에러 메시지 표시
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  // user 상태 변경 감지
  useEffect(() => {
    console.log("현재 사용자 상태:", user);
  }, [user]);

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
                <Link to="/mypage1">보류페이지</Link>
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
          {user ? (
            <button className="logout-btn" onClick={() => setUser(null)}>
              로그아웃
            </button>
          ) : (
            <button className="login-btn" onClick={openLoginModal}>
              로그인
            </button>
          )}
        </div>
      </Nav>

      {isLoginModalOpen && (
        <LoginModal>
          <div className="modal-content">
            <h2>로그인</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="userId"
                placeholder="아이디"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit">로그인</button>
            </form>
            <button className="close-btn" onClick={closeLoginModal}>
              닫기
            </button>
          </div>
        </LoginModal>
      )}
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

const Logo = styled.div`
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

const LoginModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 300px;

    h2 {
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;

      input {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }

      button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #2c3e50;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: #34495e;
        }
      }
    }

    .close-btn {
      margin-top: 20px;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: red;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: darkred;
      }
    }
  }
`;
const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

export default Header;
