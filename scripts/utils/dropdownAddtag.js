import { updateDropdowns } from "./updateDropdowns.js";
import { recipesCounter } from "./recipesCounter.js";
import { filterByTags } from "./filterByTags.js";
import { getSelectedTags } from "./getSelectedTags.js"; 

const tagsContainer = document.querySelector('.tags');

// Fonction pour mettre à jour l'affichage des recettes, le contenu des dropdowns et le compteur de recettes en fonction des tags sélectionnés

export const updateRecipeDisplay = () => {

    // Création d'un tableau 'tags' contenant les tags sélectionnés depuis les dropdowns avec la fonction 'getSelectedTags'

    const tags = getSelectedTags(tagsContainer);

    const recipeCards = document.querySelectorAll('.recipe_card');
    const visibleRecipes = [];

    // Affichage des recettes qui ont des correspondances avec les tags sélectionnés

    recipeCards.forEach(card => {
        const recipe = {
            ingredients: card.getAttribute('data-ingredients').toLowerCase().split(',').map(ingredient => ({ ingredient })),
            appliance: card.getAttribute('data-appliance').toLowerCase(),
            ustensils: card.getAttribute('data-ustensils').toLowerCase().split(',')
        };
        
        const matches = filterByTags([recipe], tags).length > 0;

        matches ? (card.style.display = 'block', visibleRecipes.push(recipe)) : card.style.display = 'none';

    // Mise à jour des dropdowns avec les ingrédients, appareils et ustensiles des recettes visibles avec 'updateDropdowns'   

    updateDropdowns(visibleRecipes);

    // Mise à jour du compteur de recettes affichées avec 'recipesCounter'

    recipesCounter(visibleRecipes);

    })
};


// Fonction pour créer, ajouter un tag et filtrer la galerie en conséquence

const addTag = (tagText, tagType) => {

    // Vérifiez si le tag existe déjà

    const existingTag = Array.from(tagsContainer.getElementsByClassName('tag')).find(tag => {
            
        return tag.textContent.toLowerCase().includes(tagText.toLowerCase()) && tag.getAttribute('data-type') === tagType;
    });
    
    if (existingTag) {

        return;
    }

    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.setAttribute('data-type', tagType);
    tag.textContent = tagText;
    
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
            const tagText = option.textContent;
            addTag(tagText, tagType);
            input.value = '';
        });
    });
};