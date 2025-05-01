import { Link } from "react-router";
import "./User.css";
function UserWorkspacePage() {
  return (
    <div>
      <h2>사원 대시보드</h2>
      <h3># 알림</h3>
      <ul>
        <li>
          <Link to="/user/workspace/setting/password">
            (알림) 비밀번호 변경이 필요합니다
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserWorkspacePage;
