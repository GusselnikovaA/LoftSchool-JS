/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
// МОЕ РЕШЕНИЕ ЧЕРЕЗ FETCH
//     let promise = fetch ('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
//         .then(response => {
//             if (response.status >= 400) {
//                 return Promise.reject();
//             }

//             return response.json();
//         })
//         .then(towns => {
//             return towns.sort(function (a, b) {
//                 if (a.name > b.name) {
//                     return 1;
//                 }
//                 if (a.name < b.name) {
//                     return -1;
//                 }

//                 return 0;
//             });
//         });

//     return promise;
// }

    return new Promise((resolve, reject) => {
        fetch ('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
            .then(response => response.ok ? response.json() : reject())
            .then (data => {
                data.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                resolve(data);
            });
    })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
let towns = [];

function isMatching(full, chunk) {
    // МОЯ ФУНКЦИЯ
    // full = full.toLowerCase();
    // chunk = chunk.toLowerCase();

    // if (full.indexOf(chunk) >= 0) {
    //     return true
    // } else {
    //     return false
    // }

    const reg = new RegExp(chunk, 'i');

    return (full.search(reg) !== -1);
}

// ЧАСТЬ МОЕГО РЕШЕНИЯ
// loadingBlock.style.cssText = "display: none";
// filterBlock.style.cssText = "display: block";

function addTowns(array) {
    const fragment = document.createDocumentFragment();

    for (const town of array) {
        if (filterInput.value.length !== 0 && isMatching(town.name, filterInput.value)) {
            const block = document.createElement ('div');

            block.innerText = town.name;
            fragment.appendChild(block);
        }
    }

    filterResult.prepend(fragment);
}

function load() {
    loadTowns()
        .then(data => {
            towns = data;

            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
        }).catch(() => {
            loadingBlock.innerText = 'Не удалось загрузить города';
            const btn = document.createElement('button');

            btn.innerText = 'Повторить';
            btn.addEventListener('click', load);
            homeworkContainer.appendChild(btn);
        })
}

load();

filterInput.addEventListener('keyup', function() {
    // МОЕ РЕШЕНИЕ 
    // loadingBlock.style.cssText = "display: block";
    // filterResult.innerHTML = '';
    // loadTowns()
    //     .then(towns => {
    //         for (const town of towns) {
    //             if (isMatching(town.name, filterInput.value) === true) {
    //                 const div = document.createElement ('div');

    //                 div.textContent = `${town.name}`;
    //                 filterResult.appendChild(div);
    //                 loadingBlock.style.cssText = "display: none";
    //             } 

    //             if (filterInput.value === '') {
    //                 filterResult.innerHTML = ''
    //             }
    //         }
    //     })
    filterResult.innerHTML = '';
    addTowns(towns);
});

export {
    loadTowns,
    isMatching
};
