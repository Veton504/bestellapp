const menu = document.getElementById("menu");
const dish = myDishes[0];
const price = dish.price.toFixed(2).replace(".", ",");

menu.innerHTML = `
  <article>
    <div>
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <span class="price">${price} €</span>
    </div>
    <button>+</button>
  </article>
`;
