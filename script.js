/*
You are hired by a restaurant to handle their menu and ordering system. Use whatever language you want.
They have 4 menus: breakfast (8-11), lunch (12-16), dinner(16-20), and all-day (8-20).
A) You should have a method to add a named dish to an array of menus (i.e., "Pancakes" are available on the Breakfast and Lunch menus)
B) You should have a method that gives you the available dishes for a specific time of day
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
  // make sure the user specified an item and which menus to add the item to
  // test that item is a string, and addTo is an array
  if (
    !item || // no item
    !addTo || // no menus
    typeof(item) !== "string" || // item is not a string
    !Array.isArray(addTo) // menus are not an array
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

addMenuItem("Juice");
addMenuItem("Hotcakes", []);
addMenuItem("Salad", ["earlyBird"]);
addMenuItem("Hotdog", ["allDay"]);
addMenuItem("Lasagne", ["lunch", "dinner"])

function convertTime(s) {
  if (typeof(s)== "number")
  // check for hh:mm format
  if (typeof(s) == "string" && s.includes(":")) {}
  console.log(new Date(s));
}
convertTime(1300)
convertTime("11:30")

// (B): function with argument of the specific time of day
// if the argument could be a string,
// convert string (e.g. "10:30") to number (10.5)
function getMenu(time) {
  const availableMenus = [];
  // collect the menus availabe at the given time
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

console.log("Menu at 9am:", getMenu(9));
console.log("Menu at 1pm:", getMenu(13));
console.log("Menu at 4pm:", getMenu(16));
console.log("Menu at 7pm:", getMenu(19));
console.log("Menu at 10pm:", getMenu(22));
