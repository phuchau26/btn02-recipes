const recipesContainer = document.querySelector(".recipes");

async function fetchRecipes() {
  try {
    const res = await fetch("https://dummyjson.com/recipes");
    const data = await res.json();

    renderRecipes(data.recipes);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    recipesContainer.innerHTML = "<p>Không thể tải công thức 😢</p>";
  }
}

function renderRecipes(recipes) {
  recipesContainer.innerHTML = ""; // Xóa cũ (nếu có)

  recipes.forEach((item) => {
    const recipeHTML = `
      <div class="recipes__item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="recipes__detail">
          <p class="recipes__name">${item.name}</p>

          <div class="recipes__vote">
            <i class="fa-solid fa-star"></i>
            <span>${item.rating.toFixed(1)}</span>
            <p>(${item.reviewCount ?? 0} đánh giá)</p>
          </div>

          <div class="recipes__time">
            <i class="fa-regular fa-clock"></i>
            <span>Tổng:</span>
            <p>${item.prepTimeMinutes + item.cookTimeMinutes} phút</p>
          </div>

          <div class="recipes__hard">
            <i class="fa-solid fa-signal"></i>
            <span>Độ khó:</span>
            <p>${item.difficulty}</p>
          </div>

          <div class="recipes__eat">
            <i class="fa-solid fa-utensils"></i>
            <span>Suất ăn:</span>
            <p>${item.servings}</p>
          </div>

          <div class="recipes__tags">
            ${item.tags
                .slice(0, 2) // lấy tối đa 3 tag đầu tiên
                .map((tag) => `<button>#${tag}</button>`)
                .join("")}

          </div>

          <button class="recipes__btn">Xem Công Thức</button>
        </div>
      </div>
    `;

    recipesContainer.insertAdjacentHTML("beforeend", recipeHTML);
  });

  // 🎬 Thêm hiệu ứng fade-up mượt sau khi render
  setTimeout(() => {
    document.querySelectorAll(".recipes__item").forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 100); // delay 0.1s mỗi item
    });
  }, 200);
}

fetchRecipes(); 
