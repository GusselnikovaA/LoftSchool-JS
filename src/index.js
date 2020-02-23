/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise ((resolve) => {
        // т.к. setTimeout принимает значение delay в милисекундах, необходимо это значение умножать на 1000
        setTimeout(() => resolve(), seconds*1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    let promise = fetch ('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(response => {
            if (response.status >= 400) {
                return Promise.reject();
            }
            // возвращаем promise с массивом полученным с сервера

            return response.json();
        })
        // для полученного promise с массивом (мы назвали его towns) запускаем обработчик, который сортирует элементы массива по свойству name в алфавитном порядке
        .then(towns => {
            return towns.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                // a должно быть равным b

                return 0;
            });
        });

    return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};
