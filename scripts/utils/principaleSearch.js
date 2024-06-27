import { searchRecipes } from "./searchRecipes.js";
import { recipeTemplateGallery } from "../view/gallery.js";
import { updateDropdowns } from "./updateDropdowns.js";
import { escapeHtml } from "./escapeHtml.js";

export const principaleSearch = (recipes) => {

    const searchInput = document.getElementById('search');
    const messageContainer = document.querySelector('.message_container');
    const tagsContainer = document.querySelector('.tags');

    const filterRecipes = () => {

        // Récupérer la valeur saisie dans le champ de recherche

        let query = searchInput.value.trim();
        
        // Nettoyer la requête de l'utilisateur

        query = escapeHtml(query);

        // Récupérer les tags sélectionnés

        const tags = Array.from(tagsContainer.getElementsByClassName('tag')).map(tag => ({
            text: tag.textContent.toLowerCase(),
            type: tag.getAttribute('data-type'),
        }));

        if (query.length > 2 || tags.length > 0) {

            let results = recipes.slice(); // Copie des recettes pour le filtrage

            // Filtrer les résultats en fonction de la recherche principale - Appel de la fonction searchRecipes avec la valeur saisie (query) et la liste des recettes

            if (query.length > 2) {

                results = searchRecipes(query, results);
            }

            // Filtrer les résultats en fonction des tags sélectionnés

            if (tags.length > 0) {

                results = results.filter(recipe => {
                    const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
                    const appliance = recipe.appliance.toLowerCase();
                    const ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());

                    // Vérifier la correspondance avec les tags sélectionnés

                    const matchesTags = tags.every(tag => {
                        if (tag.type === 'ingredient') {
                            return ingredients.some(ingredient => ingredient.includes(tag.text));
                        } else if (tag.type === 'appliance') {
                            return appliance.includes(tag.text);
                        } else if (tag.type === 'ustensil') {
                            return ustensils.some(ustensil => ustensil.includes(tag.text));
                        }
                        return false;
                    });

                    return matchesTags;
                });
            }
            
            if (results.length > 0) {

                // Mise à jour de la galerie et des dropdowns avec les résultats de recherche

                recipeTemplateGallery(results);

                updateDropdowns(results);

                messageContainer.innerHTML = '';

            } else {

                // Afficher le message d'erreur si aucune recette ne correspond, effacer la gallerie et le contenu des Dropdowns

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

    // Ajout d'un écouteur d'évènement sur le champ de saisie pour jouer la fonction filterRecipes

    searchInput.addEventListener('input', filterRecipes);

    // Ajout d'un écouteur d'évènement pour la suppression des tags

    tagsContainer.addEventListener('click', (e) => {

            if (e.target.classList.contains('close_icon')) {

                e.target.parentElement.remove();
    
                // Mis à jour de l'affichage des recettes en fonction des tags restants

                filterRecipes();
            }
        });
};







