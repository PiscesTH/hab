import axios from './axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
function SignupPage() {
  // 입력 필드 상태 관리
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [passwordForConfirm, setPasswordForConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();
  
  // 회원가입 버튼 클릭 시 호출되는 함수
  const handleSignup = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 간단한 유효성 검사
    if (!uid || !password || !name || !email) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    // 이메일 형식 유효성 검사
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    // 비밀번호 길이 검사
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (password !== passwordForConfirm) {
      setError('비밀번호가 다릅니다.')
      return
    }
    const formData = {uid:uid, upw:password, nm:name, email: email};
    // 에러가 없을 경우 회원가입 로직 수행 (예: 서버에 데이터 전송)
    setError('');
  
    try {
      await axios.post("/user/sign-up", formData);
      alert("회원가입 완료 !");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패...");
    }
    // 회원가입 로직 추가 (예: 서버와 통신)
  };

  return (
    <div style={styles.container}>
      <h2>회원가입</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="uid">아이디</label>
          <input
            type="text"
            id="uid"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="아이디를 입력하세요"
            style={styles.input}
            autoComplete='off'
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            style={styles.input}
            autoComplete='off'
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="password">비밀번호 확인</label>
          <input
            type="password"
            id="passwordForConfirm"
            value={passwordForConfirm}
            onChange={(e) => setPasswordForConfirm(e.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            style={styles.input}
            autoComplete='off'
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            style={styles.input}
            autoComplete='off'
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            style={styles.input}
            autoComplete='off'
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>회원가입</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 0',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    fontSize: '16px'
  },
};

export default SignupPage;
