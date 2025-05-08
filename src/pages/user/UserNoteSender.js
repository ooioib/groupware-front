import { useUserContext } from "../../provider/UserProvider";

function UserNoteSenderPage() {
  const { token } = useUserContext();

  const submitHandle = async function (evt) {
    evt.preventDefault();

    const data = {
      content: evt.target.content.value,
      receiverIds: evt.target.receiver.value.split(","),
    };

    console.log(data);

    const response = await fetch("http://192.168.10.97:9090/api/note", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 203) {
      window.alert("쪽지 보내기 요청을 처리할 수 없습니다.");
    } else {
      window.alert("쪽지를 성공적으로 보냈습니다.");
      evt.target.content.value = "";
      evt.target.receiver.value = "";
    }
  };

  return (
    <div className="user-note">
      <h2>사원 대시보드 &gt; 쪽지 &gt; 쪽지 쓰기</h2>
      <p>
        받는 사람은 쉼표(,) 또는 세미콜론(;)으로 구분하여 여러 명을 지정할 수
        있습니다.
        <br />
        보낸 쪽지는 각 수신자의 쪽지함에 개별적으로 전달되며, 읽음 여부를 확인할
        수 있습니다.
      </p>
      <form
        onSubmit={submitHandle}
        className="user-note-sender"
        autoComplete="off"
      >
        <div className="receiver-input">
          <label>받는사람</label>
          <div></div>
          <input type="text" name="receiver" />
        </div>
        <div className="content-input">
          <textarea name="content"></textarea>
        </div>
        <div>
          <button type="submit">보내기</button>
        </div>
      </form>
    </div>
  );
}

export default UserNoteSenderPage;
