
    let storage = [
    {id: '1', name: "laptop", quantity: 12, cost: 25002,},
    {id: '2', name: "Mouse", quantity: 2, cost: 1500},
    {id: '3', name: "Keyboard", quantity: 2, cost: 2000},
    {id: '4', name: "Pen", quantity: 234, cost: 20},
    {id: '5', name: "Printer", quantity: 213, cost: 4000},
    {id: '6', name: "Phone", quantity: 21, cost: 21000},
]

//let storage = []
let basket = [];
let sumAll = 0;

// for (let i=0 ; i<storageOne.length;i++){ //заполняет массив склада(думал поможет при удалении строки из склада, но не помогло)
//     storage.push({number:storage.length+1,id:i+1,name:storageOne[i].nameone,quantity:storageOne[i].quantityone,cost:storageOne[i].costone})
//
// }

function refreshTable() {  // обновляет все таблицы и сумму
    $$("basketTable").clearAll();
    $$("basketTable").define("data", basket);
    $$("basketTable").refresh();
    $$("storageTable").refresh();
    sumAll = sum(basket);

    $$("allSum").setValue("Sum = "+sumAll+" rubles");
}

function findInd(table, it) //поиск индекса строки на которую кликнули
{
    for (let i = 0; i < table.length; i++)
    {
        if(table[i].id ===it ){
            return i ;
        }
    }

    return -1;

}



function sum(table){
    sumAll = 0;
    for (let i  = 0 ; i<table.length;i++)
    {
        sumAll+= table[i].quantityBasket*table[i].costBasket;

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
                        css:"",

                        on: {
                            onitemclick: function () {  // срабатывает при нажатии
                                let selectId = $$("storageTable").getItem($$("storageTable").getSelectedId()).id;
                                let isInBasket = findInd(basket, selectId); // находим все индексы и ID
                                let isInStorage = findInd(storage, selectId);
                                let selectedCount = $$("storageTable").getItem($$("storageTable").getSelectedId(true)).quantity;
                                if (isInStorage != -1){

                                    if (selectedCount === 0) { // если это последний элемент в таблице  то ...
                                        alert("It was the last item ");

                                        console.log("storage = ",storage);
                                        ++basket[isInBasket].quantity;
                                        storage.splice(isInStorage,1); //пытаемся удалить из таблицы но не получается

                                        refreshTable();

                                        console.log("storage1 = ",storage);
                                        //return;

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

                                } else{  alert("It was the last item ");}
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
                                        alert("It was the last item ");

                                        console.log("is in storage = ", isInBasket);
                                        basket.splice(isInBasket,1)
                                        ++storage[isInStorage].quantity;
                                        refreshTable();
                                    } else {

                                        if (isInStorage > -1)
                                        { // если  есть  на складе
                                            ++storage[isInStorage].quantity;
                                            --basket[isInBasket].quantity;
                                            refreshTable();
                                        } else {
                                            storage.push({number:storage.length+1,id:selectId,name:basket[isInBasket].name,quantity:1,cost:basket[isInBasket].cost})
                                            --basket[isInBasket].quantity;
                                            refreshTable();
                                        }

                                    }


                                }
                            },

                        },

                        ]
                    },{view: "label", id: "allSum",   width: 100,height: 100, label: "Sum = 0" ,css:{}}]


                }]

            }

        ]

    });

});

