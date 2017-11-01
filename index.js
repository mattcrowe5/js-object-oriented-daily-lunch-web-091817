let customerID = 0;
let employerID = 0;
let mealID = 0;
let deliveryID = 0;

let store = { customers: [], meals: [], deliveries: [], employers: [] };

class Customer {
  constructor(name, employer) {
    this.name = name;
    this.id = ++customerID;

    if (employer) {
      this.employerid = employer.id;
    }

    store.customers.push(this);
  }

  meals() {
    let myDeliveries = store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
    let myMeals = myDeliveries.map(function(delivery) {
      return store.meals.find(function(meal) {
        return meal.id === delivery.mealId;
      });
    });
    return myMeals;
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.customerId === this.id;
      }.bind(this)
    );
  }

  totalSpent() {
    let myMealArr = this.meals();
    let total = 0;
    for (let i = 0; i < myMealArr.length; i++) {
      total += myMealArr[i].price;
    }
    return total;
  }
}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = ++mealID;

    store.meals.push(this);
  }

  static byPrice() {
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }

  deliveries() {
    return store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
  }

  customers() {
    let myDeliveries = store.deliveries.filter(
      function(delivery) {
        return delivery.mealId === this.id;
      }.bind(this)
    );
    let myCustomers = myDeliveries.map(function(delivery) {
      return store.customers.find(function(customer) {
        return customer.id === delivery.customerId;
      });
    });
    return myCustomers;
  }
}

class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }
    this.id = ++deliveryID;

    store.deliveries.push(this);
  }

  meal() {
    return allMeals.find(function(meal) {
      return meal.id === this.mealId;
    });
  }

  customer() {
    return store.customers.find(
      function(customer) {
        return this.customerId === customer.id;
      }.bind(this)
    );
  }

  meal() {
    return store.meals.find(
      function(meal) {
        return this.mealId === meal.id;
      }.bind(this)
    );
  }
}

class Employer {
  constructor(name) {
    this.name = name;
    this.id = ++employerID;

    store.employers.push(this);
  }

  employees() {
    return store.customers.filter(
      function(customer) {
        return customer.employerid === this.id;
      }.bind(this)
    );
  }

  deliveries() {
    let myCustomers = this.employees();
    let myDeliveries = myCustomers.map(function(customer) {
      return store.deliveries.find(function(delivery) {
        return delivery.customerId === customer.id;
      });
    });
    return myDeliveries;
  }

  meals() {
    let myDeliveries = this.deliveries();
    let myMeals = myDeliveries.map(function(delivery) {
      return store.meals.find(function(meal) {
        return meal.id === delivery.mealId;
      });
    });
    var unique = myMeals.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });
    return unique;
  }

  mealTotals() {}
}
