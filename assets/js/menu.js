let menuInput = document.getElementById("menu_input");
const api_key = "ef31d622fb494d14be0d462acff88213";
let menuButton = document.getElementById("menu_button");
let menu_container = document.getElementById("menu_container");
let pagination_container = document.getElementById("pagination");
let itemsPerPageSelect = document.getElementById("itemsPerPage");
let menuList = [];
let currentPage = 1;
let itemsPerPage = 12;
document.title = `Merida-menu`;
itemsPerPageSelect.addEventListener("change", (e) => {
  itemsPerPage = parseInt(e.target.value);
  currentPage = 1;
  displayRecipes(menuList);
  displayPagination();
});

async function getAllRecipes(type = menuInput.value.trim() || "pizza") {
  try {
    localStorage.removeItem("menuList");
    let totalRecipes = 300;
    let fetchedRecipes = [];
    let numberPerRequest = 100;

    for (let offset = 0; offset < totalRecipes; offset += numberPerRequest) {
      let data = await fetch(
        `https://api.spoonacular.com/food/menuItems/search?apiKey=${api_key}&query=${type}&number=${numberPerRequest}&offset=${offset}`
      );

      let req = await data.json();
      fetchedRecipes = fetchedRecipes.concat(req.menuItems);
      console.log(req);
    }

    menuList = fetchedRecipes;
    localStorage.setItem("menuList", JSON.stringify(menuList));
    currentPage = 1;
    displayRecipes(menuList);
    displayPagination();
  } catch (error) {
    console.error("Fetch error:", error);
    menu_container.innerHTML = "<p>Failed to fetch data.</p>";
  }
}

function displayRecipes(recipes) {
  menu_container.innerHTML = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedRecipes = recipes.slice(start, end);

  paginatedRecipes.forEach((ele) => {
    if (ele) {
      let item = document.createElement("div");
      item.classList.add("menu_item");
      let imageUrl = ele.image
        ? `https://spoonacular.com/recipeImages/${ele.id}-312x231.jpg`
        : "../images/About_images/food.png";

      item.innerHTML = `
        <a onclick="getDetails(${ele.id})" href="./details.html">
          <img src="${imageUrl}" alt="${ele.title}" />
        </a>
        <div class="info">
          <p><span>Name:</span>${ele.title}</p>
        </div>
      `;
      menu_container.appendChild(item);
    }
  });
}

function displayPagination() {
  pagination_container.innerHTML = "";
  let totalPages = Math.ceil(menuList.length / itemsPerPage);

  // Add "First" button
  let firstButton = document.createElement("button");
  firstButton.innerText = "First";
  firstButton.classList.add("pagination-button");
  if (currentPage === 1) {
    firstButton.classList.add("disabled");
    firstButton.disabled = true;
  }
  firstButton.addEventListener("click", () => {
    currentPage = 1;
    displayRecipes(menuList);
    displayPagination();
  });
  pagination_container.appendChild(firstButton);

  // Add "..." before the current page if necessary
  if (currentPage > 3) {
    let dots = document.createElement("button");
    dots.innerText = "...";
    dots.classList.add("pagination-button", "disabled");
    dots.disabled = true; // Disable the ellipsis button
    pagination_container.appendChild(dots);
  }

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 4); // Show pages around the current page (1 page before and after)
    i++
  ) {
    let button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");
    if (i === currentPage) {
      button.classList.add("active");
      button.disabled = true; // Disable the current page button
    }
    button.addEventListener("click", () => {
      currentPage = i;
      displayRecipes(menuList);
      displayPagination();
    });
    pagination_container.appendChild(button);
  }

  // Add "..." after the current page if necessary
  if (currentPage < totalPages - 2) {
    let dots = document.createElement("button");
    dots.innerText = "...";
    dots.classList.add("pagination-button", "disabled");
    dots.disabled = true; // Disable the ellipsis button
    pagination_container.appendChild(dots);
  }

  // Add "Last" button
  let lastButton = document.createElement("button");
  lastButton.innerText = "Last";
  lastButton.classList.add("pagination-button");
  if (currentPage === totalPages) {
    lastButton.classList.add("disabled");
    lastButton.disabled = true; // Disable the "Last" button when on the last page
  }
  lastButton.addEventListener("click", () => {
    currentPage = totalPages;
    displayRecipes(menuList);
    displayPagination();
  });
  pagination_container.appendChild(lastButton);
}

function checkLocalStorageForMenuList() {
  const storedMenuList = localStorage.getItem("menuList");
  if (storedMenuList) {
    menuList = JSON.parse(storedMenuList);
    displayRecipes(menuList);
    displayPagination();
  } else {
    getAllRecipes();
  }
}

document.addEventListener("DOMContentLoaded", checkLocalStorageForMenuList);

async function getDetails(id) {
  localStorage.setItem("foodId", id);
  window.location.href = "details.html";
}

menuButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await getAllRecipes();
});
