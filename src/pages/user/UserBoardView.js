// React의 기본 훅과 라우팅 도구 import
import { useEffect, useState } from "react";
// URL 파라미터(id)를 가져오기 위해 사용
import { useParams } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserBoardViewPage() {
  const { token } = useUserContext();
  const { id } = useParams();
  const [item, setItem] = useState(null);

  console.log(id);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://192.168.10.97:9090/api/board/" + id,
        {
          method: "get",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 404) {
        return;
      }

      const obj = await response.json();
      setItem(obj);
    })();
  }, []);

  return (
    <div className="user-board">
      <h2>사원 대시보드 &gt; 게시글 보기</h2>
      <p>
        본 게시글은 사내 구성원이 작성한 의견 및 정보를 공유하는 내용입니다.
        서로의 생각을 존중하며 건강한 소통을 이어가주세요.
      </p>
      {item ? (
        <div>
          <h3>{item.title}</h3>
          <div>{item.content}</div>
        </div>
      ) : (
        <span>데이터 불러오는중</span>
      )}
    </div>
  );
}

export default UserBoardViewPage;
