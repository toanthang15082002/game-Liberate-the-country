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
  const questions = [
    {
      question: "Một hình chữ nhật có chiều dài 12 cm, chiều rộng 7 cm. Tính diện tích hình chữ nhật.",
      answers: { A: "72 cm²", B: "76 cm²", C: "94 cm²", D: "84 cm²" },
      correct: "D",
    },
    {
      question: "Một ô tô đi quãng đường 240 km trong 4 giờ. Hỏi mỗi giờ ô tô đi được bao nhiêu km?",
      answers: { A: "50 km", B: "55 km", C: "60 km", D: "70 km" },
      correct: "C",
    },
    {
      question: "Tính 3/4 của 100.",
      answers: { A: "25", B: "50", C: "75", D: "100" },
      correct: "C",
    },
    {
      question: "Một mảnh vườn hình vuông có cạnh dài 15 m. Tính chu vi mảnh vườn.",
      answers: { A: "45 m", B: "60 m", C: "75 m", D: "30 m" },
      correct: "B",
    },
    {
      question: "Từ đồng nghĩa với 'vui' là gì?",
      answers: { A: "Buồn", B: "Hạnh phúc", C: "Tức giận", D: "Sợ" },
      correct: "B",
    },
    {
      question: "Choose the correct article: I have ___ apple.",
      answers: { A: "a", B: "an", C: "the", D: "x" },
      correct: "B",
    },
    {
      question: "Fill in the blank: She ___ a cat.",
      answers: { A: "is", B: "are", C: "have", D: "has" },
      correct: "D",
    },
    {
      question: "Dịch nghĩa từ 'fountain'",
      answers: { A: "đài phun nước", B: "lâu đài", C: "bưu điện", D: "bảo tàng" },
      correct: "A",
    },
    {
      question: "Dân tộc chủ yếu sống ở đồng bằng Bắc Bộ là",
      answers: { A: "Tày", B: "Kinh", C: "Thái", D: "H'Mong" },
      correct: "B",
    },
    {
      question: "Cố đô Huế là công trình của thời vua nào",
      answers: { A: "Trần", B: "Lê", C: "Nguyễn", D: "Lý" },
      correct: "C",
    },
    {
      question: "Minecraft là trò chơi xuất hiện hình gì nhiều nhất",
      answers: { A: "tròn", B: "vuông", C: "tam giác", D: "chữ nhật" },
      correct: "B",
    },
    {
      question: "Có 10 hộp baby three. Trong đó chắc chắn có 3 con mắt nước, còn lại là còn mắt lác. Hỏi mở nhiều nhất bao nhiêu hộp để có 1 con mắt nước.",
      answers: { A: "1", B: "2", C: "3 giác", D: "4" },
      correct: "D",
    }
  ];

  let usedCount = 0;

  function pickQuestion() {
    if (questions.length === 0) return null;
    // random index trong phần còn lại
    const idx = Math.floor(Math.random() * questions.length);
    const qq = questions.splice(idx, 1)[0];
    usedCount++;
    return qq;
  }
  const restartBtn = document.getElementById("restartBtn");
  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  path.addEventListener("click", () => {
    if (!gameStarted || path.classList.contains("liberated")) return;

    // Lấy 1 câu hỏi ngẫu nhiên
    const q = pickQuestion();
    currentPath = path;

    // Hiện câu hỏi & đáp án
    questionText.textContent = q.question;
    answerButtons.forEach((btn) => {
      const key = btn.dataset.answer; // 'A','B','C','D'
      btn.textContent = `${key}. ${q.answers[key] || ""}`;
      btn.onclick = () => {
        questionDiv.style.display = "none";
        if (key === q.correct) {
          currentPath.classList.add("liberated");
          liberatedCount++;
          checkVictory();
        } else {
          // reset toàn bộ nếu sai
          document.getElementById("gameOverDiv").style.display = "block";
        }
      };
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
    "https://www.youtube.com/watch?v=QSLw4aiS_gQ",
    "https://www.youtube.com/watch?v=M65MJLLB4IM",
    "https://www.youtube.com/watch?v=m6i4uRiLEKU",
    "https://www.youtube.com/watch?v=_lIu6T3Bp2I",
    "https://www.youtube.com/watch?v=-hJWNccNm78",
    /* … */
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
