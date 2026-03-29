let menuInput = document.getElementById("menu_input");
let menuButton = document.getElementById("menu_button");
let menuContainer = document.getElementById("menu_container");
let paginationContainer = document.getElementById("pagination");
let itemsPerPageSelect = document.getElementById("itemsPerPage");

const api_key = "ef31d622fb494d14be0d462acff88213";

let menuList = [];
let currentPage = 1;
let itemsPerPage = 12;

// Items per page change
itemsPerPageSelect.addEventListener("change", (e) => {
  itemsPerPage = parseInt(e.target.value);
  currentPage = 1;
  displayRecipes(menuList);
  displayPagination();
});

// Fetch all recipes
async function getAllRecipes(type = menuInput.value.trim() || "pizza") {
  try {
    localStorage.removeItem("menuList");
    let totalRecipes = 300;
    let fetchedRecipes = [];
    let numberPerRequest = 100;

    for (let offset = 0; offset < totalRecipes; offset += numberPerRequest) {
      let data = await fetch(
        `https://api.spoonacular.com/food/menuItems/search?apiKey=${api_key}&query=${type}&number=${numberPerRequest}&offset=${offset}`,
      );
      let req = await data.json();
      fetchedRecipes = fetchedRecipes.concat(req.menuItems);
    }

    menuList = fetchedRecipes;
    localStorage.setItem("menuList", JSON.stringify(menuList));
    currentPage = 1;
    displayRecipes(menuList);
    displayPagination();
  } catch (error) {
    console.error("Fetch error:", error);
    menuContainer.innerHTML = "<p>Failed to fetch data.</p>";
  }
}

// Display recipes
function displayRecipes(recipes) {
  menu_container.innerHTML = "";
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedRecipes = recipes.slice(start, end);

  paginatedRecipes.forEach((ele) => {
    if (ele) {
      let item = document.createElement("div");
      // Use "menu_item" to match your CSS
      item.classList.add("menu_item");

      let imageUrl = ele.image
        ? `https://spoonacular.com/recipeImages/${ele.id}-312x231.jpg`
        : "https://placehold.co/300x200";

      item.innerHTML = `
        <div class="image_container">
          <img onclick="getDetails(${ele.id})" src="${imageUrl}" alt="${ele.title}" />
          ${!ele.image ? '<span class="no_image">No Image</span>' : ""}
        </div>
        <div class="info">
          <h3>${ele.title}</h3>
          ${ele.restaurantChain ? `<p><span>Restaurant:</span> ${ele.restaurantChain}</p>` : ""}
         
        </div>
       
      `;
      menu_container.appendChild(item);
    }
  });
}

// Pagination
function displayPagination() {
  paginationContainer.innerHTML = "";
  let totalPages = Math.ceil(menuList.length / itemsPerPage);

  const createButton = (text, page, disabled = false) => {
    let btn = document.createElement("button");
    btn.innerText = text;
    btn.classList.add("pagination-button");
    if (disabled) {
      btn.disabled = true;
      btn.classList.add("disabled");
    }
    btn.addEventListener("click", () => {
      currentPage = page;
      displayRecipes(menuList);
      displayPagination();
    });
    return btn;
  };

  paginationContainer.appendChild(createButton("First", 1, currentPage === 1));

  if (currentPage > 3)
    paginationContainer.appendChild(createButton("...", 0, true));

  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 4);
    i++
  ) {
    paginationContainer.appendChild(createButton(i, i, i === currentPage));
  }

  if (currentPage < totalPages - 2)
    paginationContainer.appendChild(createButton("...", 0, true));

  paginationContainer.appendChild(
    createButton("Last", totalPages, currentPage === totalPages),
  );
}

// Check localStorage
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
