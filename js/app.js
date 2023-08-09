shopContent = document.getElementById("shopContent");
finishBuying = document.getElementById("finishBuying");
carritoContent = document.getElementById("carrito-content");
totalCarrito = document.getElementById("totalCarrito");
seeCarrito = document.getElementById("seeCarrito");
showAlert = document.getElementById("showAlert");
paymentContent = document.getElementById("paypal-payment-content");
paypalButtonContainer = document.getElementById("paypal-button-container");


productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
                <img src="${product.img}">
                <div class="cardInfo">
                <h3>${product.name} </h3>
                <h4 class="price">${product.price} $</h4>
                </div>
            `;
  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.className = "comprar";
  comprar.innerText = "Add to Cart";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    carritoContent.innerHTML = "";

    carrito.push({
      id: product.id,
      name: product.name,
      img: product.img,
      price: product.price,
    });

    createALalert();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
  });
});

