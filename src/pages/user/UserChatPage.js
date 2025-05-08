import { useNavigate } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserChatPage() {
  const { token } = useUserContext();
  const navigate = useNavigate();

  const keydownHandle = function (evt) {
    if (!evt.shiftKey && evt.key === "Enter") {
      evt.preventDefault();
      
      const message = evt.target.value;
      console.log("fetch !!! => " + message);

      const data = {
      message: message
    };

    const response = await fetch("http://192.168.10.62:9090/api/chat", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);

    navigate("/user/workspace/chat");
  };

  return (
    <div>
      <h2>사원 대시보드 &gt; 부서 채팅방</h2>
      <div>
        <div></div>
        <div>
          <textarea onKeyDown={keydownHandle} className="message"></textarea>
        </div>
      </div>
    </div>
  );
}

export default UserChatPage;
