const resultsHTML = document.querySelector(".results");
const searchInput = document.querySelector(".search-input");
const baseURL = "https://api.sampleapis.com/wines/reds";

// fetch
fetch(baseURL)
  .then((resp) => resp.json())
  .then((data) => {
    for (let i = 1; i < 25; i++)
      buildProductCards(data[i].image, data[i].winery, data[i].wine);
  })
  .catch((error) => console.log(error.message));

// dom
function buildProductCards(imgURL, title, desc) {
  const cardHTML = `
    <div class="card">
    <img src="${imgURL}" alt="" class="card-img">
    <div class="card-title">${title}</div>
    <div class="card-desc">${desc}</div>
    <div class="card-coast">2 500p</div>
    <div class="card-basket"> 
      <button class="card-basket__btn">Add To Basket </button>
    </div>
    </div>
    `;
  resultsHTML.insertAdjacentHTML("beforeend", cardHTML);
}

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
