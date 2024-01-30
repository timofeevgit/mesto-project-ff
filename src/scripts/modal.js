import {handleLikeButon, setLikeButtonEventListener} from "./cards";

export const handleOpenModal = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseModalByEsc);
};

export const handleCloseModal = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', handleCloseModalByEsc);
};

function handleCloseModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    handleCloseModal(openedPopup);
  };
};

export const setPopupEventListener = (openButton, popupNode, callBack) => {
  const profileCloseButton = popupNode.querySelector(".popup__close");
  openButton.addEventListener("click", () => {
    handleOpenModal(popupNode);
    if (callBack) {
      callBack();
    }
  });
  profileCloseButton.addEventListener("click", () => handleCloseModal(popupNode));
  popupNode.addEventListener("click", () => handleCloseModal(popupNode));

  popupNode
    .querySelector(".popup__content")
    .addEventListener("click", (evt) => evt.stopPropagation());
};


const imageModal = document.querySelector(".popup__image");
const imageModalCaption = document.querySelector(".popup__caption");

export const openImageModal = (item) => {
  imageModal.src = item.link;
  imageModal.alt = item.name;
  imageModalCaption.textContent = item.name;
};



// Изменение данных профиля
const popupEdit = document.querySelector(".popup_type_edit");
export function handleEditProfile() {
  const profileFormElement = popupEdit.querySelector(".popup__form");
  const nameInput = profileFormElement.querySelector(".popup__input_type_name");
  const jobInput = profileFormElement.querySelector(".popup__input_type_description");
  const profTitle = document.querySelector(".profile__title");
  const profDesc = document.querySelector(".profile__description");
  nameInput.value= profTitle.textContent;
  jobInput.value = profDesc.textContent;

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

    const cardItem = createCard(card, {deleteCard, likeCard: handleLikeButon});
    placesList.prepend(cardItem);
    handleCloseModal(popupNewCard);
    cardNameInput.value = "";
    cardUrlInput.value = "";
  }
  newCardFormElement.addEventListener("submit", handleFormNewCardSubmit);
}
