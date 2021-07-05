const createElement = element => document.createElement(element);
const classElement = (element, classArray) => {
	classArray.forEach(el => {
		element.classList.add(el);
	});
};
const append = (parent, el) => parent.appendChild(el);

const container = document.querySelector("#camerasContainer");
const numberArticle = document.getElementById("numberArticle");
let cart = [];

const checkStorage = localStorage.getItem("cart");
const checkStorageParse = JSON.parse(localStorage.getItem("cart"));


if (checkStorage) {
	cart = [...checkStorageParse];
	numberArticle.innerHTML = cart.length;
}
const fetchIndex = () => {
	fetch("http://localhost:3000/api/cameras/")
		.then(response => response.json())
		.then(function (data) {
			for (let getTeddies of data) {
				
				let divCol = createElement("div");
				classElement(divCol, ["col-lg-6"]);

				let divCard = createElement("div");
				classElement(divCard, ["card"]);
				divCard.setAttribute("width", "30rem");

				let divCardBody = createElement("div");
				classElement(divCardBody, ["card-body"]);

				let divButtons = createElement("div");
				classElement(divButtons, ["buttonPosition"]);

				
				let img = createElement("img");
				img.classList.add("card-image-top");
				img.setAttribute("alt", "teddies");
				img.src = getTeddies.imageUrl;

				let teddyName = createElement("h2");
				teddyName.innerHTML = getTeddies.name;
				classElement(teddyName, ["card-title"]);

				let teddyPrice = createElement("span");
				teddyPrice.innerHTML = "Price : " + " " + getTeddies.price / 100 + " $";

				let teddyDescription = createElement("p");
				teddyDescription.innerHTML =
					"Description : " + " " + getTeddies.description;

				let buttonInfo = createElement("button");
				buttonInfo.innerHTML = "See more";
				classElement(buttonInfo, ["btn", "btn-outline-dark", "selection"]);

				let addButton = createElement("button");
				addButton.innerHTML = "Add ";
				classElement(addButton, ["btn", "btn-outline-dark", "addToCart"]);

				const seeMore = () => {
					buttonInfo.addEventListener("click", () => {
						let id = getTeddies._id;
						document.location.href = "./product.html?id=" + id;
					});
				};

				seeMore();

				addButton.addEventListener("click", () => {
					const addTocart = () => {
						const teddyAdd = {
							id: getTeddies._id,
							name: getTeddies.name,
							image: getTeddies.imageUrl,
							description: getTeddies.description,
							lenses: getTeddies.lenses[0],
							price: getTeddies.price
						};
						cart = [...cart, teddyAdd];

						localStorage.setItem("cart", JSON.stringify(cart));

						numberArticle.innerHTML = cart.length;

						Swal.fire({
							title: "Your product has been added",
							icon: "success",
							html:
								'<a href ="./cart.html">Acces your cart by clicking here</a><br>',
							showCloseButton: true,
							showConfirmButton: false
						});
					};
					try {
						addTocart();
					} catch (error) {
						container.innerHTML =
							"<h3 class = error> <b><i> Sorry , something has gone wrong please try later </h3>" +
							error.name +
							error.message;
					}
				});

				
				append(divCardBody, teddyName);
				append(divCardBody, teddyPrice);
				append(divCardBody, teddyDescription);
				append(divCol, divCard);
				append(divCard, img);
				append(divCard, divCardBody);
				append(divCard, buttonInfo);
				append(divCard, addButton);
				append(divCardBody, divButtons);
				append(divButtons, buttonInfo);
				append(divButtons, addButton);
				append(container, divCol);
			}
		})
		.catch(error => {
			console.log(error); 
		});
};

fetchIndex();



let numberProductsInCart = JSON.parse(localStorage.getItem("cart"));
if (!numberProductsInCart) {
	numberArticle.innerHTML = 0;
} else {
	numberArticle.innerHTML = numberProductsInCart.length;
}
