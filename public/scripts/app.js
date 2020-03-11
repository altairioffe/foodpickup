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

  const createMenuItem = function (item) {
    return `  <article class = "menu" data-id= ${item.id}>
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

    $(".addCart").click(function () {
      $(".calculator.ui.form").css("visibility","visible")
      event.preventDefault();
      const $itemContainer = $(this).parent();
      const itemId = $itemContainer.attr("data-id")
      const itemInfo = menuItems[itemId]
      $itemContainer.find(".addCart").addClass("disabled")
      // console.log(itemInfo)
      // console.log(menuItems[itemId].name);
      // console.log(menuItems[itemId].price);
      const addItem = menuItems[itemId].name;
      const addPreTax = parseFloat(menuItems[itemId].price)
      const addTax = (addPreTax * 0.13).toFixed(2);
      const addTotal = (addPreTax * 1.13).toFixed(2);
      $(".new-item").append($(`<button class="add ui blue button" tabindex="0">+</button> <span id="counter">1 X ${addItem}</span> <button class="remove ui red button" tabindex="0">-</button>`));
      $(".pre-tax").text(`Total Before Tax: $${addPreTax}`)
      $(".tax-amount").text(`13% HST: $${addTax}`)
      $(".total-price").text(`Total Amount: $${addTotal}`)


      //need to put a cap on how many of one item can be ordered
      // $itemContainer.find(".add").click(function () {
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

