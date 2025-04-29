import { Link } from "react-router";
function AdminNavigator() {
  return (
    <div className="admin-side-nav">
      <h2>관리자메뉴</h2>
      <ul>
        <li>
          <Link to="/admin/employees/add">사원등록</Link>
        </li>
        <li>
          <Link to="/admin/employees/manage">사원관리</Link>
        </li>
      </ul>
    </div>
  );
}
export default AdminNavigator;
