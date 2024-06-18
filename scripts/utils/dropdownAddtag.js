import { updateDropdowns } from "./updateDropdowns.js";
import { recipesCounter } from "./recipesCounter.js";
import { escapeHtml } from "./escapeHtml.js";

// Fonction pour mettre à jour l'affichage des recettes, le contenu des dropdowns et le compteur de recettes en fonction des tags sélectionnés

const updateRecipeDisplay = () => {

    const tagsContainer = document.querySelector('.tags');

    // Création d'un tableau 'tags' contenant les tags sélectionnés depuis les dropdowns

    const tags = Array.from(tagsContainer.getElementsByClassName('tag')).map(tag => ({

        text: tag.textContent.toLowerCase(),
        type: tag.getAttribute('data-type'),
    }));

    const recipeCards = document.querySelectorAll('.recipe_card');
    const visibleRecipes = [];

    // Affichage des recettes qui ont des correspondances avec les tags sélectionnés

    recipeCards.forEach(card => {

        const ingredients = card.getAttribute('data-ingredients').toLowerCase().split(',');
        const appliance = card.getAttribute('data-appliance').toLowerCase();
        const ustensils = card.getAttribute('data-ustensils').toLowerCase().split(',');

        const matches = tags.every(tag => {
            if (tag.type === 'ingredient') {
                return ingredients.some(ingredient => ingredient.includes(tag.text));
            } else if (tag.type === 'appliance') {
                return appliance.includes(tag.text);
            } else if (tag.type === 'ustensil') {
                return ustensils.some(ustensil => ustensil.includes(tag.text));
            }
            return false;
        });

        matches ? (card.style.display = 'block', visibleRecipes.push({
            ingredients: ingredients.map(ingredient => ({ ingredient })),
            appliance,
            ustensils
        })) : card.style.display = 'none';
    });

    // Mettre à jour les dropdowns avec les ingrédients, appareils et ustensiles des recettes visibles

    updateDropdowns(visibleRecipes);

    // Fonction pour mettre à jour le compteur de recette affichées

    recipesCounter(visibleRecipes);
};


// Fonction pour ajouter un tag et filtrer la galerie en conséquence

const addTag = (tagText, tagType) => {

    const tagsContainer = document.querySelector('.tags');

    // Nettoyer le texte du tag 

    const cleanedTagText = escapeHtml(tagText);

    // Vérifiez si le tag existe déjà

    const existingTag = Array.from(tagsContainer.getElementsByClassName('tag')).find(tag => {
            
        return tag.textContent.toLowerCase().includes(cleanedTagText.toLowerCase()) && tag.getAttribute('data-type') === tagType;
    });
    
    if (existingTag) {

        return;
    }

    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.setAttribute('data-type', tagType);
    tag.textContent = cleanedTagText;
    
    const closeIcon = document.createElement('img');
    closeIcon.src = 'assets/svg/close.svg';
    closeIcon.alt = 'Close';
    closeIcon.classList.add('close_icon');
    closeIcon.onclick = () => {
        tag.remove();
        updateRecipeDisplay();
    };

    tag.appendChild(closeIcon);
    tagsContainer.appendChild(tag);
    updateRecipeDisplay();
};

// Fonction pour ajouter un tag au clic (via 'addTag') sur une <li> d'un dropdown

export const dropdownAddtag = (dropdown, input) => {

    const options = dropdown.querySelectorAll('.dropdown_list__item');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const tagType = option.getAttribute('data-type');
            const tagText = escapeHtml(option.textContent);
            addTag(tagText, tagType);
            input.value = '';
        });
    });
};