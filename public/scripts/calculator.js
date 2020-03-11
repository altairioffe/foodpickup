$(document).ready(function () {
//check out the brackets!!!!!
// renders order summary/calculator form when menu item is added to order, also adds class to addCart button to disable it
  $(".addCart").click(function () {
    $(".calculator.ui.form").css("visibility", "visible")
    event.preventDefault();
    const $itemContainer = $(this).parent();
    const itemId = $itemContainer.attr("data-id")
    const itemInfo = menuItems[itemId]
    $itemContainer.find(".addCart").addClass("disabled")

    // console logs to determine targetting/isolation of elements
    // console.log(itemId)
    // console.log(itemInfo)
    // console.log(menuItems[itemId].name);
    // console.log(menuItems[itemId].price);
    // console.log(menuItems);

    // variable declarations for tax and total calculations
    const addItem = menuItems[itemId].name;
    const addPreTax = parseFloat(menuItems[itemId].price)
    const addTax = (addPreTax * 0.13).toFixed(2);
    const addTotal = (addPreTax * 1.13).toFixed(2);

    // buttons are added and taxes/total price for the menu item appear in the summary/calculator form
    $(".new-item").append($(`<button class="add ui blue button ${itemId}" tabindex="0">+</button> <button class="remove ui red button ${itemId}" tabindex="0">-</button> <span id="counter">1 X ${addItem}</span> <br> <br>`));
    $(".pre-tax").text(`Total Before Tax: $${addPreTax}`)
    $(".tax-amount").text(`13% HST: $${addTax}`)
    $(".total-price").text(`Total Amount: $${addTotal}`)

    //need to put a cap on how many of one item can be ordered

    // console log dish ID ==> isolate/target elements... (must add the id or class to all entries in an object or array)

    // adds items to cart (which have already been added), and updates the tax and total price
    // $itemContainer.find(".add").click(function () { ==> RAF'S CODE...
    $(".add").click(function () {
      event.preventDefault();
      let i = parseInt($("#counter").text());
      i++;
      $("#counter").text(`${i} X ${addItem}`);
      let j = addPreTax
      $(".pre-tax").text("Total Before Tax: $" + (i * j).toFixed(2))
      $(".tax-amount").text("13% HST: $" + (i * j * 0.13).toFixed(2))
      $(".total-price").text("Total Amount: $" + (i * j * 1.13).toFixed(2))
    });

    // removes items from cart (which have already been added), and updates the tax and total price
    $(".remove").click(function () {
      event.preventDefault();
      let i = parseInt($("#counter").text());
      if (i <= 0) {
        //some function to stop it/do nothing
        //need to make a full remove
        //is i === 0 necessary?
        i === 0;
        $(".addCart").removeClass("disabled")
      } else {
        i--;
      };
      $("#counter").text(`${i} X ${addItem}`);
      let j = addPreTax
      $(".pre-tax").text("Total Before Tax: $" + (i * j).toFixed(2))
      $(".tax-amount").text("13% HST: $" + (i * j * 0.13).toFixed(2))
      $(".total-price").text("Total Amount: $" + (i * j * 1.13).toFixed(2))
    });
  });
});





// ==> sort of a template for making modular functions
// function addOrder(orderName) ->
//   Orderelement {
//     <h4 class="ui dividing header">Order Summary</h4>
//     <button class="add ui blue button" tabindex="0">+</button>
//     <span id="counter">0</span>
//     <button class="remove ui red button" tabindex="0">-</button>
//   create outer div
//   return the outer div
