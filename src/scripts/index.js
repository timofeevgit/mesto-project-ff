import '../pages/index.css';
import {initialCards} from "./cards";
import {setPopupEventListener, openImageModal, handleLikeButon, handleDislikeButon, setLikeButtonEventListener, handleEditProfile, handleAddCard} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, allLikeButtons} from './variable';


// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, {deleteCard, likeCard, handleImageClick}) {
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
function deleteCard(cardElement) {
  const deletedCard = cardElement.target.closest('.card');
  deletedCard.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardItem = createCard(item, {deleteCard, likeCard: setLikeButtonEventListener, handleImageClick: setPopupEventListener});
  placesList.append(cardItem);
});





setPopupEventListener(buttonPlus, modalNewCard);
setPopupEventListener(buttonEditProfile, modalEditProfile);
handleEditProfile();
handleAddCard(createCard, deleteCard, placesList);






