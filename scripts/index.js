// @todo: Темплейт карточки
const template = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardDeleteButton.addEventListener('click', deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  const deletedCard = cardElement.target.closest('.card');
  deletedCard.remove();
}

// @todo: Вывести карточки на страницу

  initialCards.forEach((item) => {
    const cardItem = createCard(item, deleteCard);
    placesList.append(cardItem);
  });





// function createCard(data) {
//   const cardElement = template.content.querySelector(".card").cloneNode(true);
//   const cardImage = cardElement.querySelector(".card__image");
//   cardImage.src = data.link;
//   cardImage.alt = data.name;
//   const cardTitle = cardElement.querySelector(".card__title");
//   cardTitle.textContent = data.name;
//   const deleteButton = cardElement.querySelector(".card__delete-button");
//   deleteButton.addEventListener("click", () => {
//     deleteCard(cardElement);
//   });
//   return cardElement;
// }



// function deleteCard(cardElement) {
//   cardElement.remove();
// }



// initialCards.forEach((card) => {
//   const cardElement = createCard(card);
//   placesList.appendChild(cardElement);
// });