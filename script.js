const menu = document.getElementById("menu");
menu.innerHTML = "";
const basket = [];

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
  let total = 0;

  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const sum = (item.price * item.amount).toFixed(2).replace(".", ",");
    container.innerHTML += `<p>${item.amount}x ${item.name} ${sum} €</p>`;
    total += item.price * item.amount;
  }
  container.innerHTML += `<p>Gesamt: ${total.toFixed(2).replace(".", ",")} €</p>`;
}
