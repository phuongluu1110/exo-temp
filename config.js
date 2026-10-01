/* =====================================================================
   👇👇👇  CHỈ CẦN SỬA PHẦN NÀY (mở file bằng Notepad / TextEdit) 👇👇👇
   - Ảnh: bỏ file ảnh vào thư mục "images", rồi ghi "images/ten-anh.jpg"
   - Nhạc: xem mục music bên dưới (chọn 1 trong 3 cách)
   - Dòng nào không cần thì để trống "" hoặc xoá dòng đó
   ===================================================================== */
var CONFIG = {
  groupName: "EXO-L",
  slogan: "Waiting is happiness",
  sloganVi: "Chờ đợi là hạnh phúc",

  // Ảnh nhóm 8 thành viên (ảnh ngang đẹp nhất). Thay ph(...) bằng "images/anh-nhom.jpg"
  groupPhoto: "nhom.jpg",
  groupCaption: "Eight stars, one light 🤍",

  // 8 thành viên: mỗi người 1 khung ảnh dọc. Thay ph(...) bằng "images/suho.jpg"...
  // (sub là dòng chữ nhỏ dưới tên, có thể xoá)
  members: [
    { name: "Suho",     sub: "Leader",  photo:  "suho.jpg" },
    { name: "Baekhyun", sub: "Vocal",   photo:  "baekhuyn.jpg" },
    { name: "Chanyeol", sub: "Rap",     photo:  "chanyeol.jpg" },
    { name: "D.O.",     sub: "Vocal",   photo:  "do.jpg" },
    { name: "Kai",      sub: "Dance",   photo:  "kai.jpg" },
    { name: "Sehun",    sub: "Maknae",  photo:  "sehun.jpg" },
    { name: "Xiumin",   sub: "Vocal",   photo:  "xiumin.jpg" },
    { name: "Chen",     sub: "Vocal",   photo:  "chen.jpg" }
  ],

  // Lời nhắn của bạn
  fan: {
    name: "Phượng",
    date: "11.10.2026",
    message: "Cảm ơn các anh vì đã cho em một điều để chờ đợi.\nDù bao lâu, em vẫn ở đây. 🤍"
  },

  // Bài nhạc của bạn — chọn 1 trong 3 cách (điền 1 dòng, các dòng còn lại để "")
  music: {
    title: "Peter Pan",
    artist: "EXO",
    src: "",      // Cách 1: file nhạc bỏ vào thư mục music, ví dụ "music/bai-hat.mp3"
    youtube: "",  // Cách 2: dán link YouTube, ví dụ "https://youtu.be/xxxxxxxxxxx"
    spotify: "https://open.spotify.com/track/0FF1qj8n4vZEzY54Kt5qh1"   // Cách 3 (dễ nhất): dán link Spotify, ví dụ "https://open.spotify.com/track/xxxx"
  },


  // KHUNG ẢNH CỦA BẠN: mỗi dòng là 1 khung. src: "" = khung trống (nét đứt, dấu +).
  // Đặt ảnh vào: src: "images/anh1.jpg". Thêm khung: copy 1 dòng. Bớt khung: xoá 1 dòng.
  gallery: [
    { src: "", caption: "Kỷ niệm 1" },
    { src: "", caption: "Kỷ niệm 2" },
    { src: "", caption: "Kỷ niệm 3" },
    { src: "", caption: "Kỷ niệm 4" },
    { src: "", caption: "Kỷ niệm 5" },
    { src: "", caption: "Kỷ niệm 6" }
  ],

  footer: "Made with 🤍 by EXO-L"
};
/* =====================  HẾT PHẦN CẦN SỬA  ===================== */

// Ảnh giữ chỗ để xem thử (xoá được sau khi có ảnh thật)
function ph(label, c1, c2, w, h) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="50%" font-family="sans-serif" font-size="' + Math.round(w / 12) + '" fill="#fff" text-anchor="middle" dominant-baseline="middle">' + label + '</text></svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
