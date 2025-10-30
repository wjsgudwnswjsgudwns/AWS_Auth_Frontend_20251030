import { useState } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //회원 가입
  const signup = async (e) => {
    try {
      await api.post(
        "/api/auth/signup",
        new URLSearchParams({ username, password })
      );
      setMessage(username + " 회원 가입 성공");
    } catch (err) {
      console.error(err);
      alert("회원가입실패");
    }
  };

  //로그인
  const login = async (e) => {
    try {
      await api.post(
        "/api/auth/login",
        new URLSearchParams({ username, password })
      );
      setMessage(username + " 로그인 성공");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  //로그아웃
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setMessage(username + " 로그아웃 성공");
    } catch (err) {
      console.error(err);
      alert("로그아웃 실패");
    }
  };

  //사용자 확인
  const userCheck = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setMessage("현재 로그인 중인 아이디 : " + res.data.username);
    } catch (err) {
      console.error(err);
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
