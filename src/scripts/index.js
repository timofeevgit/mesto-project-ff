import '../pages/index.css';
import {initialCards, createCard, deleteCard, handleLikeButon} from "./cards";
import {handleOpenModal, setPopupOpenEventListener, openImageModal, handleEditProfile, handleAddCard, setPopupCloseEventListener, fillProfileInputs} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, placesList} from './variable';
import {enableValidation, validationSettings, clearValidation} from './validation';
import {getInitialCards, getUserData, patchUserData} from './api';



// Выводим карточки на экран
initialCards.forEach((item) => {
  const cardItem = createCard(item, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal});
  placesList.append(cardItem);
});

// очистка валидации ред. профиля
const openPopupEdit = function () {
  clearValidation(modalEditProfile, validationSettings);
};
buttonEditProfile.addEventListener('click', openPopupEdit);

// очистка валидации доб. карточки
const openPopupAddCard = function () {
  clearValidation(modalNewCard, validationSettings);
};
buttonPlus.addEventListener('click', openPopupAddCard);


// Вызываем все написанные ранее функции с предназначенными для них аргументами.
setPopupCloseEventListener(modalNewCard)
setPopupCloseEventListener(modalEditProfile)
setPopupCloseEventListener(modalOpenImage)
setPopupOpenEventListener(buttonPlus, modalNewCard);
setPopupOpenEventListener(buttonEditProfile, modalEditProfile, fillProfileInputs);
handleEditProfile();
handleAddCard(createCard, deleteCard, placesList);
// вкл/выкл валидацию.
enableValidation(validationSettings);


// api job
getUserData();
getInitialCards();
patchUserData();