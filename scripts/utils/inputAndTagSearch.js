import { searchRecipes } from "./searchRecipes.js";
import { recipeTemplateGallery } from "../view/gallery.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { escapeHtml } from "./escapeHtml.js";
import { filterByTags } from "./filterByTags.js";
import { getSelectedTags } from "./getSelectedTags.js";

export const inputAndTagSearch = (recipes) => {

    const searchInput = document.getElementById('search');
    const messageContainer = document.querySelector('.message_container');
    const tagsContainer = document.querySelector('.tags');

    const filterRecipes = () => {

        // Récupérer la valeur saisie dans le champ de recherche

        let query = searchInput.value.trim();

        // Nettoyer la requête de l'utilisateur

        query = escapeHtml(query);

        // Appel de la fonction 'getSelectedTags' pour récupérer les tags sélectionnés

        const tags = getSelectedTags(tagsContainer);

        if (query.length > 2 || tags.length > 0) {

            // Copie des recettes pour le filtrage

            let results = recipes.slice();    

            if (query.length > 2) {

                // Filtrer les résultats en fonction de la recherche principale - Appel de la fonction 'searchRecipes' avec la valeur saisie (query) et la liste des recettes

                results = searchRecipes(query, results);
            }

            if (tags.length > 0) {

                // Filtrer les résultats en fonction des tags sélectionnés en appelant la fonction 'filterByTags'

                results = filterByTags(results, tags);
            }

            if (results.length > 0) {

                // Mise à jour de la galerie et des dropdowns avec les résultats de recherche

                recipeTemplateGallery(results);
                
                updateDropdowns(results);
                
                messageContainer.innerHTML = '';

            } else {

                // Afficher le message d'erreur si aucune recette ne correspond, effacer la galerie et le contenu des Dropdowns
                
                messageContainer.innerHTML = `Aucune recette ne correspond à votre recherche. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
                
                recipeTemplateGallery([]);
                
                updateDropdowns([]);
            }

        } else {

            // Affichage/mise à jour de la galerie et des dropdowns avec toutes les recettes
            
            recipeTemplateGallery(recipes);
            
            updateDropdowns(recipes);
            
            messageContainer.innerHTML = '';
        }
    };

    // Ecouteur d'évènement sur le champ de saisie pour jouer la fonction 'filterRecipes'

    searchInput.addEventListener('input', filterRecipes);

    // Ecouteur d'évènement pour la suppression des tags

    tagsContainer.addEventListener('click', (e) => {

        if (e.target.classList.contains('close_icon')) {

            e.target.parentElement.remove();

            // Mis à jour de la galerie et des dropdowns en fonction des tags restants

            filterRecipes();
        }
    });
};








