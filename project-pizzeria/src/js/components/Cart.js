import CartProduct from './CartProduct.js';
import { select, settings, classNames, templates } from '../settings.js';
import { utils } from '../utils.js';

class Cart {
  constructor(element) {
    const thisCart = this;

    thisCart.products = [];

    thisCart.getElements(element);
    thisCart.initAction();

    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
    // console.log('thisCart', thisCart);
  }

  getElements(element) {
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = element.querySelector(
      select.cart.toggleTrigger
    );
    thisCart.dom.productList = element.querySelector(select.cart.productList);
    thisCart.dom.form = element.querySelector(select.cart.form);
    thisCart.dom.phone = element.querySelector(select.cart.phone);
    thisCart.dom.address = element.querySelector(select.cart.address);

    thisCart.renderTotalKeys = [
      'totalNumber',
      'totalPrice',
      'subtotalPrice',
      'deliveryFee',
    ];

    for (let key of thisCart.renderTotalKeys) {
      thisCart.dom[key] = thisCart.dom.wrapper.querySelectorAll(
        select.cart[key]
      );
      // console.log('totalNumber', thisCart.dom[key]);
    }
  }

  remove(cartProduct) {
    const thisCart = this;
    const index = thisCart.products.indexOf(cartProduct);
    thisCart.products.splice(index, 1);
    cartProduct.dom.wrapper.remove();
    thisCart.update();
  }

  initAction() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });

    thisCart.dom.productList.addEventListener('remove', function (event) {
      thisCart.remove(event.detail.cartProduct);
    });

    thisCart.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      // console.log('send order');
      thisCart.sendOrder();

    });
  }

  sendOrder() {
    const thisCart = this;

    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      address: thisCart.dom.address.value,
      phone: thisCart.dom.phone.value,
      totalPrice: thisCart.totalPrice,
      totalNumber: thisCart.totalNumber,
      subtotalPrice: thisCart.subtotalPrice,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };

    thisCart.products.forEach(item => payload.products.push(thisCart.getData(item)));


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });



  }

  getData(item) {
    const product = {
      id: item.id,
      amount: item.id,
      price: item.price,
      priceSingle: item.priceSingle,
      params: item.params,
    };
    return product;
  }

  update() {
    const thisCart = this;

    thisCart.totalNumber = 0;
    thisCart.subtotalPrice = 0;

    thisCart.products.forEach((item) => {
      thisCart.subtotalPrice += item.price;
      thisCart.totalNumber += item.amount;
    });

    thisCart.totalPrice = thisCart.subtotalPrice + thisCart.deliveryFee;

    thisCart.renderTotalKeys.forEach((itemOfTotalKeys) => {
      // console.log(thisCart.dom[itemOfTotalKeys]);
      thisCart.dom[itemOfTotalKeys].forEach(
        (item) => (item.innerHTML = thisCart[itemOfTotalKeys])
      );
    });
  }

  add(menuProduct) {
    const thisCart = this;

    // console.log('adding product', menuProduct);

    const generateHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generateHTML);
    thisCart.dom.productList.appendChild(generatedDOM);

    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    // console.log('thisCart.products', thisCart.products);

    thisCart.update();
  }
}

export default Cart;
