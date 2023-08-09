let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const paintCarritoElements = () => {
  if (carrito.length > 0) {
    carritoContent.style.display = "block";
    carritoContent.innerHTML = "";

    carrito.forEach((product) => {
      let contentCarrito = document.createElement("div");

      contentCarrito.className = "modalContent";

      contentCarrito.innerHTML = `
              <img src="${product.img}"/>
              <h4>${product.name}</h4>
              <h4>${product.price}$ </h4>
              `;

      carritoContent.append(contentCarrito);
      deleteProduct = document.createElement("i");
      deleteProduct.className = "fa-solid fa-trash-can";

      contentCarrito.append(deleteProduct);

      deleteProduct.addEventListener("click", deleteProductItem);
    });

    const total = carrito.reduce((acc, el) => acc + el.price, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "totalBuying";
    totalBuying.innerHTML = `Total:  ${total} $`;
    carritoContent.append(totalBuying);

    const payContent = document.createElement("div");
    payContent.className = "payContent";
    payContent.innerHTML = "Pay";
    carritoContent.append(payContent);

    paymentContent.style.display = "none";

    payContent.addEventListener("click", () => {
      carritoContent.style.display = "none";
      paymentContent.style.display = "block";
      paypalButtonContainer.innerHTML = "";
      const total = carrito.reduce((acc, el) => acc + el.price, 0);

      paypal
        .Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total, 
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              paymentContent.style.display = "none";
              showAlert.innerHTML = "";
              let contentAlert = document.createElement("span");

              contentAlert.innerHTML = `
                  <span> ${details.payer.name.given_name} se agrego al carrito.</span>
                  `;
              showAlert.append(contentAlert);

              showAlert.style.display = "block";

              function cleanAlert() {
                showAlert.style.display = "none";
              }

              setTimeout(cleanAlert, 4000);
              return fetch("/paypal-transaction-complete", {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });
            });
          },
        })
        .render("#paypal-button-container");
    });
  } else {
    carritoContent.style.display = "none";
  }
};

seeCarrito.addEventListener("click", paintCarritoElements);

const deleteProductItem = () => {
  const foundId = carrito.find((element) => element.id);

  localStorage.removeItem(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  console.log(carrito);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  paintCarritoElements();
};
