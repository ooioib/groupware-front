import { useState, useEffect } from "react";
import AdminNavigator from "../../components/AdminNavigator";
import { useUserContext } from "../../provider/UserProvider";
import "./User.css";

function UserBoardPage() {
  const { user } = useUserContext();
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState(null);

  // 페이지 로드 시 사원 목록 조회
  useEffect(() => {
    fetch("http://192.168.10.97:9090/api/employee", { method: "get" })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        console.log(employees);
      });
  }, []);

  // 게시글 등록 처리
  const submitHandle = (evt) => {
    evt.preventDefault();

    const data = {
      employeeId: user.id,
      title: evt.target.title.value,
      content: evt.target.content.value,
    };

    fetch("http://192.168.10.97:9090/api/board", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 203) {
        setMessage("게시글이 정상 등록되었습니다.");
      } else {
        setMessage("게시글 등록에 실패했습니다.");
      }

      evt.target.reset();

      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  return (
    <div className="admin-container">
      <AdminNavigator />

      <div className="admin-main">
        <h1> 게시판 &gt; 신규 게시글 등록</h1>

        <form className="admin-employee-add-form" onSubmit={submitHandle}>
          <p>
            <span>{user.id}</span>
          </p>
          <p>
            <input type="text" name="title" placeholder="제목" required />
          </p>
          <p>
            <textarea name="content" placeholder="내용" required />
          </p>
          <p>
            <button type="submit">게시글 등록</button>
          </p>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default UserBoardPage;
