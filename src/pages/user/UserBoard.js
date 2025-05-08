// React의 기본 Hook과 라우터 기능을 가져옴
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserBoardPage() {
  // Context에서 JWT 토큰을 가져옴 (로그인된 사용자 정보)
  const { token } = useUserContext();
  // 게시글 목록을 저장할 상태 선언 (초기값은 빈 배열)
  const [boards, setBoards] = useState([]);
  // 페이지 이동을 도와주는 훅
  const navigate = useNavigate();

  // 컴포넌트가 처음 화면에 렌더링될 때 실행
  useEffect(() => {
    // 게시글 목록 데이터를 백엔드에서 불러옴
    fetch("http://192.168.10.97:9090/api/board", {
      method: "get",
      headers: {
        // JWT 토큰을 Authorization 헤더에 담아 보냄 (인증 처리)
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        // 응답 데이터를 JSON 형식으로 변환
        return response.json();
      })
      .then((json) => {
        // 받아온 게시글 데이터를 상태에 저장
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
        {/* 글쓰기 페이지로 이동하는 링크 */}
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
            {/* 게시글 목록을 반복 렌더링 */}
            {boards.map((item) => (
              <tr
                key={item.id} // 각 행을 구분하는 고유 키
                onClick={() => {
                  // 게시글 행을 클릭하면 해당 상세 페이지로 이동
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
