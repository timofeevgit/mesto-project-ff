import '../pages/index.css';
import {initialCards, createCard, deleteCard, handleLikeButon, setLikeButtonEventListener} from "./cards";
import {setPopupEventListener, openImageModal, handleDislikeButon, handleEditProfile, handleAddCard} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, allLikeButtons, placesList} from './variable';











setPopupEventListener(buttonPlus, modalNewCard);
setPopupEventListener(buttonEditProfile, modalEditProfile);
handleEditProfile();
handleAddCard(createCard, deleteCard, placesList);






