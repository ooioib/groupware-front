// 라우팅을 위한 Link 컴포넌트 불러오기
import "./Admin.css";
import AdminNavigator from "../../components/AdminNavigator";

function AdminIndexPage() {
  return (
    <>
      <div className="admin-container">
        <AdminNavigator />

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
  ctrl + shift + l : 현재 선택한 모든 항목 한꺼번에 수정
*/
