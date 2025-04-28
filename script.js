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
      question: "Bạn hãy cho biết tỉnh Phước Long được giải phóng vào thời gian nào?",
      answers: {
        A: "Ngày 6/1/1975",
        B: "Ngày 6/2/1975",
        C: "Ngày 6/3/1975   ",
        D: "Ngày 6/4/1975",
      },
      correct: "A",
    },
    {
      question: "Bạn hãy cho biết chiếc xe tăng dẫn đầu đánh chiếm Dinh độc lập mang số bao nhiêu?",
      answers: { A: "390", B: "429", C: "205", D: "309" },
      correct: "A",
    },
    {
      question: "Bạn hãy cho biết tên của người chiến sĩ cắm lá cờ đầu tiên trên nóc Dinh Độc Lập.",
      answers: {
        A: "Bùi Quang Thận",
        B: "Lữ Văn Hỏa",
        C: "Thái Bá Minh",
        D: "Nguyễn Văn Kỷ",
      },
      correct: "A",
    },
    {
      question: "Bạn hãy cho biết Hiệp định Paris được ký vào thời gian nào??",
      answers: {
        A: "26/1/1973",
        B: "27/1/1973",
        C: "28/1/1973",
        D: "29/1/1973",
      },
      correct: "B",
    },
    {
      question:
        "Bạn hãy cho biết lời kêu gọi cả nước của Bác Hồ: “Dù phải chiến đấu 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa, chúng ta cũng kiên quyết chiến đấu đến thắng lợi hoàn toàn” được ra đời vào thời gian nào?",
      answers: {
        A: "Ngày 5/6/1965",
        B: "Ngày 20/7/1965",
        C: "Ngày 25/6/1965",
        D: "Ngày 26/5/1965",
      },
      correct: "B",
    },
    {
      question: "Lúc 10h45p, ngày 30/4/1975, diễn ra sự kiện cơ bản nào ở Sài Gòn?",
      answers: {
        A: "Dương Văn Minh đầu hàng",
        B: "Xe tăng tiến vào Dinh Độc Lập",
        C: "Chiến dịch Hồ Chí Minh toàn thắng",
        D: "Cắm cờ trên nóc Dinh Độc Lập",
      },
      correct: "B",
    },
    {
      question: "Bạn hãy cho biết tên của một chiến dịch đã mở màn cho đại thắng mùa xuân 1975?",
      answers: {
        A: "Chiến dịch Tây Nguyên",
        B: "Chiến dịch Hồ Chí Minh",
        C: "Chiến dịch Trị – Thiên",
        D: "Chiến dịch Huế – Đà Nẵng",
      },
      correct: "A",
    },
    {
      question: "“Còn cái lai quần cũng đánh” là câu nói nổi tiếng của ai?",
      answers: {
        A: "Nguyễn Thị Định",
        B: "Nguyễn Thị Út",
        C: "Nguyễn Thị Bình",
        D: "Lê Thị Hồng Gấm",
      },
      correct: "B",
    },
    {
      question:
        "Địa danh nào được mang tên “Cánh Cửa Thép” cuối cùng bảo vệ Sài Gòn từ hướng Đông của Việt Nam Cộng hòa?",
      answers: { A: "Trảng Bom", B: "Biên Hòa", C: "Xuân Lộc", D: "Huế" },
      correct: "C",
    },
    {
      question:
        "Tỉnh cuối cùng của miền Nam được giải phóng trong cuộc Tổng tiến công xuân 1975 là tỉnh nào?",
      answers: {
        A: "Tỉnh Châu Đốc",
        B: "Tỉnh Cà Mau",
        C: "Tỉnh Kiên Giang",
        D: "Tỉnh Bạc Liêu",
      },
      correct: "A",
    },
    {
      question: "Bạn hãy cho biết tên của đồng chí lái xe tăng húc đổ cổng Dinh Độc Lập.",
      answers: {
        A: "Lữ Văn Hoả",
        B: "Ngô Viết Thụ",
        C: "Hoàng Cao Đại",
        D: "Nguyễn Hữu Hạnh",
      },
      correct: "B",
    },
    {
      question: "Tên ngôi trường đồng chí Trần Phú đã theo học tiểu học?",
      answers: {
        A: "Quốc học Huế",
        B: "Pháp – Việt Đông Ba",
        C: "Pháp – Việt Cao Xuân Dục",
        D: "Dục Thanh",
      },
      correct: "A",
    },
    {
      question: "Phương châm đánh mà Bộ Chính trị đề ra trong kế hoạch giải phóng miền Nam là gì?",
      answers: {
        A: "“Đánh nhanh, thắng nhanh”",
        B: "“Tích cực, chủ động, cơ động, linh hoạt”",
        C: "“Đánh ăn chắc, đánh chắc thắng”",
        D: "“Thần tốc, táo bạo, bất ngờ, chắc thắng”",
      },
      correct: "D",
    },
    {
      question: "Lúc 10h45p, ngày 30/4/1975, diễn ra sự kiện cơ bản nào ở Sài Gòn?",
      answers: {
        A: "Dương Văn Minh đầu hàng",
        B: "Xe tăng tiến vào Dinh Độc Lập",
        C: "Chiến dịch Hồ Chí Minh toàn thắng",
        D: "Cắm cờ trên nóc Dinh Độc Lập",
      },
      correct: "B",
    },
    {
      question:
        "Chiến dịch giải phóng Sài Gòn – Gia Định chính thức đổi tên là chiến dịch Hồ Chí Minh vào thời gian nào?",
      answers: {
        A: "26/3/1975",
        B: "29/3/1975",
        C: "14/4/1975",
        D: "30/4/1975",
      },
      correct: "C",
    },
    {
      question:
        "Vị tổng thống cuối cùng của chính quyền Mĩ – Ngụy, đã đầu hàng vô điều kiện khi quân ta tiến vào Dinh Độc Lập?",
      answers: {
        A: "Ngô Đình Diệm",
        B: "Nguyễn Văn Thiệu",
        C: "Dương Văn Minh",
        D: "Trần Văn Hương",
      },
      correct: "C",
    },
    {
      question:
        "Bạn hãy cho biết trong trận “Điện Biên Phủ trên không” – đòn quyết định đập tan “Uy thế không lực Hoa Kỳ” trên bầu trời Hà Nội, quân và dân ta đã tiêu diệt bao nhiêu chiếc máy bay của địch.",
      answers: { A: "85 chiếc", B: "83 chiếc", C: "82 chiếc", D: "81 chiếc" },
      correct: "D",
    },
    {
      question:
        "Có một thành phố được giải phóng vào ngày 26/3/1975 trùng với ngày thành lập Đoàn TNCS Hồ Chí Minh. Bạn hãy cho biết đó là thành phố nào?",
      answers: { A: " Đà Nẵng", B: "Huế", C: "Đắk Lắk", D: "Buôn Mê Thuộc" },
      correct: "B",
    },
    {
      question:
        "Ai là người đã nói câu “Phải giữ cho được Xuân Lộc, mất Xuân Lộc là mất Sài Gòn” trước chiến dịch Xuân Lộc?",
      answers: {
        A: "Tổng thống Nguyễn Văn Thiệu",
        B: "Tướng Mỹ Uây-len (Weyand)",
        C: "Tướng Lê Minh Đảo",
        D: "Đại tướng Võ Nguyên Giáp",
      },
      correct: "B",
    },
    {
      question: "Chiếc xe tăng đầu tiên tiến vào giải phóng Long Khánh mang số hiệu bao nhiêu?",
      answers: { A: "A452", B: "C341", C: "C741", D: "C714" },
      correct: "D",
    },
    {
      question:
        "Lực lượng Quân đội Nhân dân Việt Nam tham chiến trong trận Xuân Lộc do ai làm Tư Lệnh?",
      answers: {
        A: "Thiếu tướng Hoàng Thế Thiện",
        B: "Đại tướng Tô Lâm",
        C: "Thiếu tướng Hoàng Cầm",
        D: "Thiếu tướng Ngô Quang Trưởng",
      },
      correct: "C",
    },
    {
      question:
        " “Chiến thắng Xuân Lộc (từ 9 – 21/4/1975) làm rung chuyển toàn bộ hệ thống phòng thủ của địch xung quanh Sài Gòn, làm cho tinh thần quân địch càng thêm suy sụp. Tin chiến thắng đã làm nức lòng nhân dân cả nước” Câu nói trên là của ai?",
      answers: {
        A: "Chủ tịch nước Nguyễn Minh Triết",
        B: "Thủ tướng Nguyễn Tấn Dũng",
        C: "Đại tướng Võ Nguyễn Giáp",
        D: "Chủ tịch Quốc Hội Nguyễn Thị Kim Ngân",
      },
      correct: "C",
    },
    {
      question: "Tên nữ chiến sĩ biệt động dẫn Trung đoàn 24 đánh vào Sân bay Tân Sơn Nhất?",
      answers: {
        A: "Nguyễn Thị Trung Kiên",
        B: "Vũ Minh Nghĩa",
        C: "Lê Thị Riêng",
        D: "Nguyễn Thị Mai",
      },
      correct: "A",
    },
    {
      question:
        "Sau khi hạ cờ “ba sọc” từ dinh Độc Lập, anh hùng Bùi Quang Thận giữ lại làm gì với nó?",
      answers: { A: "Giẻ lau", B: "Làm chăn", C: "Đốt", D: "Không làm gì" },
      correct: "B",
    },
    {
      question:
        "Chủ tịch Hồ Chí Minh ký văn bản nào quy định quyền được nghỉ việc ngày Quốc tế Lao động 1/5 và được hưởng lương như ngày làm việc?",
      answers: {
        A: "Sắc lệnh 40",
        B: "Sắc lệnh 36",
        C: "Sắc lệnh 46",
        D: "Sắc lệnh 56",
      },
      correct: "D",
    },
    {
      question:
        "Ban bí thư quyết định lấy tháng 5 hằng năm là tháng Công nhân diễn ra với mục đích?",
      answers: {
        A: "Mục tiêu chăm lo, bảo vệ quyền, lợi ích hợp pháp, chính đáng của công nhân, viên chức, lao động; xây dựng quan hệ lao động hài hòa, ổn định tiến bộ trong doanh nghiệp",
        B: "Mục tiêu chăm lo, bảo vệ quyền, lợi ích hợp pháp, chính đáng của công nhân, viên chức, lao động; xây dựng quan hệ, tuân theo mệnh lệnh cấp trên, tránh xung đột",
        C: "Mục tiêu ổn định tiến bộ trong doanh nghiệp, đẩy mạnh tiến bộ, tăng gấp đôi sức lao động của công nhân đạt mục tiêu xuất khẩu.",
        D: "Tất cả đều đúng.",
      },
      correct: "A",
    },
    {
      question:
        "Người Pháp lấy hoa nào làm biểu tượng của ngày 1/5 để tưởng nhớ 10 người bị bắn chết trong một cuộc biểu tình của công nhân ở miền Bắc nước này?",
      answers: {
        A: "Hoa hướng dương",
        B: "Hoa linh lan",
        C: "Hoa hồng",
        D: "Hoa súng trắng",
      },
      correct: "B",
    },
    {
      question: "Ý nghĩa của ngày Giải phóng miền Nam thống nhất đất nước 30/4 là gì?",
      answers: {
        A: "Chiến thắng ngày 30/4/1975 là thành quả vĩ đại trong sự nghiệp giải phóng dân tộc, giải phóng xã hội do Đảng ta và chủ tịch Hồ Chí Minh lãnh đạo",
        B: "Chiến thắng ngày 30/4/1975 là trang sử hào hùng, chói lọi trên con đường dựng nước và giữ nước hàng ngàn năm lịch sử của dân tộc",
        C: "Chiến thắng ngày 30/4/1975 đã chấm dứt ách thống trị của chủ nghĩa đế quốc và chế độ phong kiến ở nước ta, hoàn thành cách mạng dân tộc dân chủ nhân dân, thống nhất đất nước, đồng thời mở ra một kỷ nguyên mới của dân tộc, cả nước cùng tiến lên CNXH",
        D: "Giải phóng hoàn toàn miền Nam thống nhất đất nước non sông về một dải ",
      },
      correct: "C",
    },
    {
      question:
        "Tinh thần “Đi nhanh đến, đánh nhanh thắng” và khí thế “thần tốc, táo bạo, bất ngờ, chắc thắng”. Đó là tinh thần và khí thế ra quân của dân tộc ta trong?",
      answers: {
        A: "Chiến dịch Tây Nguyên",
        B: "Chiến dịch Huế-Đà Nẵng",
        C: "Chiến dịch Hồ Chí Minh lịch sử",
        D: "Tất cả các chiến dịch trên",
      },
      correct: "C",
    },
    {
      question: "Lúc 10h 30 phút ngày 30-4-1975, diễn ra sự kiện cơ bản nào ở Sài Gòn?",
      answers: {
        A: "Dương Văn Minh kêu gọi “ngừng bắn để điều đình giao chính quyền”",
        B: "Xe tăng ta tiến vào dinh độc lập ngụy",
        C: "Lá cờ cách mạng tung bay trên phủ tổng thống ngụy",
        D: "Chiến dịch Hồ Chí Minh toàn thắng",
      },
      correct: "B",
    },
    {
      question: "Ý nghĩa lớn nhất của chiến dịch Tây Nguyên là:",
      answers: {
        A: "Là nguồn cổ vũ mạnh mẽ để quân dân ta tiến lên giải phóng hoàn toàn miền Nam",
        B: "Làm cho tinh thần địch hốt hoảng, mất khả năng chiến đấu",
        C: "Chuyển cuộc kháng chiến chống Mĩ cứu nước sang giai đoạn mới: Từ tiến công chiến lược chuyển phát triển thành tổng tiến công chiến lược trên toàn miền Nam",
        D: "Tiếp thêm sức mạnh cho quân và dân ta",
      },
      correct: "C",
    },
    {
      question: "Bạn hãy cho biết chiếc xe tăng dẫn đầu đánh chiếm Dinh độc lập mang số bao nhiêu?",
      answers: { A: "390", B: "429", C: "205", D: "309" },
      correct: "A",
    },
    {
      question: "Bạn hãy cho biết chiến dịch Tây Nguyên diễn ra trong thời gian nào?",
      answers: {
        A: "Từ 4/3 đến 3/4/1975",
        B: "Từ 4/3 đến 7/3/1975",
        C: "Từ 7/3 đến 3/4/1975",
        D: "Từ 16/3 đến 15/3/1975",
      },
      correct: "A",
    },
    {
      question: "Đồng chí Trần Phú hi sinh ở độ tuổi bao nhiêu?",
      answers: {
        A: "27 tuổi (1904 – 1931)",
        B: "28 tuổi (1904 – 1932)",
        C: "29 tuổi (1904 – 1933)",
        D: "30 tuổi (1904 – 1934)",
      },
      correct: "A",
    },
    {
      question: "Chiến dịch giải phóng Sài Gòn – Gia Định còn có tên gọi khác là gì?",
      answers: {
        A: "Chiến dịch Hồ Chí Minh",
        B: "Chiến dịch Tây Nguyên",
        C: "Chiến dịch Điện Biên Phủ",
        D: "Chiến dịch Huế – Đà Nẵng",
      },
      correct: "A",
    },
    {
      question: "Bạn hãy cho biết chiếc xe tăng dẫn đầu đánh chiếm Dinh độc lập mang số bao nhiêu?",
      answers: { A: "390", B: "429", C: "205", D: "309" },
      correct: "A",
    },
    {
      question: "Tên ngôi trường Đại học ở Liên Xô mà đồng chí Trần Phú đã theo học?",
      answers: {
        A: "Đại học Phương Đông",
        B: "Đại học Phương Tây",
        C: "Đại học Tổng hợp",
        D: "Đại học Liên Xô",
      },
      correct: "A",
    },
    {
      question:
        "Tỉnh cuối cùng của miền Nam được giải phóng trong cuộc Tổng tiến công xuân 1975 là tỉnh nào?",
      answers: {
        A: "Tỉnh Châu Đốc",
        B: "Tỉnh An Giang",
        C: "Tỉnh Kiên Giang",
        D: "Tỉnh Hậu Giang",
      },
      correct: "A",
    },
    {
      question: "Chiến dịch mở màn cho cuộc Tổng tiến công và nổi dậy Xuân 1975 là chiến dịch nào?",
      answers: {
        A: "Chiến dịch Tây Nguyên",
        B: "Chiến dịch Điện Biên Phủ",
        C: "Chiến dịch Hồ Chí Minh",
        D: "Chiến dịch Huế - Đà Nẵng",
      },
      correct: "A",
    },
    {
      question: "Chiến dịch Xuân Lộc được diễn ra trong bao nhiêu ngày đêm?",
      answers: {
        A: "9 ngày đêm (12/4 – 21/4/1975)",
        B: "10 ngày đêm (11/4 – 21/4/1975)",
        C: "12 ngày đêm (09/4 – 21/4/1975)",
        D: "8 ngày đêm (13/4 – 21/4/1975)",
      },
      correct: "C",
    },
    {
      question: "Ai là tác giả của bài hát “Đất nước trọn niềm vui”?",
      answers: {
        A: "Nhạc sĩ Hoàng Hà",
        B: "Nhạc sĩ Hoàng Hòa",
        C: "Nhạc sĩ Nam Cao",
        D: "Nhạc sĩ Trịnh Công Sơn",
      },
      correct: "A",
    },
    {
      question:
        "Từ lúc quân ta được lệnh nổ súng mở đầu cho chiến dịch Hồ Chí Minh đến khi giải phong Sài Gòn – Gia Định là bao nhiêu ngày?",
      answers: { A: " 22 ngày", B: "5 ngày", C: "10 ngày", D: "15 ngày" },
      correct: "B",
    },
    {
      question:
        "Xuân Lộc một căn cứ phòng thủ trọng yếu của địch để bảo vệ Sài Gòn từ phía Đông, đã bị quân ta phá vỡ vào thời gian nào?",
      answers: {
        A: "9-4-1975",
        B: "21-4-1975",
        C: "16-4-1975",
        D: "17-4-1975",
      },
      correct: "B",
    },
    {
      question:
        "Tinh thần “Đi nhanh đến, đánh nhanh thắng” và khí thế “thần tốc, táo bạo, bất ngờ, chắc thắng”. Đó là tinh thần và khí thế ra quân của dân tộc ta trong?",
      answers: {
        A: "Chiến dịch Tây Nguyên",
        B: "Chiến dịch Huế-Đà Nẵng",
        C: " Chiến dịch Hồ Chí Minh lịch sử",
        D: "Tất cả các chiến dịch trên",
      },
      correct: "C",
    },
    {
      question:
        "“Thời cơ chiến lược đã đến, ta có điều kiện hoàn thành quyết tâm giải phóng miền Nam…..Đó là nghị quyết nào của Đảng ta?",
      answers: {
        A: "Hội nghị lần thứ 21 của Trung ương Đảng vào tháng 7-1973",
        B: "Hội nghị Bộ Chính trị họp từ 30-9 đến 7-10-1974",
        C: "Hội nghị Bộ chính trị mở rộng họp từ 18-12-1974 đến 8-1-1975",
        D: "Nghị quyết của Bộ Chính trị ngày 25-3-1975",
      },
      correct: "D",
    },
    {
      question: "Sau khi thất thủ ở Tây Nguyên, Huế, Đà Nẵng, địch phải lui về phòng thủ ở đâu?",
      answers: { A: "Cam Ranh", B: "Nha Trang", C: "Phan Rang", D: "Xuân Lộc" },
      correct: "C",
    },
    {
      question:
        "Tính từ lúc quân ta giải phóng Quảng Trị đến lúc giải phóng Đà Nẵng là bao nhiêu ngày?",
      answers: { A: "15 ngày", B: "20 ngày", C: "8 ngày", D: "10 ngày" },
      correct: "C",
    },
    {
      question: "Ý nghĩa lớn nhất của chiến dịch Tây Nguyên là:",
      answers: {
        A: "Là nguồn cổ vũ mạnh mẽ để quân dân ta tiến lên giải phóng hoàn toàn miền Nam",
        B: "Làm cho tinh thần địch hốt hoảng, mất khả năng chiến đấu",
        C: "Chuyển cuộc kháng chiến chống Mĩ cứu nước sang giai đoạn mới: Từ tiến công chiến lược chuyển phát triển thành tổng tiến công chiến lược trên toàn miền Nam",
        D: "Đó là thắng lợi lớn nhất, oanh liệt nhất trong cuộc kháng chiến chống Mĩ cứu nước của nhân dân ta",
      },
      correct: "C",
    },
    {
      question: "Kết quả nào dưới đây thuộc kết quả của chiến dịch Tây Nguyên?",
      answers: {
        A: "Tiêu diệt toàn bộ quân đoàn 2 trấn giữ Tây Nguyên, giải phóng toàn bộ Tây Nguyên rộng lớn với 60 vạn dân",
        B: "Tiêu diệt toàn bộ quân đoàn 4 trấn giữ Tây Nguyên và giải phóng toàn bộ Buôn Mê Thuột",
        C: "Tiêu diệt toàn bộ quân đoàn 3 trấn giữ Tây Nguyên và giải phóng toàn bộ Playku, Kontum",
        D: "Tiêu diệt phần lớn quân đoàn 2 trấn giữ Tây Nguyên và giải phóng vùng diện tích Tây Nguyên rộng lớn với 4 vạn dân",
      },
      correct: "A",
    },
    {
      question: "Kết quả nào dưới đây thuộc kết quả của chiến dịch Tây Nguyên?",
      answers: {
        A: "Tiêu diệt toàn bộ quân đoàn 2 trấn giữ Tây Nguyên, giải phóng toàn bộ Tây Nguyên rộng lớn với 60 vạn dân ",
        B: "Tiêu diệt toàn bộ quân đoàn 4 trấn giữ Tây Nguyên và giải phóng toàn bộ Buôn Mê Thuột",
        C: "Tiêu diệt toàn bộ quân đoàn 3 trấn giữ Tây Nguyên và giải phóng toàn bộ Playku, Kontum",
        D: "Tiêu diệt phần lớn quân đoàn 2 trấn giữ Tây Nguyên và giải phóng vùng diện tích Tây Nguyên rộng lớn với 4 vạn dân",
      },
      correct: "A",
    },

    // ... tiếp tục thêm cho đủ 100 câu ...
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
