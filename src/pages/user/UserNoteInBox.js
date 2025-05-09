import { useEffect, useState } from "react";
import { useUserContext } from "../../provider/UserProvider";
import { Link } from "react-router";

// 받은 쪽지함 페이지 컴포넌트
function UserNoteInBoxPage() {
  // 로그인된 사용자 토큰 가져오기
  const { token } = useUserContext();

  // 받아온 쪽지 목록 저장
  const [notes, setNotes] = useState([]);

  // 각 쪽지별 체크 상태 저장
  const [checked, setChecked] = useState([]);

  // 모든 항목이 체크되어 있는지 여부
  const isAllChecked = checked.length > 0 && checked.every((value) => value);

  // 받은 쪽지 목록 조회 함수
  const fetchNotes = async function () {
    const response = await fetch("http://192.168.10.97:9090/api/note/inBox", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token, // 토큰으로 인증
      },
    });

    const data = await response.json(); // 응답 JSON 파싱
    setNotes(data); // 쪽지 목록 저장
    setChecked(Array(data.length).fill(false)); // 체크 상태 초기화 (모두 false)
  };

  // 페이지 로딩 시 쪽지 데이터 불러오기
  useEffect(() => {
    fetchNotes();
  }, []);

  // 전체 체크박스 클릭 시 실행되는 함수
  const checkAll = (evt) => {
    const { checked: allChecked } = evt.target;
    // 전체 체크 상태를 true/false로 설정
    setChecked(checked.map(() => allChecked));
  };

  // 개별 체크박스 클릭 시 실행되는 함수
  const handleCheckItem = (index) => (evt) => {
    const updated = [...checked]; // 기존 배열 복사
    updated[index] = evt.target.checked; // 해당 인덱스의 상태만 수정
    setChecked(updated); // 새로운 상태로 업데이트
  };

  return (
    <div className="user-note">
      <h2>사원 대시보드 &gt; 쪽지 &gt; 받은 쪽지함</h2>

      {/* 쪽지 관련 메뉴 (삭제 버튼 등) */}
      <div className="user-note-menu">
        <button>삭제</button>
      </div>

      {/* 받은 쪽지 목록 테이블 */}
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>
              {/* 전체 체크박스 */}
              <input
                type="checkbox"
                checked={isAllChecked} // 전체 체크 여부
                onChange={checkAll} // 전체 체크 상태 변경 함수
              />
            </th>
            <th style={{ width: "15%" }}>보낸 사람</th>
            <th>내용</th>
            <th style={{ width: "25%" }}>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* 쪽지 목록 반복 출력 */}
          {notes.map((item, idx) => (
            <tr key={item.id} className={checked[idx] ? "active" : ""}>
              <td>
                {/* 개별 체크박스 */}
                <input
                  type="checkbox"
                  checked={checked[idx] || false} // 체크 상태
                  onChange={handleCheckItem(idx)} // 상태 변경 함수
                />
              </td>
              {/* 보낸 사람 이름 */}
              <td>{item.note.sender.name}</td>

              {/* 쪽지 내용 + 읽음 여부 아이콘 */}
              <td>
                <span>
                  <Link to={`/user/workspace/note/viewer/${item.id}`}>
                    {item.note.content}
                  </Link>
                </span>
                {/* 읽음 여부에 따라 다른 아이콘 표시 */}
                {item.isRead ? (
                  <small className="read-icon">📃</small> // 읽음
                ) : (
                  <small className="read-icon">📧</small> // 안 읽음
                )}
              </td>

              {/* 보낸 날짜 */}
              <td>{item.note.sendAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserNoteInBoxPage;
