import { useState } from "react";
import { useUserContext } from "../../provider/UserProvider";
import { useNavigate } from "react-router";

function UserBoardWritePage() {
  const { token } = useUserContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const submitHandle = async function (evt) {
    evt.preventDefault();

    const data = {
      title: evt.target.title.value,
      content: evt.target.content.value,
    };

    const response = await fetch("http://192.168.10.97:9090/api/board", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);

    navigate("/user/workspace/board");
  };

  return (
    <div className="user-board">
      <h2>사원 대시보드 &gt; 게시판 글쓰기</h2>
      <p>
        제목과 내용을 입력한 후 등록 버튼을 눌러 게시글을 작성하세요.
        <br />
        등록된 게시글은 모든 사원이 열람할 수 있습니다.
      </p>
      <form className="write-form" onSubmit={submitHandle}>
        <div>
          <label>제목</label>
          <input type="text" placeholder="제목을 입력하세요" name="title" />
        </div>
        <div>
          <label>내용</label>
          <textarea rows="8" placeholder="내용을 입력하세요" name="content" />
        </div>

        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default UserBoardWritePage;
