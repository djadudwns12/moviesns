import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const URL = "http://localhost:8200/movieAPI";

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

// 함수 호출

const MainSlider = () => {
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
      <div className="content">
        <h1>인기모임</h1>
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
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <div>
              <h3>9</h3>
            </div>
          </Slider>
        </div>
        <h1>추천모임</h1>
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img src="/images/1.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/bell.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/movieCommunity.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/movieCommunity.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/bell.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/1.png" alt="as" width={300}></img>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <div>
              <h3>9</h3>
            </div>
          </Slider>
        </div>
        <h1>좋아요누른모임</h1>
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <img src="/images/1.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/bell.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/movieCommunity.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/movieCommunity.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/bell.png" alt="as" width={300}></img>
            </div>
            <div>
              <img src="/images/1.png" alt="as" width={300}></img>
            </div>
            <div>
              <h3>7</h3>
            </div>
            <div>
              <h3>8</h3>
            </div>
            <div>
              <h3>9</h3>
            </div>
          </Slider>
        </div>
        <h1>영화순위</h1>
        <div className="slider-container">
          <Slider {...settings}>
            {items.length > 0 ? (
              items.map((item) => {
                const imgUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
                return (
                  <div key={item.id}>
                    <img src={imgUrl} alt={item.title} width={300} />
                  </div>
                );
              })
            ) : (
              <div>영화 정보를 불러오는 중...</div>
            )}
          </Slider>
        </div>
      </div>
    </Content>
  );
};
const Content = styled.div`
  position: absolute;
  top: 80px;
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
`;

export default MainSlider;
