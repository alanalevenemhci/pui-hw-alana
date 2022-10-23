class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
    }
}

const packSizeElement = document.getElementById("pack-size");
const packSizeOptions = [{name: "1", value: 1}, {name: "3", value: 3}, {name: "6", value: 5}, {name: "12", value: 10}];

const glazingSelectElement = document.getElementById("glazing-select");
const glazingOptions = [
  {name: "Keep original", value: 0}, 
  {name: "Sugar milk", value: 0}, 
  {name: "Vanilla milk", value: 0.5}, 
  {name: "Double chocolate", value: 1.5}
];

for(let i = 0; i < packSizeOptions.length; i++) {
    let opt = packSizeOptions[i];
    let el = document.createElement("option");
    el.textContent = opt.name;
    el.value = opt.value;
    packSizeElement.appendChild(el);
}

for(let i = 0; i < glazingOptions.length; i++) {
  let opt = glazingOptions[i];
  let el = document.createElement("option");
  el.textContent = opt.name;
  el.value = opt.value;
  glazingSelectElement.appendChild(el);
}

// New code

// Get cart from local storage. If there isn't a cart present return an empty array. 
const cart = JSON.parse(localStorage.getItem("cart")) ?? [];


// Get the roll type from the URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

// Use the roll type to real from the rollsData JSON
// The rollType matches a key in rollsData and we can then read
// the base price and image file
const data = rolls[rollType];
const basePrice = data.basePrice;
const imageFile = data.imageFile;

// Set product image on page to the one we got from rollsData
const productImage = document.getElementById("product-image");
productImage.src = `assets/products/${imageFile}`;

// set the initial final price as the base price we got from rollsData
const finalPrice = document.getElementById("final-price");
finalPrice.innerText = `$${basePrice}`;

// set the name of the roll to the value we got from the URL
const rollNameTitle = document.getElementById("roll-name");
rollNameTitle.innerText = `${rollType} cinnamon roll`;


function glazingChange(element) {
    // get value of selected glazing option
    const packPriceAdaptation = parseFloat(document.getElementById("pack-size").value);
    const glazingPrice = parseFloat(document.getElementById("glazing-select").value);
  // add your code to do update the price ...
  const finalPrice = (basePrice + glazingPrice) * packPriceAdaptation;

  document.getElementById('final-price').innerText = `$${finalPrice.toFixed(2)}`;

  }

  function addToCart(element) {
    // Get roll specifications to be added to cart
    // Since the value is the price adaptation for the select we need to read the text of the selected index.
    const glazingSelect = document.getElementById("glazing-select");
    const glazing = glazingSelect.options[glazingSelect.selectedIndex].text;

    const packSizeSelect = document.getElementById("pack-size");
    const packSize = parseInt(packSizeSelect.options[packSizeSelect.selectedIndex].text);

    // Create new instance of Roll class
    const rollToBeAdded = new Roll(rollType, glazing, packSize, basePrice);
    cart.push(rollToBeAdded);

    // Add cart to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  }