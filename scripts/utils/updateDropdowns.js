import { addTag } from "./chooseDropdownFilter.js";

// Fonction de création et de mise à jour des éléments de la liste de chaque Dropdown

const populateDropdownList = (dropdown, items, type) => {

    dropdown.innerHTML = '';
    
    // Parcours tous les éléments de la liste et les ajoute au dropdown

    items.forEach(item => {
        
        const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
        const listItem = document.createElement('li');
        listItem.textContent = capitalizedItem;
        listItem.classList.add('dropdown_list__item');
        listItem.setAttribute('data-type', type);
        listItem.setAttribute("tabindex", 0);
        dropdown.appendChild(listItem); 
    });

    // Attacher les événements de clic aux nouveaux éléments de dropdown
    
    attachDropdownItemEvents(dropdown);
};

// Fonction pour attacher les événements de clic aux éléments de dropdown

const attachDropdownItemEvents = (dropdown) => {

    const options = dropdown.querySelectorAll('.dropdown_list__item');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const tagType = option.getAttribute('data-type');
            addTag(option.textContent, tagType);
        });
    });
};

export const updateDropdowns = (recipes) => {

    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    // Parcourt les recettes et ajoute les ingrédients, appareils et ustensiles aux sets

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientSet.add(ingredient.ingredient.toLowerCase());
        });
        applianceSet.add(recipe.appliance);
        recipe.ustensils.forEach(ustensil => {
            ustensilSet.add(ustensil);
        });
    });

    // Convertir les sets en arrays pour les dropdowns

    const ingredients = Array.from(ingredientSet).sort();
    const appliances = Array.from(applianceSet).sort();
    const ustensils = Array.from(ustensilSet).sort();

    // Nettoyer les listes déroulantes existantes

    const ingredientsDropdown = document.getElementById('ingredients_list');
    const appliancesDropdown = document.getElementById('appliances_list');
    const ustensilsDropdown = document.getElementById('ustensils_list');

    ingredientsDropdown.innerHTML = '';
    appliancesDropdown.innerHTML = '';
    ustensilsDropdown.innerHTML = '';

    // Appel de la fonction populateDropdownList pour créer les 3 listes

    populateDropdownList(ingredientsDropdown, ingredients, 'ingredient');
    populateDropdownList(appliancesDropdown, appliances, 'appliance');
    populateDropdownList(ustensilsDropdown, ustensils, 'ustensil');
};