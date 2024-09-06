import axios from 'axios';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;

// Axios 기본 설정
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api', // 기본 URL 설정
  timeout: 10000, // 요청 타임아웃 설정 (예: 10초)
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    // 쿠키에서 accessToken 가져오기
    const token = Cookies.get('accessToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized 등의 에러 처리
    if (error.response && error.response.status === 401) {
      alert("로그인이 필요합니다.");
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default instance;
