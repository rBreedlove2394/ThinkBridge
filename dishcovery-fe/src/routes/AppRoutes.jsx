// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeContainer } from '../containers/HomeContainer';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RegisterContainer } from '../containers/RegisterContainer';
import { LoginContainer } from '../containers/LoginContainer';
import { SearchContainer } from '../containers/SearchContainer';
import { RecipeContainer } from "../containers/RecipeContainer";
import { CookingStepsPage } from "../pages/CookingStepsPage";
import { GuidedCookingPage } from '../pages/GuidedCookingPage';
import { FaqPage } from '../pages/FaqPage';
import { ProfileContainer } from '../containers/ProfileContainer';
import { ContactContainer } from '../containers/ContactContainer';
import { FavouritesContainer } from '../containers/FavouriteContainer';
import { RecentlyCookedContainer } from '../containers/RecentlyCooked';



export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeContainer />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<NotFoundPage />} />
    <Route path="/register" element={<RegisterContainer />} />
    <Route path="/login" element={<LoginContainer />} />
    <Route path="/search" element={<SearchContainer />} />
    <Route path="/recipe/:id" element={<RecipeContainer />} />
    <Route path="/recipe/:id/steps" element={<CookingStepsPage />} />
    <Route path="/recipe/:id/guided" element={<GuidedCookingPage />} />
    <Route path="/faq" element={<FaqPage />} />
    <Route path="/profile" element={<ProfileContainer />} />
    <Route path="/contact" element={<ContactContainer />} />
    <Route path="/favourites" element={<FavouritesContainer />} />
    <Route path="/recently-cooked" element={<RecentlyCookedContainer />} />



  </Routes>
);