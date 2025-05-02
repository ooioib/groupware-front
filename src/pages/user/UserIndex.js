import { useState } from "react";
import "./User.css";
import { useNavigate } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserIndexPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser, setToken } = useUserContext();

  const submitHandle = function (evt) {
    evt.preventDefault();
    const data = {
      id: evt.target.id.value,
      password: evt.target.password.value,
    };

    fetch("http://192.168.10.97:9090/api/employee/verify", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      })
      .then(function (data) {
        setError(null);
        setUser(data.employee);
        setToken(data.token);
        console.log(data);
        navigate("/user/workspace");
      })
      .catch(function (error) {
        console.log(error.message);
        setError(error);
      });
  };

  return (
    <div className="user-index-container">
      <form onSubmit={submitHandle}>
        <h1>GROUPWARE</h1>
        <h3>사원 로그인</h3>
        <p>
          <input
            type="text"
            name="id"
            placeholder="사원 아이디"
            onInput={function (evt) {
              evt.target.value = evt.target.value.toLowerCase();
            }}
          />
        </p>
        <p>
          <input type="password" name="password" placeholder="사원 비밀번호" />
        </p>
        {error && (
          <div className="verify-error">
            아이디 또는 비밀번호가 잘못되었습니다.
          </div>
        )}
        <p>
          <button type="submit">로그인</button>
        </p>
      </form>
    </div>
  );
}

export default UserIndexPage;
