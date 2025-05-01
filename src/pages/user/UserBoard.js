import "./User.css";

function UserBoardWritePage() {
  return (
    <div className="user-board">
      <h2>사원 대시보드 &gt; 게시판 글쓰기</h2>
      <p>
        제목과 내용을 입력한 후 등록 버튼을 눌러 게시글을 작성하세요.
        <br />
        등록된 게시글은 모든 사원이 열람할 수 있습니다.
      </p>
      <form className="write-form">
        <div>
          <label>제목</label>
          <input type="text" placeholder="제목을 입력하세요" />
        </div>

        <div>
          <label>내용</label>
          <textarea rows="8" placeholder="내용을 입력하세요" />
        </div>

        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default UserBoardWritePage;
