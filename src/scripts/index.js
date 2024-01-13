import '../pages/index.css';
import {initialCards} from "./cards";
import {popupEventListener, openImageModal, handleLikeButon, handleDislikeButon, likeButtonEventListener, handleEditProfile, handleAddCard} from './utils';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, allLikeButtons} from './variable';



const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
};


// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
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
  popupEventListener(cardImage, modalOpenImage, openModal);
  likeButtonEventListener(cardElement);
  return cardElement;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardItem = createCard(item, deleteCard);
  placesList.append(cardItem);
});

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  const deletedCard = cardElement.target.closest('.card');
  deletedCard.remove();
}




popupEventListener(buttonPlus, modalNewCard);
popupEventListener(buttonEditProfile, modalEditProfile);
handleEditProfile();
handleAddCard(createCard, deleteCard, placesList);


