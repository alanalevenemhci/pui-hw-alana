// Template used to show a cart entry
const rollCartRow = document.getElementById("rollCartRow").content;


const calculatePrice = (size, glazing, bPrice) => {
    const packSizeMultipliers = {"1": 1, "3": 3, "6": 5, "12": 10};
    const glazingOptionPrices = {"Keep original": 0, "Sugar milk": 0, "Vanilla milk": 0.5, "Double chocolate": 1.5};
  
    const sizeAdaptation = packSizeMultipliers[size];
    const glazePrice = glazingOptionPrices[glazing];
  
    const finalPrice = (bPrice + glazePrice) * sizeAdaptation;
    return finalPrice;
  }


  const removeItemFromCart = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderShoppingCart();
  }

  const renderShoppingCart = () => {
    // cartItems is the div that holds the rendered cart rows
    const cartItems = document.getElementById("cartItems");

    // Set to empty by default
    cartItems.innerHTML = '';

    // Get cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    let totalCost = 0;

    // Loop through the cart and generate a "row" for each item in cart
    cart.forEach((roll, index) => {
        // Get a copy of the template and fill it with the data of a roll in the cart
        const clone = rollCartRow.cloneNode(true);
        const cloneId = Math.random();
    
        clone.getElementById("rollName").innerText = roll.type;
        clone.getElementById("glazingName").innerText = roll.glazing;
        clone.getElementById("packSize").innerText = roll.size;
        
        // Get image from rollsData.js rolls object. I use the roll.type to index into the object and get the image file
        clone.getElementById("productImage").src = `assets/products/${rolls[roll.type].imageFile}`;
        const calculatedPrice = calculatePrice(roll.size, roll.glazing, roll.basePrice).toFixed(2);
        clone.getElementById("calculatedPrice").innerText = calculatedPrice;
        clone.getElementById("checkoutRemove").onclick = () => removeItemFromCart(index);

        // Increment the total cost of the cart
        totalCost = totalCost + parseFloat(calculatedPrice);
        
        // Add copy of template representing the a roll in the cart onto the DOM
        cartItems.appendChild(clone)
    })

    // Set total price on the DOM once done looping
    document.getElementById("totalPrice").innerText =  `Total: ${totalCost}`;
  }

// When this script runs render the shopping cart
renderShoppingCart();