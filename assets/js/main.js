/*=============== Variables  ===============*/
let FoodList = [];
const api_key = "ef31d622fb494d14be0d462acff88213";
let bookTop = $("#book").offset().top;
let items_image = document.querySelectorAll(".feature_card .item");
let gallery_items = document.querySelector(".gallery_items");
/*=============== Change BackGround  ===============*/
items_image.forEach((item, index) => {
  let i = (index % 5) + 1;
  item.style.backgroundImage = `url('assets/images/Features/${i}.jpg')`;
});
/*=============== onClick Functions  ===============*/
document.title = `Merida-home`;
/*=============== Fetch API  ===============*/
async function getFood() {
  try {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=6&query=pizza`
    );
    let req = await data.json();
    FoodList = req.results;
    console.log(FoodList);
    display();
  } catch (error) {
    console.error("Error fetching games:", error);
    gallery_items.innerHTML = `<p class="error">Failed to load games. Please try again later.</p>`;
  }
}
function display() {
  FoodList.forEach((ele) => {
    let item = document.createElement("div");
    item.classList.add("gallery_item");
    item.id = `${ele.id}`;
    item.innerHTML = `
    <a onclick="getDetails(${ele.id})" href="./details.html">
    <img src="${ele.image}" alt="" />
    </div>
    <div class="info">
    <p><span>Name:</span>${ele.title}</p>
    </div>
    </a>
  `;
    gallery_items.appendChild(item);
  });
}
getFood();
// Redirect to details page and store game ID
async function getDetails(id) {
  localStorage.setItem("foodId", id); // Store game ID in localStorage
  window.location.href = "details.html"; // Redirect to details page
}
/*=============== Scroll animation  ===============*/
$(window).on("scroll", function () {
  let scrollTop = $(window).scrollTop();
  if (scrollTop >= bookTop) {
    $(".header").removeClass("bg-white").addClass("bgs");
    $(".toTop").fadeIn(1000);
  } else {
    $(".header").addClass("bg-white").removeClass("bgs");
    $(".toTop").fadeOut(1000);
  }
});

/*=============== SWIPER  ===============*/
const swiperTravel = new Swiper(".travel__swiper", {
  grabCursor: true,
  slidesPerView: "auto",
  navigation: {
    nextEl: ".fa-angle-right",
    prevEl: ".fa-angle-left",
  },
  breakpoints: {
    700: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});
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
