import { Link } from "react-router";
import "./AdminIndex.css";

function AdminIndexPage() {
  return (
    <>
      <div className="admin-container">
        <div class="admin-side-nav">
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

        <div class="admin-main">
          <h1>관리자 대시보드</h1>
          <p> /* 여기를 관리자 메인뷰로 사용할 예정임 */</p>
        </div>
      </div>
    </>
  );
}

export default AdminIndexPage;
/*
    ctrl + shift + l : Select all occurrences of current selection
*/
