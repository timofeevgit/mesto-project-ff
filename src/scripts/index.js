import '../pages/index.css';
import {initialCards, createCard, deleteCard, handleLikeButon, setLikeButtonEventListener} from "./cards";
import {setPopupOpenEventListener, openImageModal, handleDislikeButon, handleEditProfile, handleAddCard, setPopupCloseEventListener} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, allLikeButtons, placesList} from './variable';




// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardItem = createCard(item, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal});
  placesList.append(cardItem);
});



setPopupCloseEventListener(modalNewCard)
setPopupCloseEventListener(modalEditProfile)
setPopupCloseEventListener(modalOpenImage)
setPopupOpenEventListener(buttonPlus, modalNewCard);
setPopupOpenEventListener(buttonEditProfile, modalEditProfile);
handleEditProfile();
handleAddCard(createCard, deleteCard, placesList);






