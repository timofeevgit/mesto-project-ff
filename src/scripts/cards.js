import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, allLikeButtons, placesList} from './variable';
import {setPopupEventListener, openImageModal, handleDislikeButon, handleEditProfile, handleAddCard} from './modal';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(item, {deleteCard, likeCard, handleImageClick}) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardDeleteButton.addEventListener('click', deleteCard);
  // cardDeleteButton.addEventListener('click', (node)  => {
  //     deleteCard(node)
  //   }
  // );
  const openModal = () => openImageModal(cardElement, modalOpenImage);
  handleImageClick(cardImage, modalOpenImage, openModal);
  likeCard(cardElement);
  return cardElement;
}


// @todo: Функция удаления карточки
export function deleteCard(cardElement) {
  const deletedCard = cardElement.target.closest('.card');
  deletedCard.remove();
}

export const setLikeButtonEventListener = (cardNode) => {
  const likeButtonNode = cardNode.querySelector(".card__like-button");
  likeButtonNode.addEventListener("click", () =>
    handleLikeButon(likeButtonNode)
  );
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardItem = createCard(item, {deleteCard, likeCard: setLikeButtonEventListener, handleImageClick: setPopupEventListener});
  placesList.append(cardItem);
});


export const handleLikeButon = (likeButtonNode) => {
  likeButtonNode.classList.toggle("card__like-button_is-active");
};



