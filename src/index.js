/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn (array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var array2 = [];

    for (let i = 0; i < array.length; i++) {
        let item = fn (array[i], i, array);
        
        array2.push(item);
    }

    return array2;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var i = 0;

    if (initial == undefined) {
        initial = array [0];
        i = 1;
    }

    for ( i ; i < array.length; i++) {
        initial = fn(initial, array[i], i, array);
    }

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let array = Object.keys(obj);

    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].toUpperCase();
    }

    return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let newArray = [];

    if (from < -array.length) {
        from = 0;
    }

    if (from < 0) {
        from = to + from;
    }

    if ( to < 0) {
        to = array.length + to;
    }

    if ( to > array.length) {
        to = array.length;
    }

    for ( let i = from; i < to; i++) {
        let item = array[i];

        newArray.push(item);
    }

    return newArray;
}

slice([1, 2, 3, 4, 5, 6, 7])

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    obj = new Proxy (obj, {
        set(obj, prop, val) {
            obj[prop] = Math.pow(val, 2);

            return obj;
        }
    })

    return obj;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
