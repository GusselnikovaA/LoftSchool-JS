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

// вызываем функцию при первой загрузке
cookieInTable();

// функция преобразующая cookie в объект
function objCookie() {
    // преобразуем новую cookie в объект cookies
    var cookies = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookies;
}

// функция по созданию куки в браузере и таблице
function setCookie(name, value) {
    document.cookie = name + '=' + value;
}

// функция по удалению куки из браузера и таблицы
function deleteCookie(name) {
    // создаем кнопку с надписью удалить
    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Удалить';
    // обработчик нажатия на кнопку удалить
    deleteButton.addEventListener('click', (e) => {
        // удаляем cookie из браузера 
        let date = new Date(); // Берём текущую дату
      
        date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
        document.cookie = name += '=; expires=' + date.toGMTString();
        // удаляем строку из таблицы
        listTable.deleteRow(e.target);
    });

    return deleteButton;
}

filterNameInput.addEventListener('keyup', function() {

});

addButton.addEventListener('click', () => {
    const nameInput = `${addNameInput.value}`;
    const valueInput = `${addValueInput.value}`;

    setCookie(nameInput, valueInput);
    cookieInTable(nameInput, valueInput);
});

// функцию по добавлению значений cookie в таблицу и удалению из нее
function cookieInTable(name, value) {
    // опустошаем нашу таблицу
    listTable.innerHTML = '';
    // преобразуем новую cookie в объект cookies
    let cookies = objCookie(name, value);
        
    for (let key in cookies) {
        // создаем 2 переменные со свойством имени и значения объекта cookie
        let cookiesName = key;
        let cookiesValue = cookies[key];

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
}
