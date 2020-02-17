/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    // создаем элемент div
    const div = document.createElement('div');

    div.textContent = text;
    // альтернативный вариант записи добавление текста в элемент
    // div.innerContent = text;

    return div;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    where.prepend(what);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов, следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let result = [];
    // ищет все теги p в DOM where
    let p = where.querySelectorAll('p');

    // прогоняет не через весь документ, а проводит столько итераций сколько нашел тегов p 
    for (const item of p) {
        result.push(item.previousElementSibling);
    }

    return result;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов.
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    let result = [];

    for (let child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    for (let child of where.childNodes) {
        if (child.nodeType === 3) {
            where.removeChild(child);
        }
    }

    // 
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */

// МОЙ ВАРИАНТ РЕШЕНИЯ ЧЕРЕЗ while 
// function deleteTextNodesRecursive(where) {
//     for (let node of where.childNodes) {
//         if (node.nodeType === 1) {
//             let child = node.firstChild;

//             while (child) {
//                 if (child.nodeType === 1) {
//                     deleteTextNodesRecursive(child);
//                     child = child.nextSibling;
//                 } else if (child.nodeType === 3) {
//                     node.removeChild(child);
//                     child = node.firstChild;
//                 }
//             }

//         } else if (node.nodeType === 3) {
//             where.removeChild(node);
//         }
//     }
// }

// ВАРИАНТ РЕШЕНИЯ ЧЕРЕЗ for
function deleteTextNodesRecursive(where) {
    const nodes = [...where.childNodes];

    for (const child of nodes) {
        if (child.nodeType === 3) {
            where.removeChild(child);
        }

        if (child.childNodes.length > 0) {
            deleteTextNodesRecursive(child);
        } else {}
    }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */

// МОЙ ВАРИАНТ РЕШЕНИЯ ЧЕРЕЗ for 
function collectDOMStat(root, statistics) {
    // проверяем существует ли объект
    if ( statistics === undefined ) {
        // если нет, то создаем объект co свойствами
        statistics = {
            tags: {},
            classes: {},
            texts: 0
        }; 
    } 

    // цикл для всех узлов DOM root
    for (let node of root.childNodes) {
        // если текущий элемент текстовый
        if (node.nodeType === 3) {
            // значение свойства texts должно увеличиваться на 1
            statistics.texts += 1;
        // если узел типа элемент
        } else if (node.nodeType === 1) {    
            let tagName = node.tagName;

            // проверяет есть ли свойство у объекта с тегом этого элемента
            if (statistics.tags.hasOwnProperty(tagName) == false) {
                // если нет, создает такое свойство со значением 1
                statistics.tags[tagName] = 1; 
            } else {
                // если есть, увеличивает значение этого свойства на 1
                statistics.tags[tagName] += 1;
            }

            for (const className of node.classList) {
                if (statistics.classes.hasOwnProperty([className])) { // 
                    statistics.classes[className]++;
                } else {
                    statistics.classes[className] = 1;
                }
            }
            // проверяем свойство childNodes у текущего элемента
            if (node.childNodes.length > 0) {
                // если длина childNodes больше нуля, то снова запускаем функцию
                collectDOMStat(node, statistics);
            }
        }
    }

    return statistics;
}

// ВАРИАНТ РЕШЕНИЯ С НАСТАВНИКОМ через for
// function collectDOMStat(root, statistics) {
//     if (statistics == undefined) {
//         statistics = {
//             tags: {},
//             classes: {},
//             texts: 0
//         };
//     }

//     for (let node of root.childNodes) { 
//         if (node.nodeType === 3) {
//             statistics.texts ++;
//         }
        
//         if (node.nodeType === 1) {             
//             if (statistics.tags.hasOwnProperty(node.tagName)) {
//                 statistics.tags[node.tagName]++;
//             } else {
//                 statistics.tags[node.tagName] = 1;
//             }
//         }

//         for (const className of node.classList) {
//             if (statistics.classes.hasOwnProperty([className])) { // 
//                 statistics.classes[className]++;
//             } else {
//                 statistics.classes[className] = 1;
//             }
//         }

//         if (node.childNodes.length > 0) {
//             collectDOMStat(node, statistics);
//         }
//     }

//     return statistics;
// }

// ОЧЕНЬ ПОДРОБНАЯ ПРОВЕРКА КЛАССОВ ЭЛЕМЕНТА
// // проверяем есть ли у текущего элемента атрибут class
// if (node.hasAttribute('class')) {
//     // присваиваем переменной className значение атрибута class
//     let className = node.getAttribute('class');
    
//     // если переменная класс имеет внутри пробел
//     if (className.includes(' ')) {
//         // то создаем переменную classArray с частями className, поделенными по пробелу
//         let classArray = className.split(' ');

//         // для каждой части className 
//         for (let i = 0; i < classArray.length; i++) {
//             className = classArray[i];
//             // проверяет есть ли свойство у объекта с именем этого класса 

//             if (statistics.classes.hasOwnProperty(className) == false) {
//                 // если нет, создает такое свойство со значением 1
//                 statistics.classes[className] = 1; 
//             } else {
//                 // если есть, увеличивает значение этого свойства на 1
//                 statistics.classes[className] += 1;
//             }
//         }
//     // если переменная className не имеет внутри пробела, то проверяем есть ли свойство у объекта с именем этого класса 
//     } else if (statistics.classes.hasOwnProperty(className) == false) {
//         // если нет, создает такое свойство со значением 1
//         statistics.classes[className] = 1; 
//     } else {
//         // если есть, увеличивает значение этого свойства на 1
//         statistics.classes[className] += 1; 
//     }
// }

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
    // создаем объект со свойствами type и nodes
    const obj = {
        type: '',
        nodes: []
    }

    // создаём наблюдатель за изменениями
    // MutationObserver's callback возвращает массив объектов(изменений) 
    var observer = new MutationObserver(function(MutationRecord) {
        // MutationRecord - массив изменений, которые отследил наблюдатель и для каждого такого изменения запускаем функцию
        // mutation это объект каждого изменения, которое отловил наблюдатель
        MutationRecord.forEach(function(mutation) {
            // создали два массива 
            let insertNodes = [];
            let removeNodes = [];

            // для каждого элемента из псевдомассива с добавленными элементами
            for (const item of mutation.addedNodes) {
                // добавляем этот элемент в новый массив
                insertNodes.push(item);
            }

            // для каждого элемента из псевдомассива с удаленными элементами
            for (const item of mutation.removedNodes) {
                // добавляем этот элемент в новый массив
                removeNodes.push(item);
            }

            // если длина нового массива с добавленными элементами больше 0.
            if (insertNodes.length > 0) {
                obj.type = 'insert';
                obj.nodes = insertNodes;
                fn(obj);
            }

            // если длина нового массива с удаленными элементами больше 0.
            if (removeNodes.length > 0) {
                obj.type = 'remove';
                obj.nodes = removeNodes;
                fn(obj);
            }
        });    
    });

    // прикрепляем его к DOM-узлу where
    observer.observe(where, { 
        childList: true,
        subtree: true 
    });
 
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
