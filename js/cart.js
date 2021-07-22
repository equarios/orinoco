const tablebody = document.querySelector("#cart-tablebody");
const subTotal = document.querySelector(".subtotal");
const checkout = document.querySelector(".checkout");
const order = document.querySelector("#order");
const table = document.querySelector(".table");

let itemNumber = document.getElementById("itemNumber");

let total = null;
let products = [];

const myCart = localStorage.getItem("cart");
let myCartParse = JSON.parse(localStorage.getItem("cart"));

for (let i = 0; i < myCartParse.length; i++) {
  const articleInCart = myCartParse[i];

  const row = tablebody.insertRow(-1);
  row.id = articleInCart.id;

  const cellName = row.insertCell(0);
  cellName.innerHTML = articleInCart.name;

  const cellDesc = row.insertCell(1);
  cellDesc.innerHTML = articleInCart.description;

  const cellLense = row.insertCell(2);
  cellLense.innerHTML = articleInCart.lense;

  const cellPrice = row.insertCell(3);
  cellPrice.innerHTML = articleInCart.price;

  const image = document.createElement("img");
  image.style.width = "20rem";
  image.classList.add("imgInCart");
  image.src = articleInCart.image;
  cellName.appendChild(image);

  total += articleInCart.price;
  subTotal.innerHTML = total;

  products = [...products, articleInCart.id];

  itemNumber.innerHTML = products.length;

  const itemDelBtn = document.createElement("button");
  itemDelBtn.innerHTML = "X";
  itemDelBtn.id = articleInCart.id;
  cellPrice.appendChild(itemDelBtn);

  const delItems = () => {
    itemDelBtn.addEventListener("click", (element) => {
      const removeItems = document.getElementById(element.target.id);
      removeItems.remove();

      itemNumber.innerHTML--;

      const newCart = myCartParse.filter(
        (stayProduct) => stayProduct !== articleInCart
      );

      localStorage.setItem("cart", JSON.stringify(newCart));
      location.reload();

      total -= articleInCart.price;
      subTotal.innerHTML = total;
    });
  };
  delItems();
}

const lastName = document.getElementById("last_name");
const firstName = document.getElementById("first_name");
const email = document.getElementById("email");
const city = document.getElementById("city");
const address = document.getElementById("address");
const orderForm = document.getElementById("orderForm");

const orderUrl = "http://localhost:3000/api/cameras/order";

let test = {};
let contact;
let orderToSend;

const orderCamera = () => {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let result = true;

		for (let key in test) {
			if (test[key] === false) {
				result = false;
			}
		}

    contact = {
      lastName: lastName.value,
      firstName: firstName.value,
      email: email.value,
      city: city.value,
      address: address.value,
    };
    orderToSend = { contact, products };

    let paramFetch = {
      method: "POST",
      body: JSON.stringify(orderToSend),
      headers: { "Content-type": "application/json" },
    };

    fetch(orderUrl, paramFetch)
      .then((response) => response.json())
      .then(function (order) {
        let orderConfirmed = {
          name: contact.lastName + "  " + contact.firstName,
          price: total,
          orderId: order.orderId,
        };
        let orderStorage = localStorage.setItem(
          "customerOrder",
          JSON.stringify(orderConfirmed)
        );
        window.location = "confirm.html";
      });
  });
};

orderCamera();
