import { settings, select, classNames } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    // console.log('pages', thisApp.pages);


    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    // console.log('navLinks', thisApp.navLinks);

    const idFromHash = window.location.hash.substring(2);
    // console.log(idFromHash);
    const pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      page.id == idFromHash && pageMatchingHash == page.id;
    }

    thisApp.activePage(idFromHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (e) {

        const clickedElement = this;
        e.preventDefault();
        //get page id form href attribute
        const idPage = clickedElement.getAttribute('href').replace('#', '');

        // console.log('clikedELement', idPage);

        //run thisApp.activate with that id
        thisApp.activePage(idPage);

        //change url hash
        window.location.hash = '#/' + idPage;
      });
    }
  },

  activePage: function (pageId) {
    const thisApp = this;

    // add class 'active' to matching pages, remove from non-matching
    for (let page of thisApp.pages) {
      // if (page.id == pageId) {
      //   page.calssList.add(classNames.pages.active);
      // } else {
      //   page.calssList.remove(classNames.pages.active);
      // }
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for (let link of thisApp.navLinks) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }
  },

  initMenu: function () {
    const thisApp = this;

    // console.log('thisApp.data', thisApp.data);

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        // console.log('parsedResponse', parsedResponse);

        /*save parsedResponse at thisApp.data.prodcuts */
        thisApp.data.products = parsedResponse;
        /*execute initMenu method */
        thisApp.initMenu();
      });

    // console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (event) {
      console.log('dodajprodukt');
      app.cart.add(event.detail.product);
    });
  },

  initBooking: function () {
    const thisApp = this;
    const bookingContainer = document.querySelector(select.containerOf.booking);

    thisApp.booking = new Booking(bookingContainer);
  },

  init: function () {
    const thisApp = this;
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);

    thisApp.initPages();
    thisApp.initData();

    thisApp.initCart();
    thisApp.initBooking();
  },
};

app.init();
