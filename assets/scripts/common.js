/**
 * 웹사이트의 공통 컴포넌트(헤더, 푸터)를 동적으로 로드하고,
 * 현재 페이지에 맞는 내비게이션 링크를 활성화하는 스크립트.
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * 지정된 URL의 HTML 콘텐츠를 가져와 특정 요소에 삽입합니다.
   * @param {string} url - 불러올 HTML 파일의 경로
   * @param {string} elementId - 콘텐츠를 삽입할 요소의 ID
   * @returns {Promise<void>}
   */
  const loadComponent = async (url, elementId) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${url} 파일을 불러오는 데 실패했습니다.`);
      }
      const text = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = text;
      }
    } catch (error) {
      console.error("컴포넌트 로딩 오류:", error);
    }
  };

  /**
   * 현재 페이지 URL을 기반으로 활성 내비게이션 링크에 'active' 클래스를 적용합니다.
   */
  const setActiveNav = () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("#main-nav .nav-link");

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").split("/").pop();
      // index.html 또는 루트 경로일 경우 '홈' 링크를 활성화
      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // 헤더와 푸터를 비동기적으로 로드합니다.
  // Promise.all을 사용하여 두 작업이 모두 완료된 후 내비게이션 설정을 실행합니다.
  Promise.all([
    loadComponent("./assets/components/_header.html", "header-placeholder"),
    loadComponent("./assets/components/_footer.html", "footer-placeholder"),
    loadComponent("./assets/components/_nav.html", "main-nav"),
  ]).then(() => {
    // 헤더가 로드된 후에 내비게이션 활성화 함수를 호출합니다.
    setActiveNav();
  });
});
