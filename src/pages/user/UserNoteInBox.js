import { useEffect, useState } from "react";
import { useUserContext } from "../../provider/UserProvider";
import { Link } from "react-router";

function UserNoteInBoxPage() {
  const { token } = useUserContext();
  const [notes, setNotes] = useState([]);

  const fetchNotes = async function () {
    const response = await fetch("http://192.168.10.97:9090/api/note/inBox", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  /* 또는 이렇게 패치
  const fetchNotes = function () {
    fetch("http://192.168.10.97:9090/api/note/receive", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNotes(data);
      });
  };
  */

  return (
    <div className="user-note">
      <h2>사원 대시보드 &gt; 쪽지 &gt; 받은 쪽지함</h2>
      <div className="user-note-menu">
        <button>삭제</button>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>
              <input type="checkbox" />
            </th>
            <th style={{ width: "15%" }}>보낸 사람</th>
            <th>내용</th>
            <th style={{ width: "25%" }}>날짜</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.note.sender.name}</td>
                <td>
                  <span>
                    <Link to={"/user/workspace/note/viewer/" + item.id}>
                      {item.note.content}
                    </Link>
                  </span>
                  {item.isRead ? (
                    <small className="read-icon">📃</small>
                  ) : (
                    <small className="read-icon">📧</small>
                  )}
                </td>
                <td>{item.note.sendAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserNoteInBoxPage;
