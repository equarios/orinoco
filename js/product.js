

const createElement = element => document.createElement(element)
const classElement = (element, classArray) => {
    classArray.forEach(el => {
        element.classList.add(el)
    })
}
const append = (parent, el) => parent.appendChild(el)



const urlParams = new URLSearchParams(window.location.search)
let idCameras = urlParams.get("id")


const choosenProduct = document.querySelector("#choosenProduct")
const numberArticle = document.getElementById("numberArticle")


let camera = null;


const previousFunction = () => window.location = ("../index.html" + "#ourProducts")

let cart = [];




const addTocart = () => {
    const teddyAdd = {
        id: camera._id,
        name: camera.name,
        image: camera.imageUrl,
        description: camera.description,
        price: camera.price,
        lense: camera.lenses[0]
        
    }
    cart = [...cart, teddyAdd];

    localStorage.setItem("cart", JSON.stringify(cart))

    numberArticle.innerHTML = cart.length
    Swal.fire({
        title: 'Your product has been added',
        icon: 'success',
        html: '<a href ="./cart.html">Acces your cart by clicking here</a><br><br> <a href =../index.html#ourProducts>Or go back to home page</a>',
        showCloseButton: true,
        showConfirmButton: false
    })
}

const checkStorage = localStorage.getItem("cart")
const checkStorageParse = JSON.parse(localStorage.getItem("cart"))


if (checkStorage) {
    cart = [...checkStorageParse]
    numberArticle.innerHTML = cart.length
} else {
    choosenProduct.innerHTML = " <h3 class = add your product to your cart</h3"
}

const fetchById = () => {
    fetch("http://localhost:3000/api/cameras/" + idCameras)
        .then(response => response.json())
        .then(function (data) {
            camera = data

            const divCol4 = createElement("div")
            classElement(divCol4, ["col-lg-4"])

            const divCol8 = createElement("div")
            classElement(divCol8, ["col-lg-8", "d-flex", "flex-column"])

            divButtons = createElement("div")

         
            let teddyName = createElement("h2")
            teddyPrice = createElement("span")
            teddyDescription = createElement("p")
            teddyImage = createElement("img")
            teddyImage.onload = function(){
                teddyImage.style.height = "200px";
            };
            teddyLabel = createElement("label")
            teddySelect = createElement("select")
            previousButton = createElement("button")
            addButton = createElement("button")

         
            teddyName.innerHTML = camera.name
            teddyPrice.innerHTML = "Price : " + " " + camera.price / 100 + " $"
            teddyDescription.innerHTML = "Description :" + " " + camera.description
            teddyImage.src = camera.imageUrl
            teddyLabel.innerHTML = "Lenses : "
            previousButton.innerHTML = "Previous"
            addButton.innerHTML = "Add to cart"

      
            classElement(divButtons, ["divButtons"])
            classElement(teddyName, ["teddyName"])
            classElement(teddyPrice, ["teddyPrice"])
            classElement(teddyDescription, ["teddyDescription"])
            classElement(addButton, ["btn", "btn-outline-dark", "add-cart"])
            classElement(teddyImage, ["teddyImg"])
            classElement(previousButton, ["btn", "btn-outline-dark", "returnLink"])
            classElement(teddySelect, ["selectLenses"])
            

            teddyLabel.setAttribute("for", "lense")
            previousButton.setAttribute("href", "index.html")
            teddySelect.setAttribute("id","idd")

            
            for (let i = 0; i < camera.lenses.length; i++) {
                let option = createElement("option");
                let teddyColors = camera.lenses[i];
                option.innerHTML = teddyColors;
                
                
                append(teddySelect, option);
            }

            
              
            append(choosenProduct, divCol4)
            append(divCol4, teddyImage)
            append(choosenProduct, divCol8)
            append(divCol8, teddyName)
            append(divCol8, teddyDescription)
            append(divCol8, teddyPrice)
            append(divCol8, teddyLabel)
            append(teddyLabel, teddySelect)
            append(divCol8, divButtons)
            append(divButtons, previousButton)
            append(divButtons, addButton)

            
            addButton.addEventListener("click", () => {
                try {
                    addTocart()
                } catch (error) {
                    choosenProduct.innerHTML = "<h3 class = error> <b><i> Sorry , something has gone wrong please try again later </h3>"
                }
            })
          

            previousButton.addEventListener("click", () => {
                previousFunction()
            })

        }).catch((error) => {
            if (idCameras.length != 24 || idCameras === undefined || idCameras != urlParams) {
                choosenProduct.innerHTML = "<h3 class = error><b><i> Sorry , the selected product does not exist , please came back to home page and try an other product</h3>"
            }
        })
}
try {
    fetchById()
} catch (error) {
    choosenProduct.innerHTML = " <h3 class = error><b><i>!!!!SORRY WE HAVE A PROBLEM IN OUR ATTEMPT TO CONNECT TO THE SERVER,PLEASE TRY AGAIN LATER...</h3>"
}


/*
function GetSelectedText(){
    var e = document.getElementById("idd");
    var result = e.options[e.selectedIndex].text;
    document.getElementById("result").innerHTML = result;
}

*/