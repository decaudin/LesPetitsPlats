// Fonction de création et de mise à jour des éléments de la liste de chaque Dropdown

const populateDropdownList = (dropdown, items) => {

    dropdown.innerHTML = '';
    
    // Parcours tous les éléments de la liste et les ajoute au dropdown

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.classList.add('dropdown_list__item');
        listItem.setAttribute("tabindex", 0);
        dropdown.appendChild(listItem); 
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
        applianceSet.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ustensil => {
            ustensilSet.add(ustensil.toLowerCase());
        });
    });

    // Convertir les sets en arrays pour les dropdowns

    const ingredients = Array.from(ingredientSet).sort();
    const appliances = Array.from(applianceSet).sort();
    const ustensils = Array.from(ustensilSet).sort();

    // Appel de la fonction populateDropdownList pour créer les 3 listes

    populateDropdownList(document.getElementById('ingredients_list'), ingredients);
    populateDropdownList(document.getElementById('appliances_list'), appliances);
    populateDropdownList(document.getElementById('ustensils_list'), ustensils);
}; 