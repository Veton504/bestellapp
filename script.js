const menu = document.getElementById("menu");
const basket = [];
const deliveryFee = 5;
const categories = ["Vorspeisen", "Hauptgerichte", "Getränke"];
const basketButton = document.getElementById("basket-button");
const basketDialog = document.getElementById("basket-dialog");
const closeButton = document.getElementById("close-dialog");

function getCategoryHtml(category) {
  return `<h2 id="${category}">${category}</h2>`;
}

function getDishesByCategory(category) {
  return myDishes.filter((dish) => dish.category === category);
}

function renderCategory(category) {
  menu.innerHTML += getCategoryHtml(category);
  const dishes = getDishesByCategory(category);
  for (let i = 0; i < dishes.length; i++) {
    menu.innerHTML += getDishHtml(dishes[i], myDishes.indexOf(dishes[i]));
  }
}

function renderMenu() {
  menu.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    renderCategory(categories[i]);
  }
}

function getDishHtml(dish, index) {
  const price = dish.price.toFixed(2).replace(".", ",");
  return `
    <article>
      <img class="dish-image" src="${dish.image}" alt="${dish.name}" />
      <div class="dish-info">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <span class="price">${price} €</span>
      </div>
      <button onclick="addToBasket(${index})">+</button>
    </article>
  `;
}

function addToBasket(index) {
  const dish = myDishes[index];
  const item = basket.find((entry) => entry.name === dish.name);

  if (item) {
    item.amount++;
  } else {
    basket.push({ name: dish.name, price: dish.price, amount: 1 });
  }
  renderBasket();
}

function renderBasket() {
  const html = getBasketHtml();
  document.getElementById("basketItems").innerHTML = html;
  document.getElementById("dialogItems").innerHTML = html;
}

function changeAmount(index, change) {
  basket[index].amount += change;
  if (basket[index].amount < 1) {
    basket.splice(index, 1);
  }
  renderBasket();
}

function placeOrder() {
  basket.length = 0;
  const message = "<p>Testbestellung aufgegeben. Danke!</p>";
  document.getElementById("basketItems").innerHTML = message;
  document.getElementById("dialogItems").innerHTML = message;
}

function getBasketItemHtml(item, index) {
  const sum = (item.price * item.amount).toFixed(2).replace(".", ",");
  return `
    <div class="basket-item">
      <span>${item.amount}x ${item.name}</span>
      <div class="basket-item-row">
        <div>
          <button onclick="changeAmount(${index}, -1)">-</button>
          <button onclick="changeAmount(${index}, 1)">+</button>
        </div>
        <span>${sum} €</span>
      </div>
    </div>
  `;
}

function getBasketSumsHtml(total) {
  const fee = deliveryFee.toFixed(2).replace(".", ",");
  const sum = (total + deliveryFee).toFixed(2).replace(".", ",");
  return `
    <p>Lieferkosten: ${fee} €</p>
    <p>Gesamt: ${sum} €</p>
    <button class="order-button" onclick="placeOrder()">Bestellen</button>
  `;
}

function getBasketItemsHtml() {
  let html = "";
  for (let i = 0; i < basket.length; i++) {
    html += getBasketItemHtml(basket[i], i);
  }
  return html;
}

function getEmptyBasketHtml() {
  return `
    <p>Hier ist noch nichts.<br />Wähle etwas Leckeres aus!</p>
    <span class="basket-icon">🛒</span>
  `;
}

function getBasketHtml() {
  if (basket.length === 0) {
    return getEmptyBasketHtml();
  }
  const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);
  return getBasketItemsHtml() + getBasketSumsHtml(total);
}

basketButton.onclick = function () {
  basketDialog.showModal();
};

closeButton.onclick = function () {
  basketDialog.close();
};

renderMenu();
renderBasket();
