// конфиг когорты
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: '70016aa2-461b-4178-865f-71ad7edfeeae',
    'Content-Type': 'application/json'
  }
};

// проверка ответа
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }
}

// получение данных обо мне
export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(checkResponse);
}

// получение карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(checkResponse);
};

// обновление данных профиля
export const patchUserData = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '70016aa2-461b-4178-865f-71ad7edfeeae',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Marie Skłodowska Curie',
      about: 'Physicist and Chemist'
    })
  }).then(checkResponse);
};


// что такое then(res). res.json(). Promise.reject. Promise.all?
// что происходит с patchUserData и как обнвоить данные на странице?
