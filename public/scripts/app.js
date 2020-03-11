// total needs to be split (as in per item) ==> probably order variable related
// calculations need to be done by the order array (logic is fine)
// target buttons ==> why does it select/switch all buttons

// global variable declarations to be filled in proceeding functions
let menuItems = {}
let order = []

$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });;

  // template for menu items
  const createMenuItem = function (item) {
    return `
    <article class = "menu" data-id= ${item.id}>
    <div class="item-image">
      <img class="ui medium circular image" src=${item.image}>
    </div>
    <h3>${item.name}</h3>
    <h4 class="ui dividing header">${item.price}</h4>
    <button class="addCart ui blue button" tabindex="0">Add to cart</button>
    <h4>${item.description}</h4>
    </article>`
  }

  // renders menu items
  const renderMenu = function (items) {
    for (let item of items) {
      $("#menu-container").append(createMenuItem(item));
    }

    // renders order summary/calculator form when menu item is added to order, also adds class to addCart button to disable it
    $(".addCart").click(function () {
      $(".calculator.ui.form").css("visibility","visible")
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
      order.push(addItem)
      const id = Number(itemId) - 1
      const classId = "class" + id
      // console.log(classId)
      console.log(order)

      // buttons are added and taxes/total price for the menu item appear in the summary/calculator form

      $(".new-item").append($(`<button class="add ui blue button ${classId}" tabindex="0">+</button> <button class="remove ui red button ${classId}" tabindex="0">-</button> <span class="counter ${classId}">1 X ${order[id]}</span> <br> <br>`));
      $(".pre-tax").text(`Total Before Tax: $${addPreTax}`)
      $(".tax-amount").text(`13% HST: $${addTax}`)
      $(".total-price").text(`Total Amount: $${addTotal}`)

      //need to put a cap on how many of one item can be ordered

// console log dish ID ==> isolate/target elements... (must add the id or class to all entries in an object or array)

      // adds items to cart (which have already been added), and updates the tax and total price
      // $itemContainer.find(".add").click(function () {
      $(".classId, .add").click(function () {
        event.preventDefault();
        order.push(addItem)
        console.log(order)
        let i = parseInt($(".classId, .counter").text());
        i++;
        $(".classId, .counter").text(`${i} X ${order[id]}`);
        let j = addPreTax
        $(".pre-tax").text("Total Before Tax: $" + (i * j).toFixed(2))
        $(".tax-amount").text("13% HST: $" + (i * j * 0.13).toFixed(2))
        $(".total-price").text("Total Amount: $" + (i * j * 1.13).toFixed(2))
      });









      // removes items from cart (which have already been added), and updates the tax and total price
      $(".classId, .remove").click(function () {
        event.preventDefault();
        let i = parseInt($(".classId, .counter").text());
        if (i <= 0) {
          //some function to stop it/do nothing
          //need to make a full remove
          //is i === 0 necessary?
          i === 0;
          $(".addCart").removeClass("disabled")
        } else {
          i--;
        };
        // removes the first occurence of the menu item (we need to make the item row dissappear when you get to 0)
        order.splice(order.indexOf(addItem), 1)
        console.log(order)
        $(".classId, .counter").text(`${i} X ${order[id]}`);
        let j = addPreTax
        $(".pre-tax").text("Total Before Tax: $" + (i * j).toFixed(2))
        $(".tax-amount").text("13% HST: $" + (i * j * 0.13).toFixed(2))
        $(".total-price").text("Total Amount: $" + (i * j * 1.13).toFixed(2))
      });
    });
  }

  // loads menu items
  const loadMenu = function () {
    $.ajax({
      url: '/api/menu',
      method: "GET"
    })
      .then(response => {
        for (let item of response) {
          menuItems[item.id] = item;
        };
        renderMenu(response);
      });
  }
  loadMenu();
})

