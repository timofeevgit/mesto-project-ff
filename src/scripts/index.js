import '../pages/index.css';
import {initialCards, createCard, deleteCard, handleLikeButon} from "./cards";
import {handleOpenModal, setPopupOpenEventListener, openImageModal, handleEditProfile, handleAddCard, setPopupCloseEventListener, fillProfileInputs} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, placesList} from './variable';
import {enableValidation, validationSettings, clearValidation} from './validation';


// Выводим карточки на экран пользователя
initialCards.forEach((item) => {
  const cardItem = createCard(item, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal});
  placesList.append(cardItem);
});


const openPopupEdit = function () {
  clearValidation(modalEditProfile, validationSettings);
};
buttonEditProfile.addEventListener('click', openPopupEdit);

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

















// export const popupForm = document.querySelector('.popup__form');
// export const popupFormInput = popupForm.querySelector('.popup__input');

// // Функция, навешивающая обработчики на массив инпутов
// const setEventListeners = (popupForm) => {
//   const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
//   inputList.forEach((popupFormInput) => {
//     popupFormInput.addEventListener('input', () => {
//       isValid(popupForm, popupFormInput)
//     });
//   });
// };

// const enableValidation = () => {
//   const formList = Array.from(document.querySelectorAll('.popup__form'))
//   formList.forEach((popupForm) => {
//     popupForm.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(popupForm);
//   });
// };
// enableValidation();


// export const popupFormInputEvt = popupFormInput.addEventListener('input', function (evt) {
//   console.log(evt.target.validity.valid);
// });



// // Функция, показывающая ошибку
// const showInputError = (popupForm, popupFormInput, errorMessage) => {
//   const formError = popupForm.querySelector(`.${popupFormInput.id}-error`);
//   popupFormInput.classList.add('form__input-error');
//   formError.textContent = errorMessage;
//   formError.classList.add('form__input-error_active');
// }

// // Функция, скрывающая ошибку
// const hideInputError = (popupForm, popupFormInput) => {
//   const formError = popupForm.querySelector(`.${popupFormInput.id}-error`);
//   popupFormInput.classList.remove('form__input-error');
//   formError.classList.remove('form__input-error_active');
//   formError.textContent = '';
// }


// // Функция, проверяющая на ошибку
// const isValid = (popupForm, popupFormInput) => {
//   if (!popupFormInput.validity.valid) {
//     showInputError(popupForm, popupFormInput, popupFormInput.validationMessage);
//   } else {
//     hideInputError(popupForm, popupFormInput);
//   }
// }




// popupForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
// });
