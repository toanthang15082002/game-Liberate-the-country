const readyBtn = document.getElementById("readyBtn");
const rulesDiv = document.getElementById("rulesDiv");
const tooltip = document.getElementById("tooltip");
const chooseSubjectDiv = document.getElementById("chooseSubject");
const questionDiv = document.getElementById("questionDiv");
const questionText = document.getElementById("questionText");
const loadingMessage = document.getElementById("loadingMessage");
const restartBtn = document.getElementById("restartBtn");
const answerButtons = Array.from(document.querySelectorAll("#questionDiv button"));
// --- Hàm random màu ---
function randomColor() {
  const colors = [
    "#00BF7D",
    "#FF5722",
    "#3A86FF",
    "#FFD600",
    "#7B2CBF",
    "#121212",
    "#FF4D80",
    "#E60000",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
// --- Các tỉnh đã đỏ sẵn ---
const initialLiberated = new Set([
  "VN-13-Quang-Ninh",
]);
// --- Các file câu hỏi ---
const questionFiles = {
  "Tin học": "./grade_seventh/computer_science_ses1_mid.json",
  "Sử địa": "./grade_seventh/history_geography_ses1_mid.json",
  "Tiếng Anh": "./grade_seventh/english_ses1_mid.json",
  "Công nghệ": "./grade_seventh/technology_ses1_mid.json",
  "Từ vựng": "./grade_seventh/vocabulary_practice_ses1_mid.json",
  "Khoa học": "./grade_seventh/science_ses1_mid.json"
};

const LOG_API_URL = "https://game-history-api.toanthang15082002.workers.dev";

let gameStarted = false;
let currentPath = null;
let questions = [];

let totalQuestionsLoaded = 0;

let resultRecorded = false;

document.querySelectorAll(".restartBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    location.reload();
  });
});

// --- Nhấn "Sẵn sàng" ---
readyBtn.addEventListener("click", function () {
  if (questions.length === 0) {
    alert("Vui lòng chọn môn học và tải câu hỏi trước!");
    return;
  }
  const playerName = document.getElementById("playerName").value.trim();
  if (!playerName) {
    alert("Vui lòng nhập tên người chơi!");
    return;
  }
  rulesDiv.style.display = "none";
  gameStarted = true;
});
const totalProvinces = 34;
let liberatedCount = 0;

async function recordGameResult(result) {
  if (resultRecorded) return;
  resultRecorded = true;

  const playerName = document.getElementById("playerName").value.trim();
  const subject = chooseSubjectDiv.value;
  const history = {
    player: playerName,
    subject: subject,
    result: result,
    correctAnswers: liberatedCount,
    totalQuestions: totalQuestionsLoaded,
    time: new Date().toLocaleString("vi-VN")
  };
  // log lịch sử vào localStorage
  try {
    const logs = JSON.parse(
      localStorage.getItem("gameHistory") || "[]"
    );
    logs.push(history);
    localStorage.setItem(
      "gameHistory",
      JSON.stringify(logs)
    );
  } catch (error) {
    console.error("Không lưu được lịch sử trên máy:", error);
  }

  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(history)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}`);
    }
    console.log("Đã lưu lịch sử lên Cloudflare:", data);
  } catch (error) {
    console.error("Không gửi được lịch sử lên Cloudflare:", error);
  }
}

function checkVictory() {
  if (liberatedCount === totalProvinces || questions.length === 0) {
    recordGameResult("Thắng");
    document.getElementById("victoryDiv").style.display = "block";
  }
}

async function fetchQuestions(filePath) {
  try {
    readyBtn.style.display = "none";
    loadingMessage.textContent = "Đang tải câu hỏi...";

    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("File câu hỏi không hợp lệ hoặc không có câu hỏi.");
    }

    totalQuestionsLoaded = data.length;
    questions = data;
    loadingMessage.textContent = `Đã tải ${questions.length} câu hỏi thành công!`;
    
    readyBtn.style.display = "block";
  } catch (err) {
    questions = [];
    loadingMessage.textContent = "Không tải được câu hỏi. Vui lòng chọn lại môn học.";
    console.error("Lỗi khi fetch câu hỏi:", err);
  }
}

chooseSubjectDiv.addEventListener("change", async function () {
  const selectedSubject = chooseSubjectDiv.value;
  const filePath = questionFiles[selectedSubject];

  if (!filePath) {
    questions = [];
    readyBtn.style.display = "none";
    loadingMessage.textContent = "";
    return;
  }

  await fetchQuestions(filePath);
});

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
      return;
    }
    const idx = Math.floor(Math.random() * questions.length);
    const qq = questions.splice(idx, 1)[0];
    usedQuestionCount++;
    return qq;
  }

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
    if (!q) {
      checkVictory();
      return;
    }
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
            currentPath?.style?.setProperty("--liberated-color", randomColor());
            liberatedCount++;
            checkVictory();
          } else {
            recordGameResult("Thua");
            document.getElementById("gameOverDiv").style.display = "block";
          }
        };
      }
    });

    questionDiv.style.display = "block";
  });
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
// document.getElementById("readyBtn").addEventListener("click", () => {
//   // 1) Ẩn luật chơi
//   document.getElementById("rulesDiv").style.display = "none";
//   const youtubeLinks = [
//     /* …Link nhạc youtube */
//     "https://www.youtube.com/watch?v=rA_2B7Yj4QE&list=PL1CRgS4XswahElqv9qGcrMqP-Xy1SjxOR"
//   ];
//   const idx = Math.floor(Math.random() * youtubeLinks.length);
//   const fullLink = youtubeLinks[idx];
//   // Lấy video ID
//   const videoId = fullLink.split("v=")[1].split("&")[0];

//   // 3) Tạo iframe autoplay
//   const playerDiv = document.getElementById("player");
//   playerDiv.innerHTML = `
//     <iframe
//       src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=0"
//       allow="autoplay"
//       frameborder="0"
//       width="0"
//       height="0">
//     </iframe>
//   `;
// });
