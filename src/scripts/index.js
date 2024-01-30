import '../pages/index.css';
import {initialCards, createCard, deleteCard, handleLikeButon, setLikeButtonEventListener} from "./cards";
import {setPopupEventListener, openImageModal, handleDislikeButon, handleEditProfile, handleAddCard} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, allLikeButtons, placesList} from './variable';




// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardItem = createCard(item, {deleteCard, likeCard: handleLikeButon});
  placesList.append(cardItem);
});






setPopupEventListener(buttonPlus, modalNewCard);
setPopupEventListener(buttonEditProfile, modalEditProfile);
handleEditProfile();
handleAddCard(createCard, deleteCard, placesList);






