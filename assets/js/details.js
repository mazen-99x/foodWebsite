const api_key = "ef31d622fb494d14be0d462acff88213"; // Use your actual API key here
let foodId = localStorage.getItem("foodId");
let similarList = [];
let details_container = document.getElementById("details_items");
let similar_container = document.getElementById("similar_items");

async function getDetails() {
  if (!foodId) return;
  try {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${api_key}&includeNutrition=true`
    );
    let foodDetails = await data.json();

    // Log the response to inspect the available fields
    console.log(foodDetails);

    displayDetails(foodDetails);
  } catch (error) {
    console.error("Error fetching details of recipe:", error);
    details_container.innerHTML = "<p>Failed to load details of Recipe.</p>";
  }
}

function displayDetails(recipe) {
  let item = document.createElement("div");
  const {
    title,
    image,
    servings,
    readyInMinutes,
    pricePerServing,
    diets,
    dishTypes,
    cuisines,
    summary,
    extendedIngredients,
    analyzedInstructions,
    sourceName,
    sourceUrl,
    nutrition,
  } = recipe;

  // Extract calories and other nutritional data if available
  let calories = nutrition?.nutrients?.find(
    (nutrient) => nutrient.name === "Calories"
  );

  document.title = `Merida ${title || "Recipe Details"}`;
  item.innerHTML = `
  <div class="details">
  
  <div class="recipe-card">
    
    <div class="recipe-header">
      <img src="${image || "../images/default-image.jpg"}" alt="${title}">
      <div class="overlay">
        <h1>${title}</h1>
      </div>
    </div>

    <div class="recipe-content">
      
      <div class="recipe-stats">
        <div><span>🍽</span> ${servings || "N/A"} servings</div>
        <div><span>⏱</span> ${readyInMinutes || "N/A"} min</div>
        <div><span>🔥</span> ${
          calories ? calories.amount + " " + calories.unit : "N/A"
        }</div>
        <div><span>💲</span> ${
          pricePerServing ? pricePerServing.toFixed(2) : "N/A"
        }</div>
      </div>

      <div class="tags">
        ${(diets || []).map((d) => `<span>${d}</span>`).join("")}
        ${(cuisines || []).map((c) => `<span>${c}</span>`).join("")}
      </div>

      <div class="section">
        <h2>Summary</h2>
        <p>${summary || "No summary available."}</p>
      </div>

      <div class="section">
        <h2>Ingredients</h2>
        <ul>
          ${
            extendedIngredients?.length
              ? extendedIngredients
                  .map((i) => `<li>${i.original}</li>`)
                  .join("")
              : "<li>No ingredients</li>"
          }
        </ul>
      </div>

      <div class="section">
        <h2>Instructions</h2>
        <ol>
          ${
            analyzedInstructions?.[0]?.steps?.length
              ? analyzedInstructions[0].steps
                  .map((s) => `<li>${s.step}</li>`)
                  .join("")
              : "<li>No instructions</li>"
          }
        </ol>
      </div>

      <a class="btn" href="${sourceUrl || "#"}" target="_blank">
        View Full Recipe
      </a>

    </div>
    </div>
  </div>
`;;
  details_container.appendChild(item);
}

async function getSimilar() {
  if (!foodId) return;

  try {
    let data = await fetch(
      `https://api.spoonacular.com/recipes/${foodId}/similar?apiKey=${api_key}`
    );
    similarList = await data.json();
    displaySimilar();
  } catch (error) {
    console.error("Error fetching similar recipes:", error);
    similar_container.innerHTML = "<p>Failed to load similar recipes.</p>";
  }
}

function displaySimilar() {
  similarList.forEach((ele) => {
    let item = document.createElement("div");
    item.classList.add("gallery_item");
    let imageUrl = `https://spoonacular.com/recipeImages/${ele.id}-312x231.jpg`;

    item.innerHTML = `
        <a class="image_container" onclick="selectRecipe(${ele.id})">
          <img src="${imageUrl}" alt="${ele.title}" />
        </a>
        <div class="info">
          <p><span>Name:</span>${ele.title}</p>
        </div>
    `;
    similar_container.appendChild(item);
  });
}

function selectRecipe(id) {
  localStorage.setItem("foodId", id);
  window.location.href = "./details.html";
}

document.addEventListener("DOMContentLoaded", () => {
  getDetails();
  getSimilar();
});
