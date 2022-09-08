const resultsHTML = document.querySelector(".results");
const searchInput = document.querySelector(".search-input");
const baseURL = "https://api.sampleapis.com/wines/reds";

// dom

function generateProductCards(imgURL, title, desc) {
  const cardHTML = `
    <div class="card">
    <img src="${imgURL}" class="card-img">
    <div class="card-title">${title}</div>
    <div class="card-desc">${desc}</div>
    <div class="card-coast">2 500p</div>
    <div class="card-basket"> 
      <div class="card-wrapper"> 
        <button class="card-basket__btn btn-minus">-</button>
        <span class="card-basket__count">1</span>
        <button class="card-basket__btn btn-plus">+</button>
        <button type="button" class="card-basket__btn card-basket__btn--add" data-action="add">Buy</button>
        <button type="button" class="card-basket__btn card-basket__btn--delete" data-action="move">Delete</button>
      </div>
    </div>
    </div>
    `;
  resultsHTML.insertAdjacentHTML("beforeend", cardHTML);
}

// fetch
const getProductsData = async () => {
  try {
    let response = await fetch(baseURL);
    let data = await response.json();
    let result = await generate(data);
  } catch (error) {
    console.log("При запросе API произошла ошибка, детали ниже:");
    console.error(error);
    throw new Error("Один из запросов завершился неудачно =(");
  }
};

function generate(arr) {
  for (let i = 1; i < 25; i++)
    generateProductCards(arr[i].image, arr[i].winery, arr[i].wine);

  let productCount = document.querySelectorAll(".card-basket__count");
  let productItem = document.querySelectorAll(".card");
  let basketOrders = document.querySelector(".basket-results");
  creeateOrder(productItem, productCount, basketOrders);
}

getProductsData();

// sort product items
function sort() {
  searchInput.addEventListener("input", (event) => {
    let val = event.target.value.trim();
    let productTitles = document.querySelectorAll(".card-title");
    if (val != "") {
      productTitles.forEach((elem) => {
        if (elem.innerText.search(val) == -1) {
          elem.parentElement.classList.add("hide");
          elem.innerHTML = elem.innerText;
        } else {
          // elem.classList.remove('hide')
          let str = elem.innerText;
          elem.innerHTML = insertMark(
            str,
            elem.innerText.search(val),
            val.length
          );
        }
      });
    } else {
      productTitles.forEach((elem) => {
        elem.parentElement.classList.remove("hide");
        elem.innerHTML = elem.innerText;
      });
    }
  });
  // To mark all maches
  const insertMark = (string, pos, len) => {
    return (
      string.slice(0, pos) +
      "<mark>" +
      string.slice(pos, pos + len) +
      "</mark>" +
      string.slice(pos + len)
    );
  };
}

sort();


function creeateOrder(btns, count, addOrder) {
  btns.forEach((item) => {
    let coast = document.querySelectorAll(".card-coast");

    item.addEventListener("click", (event) => {
      count.forEach((el) => {
        if (el.parentElement === event.target.parentElement) {
          if (event.target.classList.contains("btn-minus")) {
            el.innerText > 1 ? --el.innerText : el.innerText;
          } else if (event.target.classList.contains("btn-plus")) {
            el.innerText ? ++el.innerText : el.innerText;
          } else if (event.target.classList.contains("card-basket__btn--add")) {
            addOrder.append(item);
            return basketStatus(addOrder);
          } else if (
            event.target.classList.contains("card-basket__btn--delete")
          ) {
            resultsHTML.append(item);
            isEmptyBasket()
            return basketStatus(addOrder);
          }
        }
      });
    });
  });
}

const basketBtn = document.querySelector(".product-basket");

function openPopup(btn) {
  const basketELem = document.querySelector(".basket");
  btn.addEventListener("click", (e) => {
    if (!basketELem.classList.contains("basket-visible")) {
      basketELem.classList.toggle("basket-visible");
    } else {
      basketELem.classList.remove("basket-visible");
    }
    isEmptyBasket();
  });
}

function basketStatus(basketBox) {
  const basketCount = document.querySelector(".product-basket__count");
  if (basketBox.children.length > 0) {
    basketCount.classList.remove("hidden");
    return (basketCount.innerText = basketBox.children.length);
  } else {
    basketCount.classList.add("hidden");
  }
}

function isEmptyBasket() {
  const basketOrders = document.querySelector(".basket-results");
  const basketOrederStatus = document.querySelector(".title--status");

  return basketOrders.children.length == 0
    ? (basketOrederStatus.innerText = "Корзина товаров пуста!")
    : (basketOrederStatus.innerText = "Корзина товаров:");
}

openPopup(basketBtn);
