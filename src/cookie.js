/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// функция преобразующая cookie в объект, возвращает объект cookies
function objCookie () {
    // преобразуем новую cookie в объект cookies
    const cookies = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookies;
}

const cookies = objCookie();

// вызываем функцию при первой загрузке
createTable(cookies);

// функция по созданию куки в браузере
function setCookie(name, value) {
    return document.cookie = name + '=' + value;
}

filterNameInput.addEventListener('keyup', function() {
    createTable(cookies);
});

addButton.addEventListener('click', () => {
    const nameInput = `${addNameInput.value}`;
    const valueInput = `${addValueInput.value}`;

    setCookie(nameInput, valueInput);
    let cookies = objCookie();

    createTable(cookies);
});

// функцию по добавлению значений cookie в таблицу и удалению из нее
function cookieInTable(name, value) {
    const tr = document.createElement('tr');
    const tdFirst = document.createElement('td');
    const tdSecond = document.createElement('td');
    const tdThird = document.createElement('td');
    const deleteButton = document.createElement('button');

    tdFirst.textContent = name;
    tdSecond.textContent = value;
    deleteButton.textContent = 'Удалить';
    tdThird.appendChild(deleteButton);
    deleteButton.addEventListener('click', (e) => {
        deleteCookie(e.target)
    })
    tr.appendChild(tdFirst);
    tr.appendChild(tdSecond);
    tr.appendChild(tdThird);
    listTable.appendChild(tr);
} 

// функцию по созданию таблицы с условием фильтрации
function createTable (cookies) {
    listTable.innerHTML = '';

    for (const key in cookies) {

        if (filterNameInput.value) {
            if (isMatching(key, filterNameInput.value) || isMatching(cookies[key], filterNameInput.value)) {
                cookieInTable(key, cookies[key]);
            }
        } else {
            cookieInTable(key, cookies[key]);
        }
    }
}

function isMatching(full, chunk) {
    full = full.toLowerCase();
    chunk = chunk.toLowerCase();

    if (full.indexOf(chunk) >= 0) {
        return true
    } else {
        return false
    }
}

// функция по удалению куки из браузера и таблицы
function deleteCookie() {
    const tr = event.target.closest('tr');
    const tdName = tr.querySelector('td:first-child').textContent;
    const tdValue = tr.querySelector('td:nth-child(2)').textContent;

    tr.parentElement.removeChild(tr);
    document.cookie = tdName + '=' + tdValue +';expires=\'Thu, 01 Jan 1970 00:00:01 GMT\'';
}
