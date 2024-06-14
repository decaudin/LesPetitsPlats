import { recipes } from "./data/recipes.js";
import { handleDropdown } from "./utils/dropdown.js";
import { recipeTemplateGallery } from "./view/gallery.js";
import { initializeSearch } from "./utils/search.js";
import { updateDropdowns } from "./utils/updateDropdowns.js";
import { chooseDropdownFilter } from "./utils/chooseDropdownFilter.js";

document.addEventListener('DOMContentLoaded', () => {
    
    const dropdownTitleSection = document.querySelectorAll('.dropdown_title_section');
    const dropdownContent = document.querySelectorAll('.dropdown_content');
    const arrow = document.querySelectorAll('.dropdown_vector');

    // Affichage des recettes 

    recipeTemplateGallery(recipes);

    // Initialisation des dropdowns avec toutes les recettes

    updateDropdowns(recipes);

    // Sélection des 3 dropdowns

    handleDropdown(dropdownTitleSection, dropdownContent, arrow);

    // Initialisation de la recherche
    
    initializeSearch(recipes);

    // Initialisation de la recherche dans chaque dropdown
    
    chooseDropdownFilter('search_ingredient', 'ingredients_list');
    chooseDropdownFilter('search_appliance', 'appliances_list');
    chooseDropdownFilter('search_ustensil', 'ustensils_list');
});
