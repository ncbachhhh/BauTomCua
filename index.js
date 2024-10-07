const rs_img1 = document.getElementById("rs_img1");
const rs_img2 = document.getElementById("rs_img2");
const rs_img3 = document.getElementById("rs_img3");

const start_btn = document.getElementById("start_btn");
const re_choose_btn = document.getElementById("re_choose_btn");

const checkSelect = localStorage.setItem("check", false);
const checkRoll = localStorage.setItem("checkRoll", false);
// SỰ KIỆN BẤM NÚT QUAY
start_btn.addEventListener("click", startEvent);

// SỰ KIỆN CHỌN
chooseImg();

// SỰ KIỆN BẤM RESET
re_choose_btn.addEventListener("click", resetTotal);

// ================================================================================================================

// HÀM QUAY
function randomImg(img) {
  let result,
    i = 0;
  let delayTime;
  delayTime = setInterval(() => {
    result = Math.floor(Math.random() * 6);
    switch (result) {
      case 0:
        img.src = "./imgs/bau.jpg";
        break;
      case 1:
        img.src = "./imgs/cua.jpg";
        break;
      case 2:
        img.src = "./imgs/tom.jpg";
        break;
      case 3:
        img.src = "./imgs/ca.jpg";
        break;
      case 4:
        img.src = "./imgs/huou.jpg";
        break;
      case 5:
        img.src = "./imgs/ga.jpg";
        break;
    }
    i++;
    if (i >= 100) {
      clearInterval(delayTime);
    }
  }, 20);
}

// HÀM CHỌN
function chooseImg() {
  const targetImgContainer = document.querySelectorAll(".choose_img");
  let spanTotal = document.querySelectorAll(".spanTotal");
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
              alert("Đã chọn 3 hình");
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
    randomImg(rs_img1);
    randomImg(rs_img2);
    randomImg(rs_img3);
    setTimeout(() => {
      localStorage.setItem("checkRoll", false);
    }, 2500);
  }
}
