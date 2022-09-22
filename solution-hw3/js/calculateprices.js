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


function glazingChange(element) {
    // get value of selected glazing option
    const packPriceAdaptation = parseFloat(document.getElementById("pack-size").value);
    const glazingPrice = parseFloat(document.getElementById("glazing-select").value);
  // add your code to do update the price ...
  const basePrice = 2.49;
  const finalPrice = (basePrice + glazingPrice) * packPriceAdaptation;

  document.getElementById('final-price').innerText = `$${finalPrice.toFixed(2)}`;

  }
  