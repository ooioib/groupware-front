import { useState, useEffect } from "react";
import AdminNavigator from "../../components/AdminNavigator";
import "./Admin.css";

function AdminAddEmployeePage() {
  // 부서 목록을 저장할 state 생성
  const [department, setDepartment] = useState([]);
  const [message, setMessage] = useState(null);

  // 페이지 로드 시 부서 목록 조회
  useEffect(() => {
    // 서버에 GET 요청 보내서 부서 데이터 가져오기
    fetch("http://192.168.10.97:9090/api/department", { method: "get" })
      // 응답 데이터를 JSON으로 변환
      .then((response) => {
        return response.json();
      })
      // 받아온 부서 목록 저장
      .then((data) => {
        setDepartment(data);
      });
  }, []);

  // 사원 등록 폼 제출 이벤트 처리
  const submitHandle = (evt) => {
    // 폼 기본 제출 막기
    evt.preventDefault();

    // 입력한 값들 가져오기
    const data = {
      name: evt.target.name.value,
      email: evt.target.email.value,
      hireDate: evt.target.hireDate.value,
      departmentId: evt.target.departmentId.value,
      position: evt.target.position.value,
    };

    const str = JSON.stringify(data);
    console.log(str, typeof str);

    // 서버에 사원 등록 POST 요청 보내기
    fetch("http://192.168.10.97:9090/api/employee", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      // JSON 문자열로 변환하여 전송
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response.status);
      evt.target.name.value = "";
      if (response.status === 201) {
        setMessage("신규사원이 정상 등록되었습니다.");
      } else {
        setMessage("신규사원 등록 과정 중 문제가 발생하였습니다.");
      }
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    });
  };

  return (
    <>
      {/* 왼쪽 관리자 네비게이션 영역 */}
      <div className="admin-container">
        <AdminNavigator />

        {/* 오른쪽 메인 콘텐츠 영역 */}
        <div className="admin-main">
          <h1>관리자 대시보드 &gt; 신규 사원 등록</h1>
          <p>
            등록된 사원 정보는 사내 시스템 전반에 반영되므로, 정확히
            입력해주세요.
          </p>

          {/* 사원 등록 폼 (submit 이벤트 발생 시 submitHandle 호출) */}
          <form className="admin-employee-add-form" onSubmit={submitHandle}>
            <p>
              <input type="text" name="name" placeholder="사원 이름" />
            </p>
            <p>
              <input type="text" name="email" placeholder="사원 이메일" />
            </p>
            <p>
              <input type="date" name="hireDate" placeholder="사원 입사일" />
            </p>
            <p>
              <select name="departmentId">
                <option value="0">사원 부서를 선택하세요</option>
                {department.map((one) => {
                  return (
                    <option key={one.id} value={one.id}>
                      {one.name}
                    </option>
                  );
                })}
              </select>
            </p>
            <p>
              <input type="text" name="position" placeholder="사원 직책" />
            </p>
            <p>
              <button type="submit">사원 등록</button>
            </p>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default AdminAddEmployeePage;
