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

// function oldCookie () {

// };

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', () => {
    // создаем переменный с введенными знаечениями в поля имени и значения cookie
    let nameInput = `${addNameInput.value}`;
    let valueInput = `${addValueInput.value}`;

    // при каждом нажатии на кнопку добавить мы запускаем функцию по созданию куки
    // в параметры ей передаем имя и значение куки введенной в поле
    setCookie(nameInput, valueInput, {});

    // функция создает кнопку удалить
    // по клику удаляется cookie из браузера
    // deleteCookie(nameInput);

    cookieInTable(nameInput, valueInput);

    addNameInput.value = '';
    addValueInput.value = '';
});

// функция, которая добавляет куки в браузер по имени и значению
function setCookie (name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

// надо добавить удаление из таблицы по клику
function deleteCookie(name, target) {
    // создаем кнопку с надписью удалить
    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Удалить';
    // обработчик нажатия на кнопку удалить
    deleteButton.addEventListener('click', () => {
        // удаляем cookie из браузера 
        // вызов функции с отрицательным сроком жизни cookie
        setCookie(name, '', {
            'max-age': -1
        });
        // должна удалять строку из таблицы
        listTable.deleteRow(target);
    });
    
    return deleteButton;
}

// function objCookie() {
//     // преобразуем новую cookie в объект cookies
//     var cookies = document.cookie.split('; ').reduce((prev, current) => {
//         const [name, value] = current.split('=');
  
//         prev[name] = value;
  
//         return prev;
//     }, {});
// }

// функцию по добавлению значений cookie в таблицу
function cookieInTable(name, value) {
    // преобразуем новую cookie в объект cookies
    var cookies = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    // создаем 2 переменные со свойством имени и значения объекта cookie
    let cookiesName = cookies[`${addNameInput.value}`];
    let cookiesValue = cookies[`${addValueInput.value}`];

    // создаем строку в таблице
    const newRow = listTable.insertRow();

    // на каждой итерации от 0 до 2
    // создаем новую колонку в только что созданной строке
    for (let i = 0; i <=2; i++) {
        const newCell = newRow.insertCell(i);

        if (i === 0) {
            const cellContent = document.createTextNode(cookiesName);

            newCell.appendChild(cellContent);
        } else if (i === 1) {
            const cellContent = document.createTextNode(cookiesValue);

            newCell.appendChild(cellContent);
        } else if (i === 2) {
            const cellContent = deleteCookie(name);

            newCell.appendChild(cellContent);
        }
    }
}
