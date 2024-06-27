// Fonction pour créer un tableau contenant les tags sélectionnés depuis les dropdowns

export const getSelectedTags = (tagsContainer) => {

    return Array.from(tagsContainer.getElementsByClassName('tag')).map(tag => ({
        text: tag.textContent.toLowerCase(),
        type: tag.getAttribute('data-type'),
    }));
};
