const rs_img1 = document.getElementById("rs_img1");
const rs_img2 = document.getElementById("rs_img2");
const rs_img3 = document.getElementById("rs_img3");

const start_btn = document.getElementById("start_btn");
const re_choose_btn = document.getElementById("re_choose_btn");

const checkSelect = localStorage.setItem("check", false);
const checkRoll = localStorage.setItem("checkRoll", false);

let arr = [];

// SỰ KIỆN BẤM NÚT QUAY
start_btn.addEventListener("click", startEvent);

// SỰ KIỆN CHỌN
chooseImg();

// SỰ KIỆN BẤM RESET
re_choose_btn.addEventListener("click", resetTotal);

// ================================================================================================================

// HÀM QUAY
function randomImg(img) {
  let result;
  let i = 0;
  let delayTime;
  let finalResult = ""; // Thêm biến để lưu kết quả cuối cùng

  delayTime = setInterval(() => {
    result = Math.floor(Math.random() * 6);
    switch (result) {
      case 0:
        img.src = "./imgs/bau.jpg";
        finalResult = "bầu";
        break;
      case 1:
        img.src = "./imgs/cua.jpg";
        finalResult = "cua";
        break;
      case 2:
        img.src = "./imgs/tom.jpg";
        finalResult = "tôm";
        break;
      case 3:
        img.src = "./imgs/ca.jpg";
        finalResult = "cá";
        break;
      case 4:
        img.src = "./imgs/huou.jpg";
        finalResult = "hươu";
        break;
      case 5:
        img.src = "./imgs/ga.jpg";
        finalResult = "gà";
        break;
    }
    i++;
    if (i >= 100) {
      clearInterval(delayTime);
      arr.push(finalResult);
      localStorage.setItem("result", JSON.stringify(arr.sort()));
    }
  }, 20);
  arr = [];
}

// HÀM CHỌN
function chooseImg() {
  const targetImgContainer = document.querySelectorAll(".choose_img");
  let spanTotal = document.querySelectorAll(".spanTotal");
  let selectItem = document.querySelectorAll(".selectItem");
  let calcTotal = 0;
  resetTotal();

  for (let i = 0; i < targetImgContainer.length; i++) {
    targetImgContainer[i].addEventListener("click", function () {
      if (JSON.parse(localStorage.getItem("checkRoll")) == false) {
        if (JSON.parse(localStorage.getItem("check")) == false) {
          spanTotal[i].value += 1;
          spanTotal[i].textContent = spanTotal[i].value;
          calcTotal = 0;

          for (let i = 0; i < spanTotal.length; i++) {
            calcTotal += spanTotal[i].value;
          }
          if (calcTotal >= 3) {
            localStorage.setItem("check", true);
            return;
          }
        }
      }
    });
  }
}

// HÀM NÚT RESET
function resetTotal() {
  if (JSON.parse(localStorage.getItem("checkRoll")) == false) {
    let spanTotal = document.querySelectorAll(".spanTotal");
    for (let i = 0; i < spanTotal.length; i++) {
      spanTotal[i].value = 0;
      spanTotal[i].textContent = spanTotal[i].value;
      localStorage.setItem("check", false);
    }
  }
}

// HÀM NÚT QUAY
function startEvent() {
  if (JSON.parse(localStorage.getItem("checkRoll")) == false) {
    localStorage.setItem("checkRoll", true);

    // Lưu kết quả từ mỗi lần quay
    let result1 = randomImg(rs_img1);
    let result2 = randomImg(rs_img2);
    let result3 = randomImg(rs_img3);
    getUserSelection();

    setTimeout(() => {
      localStorage.setItem("checkRoll", false);
      checkUserSelection();
    }, 2500);
  }
}

// HÀM LẤY LỰA CHỌN
function getUserSelection() {
  let checkArr = [];
  document.querySelectorAll(".choose_img").forEach((item, index) => {
    let spanTotal = item.querySelector(".spanTotal").value; // Lấy số lần chọn
    if (spanTotal > 0) {
      for (let i = 0; i < spanTotal; i++) {
        let selectedItem = item.querySelector(".selectItem").textContent; // Lấy tên mục đã chọn
        checkArr.push(selectedItem);
      }
    }
  });
  localStorage.setItem("userSelection", JSON.stringify(checkArr.sort()));
}

// HÀM LẤY KẾT QUẢ
function checkUserSelection() {
  let userSelect = JSON.parse(localStorage.getItem("userSelection"));
  let rollResult = JSON.parse(localStorage.getItem("result"));

  for (let i = 0; i < 3; i++) {
    if (userSelect[i] != rollResult[i]) {
      console.log(
        `Bạn đã sai với kết quả ${rollResult[0]} , ${rollResult[1]} , ${rollResult[2]}`
      );

      return false;
    }
  }
  console.log(
    `Bạn đã đúng với kết quả ${rollResult[0]} , ${rollResult[1]} , ${rollResult[2]}`
  );
}
