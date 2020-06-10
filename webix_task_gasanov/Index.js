let storage = [
    {number: 1, id: '1', name: "laptop", quantity: 12, cost: 25002,},
    {number: 2, id: '2', name: "Mouse", quantity: 2, cost: 1500},
    {number: 3, id: '3', name: "Keyboard", quantity: 1, cost: 2000},
    {number: 4, id: '4', name: "Pen", quantity: 4, cost: 20},
    {number: 5, id: '5', name: "Printer", quantity: 3, cost: 4000},
    {number: 6, id: '6', name: "Phone", quantity: 5, cost: 21000},
]

//let storage = []
let basket = [];
let sumAll = 0;


function refreshTable() {  // обновляет все таблицы и сумму
    $$("basketTable").clearAll();
    $$("basketTable").define("data", basket);
    $$("basketTable").refresh();

    $$("storageTable").clearAll();
    $$("storageTable").define("data", storage);
    $$("storageTable").refresh();
    sumAll = sum(basket);

    $$("allSum").setValue("Sum = " + sumAll + " rubles");
}

function findInd(table, it) //поиск индекса строки на которую кликнули
{
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === it) {
            return i;
        }
    }

    return -1;

}

function sum(table) {
    sumAll = 0;
    for (let i = 0; i < table.length; i++) {
        sumAll += table[i].quantity * table[i].cost;

    }
    return sumAll
} //считает сумму при вызове

webix.ready(function () {

    webix.ui({ //тут создаем заголовки таблицы и тд
        rows: [{type: "header", template: "Shop"},
            {
                rows: [{
                    cols: [{
                        view: "datatable",
                        id: 'storageTable',
                        select: "row",
                        position: "relative",
                        data: storage,
                        width: 415,
                        height: 400,
                        align: "left",
                        css: "",

                        on: {
                            onitemclick: function () {  // срабатывает при нажатии
                                let selectId = $$("storageTable").getItem($$("storageTable").getSelectedId()).id;
                                let isInBasket = findInd(basket, selectId); // находим все индексы и ID
                                let isInStorage = findInd(storage, selectId);
                                let selectedCount = $$("storageTable").getItem($$("storageTable").getSelectedId(true)).quantity;

                                if (selectedCount === 1) { // если это последний элемент в таблице  то ...
                                    webix.message({
                                        text: "it was last item",
                                        type: "error"
                                    })

                                    if (isInBasket === -1) {
                                        basket.push({
                                            number: basket.length + 1,
                                            id: selectId,
                                            name: storage[isInStorage].name,
                                            quantity: 1,
                                            cost: storage[isInStorage].cost
                                        })
                                        storage.splice(isInStorage, 1)
                                        refreshTable();
                                    } else {

                                        storage.splice(isInStorage, 1) //пытаемся удалить из таблицы и получается
                                        ++basket[isInBasket].quantity;
                                        refreshTable();
                                    }
                                } else {
                                    if (isInBasket > -1) // если такой индекс есть  в корзине
                                    { //то просто увеличиваем число в корзине и уменьшаем на складе
                                        --storage[isInStorage].quantity;
                                        ++basket[isInBasket].quantity;
                                        refreshTable();
                                    } else { //если такого индекса нет то вставляем строку и уменьшаем счетчик в складе
                                        basket.push({
                                            number: basket.length + 1,
                                            id: selectId,
                                            name: storage[isInStorage].name,
                                            quantity: 1,
                                            cost: storage[isInStorage].cost
                                        })
                                        --storage[isInStorage].quantity;


                                        refreshTable();
                                    }
                                }


                            },
                        },
                        columns: [{id: "id", header: "Articyl"},
                            {id: "name", header: "Name"},
                            {id: "quantity", header: "Count"},
                            {id: "cost", header: "Price"},
                        ]
                    }, {view: "resizer"}, {
                        cols: [{
                            view: "datatable",
                            id: "basketTable",
                            select: "row",
                            position: "relative",
                            data: basket,
                            width: 415,
                            height: 400,

                            columns: [{id: "id", header: "Articyl"},
                                {id: "name", header: "Name"},
                                {id: "quantity", header: "Count"},
                                {id: "cost", header: "Cost"},],
                            on: {
                                onitemclick: function () { // все то же самое только кое где поменял переменные
                                    let selectId = $$("basketTable").getItem($$("basketTable").getSelectedId()).id;
                                    let isInBasket = findInd(basket, selectId);
                                    let isInStorage = findInd(storage, selectId);
                                    let selectedCount = $$("basketTable").getItem($$("basketTable").getSelectedId(true)).quantity;

                                    if (selectedCount === 1) { //тут удаление работает прекрасно
                                        webix.message({
                                            text: "it was last item",
                                            type: "error"
                                        })
                                        if(isInStorage === -1){
                                            storage.push({
                                                number: storage.length + 1,
                                                id: selectId,
                                                name: basket[isInBasket].name,
                                                quantity: 1,
                                                cost: basket[isInBasket].cost
                                            })
                                            basket.splice(isInBasket,1);
                                            refreshTable()
                                        } else {
                                            basket.splice(isInBasket, 1)
                                            ++storage[isInStorage].quantity;
                                            refreshTable();
                                        }


                                    } else {

                                        if (isInStorage > -1) { // если  есть  на складе
                                            ++storage[isInStorage].quantity;
                                            --basket[isInBasket].quantity;
                                            refreshTable();
                                        } else {
                                            storage.push({
                                                number: storage.length + 1,
                                                id: selectId,
                                                name: basket[isInBasket].name,
                                                quantity: 1,
                                                cost: basket[isInBasket].cost
                                            })
                                            --basket[isInBasket].quantity;
                                            refreshTable();
                                        }

                                    }


                                }
                            },

                        },

                        ]
                    }, {view: "label", id: "allSum", width: 100, height: 100, label: "Sum = 0", css: {}}]


                }]

            }

        ]

    });

});

