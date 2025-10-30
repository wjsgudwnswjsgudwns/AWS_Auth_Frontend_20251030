import { useState } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [token, setToken] = useState("" || localStorage.getItem("token"));

  //회원 가입
  const signup = async (e) => {
    try {
      await api.post("/api/auth/signup", { username, password });
      setMessage(username + " 회원 가입 성공");
    } catch (err) {
      console.error(err);
      alert("회원가입실패");
    }
  };

  //로그인
  const login = async (e) => {
    try {
      const res = await api.post("/api/auth/login", { username, password });
      setToken(res.data.token); // 로그인 성공 후 받은 토큰 값 저장
      localStorage.getItem("token", res.data.token);
      setMessage(username + " 로그인 성공");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  //로그아웃
  const logout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    setToken(""); // 토큰 초기화
    setMessage(username + " 로그아웃");
  };

  //사용자 확인
  const userCheck = async () => {
    try {
      if (!token) {
        alert("로그인 후 사용 가능합니다.");
        return;
      }

      const res = await api.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("현재 로그인 중인 아이디 : " + res.data.username);
    } catch (err) {
      console.error(err);
      alert("사용자 정보를 가져 올 수 없습니다");
    }
  };

  return (
    <div className="App">
      <h1>회원 로그인</h1>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <br></br>

      <button onClick={signup}>회원가입</button>
      <hr></hr>

      <button onClick={login}>로그인</button>
      <button onClick={logout}>로그아웃</button>
      <hr></hr>

      <button onClick={userCheck}>사용자 확인</button>

      <hr></hr>

      <h2>백 앤드 응답 : {message}</h2>
    </div>
  );
}

export default App;
