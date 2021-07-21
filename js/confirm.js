window.onload = function () {
  window.localStorage.clear();
};

const greet = document.getElementById("greetS");
const getOrder = JSON.parse(localStorage.getItem("customerOrder"));

const custName = document.createElement("h2");
custName.innerHTML = " Thank You For Order" + " " + getOrder.name + " :";

const totalAmount = document.createElement("p");
totalAmount.innerHTML = "Your Total Amount Is : " + getOrder.price + " $ ";

const autoId = document.createElement("p");
autoId.innerHTML = " Your Order ID : " + getOrder.orderId;

greet.appendChild(autoId);
greet.appendChild(custName);
greet.appendChild(totalAmount);
