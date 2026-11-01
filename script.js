const menu = document.getElementById("menu");
menu.innerHTML = "";
const basket = [];

for (let i = 0; i < myDishes.length; i++) {
  const dish = myDishes[i];
  const price = dish.price.toFixed(2).replace(".", ",");

  menu.innerHTML += `
 x

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
  console.log(basket);
}
