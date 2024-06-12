import { searchRecipes } from "./searchRecipes.js";
import { recipeTemplateGallery } from "../view/gallery.js";
import { updateDropdowns } from "./updateDropdowns.js";

export const initializeSearch = (recipes) => {

    const searchInput = document.getElementById('search');

    // Ajour d'un écouteur d'évènement sur le champ de saisie
    
    searchInput.addEventListener('input', () => {

        // Récupérez la valeur saisie dans le champ de recherche

        const query = searchInput.value.trim(); 
        
        if (query.length > 2) {

        // Appel de la fonction searchRecipes avec la valeur saisie et la liste des recettes

        const results = searchRecipes(query, recipes);

        // Mise à jour de la galerie et des dropdowns avec les résultats de recherche

        recipeTemplateGallery(results);

        updateDropdowns(results);

        } else {

            // Affichage/mise à jour de la galerie et des dropdowns avec toutes les recettes
        
            recipeTemplateGallery(recipes);

            updateDropdowns(recipes);
        }
    });
};
