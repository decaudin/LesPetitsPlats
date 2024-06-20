import { stringContains } from "./stringContains.js";
import { escapeHtml } from "./escapeHtml.js";

// Fonction pour mettre à jour les <li> des dropdowns avec filtrage via l'input

export const chooseDropdownFilter = (inputFieldId, dropdownListId) => {

    const inputField = document.getElementById(inputFieldId);
    const dropdownList = document.getElementById(dropdownListId);

    // Ecouteur d'évènement pour la filtration des li des dropdowns via l'input

    inputField.addEventListener('input', () => {

        const searchText = escapeHtml(inputField.value.trim().toLowerCase());

        const options = Array.from(dropdownList.querySelectorAll('.dropdown_list__item, .dropdown_list__item.visible, .dropdown_list__item.hidden'));

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
};