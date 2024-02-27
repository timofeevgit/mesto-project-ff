import {handleLikeButon} from "./cards";
import {clearValidation, validationSettings} from './validation';

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
    // clearValidation(popupEdit, validationSettings);
    // clearValidation(popupNewCard, validationSettings);
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
const profTitle = document.querySelector(".profile__title");
const profDesc = document.querySelector(".profile__description");

// поля в попапе редактирования профиля будут иметь тот текст, который отображается в самом профиле. Эту функцию вызываем как колбэк в setPopupOpenEventListener
export function fillProfileInputs() {
  nameInput.value = profTitle.textContent;
  jobInput.value = profDesc.textContent;
}

// редактируем профиль: сбрасываем дефолтное поведение, заполняем значения полей, вызываем функцию закрытия попапа, навешиваме обработчик сабмита
export function handleEditProfile() {
  function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profTitle.textContent = name;
    profDesc.textContent = job;
    handleCloseModal(popupEdit);
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
    evt.preventDefault();
    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value,
    };

    const cardItem = createCard(card, {deleteCard, likeCard: handleLikeButon, openImageCard: openImageModal});
    placesList.prepend(cardItem);
    handleCloseModal(popupNewCard);
    cardNameInput.value = "";
    cardUrlInput.value = "";
  }
  newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}