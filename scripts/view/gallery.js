import { recipeTemplate } from "./card.js";

export const recipeTemplateGallery = (recipes) => {

// Nombre de recettes affichées sur la page

const numberRecipes = document.querySelector('.number_recipes');
numberRecipes.innerText = `${recipes.length} recettes`

// Affichage de la galerie de recettes

const recipesSection = document.querySelector('.recipes_section');

// Vidage de la galerie

recipesSection.innerHTML = '';

// Itération sur chaque recette pour lui créer une card via le template 'recipeTemplate'

recipes.forEach((recipe) => {
    
    const recipeModel = recipeTemplate(recipe);

    const recipeCardDom = recipeModel.getRecipeCardDOM();
    
    recipesSection.appendChild(recipeCardDom);
})

}

