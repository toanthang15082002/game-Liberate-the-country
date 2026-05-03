const readyBtn = document.getElementById("readyBtn");
const rulesDiv = document.getElementById("rulesDiv");
const tooltip = document.getElementById("tooltip");
const questionDiv = document.getElementById("questionDiv");
const questionText = document.getElementById("questionText");
const answerButtons = Array.from(document.querySelectorAll("#questionDiv button"));
// --- Các tỉnh đã đỏ sẵn ---
const initialLiberated = new Set([
  "VN-01-Lai-Chau",
  "VN-02-Lao-Cai",
  "VN-03-Ha-Giang",
  "VN-04-Cao-Bang",
  "VN-05-Son-La",
  "VN-06-Yen-Bai",
  "VN-07-Tuyen-Quang",
  "VN-09-Lang-Son",
  "VN-13-Quang-Ninh",
  "VN-14-Hoa-Binh",
  "VN-15-Ha-Noi",
  "VN-18-Ninh-Binh",
  "VN-20-Thai-Binh",
  "VN-21-Thanh-Hoa",
  "VN-22-Nghe-An",
  "VN-23-Ha-Tinh",
  "VN-24-Quang-Binh",
  "VN-53-Bac-Kan",
  "VN-54-Bac-Giang",
  "VN-56-Bac-Ninh",
  "VN-61-Hai-Duong",
  "VN-63-Ha-Nam",
  "VN-66-Hung-Yen",
  "VN-67-Nam-Dinh",
  "VN-68-Phu-Tho",
  "VN-69-Thai-Nguyen",
  "VN-70-Vinh-Phuc",
  "VN-71-Dien-Bien",
  "VN-HN-Ha-Noi",
  "VN-HP-Hai-Phong",
]);

let gameStarted = false;
let currentPath = null;

// --- Nhấn "Sẵn sàng" ---
readyBtn.addEventListener("click", () => {
  rulesDiv.style.display = "none";
  gameStarted = true;
});
const totalProvinces = 34;
let liberatedCount = 0;

function checkVictory() {
  if (liberatedCount === totalProvinces) {
    document.getElementById("victoryDiv").style.display = "block";
    const music = document.getElementById("bgMusic");
    music.pause();
    music.currentTime = 0;
  }
}

async function fetchQuestions() {
  try {
    const response = await fetch('./grade_sixth/science_sesmester_2.json'); // FILE CÂU HỎI Ở ĐÂY
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    questions = await response.json();
  } catch (err) {
    console.error('Lỗi khi fetch câu hỏi:', err);
  }
}
fetchQuestions();

// --- Tooltip + Logic click hỏi ---
document.querySelectorAll("svg path").forEach((path) => {
  const name = path.getAttribute("name") || path.getAttribute("title") || path.id;
  path.addEventListener("mouseover", (e) => {
    tooltip.textContent = name;
    tooltip.style.display = "block";
  });
  path.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 5 + "px";
    tooltip.style.top = e.pageY + "px";
  });
  path.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });
  if (initialLiberated.has(path.id)) {
    path.classList.add("liberated");
    return;
  }

  let usedQuestionCount = 0;

  function pickQuestion() {
    if (questions.length === 0) {
      window.alert('Hết câu hỏi rồi!');
      return null;
    }
    const idx = Math.floor(Math.random() * questions.length);
    const qq = questions.splice(idx, 1)[0];
    usedQuestionCount++;
    return qq;
  }

  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  // thuật toán Fisher–Yates xáo trộn mảng random
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let questionOpen = false;
  path.addEventListener("click", () => {
    if (!gameStarted || path.classList?.contains("liberated") || questionOpen) return;

    questionOpen = true;
    document.querySelectorAll("svg path").forEach(p => p.style.pointerEvents = "none");

    // Lấy 1 câu hỏi ngẫu nhiên
    const q = pickQuestion();
    currentPath = path;

    // Lưu lại text đáp án đúng
    const correctAnswer = q.answers[q.correct];

    // Lấy mảng tất cả text đáp án, rồi xáo nó
    const questionArray = Object.values(q.answers);
    shuffleArray(questionArray);

    // Hiện câu hỏi & đáp án
    questionText.textContent = q.question;
    answerButtons.forEach((btn, idx) => {
      const key = btn.dataset.answer;
      const text = questionArray[idx]; // 'A','B','C','D'
      if (text === undefined) {
        btn.style.display = "none";
      } else {
        btn.removeAttribute("style");
        btn.textContent = `${key}. ${text}`;
        btn.onclick = () => {
          questionDiv.style.display = "none";
          questionOpen = false;
          document.querySelectorAll("svg path").forEach(p => p.style.pointerEvents = "auto");
          if (text === correctAnswer) {
            currentPath?.classList?.add("liberated");
            liberatedCount++;
            checkVictory();
          } else {
            // reset toàn bộ nếu sai
            document.getElementById("gameOverDiv").style.display = "block";
          }
        };
      }
    });

    questionDiv.style.display = "block";
  });
});
document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

// --- Vẽ ngôi sao ở Hà Nội, dịch xuống 2px, sang trái 2px ---
(() => {
  const hn = document.getElementById("VN-HN-Ha-Noi");
  if (!hn) return;
  const svg = document.querySelector("svg");
  const bb = hn.getBBox();
  const cx = bb.x + bb.width / 2;
  const cy = bb.y + bb.height / 2;
  const R1 = 15,
    R2 = 7,
    pts = [];
  for (let i = 0; i < 5; i++) {
    const a1 = (2 * Math.PI * i) / 5 - Math.PI / 2;
    const a2 = a1 + Math.PI / 5;
    pts.push(`${Math.cos(a1) * R1},${Math.sin(a1) * R1}`);
    pts.push(`${Math.cos(a2) * R2},${Math.sin(a2) * R2}`);
  }
  const star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  star.setAttribute("points", pts.join(" "));
  star.setAttribute("fill", "gold");
  star.setAttribute("stroke", "goldenrod");
  star.setAttribute("stroke-width", "1");
  star.setAttribute("transform", `translate(${cx - 5},${cy + 8})`);
  svg.appendChild(star);
})();
document.getElementById("readyBtn").addEventListener("click", () => {
  // 1) Ẩn luật chơi
  document.getElementById("rulesDiv").style.display = "none";
  const youtubeLinks = [
    /* …Link nhạc youtube */
    "https://www.youtube.com/watch?v=_lIu6T3Bp2I&list=RD_lIu6T3Bp2I&start_radio=1&pp=ygUNbeG6uSB5w6p1IGNvbqAHAQ%3D%3D",
    "https://www.youtube.com/watch?v=tF5z8kkbzXk&list=RDtF5z8kkbzXk&start_radio=1&pp=ygUNdMO5bmcgZMawxqFuZ6AHAdIHCQmyCQGHKiGM7w%3D%3D",
    "https://www.youtube.com/watch?v=Zv1aeqWPUv8&list=RDZv1aeqWPUv8&start_radio=1&pp=ygUNdMO5bmcgZMawxqFuZ6AHAQ%3D%3D"
  ];
  const idx = Math.floor(Math.random() * youtubeLinks.length);
  const fullLink = youtubeLinks[idx];
  // Lấy video ID
  const videoId = fullLink.split("v=")[1].split("&")[0];

  // 3) Tạo iframe autoplay
  const playerDiv = document.getElementById("player");
  playerDiv.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=0"
      allow="autoplay"
      frameborder="0"
      width="0"
      height="0">
    </iframe>
  `;
});
