/*
You are hired by a restaurant to handle their menu and ordering system. Use whatever language you want.
They have 4 menus: breakfast (8-11), lunch (12-16), dinner(16-20), and all-day (8-20).
A) You should have a method to add a named dish to an array of menus (i.e., "Pancakes" are available on the Breakfast and Lunch menus)
B) You should have a method that gives you the available dishes for a specific time of day
C) A customer should be able to make a food order
D) I should have a way to retrieve the oldest outstanding order
E) I should be able to remove a food order once it is complete
*/

const menus = {
  allDay: {
    hours: [8, 20], // I'm assuming the restaurant is not closed 11-12
    items: ["Eggs", "Pie", "Coffee"],
  },
  breakfast: {
    hours: [8, 11],
    items: ["French Toast", "Pancakes"],
  },
  lunch: {
    hours: [12, 16],
    items: ["Sandwich", "Pancakes", "Soup"],
  },
  dinner: {
    hours: [16, 20],
    items: ["Soup", "Steak", "Shrimp"],
  },
}

// (A): function with arguments of name and array of menus
function addMenuItem(item, addTo) {
  // make sure the user specified an item, which menus to add the item to, that item is a string, and addTo is an array
  if (
    !item || // no item
    !addTo || // no menus
    typeof(item) !== "string" || // item is not a string
    !Array.isArray(addTo) || // menus are not an array
    addTo.length == 0 // the menu array is empty
  ) {
    console.log("Please include a valid string for the item name, and an array of existing menus");
    return;
  }
  // add the item to each menu, if not already present
  else addTo.forEach(m => {
    // check that the menu is an existing option
    if (!menus[m]) console.log(`Please specify a valid menu. "${m}" is not an existing menu option.`);
    // check that the item isn't already on the menu
    else if (!menus[m].items.includes(item)) menus[m].items.push(item);
  });
}

// testing
addMenuItem("Juice"); // "Please include a valid string for the item name, and an array of existing menus"
addMenuItem("Salad", ["earlyBird"]); // "Please specify a valid menu. "earlyBird" is not an existing menu option."
addMenuItem("Hotcakes", []); // // "Please include a valid string for the item name, and an array of existing menus"
addMenuItem("Hotdog", ["allDay"]); // item appears on all valid menu responses
addMenuItem("Lasagne", ["lunch", "dinner"]) // item appears on menu responses including lunch and dinner

// (B): function with argument of the specific time of day
function getMenu(time) {
  // make sure the argument is a valid number
  if (typeof(time) != "number" || time < 0 || time >= 24) return(`${time} is not a valid number argument`);
  // collect the menus availabe at the given time
  const availableMenus = [];
  for(const m in menus) {
    const [ start, end ] = menus[m].hours;
    if (time >= start && time < end) availableMenus.push(m);
  };
  // if outside hours, return and let the user know
  if (!availableMenus.length) return("Nothing available right now");
  // otherwise build the available menu items
  else {
    const theMenu = [];
    // compile the items on those menus
    for(const m in availableMenus) {
      menus[availableMenus[m]].items.forEach(i => {
        // avoid duplicates
        if (theMenu.includes(i)) return;
        else theMenu.push(i);
      })
    }
    // return the available menu;
    return theMenu;
  }
}

console.log("Menu at 9am:", getMenu("9am"));
console.log("Menu at 9am:", getMenu(9));
console.log("Menu at 1pm:", getMenu(13));
console.log("Menu at 4pm:", getMenu(44));
console.log("Menu at 4pm:", getMenu(16));
console.log("Menu at 7pm:", getMenu(19));
console.log("Menu at 10pm:", getMenu(22));

const orders = []

// example orders
const order = {
  order: ["Pancakes", "Coffee"],
  time: Date.now(),
};
const order2 = {
	order: ["Pancakes", "Hotdog"],
	time: Date.now(),
};
const order3 = {
	order: ["Pancakes", "Coffee"],
	time: Date.now()-1,
};
// add example orders
orders.push(order, order2, order3);

function makeOrder(items) {
  const order = {
    // add a unique id here for easier reference, in e.g. removeOrder
    items: [...items],
    time: Date.now(),
  }
  orders.push(order);
  console.log("added an order", orders);
}
makeOrder(["Pie", "Coffee"]);

function getOldestOrder() {
  orders.sort((a,b) => a.time - b.time);
  console.log("sorted orders by date", orders);
  return orders[0];
}
console.log(getOldestOrder());

function removeOrder(completedOrder) {
  const i = orders.findIndex((o) => o == completedOrder);
  orders.splice(i, 1);
  console.log("removed order", completedOrder, orders);
}
removeOrder(order2);



