import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserBoardPage() {
  const { token } = useUserContext();
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.10.97:9090/api/board", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setBoards(json);
      });
  }, []);

  return (
    <div className="user-board">
      <h2>사원 대시보드 &gt; 게시판</h2>
      <p>
        업무에 도움이 될 만한 이야기, 아이디어, 질문을 자유롭게 나누는
        공간입니다. 서로의 생각을 존중하며 건설적인 소통을 이어가주세요.
      </p>
      <div>
        <Link to="/user/workspace/board/write">글쓰기</Link>
      </div>
      <>
        <table>
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((item) => (
              <tr
                key={item.id}
                onClick={() => {
                  navigate("/user/workspace/board/" + item.id);
                }}
              >
                <td>{item.title}</td>
                <td>{item.writer.name}</td>
                <td>{item.wroteAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}

export default UserBoardPage;
