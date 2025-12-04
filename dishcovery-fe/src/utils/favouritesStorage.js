// src/utils/favouritesStorage.js
const STORAGE_KEY = 'dishcovery_favourites';

const readAll = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeAll = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const normalizeEmail = (email) => (email || '').trim().toLowerCase();

export const getFavouritesForUser = (email) => {
  const emailKey = normalizeEmail(email);
  if (!emailKey) return [];
  const all = readAll();
  return all[emailKey] || [];
};

export const isFavourite = (email, recipeId) => {
  const emailKey = normalizeEmail(email);
  if (!emailKey) return false;
  const favs = getFavouritesForUser(emailKey);
  return favs.some((r) => String(r.id) === String(recipeId));
};

export const toggleFavourite = (email, recipe) => {
  const emailKey = normalizeEmail(email);
  if (!emailKey || !recipe?.id) return { favourites: [], isFavourite: false };

  const all = readAll();
  const favs = all[emailKey] || [];
  const idx = favs.findIndex((r) => String(r.id) === String(recipe.id));

  let isFavNow = false;
  if (idx >= 0) {
    favs.splice(idx, 1);
    isFavNow = false;
  } else {
    const lite = {
      id: String(recipe.id),
      title: recipe.title || 'Recipe',
      imageUrl: recipe.imageUrl || recipe.image || '',
      calories: recipe.calories ?? null,
    };
    favs.push(lite);
    isFavNow = true;
  }

  all[emailKey] = favs;
  writeAll(all);

  return { favourites: favs, isFavourite: isFavNow };
};
