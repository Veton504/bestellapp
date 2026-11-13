const menu = document.getElementById("menu");
const basket = [];
const deliveryFee = 5;
const categories = ["Vorspeisen", "Hauptgerichte", "Getränke"];
const basketButton = document.getElementById("basket-button");
const basketDialog = document.getElementById("basket-dialog");
const closeButton = document.getElementById("close-dialog");
const orderDialog = document.getElementById("order-dialog");
const closeOrder = document.getElementById("close-order");

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
      </div>
      <div class="dish-side">
        <span class="price">${price} €</span>
        <button onclick="addToBasket(${index})">+</button>
      </div>
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
  renderBasket();
  basketDialog.close();
  orderDialog.showModal();
}

function getMinusButtonHtml(item, index) {
  const symbol = item.amount === 1 ? "🗑" : "-";
  return `<button onclick="changeAmount(${index}, -1)">${symbol}</button>`;
}

function getBasketItemHtml(item, index) {
  const sum = (item.price * item.amount).toFixed(2).replace(".", ",");
  return `
    <div class="basket-item">
      <span>${item.amount}x ${item.name}</span>
      <div class="basket-item-row">
        <div>
          ${getMinusButtonHtml(item, index)}
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
    <div class="sum-row"><span>Lieferkosten</span><span>${fee} €</span></div>
    <div class="sum-row total"><span>Gesamt</span><span>${sum} €</span></div>
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
  return `
    <div class="basket-list">${getBasketItemsHtml()}</div>
    <div class="basket-sums">${getBasketSumsHtml(total)}</div>
  `;
}

basketButton.onclick = function () {
  basketDialog.showModal();
};

closeButton.onclick = function () {
  basketDialog.close();
};

closeOrder.onclick = function () {
  orderDialog.close();
};

renderMenu();
renderBasket();
