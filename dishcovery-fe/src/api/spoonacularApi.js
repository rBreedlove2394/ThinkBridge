// src/api/spoonacularApi.js

const SPOONACULAR_BASE_URL = "https://api.spoonacular.com";
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

if (!API_KEY) {
  console.warn(
    "[Spoonacular] Missing VITE_SPOONACULAR_API_KEY in your .env file."
  );
}

// ---------- helpers ----------

function mapTimeFilterToMinutes(timeFilter) {
  switch (timeFilter) {
    case "< 15 min":
      return 15;
    case "15–30 min":
      return 30;
    case "30–60 min":
      return 60;
    case "> 60 min":
      return undefined;
    default:
      return undefined;
  }
}

function mapDiet(dietary) {
  if (!dietary) return undefined;

  const map = {
    Vegetarian: "vegetarian",
    Vegan: "vegan",
    "Gluten-free": "gluten free",
    Keto: "ketogenic",
  };

  return map[dietary] || undefined;
}

function inferLevel(readyInMinutes) {
  if (!readyInMinutes) return "Beginner";
  if (readyInMinutes <= 20) return "Beginner";
  if (readyInMinutes <= 45) return "Intermediate";
  return "Advanced";
}

// ---------- SEARCH: list of recipes (Search + Home) ----------

/**
 * Search recipes – can be driven by:
 * - query (text)
 * - cuisine / dietary / time filters
 * - ingredients: array of strings (["Chicken", "Tomato"])
 */
export async function searchRecipesFromSpoonacular({
  query,
  cuisine,
  dietary,
  time,
  ingredients,
}) {
  if (!API_KEY) {
    throw new Error("Spoonacular API key not configured.");
  }

  // 1) basic search (titles, images, etc.)
  const searchUrl = new URL(`${SPOONACULAR_BASE_URL}/recipes/complexSearch`);

  searchUrl.searchParams.set("apiKey", API_KEY);
  if (query) searchUrl.searchParams.set("query", query);
  if (cuisine) searchUrl.searchParams.set("cuisine", cuisine);

  const diet = mapDiet(dietary);
  if (diet) searchUrl.searchParams.set("diet", diet);

  const maxReadyTime = mapTimeFilterToMinutes(time);
  if (maxReadyTime) searchUrl.searchParams.set("maxReadyTime", maxReadyTime);

  if (ingredients && ingredients.length > 0) {
    // e.g. ["Chicken", "Tomato"] -> "Chicken,Tomato"
    searchUrl.searchParams.set("includeIngredients", ingredients.join(","));
  }

  // not relying on addNutrition here (often not available on search)
  searchUrl.searchParams.set("number", "12");

  const searchRes = await fetch(searchUrl.toString());
  if (!searchRes.ok) {
    const body = await searchRes.text().catch(() => "");
    console.error("[Spoonacular] Search error:", searchRes.status, body);
    throw new Error(`Failed to fetch recipes (${searchRes.status})`);
  }

  const searchData = await searchRes.json();
  const results = searchData.results || [];

  if (results.length === 0) {
    return [];
  }

  // 2) optional: we *could* call informationBulk here to fetch calories
  // For now, we keep it simple and only use data from complexSearch.
  // Cards will only show calories if we later extend with bulk info.

  return results.map((item) => {
    return {
      id: String(item.id),
      title: item.title,
      calories: null, // cards won't fake calories; detail view has real value
      imageUrl: item.image,
      cuisine: (item.cuisines && item.cuisines[0]) || "Mixed",
      dietary: item.diets || [],
      level: inferLevel(item.readyInMinutes),
      time: item.readyInMinutes ? `${item.readyInMinutes} min` : "N/A",
    };
  });
}

// ---------- DETAIL: single recipe (Recipe page / steps / guided) ----------

export async function getRecipeById(id) {
  if (!API_KEY) {
    throw new Error("Spoonacular API key not configured.");
  }

  const url = new URL(`${SPOONACULAR_BASE_URL}/recipes/${id}/information`);
  url.searchParams.set("apiKey", API_KEY);
  url.searchParams.set("includeNutrition", "true");

  const res = await fetch(url.toString());

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[Spoonacular] Error fetching recipe by id:", res.status, body);
    throw new Error(`Failed to fetch recipe details (${res.status})`);
  }

  const data = await res.json();

  // ---- calories ----
  const caloriesNutrient =
    data.nutrition?.nutrients?.find(
      (n) => n.name?.toLowerCase() === "calories"
    ) || null;
  const calories = caloriesNutrient
    ? Math.round(caloriesNutrient.amount)
    : null;

  // ---- nutrition lines for the middle column ----
  let nutritionLines = [];
  if (data.nutrition && Array.isArray(data.nutrition.nutrients)) {
    const wanted = [
      "Calories",
      "Total Fat",
      "Saturated Fat",
      "Trans Fat",
      "Monounsaturated Fat",
      "Cholesterol",
      "Sodium",
      "Total Carbohydrate",
      "Dietary Fiber",
      "Sugars",
      "Protein",
    ];

    nutritionLines = data.nutrition.nutrients
      .filter((n) => wanted.includes(n.name))
      .map((n) => `${n.name} ${n.amount} ${n.unit}`);
  }

  // ---- ingredients list ----
  const ingredients =
    (data.extendedIngredients || []).map((ing) => ing.original) || [];

  // ---- instructions as simple steps ----
  const instructions =
    data.analyzedInstructions?.[0]?.steps?.map((s) => s.step) || [];

  // steps array for CookingSteps / GuidedCooking
  const steps =
    data.analyzedInstructions?.[0]?.steps?.map((s) => ({
      id: s.number,
      title: `Step ${s.number}`,
      durationSeconds:
        s.length && typeof s.length.number === "number"
          ? s.length.unit === "minutes"
            ? s.length.number * 60
            : s.length.number
          : 60,
      instructions: [s.step],
    })) || [];

  return {
    id: String(data.id),
    title: data.title,
    imageUrl: data.image,
    calories,
    cuisine: (data.cuisines && data.cuisines[0]) || "Mixed",
    dietary: data.diets || [],
    time: data.readyInMinutes ? `${data.readyInMinutes} mins` : "N/A",
    servings: data.servings,
    summary: data.summary, // still available if you ever want it
    ingredients,
    instructions,
    steps,
    nutritionLines, // used by the middle column in RecipePage
  };
}
