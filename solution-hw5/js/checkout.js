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
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = '';
    const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    let totalCost = 0;
    cart.forEach((roll, index) => {
        const clone = rollCartRow.cloneNode(true);
        const cloneId = Math.random();
        clone.id =
    
        clone.getElementById("rollName").innerText = roll.type;
        clone.getElementById("glazingName").innerText = roll.glazing;
        clone.getElementById("packSize").innerText = roll.size;
        
        clone.getElementById("productImage").src = `assets/products/${rolls[roll.type].imageFile}`;
        const calculatedPrice = calculatePrice(roll.size, roll.glazing, roll.basePrice).toFixed(2);
        clone.getElementById("calculatedPrice").innerText = calculatedPrice;
        clone.getElementById("checkoutRemove").onclick = () => removeItemFromCart(index);

        totalCost = totalCost + parseFloat(calculatedPrice);
        
        cartItems.appendChild(clone)
    })
    document.getElementById("totalPrice").innerText =  `Total: ${totalCost}`;
  }

renderShoppingCart();