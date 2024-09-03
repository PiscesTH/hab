import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  // useState 훅을 사용하여 이메일과 비밀번호 상태를 관리합니다.
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let navigate = useNavigate();

  // 로그인 버튼 클릭 시 호출되는 함수입니다.
  const handleLogin = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    // 예제: 이메일과 비밀번호가 비어 있는지 확인
    if (uid === "" || password === "") {
      setError("아이디 비밀번호를 입력해주세요.");
    } else {
      // 실제 로그인 로직은 서버와의 통신으로 구현해야 합니다.
      setError("");
      alert(`로그인 성공! \n아이디: ${uid} \n비밀번호: ${password}`);
      // 추가 로직 예시: 로그인 처리 후 페이지 이동 등
    }
  };

  // 회원가입 버튼 클릭 시 호출되는 함수입니다.
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="uid">아이디</label>
          <input
            type="text"
            id="uid"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="아이디를 입력하세요"
            style={styles.input}
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
            autoComplete="off"
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          로그인
        </button>
      </form>
      {/* 회원가입 버튼 추가 */}
      <button onClick={handleRegister} style={styles.registerButton}>
        회원가입
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 0",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px", // 여백 추가
  },
  registerButton: {
    padding: "10px 0",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "16px",
  },
};

export default LoginPage;
