import { updateDropdowns } from "./updateDropdowns.js";
import { updateDisplayedRecipesCount } from "./updateDisplayRecipesCount.js";

// Fonction pour enlever les accents d'une chaîne de caractères

const removeAccents = (str) => {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Fonction pour vérifier si une chaîne de caractères contient tous les caractères d'une autre chaîne (rechercher needle dans haystack)

const stringContains = (haystack, needle) => {

    // Si l'utilisateur a entré des accents, utiliser la recherche normale
    
    if (needle !== removeAccents(needle)) {
        return haystack.includes(needle);
    }
    
    // Sinon, enlever les accents à haystack avant de comparer à needle

    return removeAccents(haystack).includes(needle);
};

// Fonction pour mettre à jour l'affichage des recettes en fonction des tags sélectionnés

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

    updateDisplayedRecipesCount(visibleRecipes);

};

// Fonction pour ajouter un tag

export const addTag = (tagText, tagType) => {

    const tagsContainer = document.querySelector('.tags');

        // Vérifiez si le tag existe déjà
        const existingTag = Array.from(tagsContainer.getElementsByClassName('tag')).find(tag => {
            return tag.textContent.toLowerCase().includes(tagText.toLowerCase()) && tag.getAttribute('data-type') === tagType;
        });
    
        if (existingTag) {
            // Si le tag existe déjà, ne l'ajoutez pas
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

// Fonction pour mettre à jour les dropdowns avec filtrage

export const chooseDropdownFilter = (inputFieldId, dropdownListId) => {

    const inputField = document.getElementById(inputFieldId);
    const dropdownList = document.getElementById(dropdownListId);
    const options = Array.from(dropdownList.querySelectorAll('.dropdown_list__item'));

    // Ecouteur d'évènement pour la filtration des li des dropdowns via l'input

    inputField.addEventListener('input', () => {

        const searchText = inputField.value.trim().toLowerCase();

        options.forEach(option => {

            const textContent = option.textContent.toLowerCase();
            const optionVisible = stringContains(textContent, searchText);

            if (optionVisible) {
                option.classList.remove('hidden');
                option.classList.add('visible');
            } else {
                option.classList.remove('visible');
                option.classList.add('hidden');
            }
        });
    });

    // Appel de la fonction addTag pour ajouter un tag au clic sur une <li> d'un dropdown

    options.forEach(option => {
        option.addEventListener('click', () => {
            const tagType = option.getAttribute('data-type');
            addTag(option.textContent, tagType);
        });
    });
};