let open_menu = document.querySelector(".btn_open_menu");
let close_menu = document.querySelector(".btn_close_menu");
let menu = document.querySelector(".menu");
const confirmModal = document.getElementById("confirmModal");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");
const confirmMessage = document.getElementById("confirmMessage");
let user = document.querySelector(".user");
let button = document.querySelector(".header .button");
let buttons = document.querySelector(".header .buttons");
let signout = document.querySelector(".signout");
// *********** Close & Open menu **********
open_menu.addEventListener("click", function () {
  menu.classList.toggle("active");
});
close_menu.addEventListener("click", function () {
  menu.classList.toggle("active");
});
// *********** Active class in nav **********
document.querySelectorAll(".menu li a").forEach((link) => {
  if (link.href === window.location.href) {
    link.parentElement.classList.add("active");
  }
});
// *********** GoToTop **********
$(".toTop").on("click", function () {
  $("body,html").animate({ scrollTop: 0 }, 2000);
});

// *********** Loading **********
$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").css("display", "none");
  });
});

buttons.style.display = "none";
if (localStorage.getItem("userName") != null) {
  button.style.display = "none";
  buttons.style.display = "flex";

  user.innerHTML = `welcome ${localStorage.getItem("userName")}`;
}
function Signout() {
  localStorage.removeItem("userName");
  button.style.display = "block";
  buttons.style.display = "none";
  window.location.href = "index.html";
}
// Function to show the confirmation modal
function showConfirmModal(message, onConfirm, onCancel) {
  // Set the confirmation message
  confirmMessage.innerText = message;

  // Display the modal
  confirmModal.classList.add("show");

  // Handle confirmation
  confirmYes.onclick = function () {
    confirmModal.classList.remove("show"); // Hide modal
    if (onConfirm) onConfirm(); // Execute confirm action
  };

  // Handle cancellation
  confirmNo.onclick = function () {
    confirmModal.classList.remove("show"); // Hide modal
    if (onCancel) onCancel(); // Execute cancel action
  };
}

// Example usage
document.querySelector(".signout").addEventListener("click", function () {
  showConfirmModal(
    "Are you sure you want to Signout?",
    function () {
      Signout();
    },
    function () {
      // Cancellation action
      return;
    }
  );
});
// *********** Swiper Testimonial **********
var swiper = new Swiper(".testimonial_items", {
  slidesPerView: 2,
  spaceBetween: 20,
  slidesPerGroup: 2,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    200: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
    700: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
  },
});
