const container = document.querySelector("#camerasContainer");
const itemNumber = document.getElementById("itemNumber");

let cart = [];

let checkStorage = localStorage.getItem("cart");
let checkStorageParse = JSON.parse(localStorage.getItem("cart"));

if (checkStorage) {
  cart = [...checkStorageParse];
  itemNumber.innerHTML = cart.length;
}

lodPage = () => {
fetch("http://localhost:3000/api/cameras/")
  .then((response) => response.json())
  .then(function (data) {
    for (let getCameras of data) {
      let divColum = document.createElement("div");
      divColum.classList.add("col-lg-6");
      divColum.style.marginBottom = "2rem";

      let divCards = document.createElement("div");
      divCards.classList.add("card");
      divCards.setAttribute("width", "30rem");

      let cardBdy = document.createElement("div");
      cardBdy.classList.add("card-body");

      let divBtn = document.createElement("div");
      divBtn.classList.add("my");

      let cameraName = document.createElement("h2");
      cameraName.innerHTML = getCameras.name;
      cameraName.classList.add("card-title");

      let img = document.createElement("img");
      img.classList.add("card-image-top");
      img.setAttribute("alt", "cameras");
      //img.style.marginBottom= "20rem";
      //img.style.width= "50rem";
      img.src = getCameras.imageUrl;

      let cameraPrice = document.createElement("span");
      cameraPrice.innerHTML = "<b>Price:<b>" + " " + getCameras.price;
      cameraPrice.classList.add("card-price");

      let cameraDes = document.createElement("p");
      cameraDes.innerHTML = "Description:" + " " + getCameras.description;
      cameraDes.classList.add("card-description");

      let seeBtn = document.createElement("button");
      seeBtn.innerHTML = "See Details";
      seeBtn.classList.add("btn", "btn-outline-dark", "selection");

      let addBtn = document.createElement("button");
      addBtn.innerHTML = "Add To Cart";
      addBtn.classList.add("btn", "btn-outline-dark", "addToCart");
      addBtn.style.marginLeft = "2rem";

      const seeDtls = () => {
        seeBtn.addEventListener("click", () => {
          let ids = getCameras._id;
          document.location.href = "./product.html?id=" + ids;
        });
      };
      try {
        seeDtls(console.log("welldone products"));
      } catch (error) {}
      (error) => {
        console.log(error);
      };

      addBtn.addEventListener("click", () => {
        const addToCart = () => {
          const camAdd = {
            id: getCameras._id,
            name: getCameras.name,
            image: getCameras.imageUrl,
            description: getCameras.description,
            lense: getCameras.lenses[0],
            price: getCameras.price,
          };
          cart = [...cart, camAdd];

          localStorage.setItem("cart", JSON.stringify(cart));

          itemNumber.innerHTML = cart.length;
        };
        addToCart((document.location.href = "./cart.html"));
      });

      //console.log(data);

      cardBdy.appendChild(cameraName);
      cardBdy.appendChild(cameraPrice);
      cardBdy.appendChild(cameraDes);
      divColum.appendChild(divCards);
      divCards.appendChild(img);
      divCards.appendChild(cardBdy);
      cardBdy.appendChild(divBtn);
      divBtn.appendChild(seeBtn);
      divBtn.appendChild(addBtn);
      container.appendChild(divColum);
    }
  });
}
lodPage();

let cartNum = JSON.parse(localStorage.getItem("cart"));
itemNumber.innerHTML = cartNum.length;
