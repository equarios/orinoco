const urlSrch = new URLSearchParams(window.location.search);
let camId = urlSrch.get("id");

let camera = null;

const slectedProduct = document.querySelector("#slectedProduct");
const itemNumber = document.getElementById("itemNumber");

let cart = [];

const checkStorage = localStorage.getItem("cart");
const checkStorageParse = JSON.parse(localStorage.getItem("cart"));

if (checkStorage) {
  cart = [...checkStorageParse];
  itemNumber.innerHTML = cart.length;
}

fetch("http://localhost:3000/api/cameras/" + camId)
  .then((response) => response.json())
  .then(function (data) {
    camera = data;

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
    cameraName.innerHTML = camera.name;
    cameraName.classList.add("card-title");

    let img = document.createElement("img");
    img.classList.add("card-image-top");
    img.setAttribute("alt", "cameras");
    //img.style.marginBottom= "20rem";
    //img.style.width= "50rem";
    img.src = camera.imageUrl;

    let cameraPrice = document.createElement("span");
    cameraPrice.innerHTML = "<b>Price:<b>" + " " + camera.price;
    cameraPrice.classList.add("card-price");

    let cameraDes = document.createElement("p");
    cameraDes.innerHTML = "Description:" + " " + camera.description;
    cameraDes.classList.add("card-description");

    let selectLabl = document.createElement("label");
    selectLabl.innerHTML = "<b> Lense-Type : &nbsp</b>";

    let cameraLense = document.createElement("select");
    cameraLense.innerHTML = camera.lenses;
    cameraLense.classList.add("card-price");

    cameraLense.setAttribute("id", "idd");

    //console.log(result);

    cameraLense.onchange = handleChange;
    var e, result;
    function handleChange() {
      e = document.getElementById("idd");
      result = e.options[e.selectedIndex].text;
    }

    for (let i = 0; i < camera.lenses.length; i++) {
      let option = document.createElement("option");
      let lens = camera.lenses[i];
      option.innerHTML = lens;
      cameraLense.appendChild(option);
    }

    let backBtn = document.createElement("button");
    backBtn.innerHTML = "Go-Back";
    backBtn.classList.add("btn", "btn-outline-dark", "selection");
    backBtn.style.marginTop = "3rem";

    let addBtn = document.createElement("button");
    addBtn.innerHTML = "Add To Cart";
    addBtn.classList.add("btn", "btn-outline-dark", "addToCart");
    addBtn.style.marginLeft = "2rem";
    addBtn.style.marginTop = "3rem";

    cardBdy.appendChild(cameraName);
    cardBdy.appendChild(cameraPrice);
    cardBdy.appendChild(cameraDes);
    divColum.appendChild(divCards);
    divCards.appendChild(img);
    cardBdy.appendChild(selectLabl);
    cardBdy.appendChild(cameraLense);

    divCards.appendChild(cardBdy);
    cardBdy.appendChild(divBtn);
    divBtn.appendChild(backBtn);
    divBtn.appendChild(addBtn);
    slectedProduct.appendChild(divColum);

    const gback = () => {
      backBtn.addEventListener("click", () => {
        document.location.href = "./index.html";
      });
    };
    gback();

    addBtn.addEventListener("click", () => {
      const addToCart = () => {
        const camAdd = {
          id: camera._id,
          name: camera.name,
          image: camera.imageUrl,
          description: camera.description,
          lense: result,
          price: camera.price,
        };
        cart = [...cart, camAdd];

        localStorage.setItem("cart", JSON.stringify(cart));

        itemNumber.innerHTML = cart.length;
      };
      addToCart((document.location.href = "./cart.html"));
    });
  });

let cartNum = JSON.parse(localStorage.getItem("cart"));
itemNumber.innerHTML = cartNum.length;
