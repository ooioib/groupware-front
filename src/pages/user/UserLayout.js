import { Link, Outlet } from "react-router";
import { useUserContext } from "../../provider/UserProvider";

function UserWorkspaceLayout() {
  const { user } = useUserContext();
  return (
    <div className="user-workspace">
      <div className="user-workspace-header">
        <h2>
          <Link to="/user/workspace">GROUPWARE</Link>
        </h2>
        <div className="info">
          {user && (
            <>
              <span>{user.id}</span> | <span>{user.name}</span> |{" "}
              <span>
                {user.department.name} {user.position}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="user-workspace-main">
        <div className="user-workspace-side">
          <Link to="/user/workspace/board">게시판</Link>
        </div>

        <div className="user-workspace-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserWorkspaceLayout;
