import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Footer from "./Components/Footer.jsx";
import Features from "./Components/Features.jsx";
import Faqs from "./Components/Faqs.jsx";
import Scheme from "./Components/Scheme.jsx";
import Bot from "./Components/Bot.jsx";
import Pest from "./Components/Pest.jsx";
import CropRecommendation from "./Components/CropRecommendation.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    <Features />
    <Pest />
    <CropRecommendation />
    <Scheme />
    <Faqs />
    <Bot />
    <Footer />
  </StrictMode>,
);
