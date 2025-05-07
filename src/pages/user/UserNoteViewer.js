import { useParams } from "react-router";
import { useUserContext } from "../../provider/UserProvider";
import { useEffect, useState } from "react";

function UserNoteViewerPage() {
  const { id } = useParams();
  const { token } = useUserContext();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  const fetchNoteStatus = async function () {
    const response = await fetch(
      "http://192.168.10.97:9090/api/note/status/" + id,
      {
        method: "put",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status !== 200) {
      const data = await response.json();
      return setError(data.message);
    }
    const data = await response.json();
    return setItem(data);
  };

  useEffect(() => {
    fetchNoteStatus();
  }, []);

  return (
    <div className="user-note">
      <h2>사원 대시보드 &gt; 쪽지 &gt; 보기</h2>

      {error && (
        <p>
          쪽지 확인하는데 장애가 발생하였습니다. <br />
          {error}
        </p>
      )}

      {item && (
        <div>
          <div>
            보낸 사람 : {item.note.sender.name} / {item.note.sender.id} (
            {item.note.sender.department.name} {item.note.sender.position} )
          </div>
          <div>받은 시간 : {item.note.sendAt}</div>
          <hr />
          <div>{item.note.content}</div>
          <hr />
          <div>
            <button>삭제</button>
            <button>답장</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserNoteViewerPage;
