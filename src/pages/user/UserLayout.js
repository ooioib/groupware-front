import { Link, Outlet, useNavigate } from "react-router";
import { useUserContext } from "../../provider/UserProvider";
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

function UserWorkspaceLayout() {
  const [alarm, setAlarm] = useState([]);
  const { user, setStompClient, setUser, setToken } = useUserContext();
  const navigate = useNavigate();

  const webSoketInitialize = function () {
    const client = new Client({
      brokerURL: "ws://192.168.10.97:9090/handshake",
      onConnect: function () {
        console.log("connected");

        client.subscribe("/public", function (message) {
          // console.log(message);
          // console.log(message.body + " form notice");
          setAlarm((oldAlarm) => {
            return [...oldAlarm, message.body];
          });
        });

        client.subscribe("/private/" + user.id, function (message) {
          // console.log(message);
          // console.log(message.body + " form notice");
          setAlarm((oldAlarm) => {
            return [...oldAlarm, message.body];
          });
        });

        setStompClient(client);
      },
    });

    client.activate();
  };

  useEffect(() => {
    if (!user) {
      return navigate("/user/index");
    } else {
      webSoketInitialize();
    }
  }, []);

  const openPopup = function () {
    if (
      document.getElementById("alarm").style.display === "none" ||
      document.getElementById("alarm").style.display === ""
    ) {
      document.getElementById("alarm").style.display = "block";
    } else {
      document.getElementById("alarm").style.display = "none";
      setAlarm([]);
    }
  };

  const logoutHandle = async function (evt) {
    evt.preventDefault();

    setUser(null);
    setToken(null);

    sessionStorage.clear();

    navigate("/user/index");
  };

  return (
    <div className="user-workspace">
      <div className="user-workspace-header">
        <h2>
          <Link to="/user/workspace">GROUPWARE</Link>
        </h2>

        <div className="info">
          {user && (
            <>
              {alarm.length > 0 ? (
                <span onClick={openPopup} className="alarm-icon">
                  🔊
                </span>
              ) : (
                <span>🔈</span>
              )}
              <span>{user.id}</span>/<span>{user.name}</span>/
              <span>
                ({user.department.name} {user.position})
              </span>
            </>
          )}
        </div>
      </div>

      <div className="alarm-popup" id="alarm">
        <ul>
          {alarm.map((item, idx) => {
            return <li key={idx}>🔔 {item}</li>;
          })}
        </ul>
      </div>

      <div className="user-workspace-main">
        <div className="user-workspace-side">
          <ul>
            <li>
              <Link to="/user/workspace/board">게시판</Link>
            </li>
            <li>
              <Link to="/user/workspace/board/write">글쓰기</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/user/workspace/note/sender">쪽지 쓰기</Link>
            </li>
            <li>
              <Link to="/user/workspace/note/inbox">받은 쪽지함</Link>
            </li>
            <li>
              <Link to="/user/workspace/note/outbox">보낸 쪽지함</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to={"/user/workspace/chat/" + user?.department.id}>
                부서 채팅방
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link onClick={logoutHandle}>로그아웃</Link>
            </li>
          </ul>
        </div>
        <div className="user-workspace-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserWorkspaceLayout;
