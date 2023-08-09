
showAlert.style.display = "none";

const createALalert = () => {
  showAlert.innerHTML = "";
  let contentAlert = document.createElement("span");

  contentAlert.innerHTML = `
  <span> se agrego al carrito.</span>
 
  `;
  showAlert.append(contentAlert);

  showAlert.style.display = "block";

  function cleanAlert() {
    showAlert.style.display = "none";
  }

  setTimeout(cleanAlert, 2000);
};
