/**
 * NP FITNESS - CORE APPLICATION SCRIPT
 * Comprehensive Nutrition & Fitness Calculator Framework
 */

// Embedded Nutritional JSON Database (Nutrients per 100g serving)
const nutritionDB = [
  // Vegetarian Foods
  { id: "p1", name: "Paneer", category: "veg", calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, fiber: 0 },
  { id: "p2", name: "Soya Chunks", category: "veg", calories: 345, protein: 52.0, carbs: 33.0, fat: 0.5, fiber: 13.0 },
  { id: "p3", name: "Whole Milk", category: "veg", calories: 62, protein: 3.2, carbs: 4.8, fat: 3.6, fiber: 0 },
  { id: "p4", name: "Curd (Dahi)", category: "veg", calories: 98, protein: 11.0, carbs: 3.4, fat: 4.3, fiber: 0 },
  { id: "p5", name: "Rolled Oats", category: "veg", calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, fiber: 10.6 },
  { id: "p6", name: "Peanuts", category: "veg", calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2, fiber: 8.5 },
  { id: "p7", name: "Chickpeas (Chana)", category: "veg", calories: 364, protein: 19.0, carbs: 61.0, fat: 6.0, fiber: 17.0 },
  { id: "p8", name: "Rajma (Kidney Beans)", category: "veg", calories: 333, protein: 24.0, carbs: 60.0, fat: 0.8, fiber: 25.0 },
  { id: "p9", name: "Moong Dal", category: "veg", calories: 347, protein: 24.0, carbs: 63.0, fat: 1.2, fiber: 16.0 },
  { id: "p10", name: "Almonds", category: "veg", calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, fiber: 12.5 },
  { id: "p11", name: "Banana", category: "veg", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6 },
  { id: "p12", name: "Apple", category: "veg", calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4 },
  { id: "p13", name: "White Rice (Cooked)", category: "veg", calories: 130, protein: 2.7, carbs: 28.0, fat: 0.3, fiber: 0.4 },
  { id: "p14", name: "Wheat Roti", category: "veg", calories: 264, protein: 9.0, carbs: 54.0, fat: 1.5, fiber: 11.0 },

  // Non-Vegetarian Foods
  { id: "p15", name: "Chicken Breast", category: "non-veg", calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, fiber: 0 },
  { id: "p16", name: "Whole Egg", category: "non-veg", calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0, fiber: 0 },
  { id: "p17", name: "Fish (Rohu/Salmon)", category: "non-veg", calories: 206, protein: 22.0, carbs: 0.0, fat: 12.0, fiber: 0 },
  { id: "p18", name: "Mutton (Lean)", category: "non-veg", calories: 294, protein: 25.0, carbs: 0.0, fat: 21.0, fiber: 0 },
  { id: "p19", name: "Prawns", category: "non-veg", calories: 99, protein: 24.0, carbs: 0.2, fat: 0.3, fiber: 0 },
  { id: "p20", name: "Tuna", category: "non-veg", calories: 132, protein: 28.0, carbs: 0.0, fat: 1.3, fiber: 0 },
  { id: "p21", name: "Turkey Breast", category: "non-veg", calories: 135, protein: 30.0, carbs: 0.0, fat: 0.7, fiber: 0 }
];

// Meal Planning State Container
let dailyMealPlan = [];

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderFoodCards(nutritionDB);
  populateFoodSelects();
  setupEventListeners();
});

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("np_theme") || "dark-theme";
  document.body.className = savedTheme;
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.body.classList.contains("dark-theme") ? "dark-theme" : "light-theme";
  const target = current === "dark-theme" ? "light-theme" : "dark-theme";
  document.body.className = target;
  localStorage.setItem("np_theme", target);
  updateThemeIcon(target);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggleBtn");
  if (theme === "dark-theme") {
    btn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else {
    btn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
  }
}

// Render Nutrition Cards
function renderFoodCards(items) {
  const grid = document.getElementById("foodGrid");
  grid.innerHTML = "";

  if (items.length === 0) {
    grid.innerHTML = `<p class="empty-msg">No food items found matching your search.</p>`;
    return;
  }

  items.forEach(food => {
    const card = document.createElement("div");
    card.className = "card food-card";
    const tagClass = food.category === "veg" ? "veg" : "non-veg";
    const tagLabel = food.category === "veg" ? "Veg" : "Non-Veg";

    card.innerHTML = `
      <div>
        <div class="food-header">
          <h3>${food.name}</h3>
          <span class="tag ${tagClass}">${tagLabel}</span>
        </div>
        <div class="macro-list">
          <div class="macro-item"><span class="label">Calories</span><span class="val">${food.calories} kcal</span></div>
          <div class="macro-item"><span class="label">Protein</span><span class="val">${food.protein} g</span></div>
          <div class="macro-item"><span class="label">Carbohydrates</span><span class="val">${food.carbs} g</span></div>
          <div class="macro-item"><span class="label">Fats</span><span class="val">${food.fat} g</span></div>
          <div class="macro-item"><span class="label">Dietary Fiber</span><span class="val">${food.fiber} g</span></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Populate Dropdowns in Calculators & Planner
function populateFoodSelects() {
  const selects = [document.getElementById("foodSelect"), document.getElementById("plannerFoodSelect")];
  
  selects.forEach(select => {
    if (!select) return;
    select.innerHTML = "";
    nutritionDB.forEach(food => {
      const option = document.createElement("option");
      option.value = food.id;
      option.textContent = `${food.name} (${food.category === 'veg' ? 'Veg' : 'Non-Veg'})`;
      select.appendChild(option);
    });
  });
}

// Event Listeners Setup
function setupEventListeners() {
  // Navigation & Theme
  document.getElementById("themeToggleBtn").addEventListener("click", toggleTheme);
  document.getElementById("mobileToggleBtn").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("active");
  });

  // Search and Filter Tabs
  document.getElementById("foodSearchInput").addEventListener("input", filterFoods);
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      filterFoods();
    });
  });

  // Calculator Submissions
  document.getElementById("foodCalcForm").addEventListener("submit", handleFoodCalc);
  document.getElementById("macroTargetForm").addEventListener("submit", handleMacroTargetCalc);
  document.getElementById("bmrForm").addEventListener("submit", handleBMRCalc);
  document.getElementById("bmiForm").addEventListener("submit", handleBMICalc);
  document.getElementById("waterForm").addEventListener("submit", handleWaterCalc);

  // Meal Planner
  document.getElementById("mealPlannerForm").addEventListener("submit", handleAddMeal);
  document.getElementById("clearPlannerBtn").addEventListener("click", handleClearPlanner);

  // Contact Form
  document.getElementById("contactForm").addEventListener("submit", handleContactSubmit);
}

// Filter Foods Handler
function filterFoods() {
  const query = document.getElementById("foodSearchInput").value.toLowerCase();
  const activeTab = document.querySelector(".tab-btn.active").getAttribute("data-category");

  const filtered = nutritionDB.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query);
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  renderFoodCards(filtered);
}

// 1. Portion Macro Calculator
function handleFoodCalc(e) {
  e.preventDefault();
  const foodId = document.getElementById("foodSelect").value;
  const grams = parseFloat(document.getElementById("foodGramInput").value);
  const food = nutritionDB.find(item => item.id === foodId);

  if (!food || isNaN(grams)) return;

  const ratio = grams / 100;
  const cals = (food.calories * ratio).toFixed(1);
  const p = (food.protein * ratio).toFixed(1);
  const c = (food.carbs * ratio).toFixed(1);
  const f = (food.fat * ratio).toFixed(1);
  const fib = (food.fiber * ratio).toFixed(1);

  const resContainer = document.getElementById("foodCalcResult");
  resContainer.className = "calc-results";
  resContainer.innerHTML = `
    <h4>Nutrition for ${grams}g of ${food.name}:</h4>
    <div class="res-line"><span>Calories:</span> <strong>${cals} kcal</strong></div>
    <div class="res-line"><span>Protein:</span> <strong>${p} g</strong></div>
    <div class="res-line"><span>Carbs:</span> <strong>${c} g</strong></div>
    <div class="res-line"><span>Fat:</span> <strong>${f} g</strong></div>
    <div class="res-line"><span>Fiber:</span> <strong>${fib} g</strong></div>
  `;
}

// 2. Daily Target Nutrition Calculator
function handleMacroTargetCalc(e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("targetWeight").value);
  const goal = document.getElementById("fitnessGoal").value;

  let baseCalsPerKg = 30; // Maintenance base multiplier
  let pPerKg = 2.0;       // Standard high-protein weightlifting intake

  if (goal === "loss") {
    baseCalsPerKg = 24;
    pPerKg = 2.2;
  } else if (goal === "gain") {
    baseCalsPerKg = 36;
    pPerKg = 2.0;
  }

  const dailyCalories = Math.round(weight * baseCalsPerKg);
  const dailyProtein = Math.round(weight * pPerKg);
  const dailyFat = Math.round((dailyCalories * 0.25) / 9);
  const remainingCals = dailyCalories - (dailyProtein * 4) - (dailyFat * 9);
  const dailyCarbs = Math.round(remainingCals / 4);
  const dailyFiber = Math.round((dailyCalories / 1000) * 14);

  const resContainer = document.getElementById("macroTargetResult");
  resContainer.className = "calc-results";
  resContainer.innerHTML = `
    <h4>Est. Daily Requirements (${goal.toUpperCase()}):</h4>
    <div class="res-line"><span>Target Calories:</span> <strong>${dailyCalories} kcal</strong></div>
    <div class="res-line"><span>Protein Target:</span> <strong>${dailyProtein} g</strong></div>
    <div class="res-line"><span>Carbs Target:</span> <strong>${dailyCarbs} g</strong></div>
    <div class="res-line"><span>Fat Target:</span> <strong>${dailyFat} g</strong></div>
    <div class="res-line"><span>Fiber Target:</span> <strong>${dailyFiber} g</strong></div>
  `;
}

// 3. BMR & TDEE Calculator (Mifflin-St Jeor Equation)
function handleBMRCalc(e) {
  e.preventDefault();
  const age = parseInt(document.getElementById("bmrAge").value);
  const gender = document.getElementById("bmrGender").value;
  const weight = parseFloat(document.getElementById("bmrWeight").value);
  const height = parseFloat(document.getElementById("bmrHeight").value);
  const activity = parseFloat(document.getElementById("bmrActivity").value);

  // BMR Calculation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === "male" ? bmr + 5 : bmr - 161;

  const tdee = Math.round(bmr * activity);
  bmr = Math.round(bmr);

  const resContainer = document.getElementById("bmrResult");
  resContainer.className = "calc-results";
  resContainer.innerHTML = `
    <h4>Basal & Total Energy Expenditure:</h4>
    <div class="res-line"><span>BMR (Basal Rate):</span> <strong>${bmr} kcal/day</strong></div>
    <div class="res-line"><span>TDEE (Daily Burn):</span> <strong>${tdee} kcal/day</strong></div>
  `;
}

// 4. BMI Calculator
function handleBMICalc(e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("bmiWeight").value);
  const heightCm = parseFloat(document.getElementById("bmiHeight").value);
  const heightM = heightCm / 100;

  const bmi = (weight / (heightM * heightM)).toFixed(1);
  let status = "";

  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 24.9) status = "Normal weight";
  else if (bmi < 29.9) status = "Overweight";
  else status = "Obese";

  const resContainer = document.getElementById("bmiResult");
  resContainer.className = "calc-results";
  resContainer.innerHTML = `
    <h4>Body Mass Index Result:</h4>
    <div class="res-line"><span>BMI Rating:</span> <strong>${bmi} kg/m²</strong></div>
    <div class="res-line"><span>Classification:</span> <strong>${status}</strong></div>
  `;
}

// 5. Water Hydration Calculator
function handleWaterCalc(e) {
  e.preventDefault();
  const weight = parseFloat(document.getElementById("waterWeight").value);
  const activity = parseFloat(document.getElementById("waterActivity").value);

  // Formula: ~35ml per kg base + 350ml per 30 mins exercise
  const baseLiters = (weight * 0.035);
  const activityLiters = (activity / 30) * 0.35;
  const totalLiters = (baseLiters + activityLiters).toFixed(2);

  const resContainer = document.getElementById("waterResult");
  resContainer.className = "calc-results";
  resContainer.innerHTML = `
    <h4>Fluid Intake Recommendation:</h4>
    <div class="res-line"><span>Optimal Hydration:</span> <strong>${totalLiters} Liters/day</strong></div>
  `;
}

// 6. Meal Planner Engine
function handleAddMeal(e) {
  e.preventDefault();
  const mealType = document.getElementById("plannerMealType").value;
  const foodId = document.getElementById("plannerFoodSelect").value;
  const grams = parseFloat(document.getElementById("plannerGrams").value);

  const food = nutritionDB.find(item => item.id === foodId);
  if (!food || isNaN(grams)) return;

  const ratio = grams / 100;
  const mealItem = {
    id: Date.now(),
    mealType: mealType,
    name: food.name,
    grams: grams,
    calories: food.calories * ratio,
    protein: food.protein * ratio,
    carbs: food.carbs * ratio,
    fat: food.fat * ratio,
    fiber: food.fiber * ratio
  };

  dailyMealPlan.push(mealItem);
  renderPlanner();
}

function handleRemoveMeal(id) {
  dailyMealPlan = dailyMealPlan.filter(item => item.id !== id);
  renderPlanner();
}

function handleClearPlanner() {
  dailyMealPlan = [];
  renderPlanner();
}

function renderPlanner() {
  const container = document.getElementById("mealList");
  container.innerHTML = "";

  if (dailyMealPlan.length === 0) {
    container.innerHTML = `<p class="empty-msg">No meals added yet. Start constructing your diet schedule!</p>`;
    updatePlannerSummary(0, 0, 0, 0, 0);
    return;
  }

  let totalCals = 0, totalP = 0, totalC = 0, totalF = 0, totalFib = 0;

  dailyMealPlan.forEach(item => {
    totalCals += item.calories;
    totalP += item.protein;
    totalC += item.carbs;
    totalF += item.fat;
    totalFib += item.fiber;

    const div = document.createElement("div");
    div.className = "meal-entry";
    div.innerHTML = `
      <div class="meal-info">
        <h5>${item.mealType}: ${item.name} (${item.grams}g)</h5>
        <p>${Math.round(item.calories)} kcal | P: ${item.protein.toFixed(1)}g | C: ${item.carbs.toFixed(1)}g | F: ${item.fat.toFixed(1)}g</p>
      </div>
      <button class="delete-btn" onclick="handleRemoveMeal(${item.id})" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
    `;
    container.appendChild(div);
  });

  updatePlannerSummary(totalCals, totalP, totalC, totalF, totalFib);
}

function updatePlannerSummary(cals, p, c, f, fib) {
  document.getElementById("sumCals").textContent = `${Math.round(cals)} kcal`;
  document.getElementById("sumProtein").textContent = `${p.toFixed(1)} g`;
  document.getElementById("sumCarbs").textContent = `${c.toFixed(1)} g`;
  document.getElementById("sumFat").textContent = `${f.toFixed(1)} g`;
  document.getElementById("sumFiber").textContent = `${fib.toFixed(1)} g`;
}

// 7. Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const status = document.getElementById("contactStatus");
  status.className = "contact-status";
  status.textContent = "Thank you! Your message has been received. We'll get back to you shortly.";
  document.getElementById("contactForm").reset();

  setTimeout(() => {
    status.className = "contact-status hidden";
  }, 5000);
}