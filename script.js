const menu = document.getElementById("menu");
const basket = [];
const deliveryFee = 5;

function renderMenu() {
  menu.innerHTML = "";
  for (let i = 0; i < myDishes.length; i++) {
    menu.innerHTML += getDishHtml(myDishes[i], i);
  }
}

function getDishHtml(dish, index) {
  const price = dish.price.toFixed(2).replace(".", ",");
  return `
    <article>
      <div>
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

function getBasketHtml() {
  if (basket.length === 0) {
    return "<p>Dein Warenkorb ist leer.</p>";
  }
  let total = 0;
  let html = "";

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const sum = (item.price * item.amount).toFixed(2).replace(".", ",");
    html += `<p>${item.amount}x ${item.name} ${sum} € <button onclick="changeAmount(${i}, -1)">-</button> <button onclick="changeAmount(${i}, 1)">+</button> </p>`;
    total += item.price * item.amount;
  }
  html += `<p>Lieferkosten: ${deliveryFee.toFixed(2).replace(".", ",")} €</p>`;
  html += `<p>Gesamt: ${(total + deliveryFee).toFixed(2).replace(".", ",")} €</p>`;
  html += `<button class="order-button" onclick="placeOrder()">Bestellen</button>`;
  return html;
}

const basketButton = document.getElementById("basket-button");
const basketDialog = document.getElementById("basket-dialog");
const closeButton = document.getElementById("close-dialog");

basketButton.onclick = function () {
  basketDialog.showModal();
};

closeButton.onclick = function () {
  basketDialog.close();
};

renderMenu();
renderBasket();
