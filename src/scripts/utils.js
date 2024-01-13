export const handleOpenModal = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
};

export const handleCloseModal = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
};

export const popupEventListener = (openButton, popupNode, callBack) => {
  const closeButton = popupNode.querySelector(".popup__close");
  openButton.addEventListener("click", () => {
    handleOpenModal(popupNode);
    if (callBack) {
      callBack();
    }
  });
  closeButton.addEventListener("click", () => handleCloseModal(popupNode));
  popupNode.addEventListener("click", () => handleCloseModal(popupNode));
  window.addEventListener(
    "keydown",
    (evt) => evt.key === "Escape" && handleCloseModal(popupNode)
  );

  popupNode
    .querySelector(".popup__content")
    .addEventListener("click", (evt) => evt.stopPropagation());
};

export const openImageModal = (cardNode, modalOpenImage) => {
  const cardImage = cardNode.querySelector(".card__image").src;
  const cardImageTitle = cardNode.querySelector(".card__title").textContent;
  const imageModal = modalOpenImage.querySelector(".popup__image");
  const imageModalCaption = modalOpenImage.querySelector(".popup__caption");
  imageModal.src = cardImage;
  imageModalCaption.textContent = cardImageTitle;
  console.log(cardImage, cardImageTitle, imageModal, imageModalCaption);
};

export const handleLikeButon = (likeButtonNode) => {
  likeButtonNode.classList.toggle("card__like-button_is-active");
};

export const likeButtonEventListener = (cardNode) => {
  const likeButtonNode = cardNode.querySelector(".card__like-button");
  likeButtonNode.addEventListener("click", () =>
    handleLikeButon(likeButtonNode)
  );
};



// изменение данных профиля
export function handleEditProfile() {
  const popupEdit = document.querySelector(".popup_type_edit");
  // Находим форму в DOM
  const formElement = popupEdit.querySelector(".popup__form"); // Воспользуйтесь методом popup_type_edit.querySelector()
  // Находим поля формы в DOM
  const nameInput = formElement.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector() popup__input_type_name
  const jobInput = formElement.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector() popup__input_type_description

  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет

  function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const name = nameInput.value;
    const job = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profTitle = document.querySelector(".profile__title");
    const profDesc = document.querySelector(".profile__description");

    // Вставьте новые значения с помощью textContent
    profTitle.textContent = name;
    profDesc.textContent = job;
    handleCloseModal(popupEdit);
    nameInput.value = '';
    jobInput.value = '';
  }

  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener("submit", handleFormSubmit);
}


// добавление новой карточки
export function handleAddCard(createCard, deleteCard, placesList) {
  const popupNewCard = document.querySelector(".popup_type_new-card");
  // Находим форму в DOM
  const formElement = popupNewCard.querySelector(".popup__form"); // Воспользуйтесь методом popup_type_edit.querySelector()
  // Находим поля формы в DOM
  const cardNameInput = formElement.querySelector(".popup__input_type_card-name"); // Воспользуйтесь инструментом .querySelector() popup__input_type_name
  const cardUrlInput = formElement.querySelector(".popup__input_type_url"); // Воспользуйтесь инструментом .querySelector() popup__input_type_description

  // Обработчик «отправки» формы, хотя пока
  // она никуда отправляться не будет

  function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const card = {
      name: cardNameInput.value,
      link: cardUrlInput.value
    }

    const cardItem = createCard(card, deleteCard);
    placesList.prepend(cardItem);
    handleCloseModal(popupNewCard);
    cardNameInput.value = '';
    cardUrlInput.value = '';
  }

  // Прикрепляем обработчик к форме:
  // он будет следить за событием “submit” - «отправка»
  formElement.addEventListener("submit", handleFormSubmit);
}
