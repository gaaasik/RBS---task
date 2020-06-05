let storage = [
{id: 1, name: "laptop", quantity: 12, cost:25000,},
{id: 2, name: "Mouse", quantity:32, cost:1500},
{id: 3, name: "Keyboard", quantity: 2, cost:2000},
{id: 4, name: "Pen", quantity:234, cost:20},
{id: 5, name: "Printer", quantity: 213, cost:4000},
{id: 6, name: "Phone", quantity:21, cost:22000},

]
let basket = [

["id", "№"],
["name", "Название"],
["cost", "Цена"],
["quantity", "Количество"],
];

// let basket=[];
// let f = 0;
const storageTable = document.getElementById("storageTable");
const  basketTable = document.getElementById("basketTable");
const costElement = document.getElementById("cost");
const removeButton = document.getElementById("button");

removeButton.onclick = function(event){
  if ((event.type == "click")||(event.type = "delete")) // кнопка чтобы очистить корзину
  {
    removetable(basketTable);
  }
}

function main()
{      
Table(storageTable);
Table(basketTable);
costElement.innerHTML = 0;


for (var i = 0; i < storage.length; i++) { //заполняем значениями склад
  addRow(storageTable,storage[i]);
   
}

for (let i = 1; i < storageTable.rows.length ; i++) {
  let row  = storageTable.rows[i];
 row.onclick = createRow(row);
 
  row.onmouseover = function(event) //выделение элементов при наведении курсора, правда не получилось сделать так чтобы выделялась вся строка
 {                                  
  let target = event.target;
  target.style.background = "pink";

  console.log(target)
 }
 row.onmouseout = function(event)
 {
  let target = event.target;
  target.style.background = "white";
 }

}
 
} 



main();

function Table(table)   //создает заголовки
{
  let row = table.insertRow(-1);
  row.className = "head-table";
  for (var i = 0; i <basket.length; i++) 
  {
   let cell = row.insertCell(i);
   let text = basket[i][1];
   cell.innerHTML = text;
 }     
}


function sum(){ // считает сумму в корзине
let cost = 0 ;
for (var i = 1; i < basketTable.rows.length; i++) {
  let row = basketTable.rows[i].getElementsByTagName("td");

  let prodCost = +row[2].innerHTML;
  let number = +row[3].innerHTML;
  cost += prodCost * number;
}

  costElement.innerHTML = cost;

}

 function removetable(table)  // функция для отчистки корзины и возвращения количества товара на склад обратно
 { 
  if (table.rows.length == 1)  {
    alert("Корзина пуста!")
    
  } else{

  

  for (let i = 1; i < table.rows.length ; i++) {
  let row  = table.rows[i];
  let rowVal = row.getElementsByTagName("td");
  

  let prodName = rowVal[1].innerHTML;
for (var j = 1; j < storageTable.rows.length; j++) {
  let storageNowCount = storageTable.rows[j].getElementsByClassName("quantity")[0];
  let storageProdName =  storageTable.rows[j].getElementsByClassName("name")[0].innerHTML;
  if (prodName == storageProdName) {
    
  let celNum = rowVal[3];

    console.log("celNum2 = ", celNum.innerHTML);
    console.log("storageNowCount1 = " , storageNowCount)
  

     storageNowCount.innerHTML = +storageNowCount.innerHTML + (+celNum.innerHTML); 

    console.log("sum = " ,storageNowCount.innerHTML)
  }
}

}

  for (var i = table.rows.length; i != 1 ; i--)
   {
    table.deleteRow(i-1);
  }
  sum()
  }
}
  



function createRow(row) //создает новую строку в таблице корзины если эта строка ранее не была добавлена
{ 
return function(){
  let rowVal = row.getElementsByTagName("td");
  let celNum = rowVal[3];
  let prodNum = celNum.innerHTML;
  if (prodNum <= 0)
  {
    alert("Товара больше нет")
   return prodNum = 0;
    // removeRow(storageTable,rowVal);
  }
 
celNum.innerHTML = prodNum - 1;

let prodName = rowVal[1].innerHTML;
let Ind = -1;
for (var i = 1; i < basketTable.rows.length; i++) 
{
 let basketProdName = basketTable.rows[i].getElementsByClassName("name")[0].innerHTML;
 if (basketProdName == prodName)
 {
  Ind = i;
  break;
}

}
if(Ind == -1 )
{
  let it = {};
  for (var i = 0; i < rowVal.length; i++) {
    it[basket[i][0]] = rowVal[i].innerHTML;
  }
  it["quantity"] = 1;
  it["id"] = basketTable.rows.length;
  addRow(basketTable,it);
 
}
else {

   let celNum = basketTable.rows[Ind].getElementsByClassName("quantity")[0];
    celNum.innerHTML = +celNum.innerHTML + 1 ;

}
sum(); 

  // плдсчет суммы
}
};
function addRow(table,it) { //заполняет строку
  let row = table.insertRow(table.rows.length)

  for (var i = 0; i < basket.length; i++) {
    let cell = row.insertCell(i);
    let key = basket[i][0];
    cell.innerHTML = it[key];
    cell.className +=key;

  
 
//}
  }
}
// document.addEventListner('keydown',function(event){
//   if (event.code == event.deleteKey)
//   {
//     removetable(basketTable);
//   }
// });