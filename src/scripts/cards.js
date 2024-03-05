import { modalOpenImage } from "./variable";
import { setPopupOpenEventListener } from "./modal";
import { removeCard, addLikeCard } from "./api";

// Нашли темплейт карточки с контентом, который потом будет добавлять в places__list
const template = document.querySelector("#card-template").content;

// Создаем карточку с наполнением внутри JS. Ищем все ноды, задаем атрибуты
export function createCard(
  item,
  { deleteCard, likeCard, openImageCard, userId }
) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardDeleteButton.addEventListener("click", deleteCard);
  cardElement.id = item._id;
  // проверка на корзину
  if (item.owner._id !== userId) {
    cardDeleteButton.classList.add("card__delete-button-hidden");
  }

  const openModal = () => openImageCard(item);
  setPopupOpenEventListener(cardImage, modalOpenImage, openModal);

  const likeCount = item.likes.length || 0;
  const likeCountNode = cardElement.querySelector(".like-button__count");
  likeCountNode.textContent = likeCount;

  const likeButtonNode = cardElement.querySelector(".card__like-button");
  likeButtonNode.addEventListener("click", () =>
    likeCard(likeButtonNode, cardElement)
  );

  const isLiked = item.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButtonNode.classList.add("card__like-button_is-active");
  }

  return cardElement;
}

// Функция удаления карточки, передаваемая в createCard как аргумент
export function deleteCard(cardElement) {
  const deletedCard = cardElement.target.closest(".card");
  deletedCard.remove();
  removeCard(deletedCard.id);
}

export function handleLikeButon(likeButton, cardNode) {
  const isMyLikeOnCard = likeButton.classList.contains(
    "card__like-button_is-active"
  );
  const cardId = cardNode.id;
  const likeCountNode = cardNode.querySelector(".like-button__count");
  // likeCountNode.textContent = likeCount;
  if (!isMyLikeOnCard) {
    addLikeCard(cardId, false)
      .then((result) => {
        likeButton.classList.add("card__like-button_is-active");
        const likeCount = result.likes.length || 0;
        likeCountNode.textContent = likeCount;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  } else if (isMyLikeOnCard) {
    addLikeCard(cardId, true)
      .then((result) => {
        likeButton.classList.remove("card__like-button_is-active");
        const likeCount = result.likes.length || 0;
        likeCountNode.textContent = likeCount;
      })
      .catch((err) => console.error(`Ошибка: ${err}`));
  }
}

// функция переключает кнопку лайка
// export const handleLikeButon = (likeButtonNode, userId, cardElement) => {
//   likeButtonNode.classList.toggle("card__like-button_is-active");
// };
