import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// TMDB API 키 (자신의 키로 대체하세요)
const API_KEY = "be729279e957729564c182759c414c67";

// API URL 구성
const BASE_URL = "https://api.themoviedb.org/3";
const ENDPOINT = "/movie/now_playing";
const LANGUAGE = "ko-KR";
const URL = `${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&language=${LANGUAGE}`;

// API 요청 함수
async function fetchMovies() {
  try {
    const response = await fetch(URL);

    // 응답 확인
    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const data = await response.json();

    // 영화 목록 출력
    data.results.forEach((movie) => {
      const title = movie.title || "정보 없음";
      const releaseDate = movie.release_date || "정보 없음";
      const voteAverage = movie.vote_average || "정보 없음";
      const posterPath = movie.poster_path;

      console.log(
        `제목: ${title}, 개봉일: ${releaseDate}, 평점: ${voteAverage}`,
      );
    });

    return data.results; // movies array 반환
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }
}

const MeetList = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true, // 화살표 활성화
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const movieArray = await fetchMovies();
      setItems(movieArray);
    };
    loadMovies();
  }, []);
  return (
    <Content>
      <div>
        <h1>모임리스트</h1>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="/images/1.png" alt="as" width={300}></img>
          </div>
          <div>
            <img src="/images/bell.png" alt="as" width={300}></img>
          </div>
          <div>
            <img src="/images/1.png" alt="as" width={300}></img>
          </div>
          <div>
            <img src="/images/1.png" alt="as" width={300}></img>
          </div>
        </Slider>
      </div>

      <div>
        <table class="meeting-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>일시</th>
              <th>장소</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>test</td>
                <td>2022-01-01 12:00</td>
                <td>��스트</td>
                <td>대기</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Content>
  );
};
const Content = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  overflow: visable; /* overflow 설정 확인 */
  max-width: 80%; /* 슬라이더 최대 너비 설정 */
  margin: 0 auto; /* 화면 가운데 정렬 */
  padding: 20px; /* 여백 추가 */

  .slick-prev,
  .slick-next {
    display: block !important; /* 강제로 표시 */
    z-index: 1000; /* 다른 요소 위로 */
    opacity: 1; /* 투명도 설정 */
  }
  .slick-prev:before,
  .slick-next:before {
    color: #2c3e50; /* 화살표 색상 */
    font-size: 30px; /* 화살표 크기 */
  }

  .slick-prev {
    left: -50px; /* 화살표와 슬라이더 간 간격 */
  }

  .slick-next {
    right: -50px; /* 화살표와 슬라이더 간 간격 */
  }

  .slick-slide img {
    margin: 0 auto; /* 이미지를 슬라이드 중앙에 정렬 */
  }
  .meeting-table {
    width: 90%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .meeting-table th,
  .meeting-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  .meeting-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
`;

export default MeetList;
