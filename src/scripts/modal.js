import {handleLikeButon} from "./cards";
import {clearValidation, validationSettings} from './validation';
import {patchUserData, postNewCard, updateAvatar} from './api';
import {userId} from './index'

// Функция открытия любых модальных окон, попадаемых в неё в качестве аргумента + обработчик закрытия моадлки по esc
export const handleOpenModal = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseModalByEsc);
};

// Функция закрытия любых модальных окон, попадаемых в неё в качестве аргумента + обработчик закрытия моадлки по esc
export const handleCloseModal = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', handleCloseModalByEsc);
};

// Функция закрытия по esc
function handleCloseModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    handleCloseModal(openedPopup);
  };
};

// Функция слушатель закрытия модальных окон нажатием на крестик, нажатием на оверлей. Принимает ноду для закрытия
export const setPopupCloseEventListener = (popupNode) => {
  const closeButton = popupNode.querySelector(".popup__close");
  closeButton.addEventListener("click", () => handleCloseModal(popupNode));

  popupNode
  .querySelector(".popup__content")
  .addEventListener("click", (evt) => evt.stopPropagation());
  popupNode.addEventListener("click", () => handleCloseModal(popupNode));
}

// Функция слушатель открытия модальных окон, принимающая кнопку модального окна, ноду модального окна и если есть колбэк - вызывающая колбэк.
export const setPopupOpenEventListener = (openButton, popupNode, callBack) => {
  openButton.addEventListener("click", () => {
    handleOpenModal(popupNode);
    clearValidation(popupEdit, validationSettings);
    clearValidation(popupNewCard, validationSettings);
    clearValidation(avatarPopup, validationSettings)
    if (callBack) {
      callBack();
    }
  });
};


// Модалка изображения
const imageModal = document.querySelector(".popup__image");
// Описание изображения в модалке изображения
const imageModalCaption = document.querySelector(".popup__caption");
// Функция слушатель открытия модальных окон изображений
export const openImageModal = (item) => {
  imageModal.src = item.link;
  imageModal.alt = item.name;
  imageModalCaption.textContent = item.name;
};



// Изменение данных профиля
const popupEdit = document.querySelector(".popup_type_edit");
const profileFormElement = popupEdit.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");
export const profTitle = document.querySelector(".profile__title");
export const profDesc = document.querySelector(".profile__description");

// поля в попапе редактирования профиля будут иметь тот текст, который отображается в самом профиле. Эту функцию вызываем как колбэк в setPopupOpenEventListener
export function fillProfileInputs() {
  nameInput.value = profTitle.textContent;
  jobInput.value = profDesc.textContent;
}

function renderLoading(saveButton, status) {
  saveButton.textContent = status;
}

// редактируем профиль: сбрасываем дефолтное поведение, заполняем значения полей, вызываем функцию закрытия попапа, навешиваме обработчик сабмита
export function handleEditProfile() {
  function handleProfileFormSubmit(evt) {
    renderLoading(evt.submitter, 'Сохранение...');
    evt.preventDefault();
    // отправляем данные профиля на сервер
    patchUserData({name: nameInput.value, about: jobInput.value})
    .then(() => {
    const name = nameInput.value;
    const job = jobInput.value;
    profTitle.textContent = name;
    profDesc.textContent = job;
    evt.target.reset();
    handleCloseModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(evt.submitter, 'Сохранить'));
  }
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
}


// добавление новой карточки
const popupNewCard = document.querySelector(".popup_type_new-card");
export function handleAddCard(createCard, deleteCard, placesList) {
  const newCardFormElement = popupNewCard.querySelector(".popup__form");
  const cardNameInput = newCardFormElement.querySelector(".popup__input_type_card-name");
  const cardUrlInput = newCardFormElement.querySelector(".popup__input_type_url");

  function handleFormNewCardSubmit(evt) {
    renderLoading(evt.submitter, 'Сохранение...');
    evt.preventDefault();
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };
    // отправляем карточку на свервер
    postNewCard(card)
    .then((card) => {
    const cardItem = createCard(card, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal, userId});
    placesList.prepend(cardItem);
    handleCloseModal(popupNewCard);
    cardNameInput.value = "";
    cardUrlInput.value = "";
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => renderLoading(evt.submitter, 'Сохранить'));
  }
newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}


// смена аватара
const avatarPopup = document.querySelector('.popup_type-avatar')
export const profileAvatar = document.querySelector(".profile__image");
export function handleEditAvatar() {
  const avatarFormElement = avatarPopup.querySelector(".popup__form");
  const avatarInput = avatarFormElement.querySelector(".popup__input_type_url");
  let userAvatar = '';

  function handleFormSubmitAvatar(evt) {
    renderLoading(evt.submitter, 'Сохранение...');
    evt.preventDefault();
    updateAvatar({avatar: avatarInput.value})
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
      userAvatar = data.avatar;
      handleCloseModal(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(evt.submitter, 'Сохранить'));
  }
  avatarFormElement.addEventListener('submit', handleFormSubmitAvatar);
}