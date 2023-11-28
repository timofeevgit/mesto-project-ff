export const handleOpenModal = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");

};

export const handleCloseModal = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
};

export const popupEventListener = (openButton, popupNode, callBack) => {
  const closeButton = popupNode.querySelector(".popup__close");
  openButton.addEventListener("click", () => {handleOpenModal(popupNode)
    if (callBack){
      callBack()
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
