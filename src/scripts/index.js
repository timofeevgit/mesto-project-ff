import '../pages/index.css';
import {createCard, deleteCard, handleLikeButon} from "./cards";
import {setPopupOpenEventListener, openImageModal, handleEditProfile, handleAddCard, setPopupCloseEventListener, fillProfileInputs, handleEditAvatar, profTitle, profDesc, profileAvatar} from './modal';
import {buttonPlus, modalNewCard, buttonEditProfile, modalEditProfile, modalOpenImage, placesList, buttonAvatar, avatarPopup} from './variable';
import {enableValidation, validationSettings} from './validation';
import {getInitialCards, getUserData} from './api';

// выводим все карточки с сервера на страницу с помщью async await
// const renderInitialCards = async () => {
//   const initialCards = await getInitialCards();
//   initialCards.forEach((item) => {
//     const cardItem = createCard(item, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal, showIconDelete: false});
//     placesList.append(cardItem);
//   });
// }
// await renderInitialCards()


export let userId = '';
let userAvatar = '';

Promise.all([getInitialCards(), getUserData()])
  .then(([initialCards, userData]) => {
    userAvatar = userData.avatar;
    userId = userData._id;
    profTitle.textContent = userData.name;
    profDesc.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((item) => {
      const cardItem = createCard(item, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal, userId})
      placesList.append(cardItem);
    })
  })
  .catch((err) => {
    console.log(err);
  });


// Вызываем все написанные ранее функции с предназначенными для них аргументами.
setPopupCloseEventListener(modalNewCard)
setPopupCloseEventListener(modalEditProfile)
setPopupCloseEventListener(modalOpenImage)
setPopupCloseEventListener(avatarPopup);
setPopupOpenEventListener(buttonPlus, modalNewCard);
setPopupOpenEventListener(buttonEditProfile, modalEditProfile, fillProfileInputs);
setPopupOpenEventListener(buttonAvatar, avatarPopup);
handleEditProfile();
// рдеактирование аватара
handleEditAvatar();
handleAddCard(createCard, deleteCard, placesList);
// вкл/выкл валидацию.
enableValidation(validationSettings);


