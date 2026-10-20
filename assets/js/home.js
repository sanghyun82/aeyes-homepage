const projects = {
  odt: {
    title: "전방향 러닝 플랫폼",
    description:
      "보행 의도를 예측해 360도 움직임을 지원하는 트레드밀입니다. 고속 모션 캡처와 다축 서보 제어를 통합했습니다.",
    spec: "360° 보행 대응 · 모션 예측 · 다축 서보 제어",
    video: "dt_D1lG4O5k",
  },
  landing: {
    title: "드론 랜딩 패드",
    description:
      "IMU 센싱과 모션 예측으로 차량·선박의 움직임에 맞춰 착륙면의 수평을 보정합니다. 기구와 서보 제어를 함께 개발했습니다.",
    spec: "50kg급 하중 대응 · IMU 센싱 · 수평 보정",
    video: "owjjG-0rWYw",
  },
  motion: {
    title: "2축 로보틱헤드",
    description:
      "CAN 통신으로 두 구동축의 위치와 속도를 동기 제어합니다. CSP·CSV 프로파일을 구현하고 팬·틸트 기구에 적용했습니다.",
    spec: "4kHz 동기 제어 · 0.001° 반복정밀도 · 페이로드 15kg",
    video: "HeD9CaVdBus",
    blog: "https://blog.naver.com/aeyes_dev/224412347992",
  },
  follow: {
    title: "사용자 추종 이동체",
    description:
      "초음파와 LiDAR 센서 정보를 융합해 사용자를 추종합니다. 추종 제어와 장애물 회피 기능을 하나의 이동체에 통합했습니다.",
    spec: "센서 융합 · 사용자 추종 · 장애물 회피",
    video: "qU1RXsmZKLo",
  },
  measurement: {
    title: "광학 자세 측정 시스템",
    description:
      "마커 설계와 PnP 알고리즘, EKF 추정을 이용해 대상의 3자유도 자세를 측정합니다. 10m 거리에서 0.05도 정밀도로 측정하는 광학 시스템입니다.",
    spec: "10m 측정 거리 · 0.05° 정밀도 · 3자유도 자세 측정",
    video: "__xpV4BS0xM",
  },
  navigation: {
    title: "장애물 회피 알고리즘 비교",
    description:
      "같은 환경에서 다섯 가지 주행 알고리즘의 경로 추종과 장애물 회피 성능을 비교합니다.",
    spec: "ROS2 Nav2 · 알고리즘 5종 · 동적 장애물",
    video: "V8b9p72JH_s",
  },
  mecanum: {
    title: "실내 자율주행 플랫폼",
    description: "매카넘 휠 플랫폼에 실내 측위와 자율주행 기능을 통합합니다.",
    spec: "매카넘 휠 · 실내 SLAM · 장애물 회피",
    video: "Lm9HZR8afEM",
  },
  manipulator: {
    title: "4축 매니퓰레이터",
    description: "반복 하중을 고려한 구조와 정밀 위치 제어를 개발합니다.",
    spec: "4축 제어 · 고하중 대응 · 기구 설계",
    video: "ii25sTff9G8",
  },
};
const dialog = document.querySelector("#project-dialog");
const container = document.querySelector("#video-container");
document.querySelectorAll("[data-project]").forEach((button) =>
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent =
      project.description;
    document.querySelector("#dialog-spec").textContent = project.spec;
    document.querySelector("#youtube-link").href =
      `https://www.youtube.com/watch?v=${project.video}`;
    const technicalLink = document.querySelector("#technical-link");
    technicalLink.hidden = !project.blog;
    if (project.blog) technicalLink.href = project.blog;
    else technicalLink.removeAttribute("href");
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${project.video}?rel=0`;
    iframe.title = `${project.title} 프로젝트 영상`;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    container.replaceChildren(iframe);
    document.body.classList.add("modal-open");
    dialog.showModal();
  }),
);
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const r = dialog.getBoundingClientRect();
  if (
    event.clientX < r.left ||
    event.clientX > r.right ||
    event.clientY < r.top ||
    event.clientY > r.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  container.replaceChildren();
  document.body.classList.remove("modal-open");
});
const more = document.querySelector("#more-projects");
more.addEventListener("click", () => {
  const expanded = more.getAttribute("aria-expanded") === "true";
  document
    .querySelectorAll(".extra-project")
    .forEach((card) => (card.hidden = expanded));
  more.setAttribute("aria-expanded", String(!expanded));
  more.firstElementChild.textContent = expanded ? "프로젝트 더 보기" : "접기";
  more.lastElementChild.textContent = expanded ? "＋" : "−";
  if (expanded)
    document.querySelector("#projects").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
});
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  mobileNav.hidden = expanded;
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "메뉴 열기" : "메뉴 닫기");
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
let copyTimer;
document.querySelector("#copy-email").addEventListener("click", async () => {
  const status = document.querySelector("#copy-status");
  try {
    await navigator.clipboard.writeText("shjoo@aeyes.co.kr");
    status.textContent = "복사했습니다.";
  } catch {
    status.textContent = "shjoo@aeyes.co.kr";
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => (status.textContent = ""), 3500);
});
document.querySelector("#year").textContent = new Date().getFullYear();
