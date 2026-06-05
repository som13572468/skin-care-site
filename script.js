
/* =========================
   회원가입
========================= */
function signup(){

    const id = document.getElementById("newId").value;
    const pw = document.getElementById("newPw").value;

    if(!id || !pw){
        alert("아이디/비밀번호 입력");
        return;
    }

    // 회원정보 저장 (유지됨)
    localStorage.setItem("userId", id);
    localStorage.setItem("userPw", pw);

    alert("회원가입 완료");
    location.href = "login.html";
}


/* =========================
   로그인 (세션 로그인)
========================= */
function login(){

    const id = document.getElementById("loginId").value;
    const pw = document.getElementById("loginPw").value;

    const savedId = localStorage.getItem("userId");
    const savedPw = localStorage.getItem("userPw");

    if(id === savedId && pw === savedPw){

      
        sessionStorage.setItem("login", "true");

        alert("로그인 성공");
        location.href = "index.html";

    } else {
        alert("아이디 또는 비밀번호 오류 회원가입을 하지 않았다면 우측상단 회원가입을 눌러주세요.");
    }
}


/* =========================
   로그아웃 (선택)
========================= */
function logout(){
    sessionStorage.removeItem("login");
    location.href = "login.html";
}


/* =========================
   AI 분석 → 결과 이동
========================= */
function goResult(){

    const checks = document.querySelectorAll(".check-group input");
    let issues = [];

    checks.forEach(c => {
        if(c.checked) issues.push(c.value);
    });

    localStorage.setItem("issues", JSON.stringify(issues));

    location.href = "result.html";
}


/* =========================
   결과 페이지 출력
========================= */
document.addEventListener("DOMContentLoaded", function(){

    const resultText = document.getElementById("resultText");
    const productResult = document.getElementById("productResult");

    if(!resultText || !productResult) return;

    const issues = JSON.parse(localStorage.getItem("issues")) || [];

    if(issues.length === 0){
        resultText.innerHTML = "선택된 항목이 없습니다.";
        return;
    }

    resultText.innerHTML = "선택된 피부 고민: " + issues.join(", ");

    let products = [];

    if(issues.includes("여드름")){
        products.push(["Dr.G 클렌징폼", "drg.jpg"]);
    }

    if(issues.includes("수분부족")){
        products.push(["독도 토너", "dokdo.jpg"]);
    }

    if(issues.includes("모공")){
        products.push(["모공 케어 제품", "vitac.jpg"]);
    }

    if(issues.includes("블랙헤드")){
        products.push(["비타C 세럼", "vitac.jpg"]);
    }

    if(issues.includes("홍조")){
        products.push(["진정 크림", "torriden.jpg"]);
    }

    if(issues.includes("각질")){
        products.push(["토리덴 크림", "torriden.jpg"]);
    }

    productResult.innerHTML = products.map(p => `
        <div class="post">
            <img src="${p[1]}">
            <div><b>${p[0]}</b></div>
        </div>
    `).join("");
});
