import { useUserContext } from "../../provider/UserProvider";
import "./User.css";
function UserWorkspacePage() {
  const { user } = useUserContext();
  return (
    <div className="user-workspace">
      <div className="user-workspace-header">
        <h2>GROUPWARE</h2>
        <div className="info">
          {user && (
            <>
              <span>{user.id}</span> / <span>{user.name}</span> /{" "}
              <span>
                {user.department.name} {user.position}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="user-workspace-main">
        <div className="user-workspace-side"></div>
        <div className="user-workspace-content">
          <h2>사원 대시보드</h2>
        </div>
      </div>
    </div>
  );
}

export default UserWorkspacePage;
