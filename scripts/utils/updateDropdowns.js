import { dropdownAddtag } from "./dropdownAddtag.js";

// Fonction de création et de mise à jour des <li> de chaque Dropdown

const populateDropdownList = (dropdown, items, type, input) => {

    dropdown.innerHTML = '';
    
    // Parcours tous les éléments de la liste et les ajoute au dropdown correspondant

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
    
    dropdownAddtag(dropdown, input);
};

// Affichage et mise à jour du contenu des dropdowns

export const updateDropdowns = (recipes) => {

    const ingredientSet = new Set();
    const applianceSet = new Set();
    const ustensilSet = new Set();

    // Parcours les recettes et ajoute les ingrédients, appareils et ustensiles aux sets

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientSet.add(ingredient.ingredient.toLowerCase());
        });
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => {
            ustensilSet.add(ustensil.toLowerCase());
        });
    });

    // Convertir les sets en arrays pour les dropdowns

    const ingredients = Array.from(ingredientSet).sort((a, b) => a.localeCompare(b));
    const appliances = Array.from(applianceSet).sort((a, b) => a.localeCompare(b));
    const ustensils = Array.from(ustensilSet).sort((a, b) => a.localeCompare(b));   

    const ingredientsDropdown = document.getElementById('ingredients_list');
    const appliancesDropdown = document.getElementById('appliances_list');
    const ustensilsDropdown = document.getElementById('ustensils_list');

    const ingredientInput = document.getElementById('search_ingredient');
    const applianceInput = document.getElementById('search_appliance');
    const ustensilInput = document.getElementById('search_ustensil');

    // Nettoyer les listes déroulantes existantes

    ingredientsDropdown.innerHTML = '';
    appliancesDropdown.innerHTML = '';
    ustensilsDropdown.innerHTML = '';

    // Appel de la fonction populateDropdownList pour créer les 3 listes

    populateDropdownList(ingredientsDropdown, ingredients, 'ingredient', ingredientInput);
    populateDropdownList(appliancesDropdown, appliances, 'appliance', applianceInput);
    populateDropdownList(ustensilsDropdown, ustensils, 'ustensil', ustensilInput);
};