// setTimeout(() => {
//   let btnsOrder = document.querySelectorAll(".card-basket__btn");
//   creeateOrder(btnsOrder);
// }, 1000);

// function creeateOrder(btns, amountCount) {
//   const btnAttrMinus = `data-action="minus"`,
//         btnAttrPlus  = 'data-action="plus"',
//         btnAttrAdd   = 'data-action="add"';

//   let productCount = document.querySelectorAll(".card-basket__count");

//   btns.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       if (e.target.hasAttribute('data-action', "minus")) {
//         productCount.forEach((el) => {
//           if (el.parentElement === e.target.parentElement) {
//             --el.innerText;
//           }
//         });
//       } 
//     });
//   });
// }



// summ coasts 
// let coast = document.querySelector('.card-coast');
// coast.innerText = parseFloat(coast.innerHTML.replace(' ', '')) * parseInt(el.innerHTML);





// setTimeout(() => {
//     let productCount = document.querySelectorAll(".card-basket__count");
//     let productItem = document.querySelectorAll(".card");
//     let basketOrders = document.querySelector(".basket-results");
//     creeateOrder(productItem, productCount, basketOrders);
//   }, 1000);