import { searchRecipes } from "./searchRecipes.js";
import { recipeTemplateGallery } from "../view/gallery.js";
import { updateDropdowns } from "./updateDropdowns.js";

export const principaleSearch = (recipes) => {

    const searchInput = document.getElementById('search');
    const messageContainer = document.querySelector('.message_container');

    // Ajout d'un écouteur d'évènement sur le champ de saisie

    searchInput.addEventListener('input', () => {

        // Récupérez la valeur saisie dans le champ de recherche

        const query = searchInput.value.trim();

        if (query.length > 2) {

            // Appel de la fonction searchRecipes avec la valeur saisie et la liste des recettes

            const results = searchRecipes(query, recipes);

            if (results.length > 0) {

                // Mise à jour de la galerie et des dropdowns avec les résultats de recherche

                recipeTemplateGallery(results);

                updateDropdowns(results);

                messageContainer.innerHTML = '';

            } else {

                // Afficher le message d'erreur si aucune recette ne correspond, effacer la gallerie et le contenu des Dropdowns

                messageContainer.innerHTML = `<p>Aucune recette ne contient ‘${query}’. Vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
                
                recipeTemplateGallery([]);
                
                updateDropdowns([]);
            }

        } else {

            // Affichage/mise à jour de la galerie et des dropdowns avec toutes les recettes
            
            recipeTemplateGallery(recipes);

            updateDropdowns(recipes);
            
            messageContainer.innerHTML = '';
        }
    });
};
