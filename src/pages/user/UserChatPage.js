import { useParams } from "react-router";
import { useUserContext } from "../../provider/UserProvider";
import { useEffect, useState } from "react";

function UserChatPage() {
  const [chats, setChats] = useState([]);
  const { token, stompClient } = useUserContext();
  const { departmentId } = useParams();

  const fetchChatLog = async function () {
    const response = await fetch(
      "http://192.168.10.97:9090/api/chat/" + departmentId,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const json = await response.json();
    // console.log(json);
    setChats(json);
  };

  const keydownHandle = async function (evt) {
    if (!evt.shiftKey && evt.key === "Enter") {
      evt.preventDefault();
      const data = {
        message: evt.target.value,
      };

      const response = await fetch(
        "http://192.168.10.97:9090/api/chat/" + departmentId,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        }
      );

      console.log(response.status);
      const json = await response.json();
      console.log(json);

      evt.target.value = "";
    }
  };

  useEffect(() => {
    stompClient.subscribe(
      "/chat-department/" + departmentId,
      function (message) {
        // console.log(message.body);
        if (message.body === "newChat") {
          fetchChatLog();
        }
      }
    );

    fetchChatLog();
  }, []);

  useEffect(() => {
    const $chatlog = document.getElementById("chat-log");
    $chatlog.scrollTop = $chatlog.scrollHeight;
  }, [chats]);

  return (
    <div>
      <h2>사원 대시보드 &gt; 부서 채팅방</h2>
      <div className="chat-container">
        <div className="chat-log" id="chat-log">
          {chats.map((item) => {
            return (
              <div key={item.id} className="chat-item">
                <div className="chat-item-header">
                  {item.talker.name} ({item.talker.id})
                </div>
                <div className="chat-item-body">{item.message}</div>
              </div>
            );
          })}
        </div>
        <div className="chat-input">
          <textarea onKeyDown={keydownHandle} className="message"></textarea>
        </div>
      </div>
    </div>
  );
}

export default UserChatPage;
