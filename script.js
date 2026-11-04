const menu = document.getElementById("menu");
menu.innerHTML = "";

const basket = [];
const deliveryFee = 5;

for (let i = 0; i < myDishes.length; i++) {
  const dish = myDishes[i];
  const price = dish.price.toFixed(2).replace(".", ",");

  menu.innerHTML += `
 
 

  <article>
    <div>
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <span class="price">${price} €</span>
    </div>
    <button onclick="addToBasket(${i})">+</button>
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
  const container = document.getElementById("basketItems");
  container.innerHTML = "";
  if (basket.length === 0) {
    container.innerHTML = "<p>Dein Warenkorb ist leer.</p>";
    return;
  }
  let total = 0;

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const sum = (item.price * item.amount).toFixed(2).replace(".", ",");
    container.innerHTML += `<p>${item.amount}x ${item.name} ${sum} € <button onclick="changeAmount(${i}, -1)">-</button> <button onclick="changeAmount(${i}, 1)">+</button> </p>`;
    total += item.price * item.amount;
  }
  container.innerHTML += `<p>Lieferkosten: ${deliveryFee.toFixed(2).replace(".", ",")} €</p>`;
  container.innerHTML += `<p>Gesamt: ${(total + deliveryFee).toFixed(2).replace(".", ",")} €</p>`;
  container.innerHTML += `<button class="order-button" onclick="placeOrder()">Bestellen</button>`;
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
  document.getElementById("basketItems").innerHTML =
    "<p>Testbestellung aufgegeben. Danke!</p>";
}

const basketButton = document.getElementById("basket-button");
const basketDialog = document.getElementById("basket-dialog");

basketButton.onclick = function () {
  basketDialog.showModal();
};

const closeButton = document.getElementById("close-dialog");

closeButton.onclick = function () {
  basketDialog.close();
};

renderBasket();
