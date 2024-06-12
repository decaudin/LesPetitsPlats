import { recipes } from "./data/recipes.js";
import { handleDropdown, fillDropdowns } from "./utils/dropdown.js";
import { recipeTemplateGallery } from "./view/gallery.js";
import { initializeSearch } from "./utils/search.js";

document.addEventListener('DOMContentLoaded', () => {
    
    const dropdownTitleSection = document.querySelectorAll('.dropdown_title_section');
    const dropdownContent = document.querySelectorAll('.dropdown_content');
    const arrow = document.querySelectorAll('.dropdown_vector');

    // Remplissage et sélection des 3 filtres

    handleDropdown(dropdownTitleSection, dropdownContent, arrow);
    fillDropdowns(recipes);

    // Affichage des recettes 

    recipeTemplateGallery(recipes);

    // Initialisation de la recherche
    
    initializeSearch(recipes);
});