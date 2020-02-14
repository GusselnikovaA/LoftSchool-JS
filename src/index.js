/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    const div = document.createElement('div');

    div.textContent = text;

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
    let p = where.querySelectorAll('p');

    for (let child of where.children) {
        for (let paragraph of p) {
            if (child === paragraph.previousElementSibling) {
                result.push(child);
            }
        }
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
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {

    for (let node of where.childNodes) {
        if (node.nodeType === 1) {
            let child = node.firstChild;

            while (child) {
                if (child.nodeType === 1) {
                    deleteTextNodesRecursive(child);
                    child = child.nextSibling;
                } else if (child.nodeType === 3) {
                    node.removeChild(child);
                    child = node.firstChild;
                }
            }

        } else if (node.nodeType === 3) {
            where.removeChild(node);
        }
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
function collectDOMStat(root, statistics) {
    if ( typeof statistics === 'undefined' ) {
        var statistics = {
            tags: {},
            classes: {},
            texts: 0
        }; // создаем объект co свойствами
    } 

    for (let node of root.childNodes) { // цикл для всех узлов DOM root
        if (node.nodeType === 1) {     

            while (node) {
                if (node.nodeType === 1) { // если тип узла элемент   
                    let tagName = node.tagName;

                    if (statistics.tags.hasOwnProperty(tagName) == false) { // проверяет есть ли свойство у объекта с именем этого элемента
                        statistics.tags[tagName] = 1; // если нет, создает такое свойство со значением 1
                    } else {
                        statistics.tags[tagName] += 1; // если есть, увеличивает значение этого свойства на 1
                    }

                    if (node.hasAttribute('class')) { // проверяем есть ли у узла элемента атрибут class
                        let className = node.getAttribute('class'); // присваиваем переменной className значение атрибута class
                        
                        if (className.includes(' ')) {
                            let classArray = className.split(' ');

                            for (let i = 0; i < classArray.length; i++) {
                                className = classArray[i];
                                if (statistics.classes.hasOwnProperty(className) == false) { // проверяет есть ли свойство у объекта с именем этого класса 
                                    statistics.classes[className] = 1; // если нет, создает такое свойство со значением 1
                                } else {
                                    statistics.classes[className] += 1; // если есть, увеличивает значение этого свойства на 1
                                }
                            }
                        } else if (statistics.classes.hasOwnProperty(className) == false) { // проверяет есть ли свойство у объекта с именем этого класса 
                            statistics.classes[className] = 1; // если нет, создает такое свойство со значением 1
                        } else {
                            statistics.classes[className] += 1; // если есть, увеличивает значение этого свойства на 1
                        }
                    }
                    if (node.childNodes !== null) {
                        collectDOMStat(node, statistics);
                    }
                } else if (node.nodeType === 3) { // если тип узла текстовый
                    statistics.texts += 1; // значение свойства texts должно увеличиваться на 1
                }
                if (node !== root.lastChild) {
                    node = node.nextSibling;
                } else {
                    return statistics;
                }
            }
        } else if (node.nodeType === 3) {
            statistics.texts += 1;
        }
    }

    return statistics;
}

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
    var observer = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
            if (mutation.type !== undefined) {
                obj.type = 'insert';
                obj.nodes.push(mutation.target);
                console.log(fn(obj));
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
