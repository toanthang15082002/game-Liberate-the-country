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
      correct: "D"
    },
    {
      question: "Một ô tô đi quãng đường 240 km trong 4 giờ. Hỏi mỗi giờ ô tô đi được bao nhiêu km?",
      answers: { A: "50 km", B: "55 km", C: "60 km", D: "70 km" },
      correct: "C"
    },
    {
      question: "Tính 3/4 của 100.",
      answers: { A: "25", B: "50", C: "75", D: "100" },
      correct: "C"
    },
    {
      question: "Một mảnh vườn hình vuông có cạnh dài 15 m. Tính chu vi mảnh vườn.",
      answers: { A: "45 m", B: "60 m", C: "75 m", D: "30 m" },
      correct: "B"
    },
    {
      question: "Từ đồng nghĩa với 'vui' là gì?",
      answers: { A: "Buồn", B: "Hạnh phúc", C: "Tức giận", D: "Sợ" },
      correct: "B"
    },
    {
      question: "Choose the correct article: I have ___ apple.",
      answers: { A: "a", B: "an", C: "the", D: "x" },
      correct: "B"
    },
    {
      question: "Fill in the blank: She ___ a cat.",
      answers: { A: "is", B: "are", C: "have", D: "has" },
      correct: "D"
    },
    {
      question: "Dịch nghĩa từ 'fountain'",
      answers: { A: "đài phun nước", B: "lâu đài", C: "bưu điện", D: "bảo tàng" },
      correct: "A"
    },
    {
      question: "Dân tộc chủ yếu sống ở đồng bằng Bắc Bộ là",
      answers: { A: "Tày", B: "Kinh", C: "Thái", D: "H'Mong" },
      correct: "B"
    },
    {
      question: "Cố đô Huế là công trình của thời vua nào",
      answers: { A: "Trần", B: "Lê", C: "Nguyễn", D: "Lý" },
      correct: "C"
    },
    {
      question: "Minecraft là trò chơi xuất hiện hình gì nhiều nhất",
      answers: { A: "tròn", B: "vuông", C: "tam giác", D: "chữ nhật" },
      correct: "B"
    },
    {
      question: "Có 10 hộp baby three. Trong đó chắc chắn có 3 con mắt nước, còn lại là còn mắt lác. Hỏi mở nhiều nhất bao nhiêu hộp để có 1 con mắt nước.",
      answers: { A: "1", B: "2", C: "3", D: "4" },
      correct: "D"
    },
    {
      question: "Tính kết quả phép tính: 12/5 x 5/3 x 7/4",
      answers: { A: "4", B: "5", C: "6", D: "7" },
      correct: "D"
    },
    {
      question: "Hình nào sau đây có nhiều góc vuông nhất",
      answers: { A: "Hình tròn", B: "Hình chữ nhật", C: "Hình tam giác", D: "Hình thoi" },
      correct: "B"
    },
    {
      question: "Phân số nào sau đây lớn hơn 1",
      answers: { A: "2314/4125", B: "1645/4524", C: "5345/9421", D: "4521/3687" },
      correct: "D"
    },
    {
      question: "Phân số nào sau đây nhỏ hơn 1",
      answers: { A: "357/159", B: "456/123", C: "254/698", D: "761/349" },
      correct: "C"
    },
    {
      question: "Thỏ đi xe đạp đến nhà bà cách 30km trong vòng 2h. Hỏi Thỏ đi xe với vận tốc bao nhiêu",
      answers: { A: "15km/h", B: "20km/h", C: "25km/h", D: "30km/h" },
      correct: "A"
    },
    {
      question: "Trong các phép tính dưới đây, phép tính có kết quả lớn nhất là:",
      answers: { A: "154 yến + 263 yến", B: "7 tấn – 3 tấn", C: "2 568 kg × 2", D: "231 tạ : 7" },
      correct: "C"
    },
    {
      question: "Xe thứ nhất chở được 840 kg gạo. Xe thứ hai chở được ít hơn xe thứ nhất 90 kg. Hỏi cả hai xe chở được bao nhiêu yến gạo?",
      answers: { A: "179 yến", B: "137 yến", C: "167 yến", D: "159 yến" },
      correct: "D"
    },
    {
      question: "Các nhóm chất dinh dưỡng có trong thức ăn gồm?",
      answers: { 
        A: "chất bột đường, chất đạm, chất béo, vi-ta-min, chất xơ, nước và chất khoáng",
        B: "chất bột đường, chất đạm, chất béo, vi-ta-min, nước và chất khoáng",
        C: "chất bột đường, chất đạm, chất béo, vi-ta-min và chất khoáng",
        D: "chất bột đường, chất đạm, vi-ta-min và chất khoáng"
      },
      correct: "C"
    },
    {
      question: "Vi-ta-min, chất khoáng có vai trò",
      answers: { 
        A: "giúp cơ thể phát triển và lớn lên",
        B: "cung cấp năng lượng cho các hoạt động sống",
        C: "dự trữ năng lượng, giúp cơ thể hấp thụ các vi-ta-min A, D, E, K",
        D: "tăng cường sức đề kháng, giúp cơ thể chống lại bệnh tật và giúp tiêu hóa tốt"
      },
      correct: "D"
    },
    {
      question: "Trong các thức ăn dưới đây, nhóm chất nào chứa nhiều chất béo",
      answers: { 
        A: "Cá, trứng, ức gà, thịt bò nạc",
        B: "Bơ, phô mai, sô cô la đen, dầu oliu",
        C: "Cơm, bánh mỳ, bún, phở",
        D: "Sữa, trái cây, rau xanh, các loại đậu"
      },
      correct: "B"
    },
    {
      question: "Trong các thức ăn dưới đây, nhóm chất nào chứa nhiều chất bột đường",
      answers: { 
        A: "Cá, trứng, ức gà, thịt bò nạc",
        B: "Bơ, phô mai, sô cô la đen, dầu oliu",
        C: "Cơm, bánh mỳ, bún, phở",
        D: "Sữa, trái cây, rau xanh, các loại đậu"
      },
      correct: "C"
    },
    {
      question: "Trong các thức ăn dưới đây, nhóm chất nào chứa nhiều chất đạm",
      answers: { 
        A: "Cá, trứng, ức gà, thịt bò nạc",
        B: "Bơ, phô mai, sô cô la đen, dầu oliu",
        C: "Cơm, bánh mỳ, bún, phở",
        D: "Sữa, trái cây, rau xanh, các loại đậu"
      },
      correct: "A"
    },
    {
      question: "Tại sao khi đun nước bằng ấm đồng và bằng ấm đất trên cùng một bếp lửa thì nước trong ấm đồng chóng sôi hơn",
      answers: { 
        A: "Vì đồng có khối lượng nhỏ hơn",
        B: "Vì đồng có khối lượng riêng nhỏ hơn",
        C: "Vì đồng mỏng hơn",
        D: "Vì đồng có tính dẫn nhiệt tốt hơn"
      },
      correct: "D"
    },
    {
      question: "Vì sao những ngày nắng nóng, ta cần tưới nhiều nước cho cây hơn",
      answers: { 
        A: "Vì lá cây thoát ít hơi nước hơn",
        B: "Vì lá cây thoát nhiều hơi nước hơn",
        C: "Vì lượng hơi nước do lá thoát ra không đổi",
        D: "Vì lá cây quang hợp nhiều hơn nên cần nước"
      },
      correct: "B"
    },
    {
      question: "Nước và chất khoáng có trong đất được thực vật lấy vào qua bộ phận nào",
      answers: { A: "Rễ", B: "Lá", C: "Thân", D: "Cả 3 đáp án trên" },
      correct: "A"
    },
    {
      question: "Tính từ sau thuộc nhóm nào: 'to, tròn, dày'",
      answers: { A: "Từ chỉ hương vị", B: "Từ chỉ hình dáng, kích thước", C: "Từ chỉ màu sắc", D: "Từ chỉ âm thanh" },
      correct: "B"
    },
    {
      question: "Đâu là tính từ chỉ không khí giờ ra chơi của học sinh",
      answers: { A: "Bình yên", B: "To lớn", C: "Xa xôi", D: "Náo nhiệt" },
      correct: "D"
    },
    {
      question: "Đâu là tính từ chỉ màu của mặt trời",
      answers: { A: "Đỏ rực", B: "Tóe lửa", C: "Nắng cháy", D: "Hồng hào" },
      correct: "A"
    },
    {
      question: "Đâu là từ chỉ tính chất của sự vật",
      answers: { A: "Cao", B: "Cũ", C: "Nhỏ", D: "Rộng" },
      correct: "A"
    },
    {
      question: "Đồng bằng Bắc Bộ chủ yếu là loại đất nào sau đây",
      answers: { A: "Đất phù sa", B: "Đất phèn", C: "Đất mặn", D: "Đất feralit" },
      correct: "A"
    },
    {
      question: "Đồng bằng Bắc Bộ được bồi đắp phù sa bởi những hệ thống sông nào sau đây",
      answers: { 
        A: "Sông Cả, sông Hồng",
        B: "Sông Hồng, sông Cửu Long",
        C: "Sông Hồng, sông Thái Bình",
        D: "Sông Thái Bình, sông Cả"
      },
      correct: "C"
    },
    {
      question: "Các bộ phận của nấm mũ gồm",
      answers: { 
        A: "mũ nấm, cành nấm, chân nấm",
        B: "đầu nấm, thân nấm, chân nấm",
        C: "mũ nấm, thân nấm, chân nấm",
        D: "đầu nấm, cành nấm, chân nấm"
      },
      correct: "C"
    },
    {
      question: "Bác Hồ đọc tuyên ngôn độc lập vào ngày 2 tháng 9 năm 1945. Vậy năm đó thuộc thế kỉ mấy",
      answers: { A: "Thế kỉ XX", B: "Thế kỉ XIX", C: "Thế kỉ XXI", D: "Thế kỉ XVIII" },
      correct: "A"
    },
    {
      question: "Làm tròn số nào dưới đây đến hàng nghìn để được số 420 000",
      answers: { A: "420 136", B: "421 367", C: "420 598", D: "421 698" },
      correct: "A"
    },
    {
      question: "Diện tích hình vuông có cạnh 200 cm là",
      answers: { A: "1m2", B: "2m2", C: "3m2", D: "4m2" },
      correct: "D"
    },
    {
      question: "Số trung bình cộng của số 31, 45, 66 và 90 là",
      answers: { A: "57", B: "58", C: "59", D: "60" },
      correct: "B"
    },
    {
      question: "Ông Hùng đem trứng ra chợ bán. Trong ba ngày, số trứng ông Hùng bán được lần lượt là 90 quả, 80 quả, 85 quả. Vậy trung bình mỗi ngày số trứng ông Hùng bán được là",
      answers: { A: "87 quả", B: "86 quả", C: "85 quả", D: "84 quả" },
      correct: "C"
    },
    {
      question: "Phân số 4/9 là phân số tối giản của những phân số nào dưới đây",
      answers: { A: "8/18; 20/45; 12/27", B: "7/12; 14/19; 20/40", C: "8/20; 10/15; 24/50", D: "20/46; 24/54; 8/18" },
      correct: "A"
    },
    {
      question: "Trong một buổi tiệc sinh nhật có 8 người tham dự và 1 chiếc bánh sinh nhật. Hỏi chia đều mỗi người được ăn bao nhiêu chiếc bánh",
      answers: { A: "9/8", B: "1/8", C: "1/9", D: "7/8" },
      correct: "B"
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
