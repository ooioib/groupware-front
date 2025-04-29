import { useEffect, useState } from "react";
import AdminNavigator from "../../components/AdminNavigator";
import "./Admin.css";

function AdminManageEmployeePage() {
  // 사원 목록을 저장할 state 생성
  const [employee, setEmployee] = useState([]);

  // 페이지 로드 시 사원 목록 조회
  useEffect(function () {
    fetch("http://192.168.10.97:9090/api/employee", {
      method: "get",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setEmployee(data);
      });
  }, []);

  return (
    <>
      <div className="admin-container">
        <AdminNavigator />
        <div className="admin-main">
          <h1>관리자 대시보드 &gt; 전체 사원 관리</h1>

          <div className="admin-employee-table">
            <table>
              <thead>
                <tr>
                  <th>아이디</th>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>입사일</th>
                  <th>부서</th>
                  <th>직책</th>
                  <th>활성화</th>
                </tr>
              </thead>
              <tbody>
                {employee.map(function (one) {
                  return (
                    <tr key={one.id}>
                      <td>{one.id}</td>
                      <td>{one.name}</td>
                      <td>{one.email}</td>
                      <td>{one.hireDate}</td>
                      <td>{one.department.name}</td>
                      <td>{one.position}</td>
                      <td>{one.active}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminManageEmployeePage;
