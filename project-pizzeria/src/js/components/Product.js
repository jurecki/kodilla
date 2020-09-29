import { select, classNames, templates } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import { utils } from '../utils.js';

class Product {
  constructor(id, data) {
    const thisProduct = this;
    thisProduct.id = id;
    thisProduct.data = data;
    thisProduct.renderInMenu();
    thisProduct.getElements();
    thisProduct.initAccordion();
    thisProduct.initOrderForm();
    thisProduct.initAmountWidget();
    thisProduct.processOrder();
  }

  renderInMenu() {
    const thisProduct = this;

    // generate HTML based on tamplate
    const generateHTML = templates.menuProduct(thisProduct.data);

    // create element using utils.createElementFromHTML
    thisProduct.element = utils.createDOMFromHTML(generateHTML);

    // find menu container
    const menuContainer = document.querySelector(select.containerOf.menu);

    // add element to menu
    menuContainer.appendChild(thisProduct.element);
  }

  getElements() {
    const thisProduct = this;

    thisProduct.accordionTrigger = thisProduct.element.querySelector(
      select.menuProduct.clickable
    );
    thisProduct.form = thisProduct.element.querySelector(
      select.menuProduct.form
    );
    thisProduct.formInputs = thisProduct.form.querySelectorAll(
      select.all.formInputs
    );
    thisProduct.cartButton = thisProduct.element.querySelector(
      select.menuProduct.cartButton
    );
    thisProduct.priceElem = thisProduct.element.querySelector(
      select.menuProduct.priceElem
    );

    thisProduct.imageWrapper = thisProduct.element.querySelector(
      select.menuProduct.imageWrapper
    );

    thisProduct.amountWidgetElem = thisProduct.element.querySelector(
      select.menuProduct.amountWidget
    );
  }

  initAccordion() {
    const thisProduct = this;

    thisProduct.accordionTrigger.addEventListener('click', function (e) {
      e.preventDefault();

      thisProduct.element.classList.toggle(
        classNames.menuProduct.wrapperActive
      );

      const activeProducts = document.querySelectorAll('.product.active');

      activeProducts.forEach((item) => {
        if (item !== thisProduct.element) {
          item.classList.remove('active');
        }
      });
    });
  }

  initOrderForm() {
    const thisProduct = this;

    thisProduct.form.addEventListener('submit', function (e) {
      e.preventDefault();
      thisProduct.processOrder();
    });

    thisProduct.formInputs.forEach((form) =>
      form.addEventListener('change', function () {
        thisProduct.processOrder();
      })
    );

    thisProduct.cartButton.addEventListener('click', function (e) {
      e.preventDefault();
      thisProduct.addToCart();
      thisProduct.processOrder();
    });
  }

  processOrder() {
    const thisProduct = this;
    const formData = utils.serializeFormToObject(thisProduct.form);
    // console.log('formData', formData);
    // console.log('data', thisProduct.data);

    let price = thisProduct.data.price;

    thisProduct.params = {};

    for (let paramId in thisProduct.data.params) {
      for (let optionId in thisProduct.data.params[paramId].options) {
        const optionSelected =
          formData.hasOwnProperty(paramId) &&
          formData[paramId].indexOf(optionId) > -1;

        const isDefault = !thisProduct.data.params[paramId].options[optionId]
          .default;

        const optionPrice =
          thisProduct.data.params[paramId].options[optionId].price;

        const selector = `.${paramId}-${optionId}`;
        const images = thisProduct.imageWrapper.querySelector(selector);

        // console.log(images, selector);

        if (optionSelected) {
          if (!thisProduct.params[paramId]) {
            thisProduct.params[paramId] = {
              label: paramId,
              options: {},
            };
          }
          thisProduct.params[paramId].options[optionId] = optionId;
          // console.log(thisProduct.params);
          images !== null &&
            images.classList.add(classNames.menuProduct.imageVisible);
        } else {
          images !== null &&
            images.classList.remove(classNames.menuProduct.imageVisible);
        }

        if (optionSelected && isDefault) {
          price += optionPrice;
        } else if (!optionSelected && !isDefault) {
          price -= optionPrice;
        }
      }
    }

    thisProduct.priceSingle = price;
    thisProduct.price =
      thisProduct.priceSingle * thisProduct.amountWidget.value;

    thisProduct.priceElem.textContent = price;
  }

  initAmountWidget() {
    const thisProduct = this;

    thisProduct.amountWidget = new AmountWidget(thisProduct.amountWidgetElem);
    // console.log(thisProduct.amountWidgetElem);

    thisProduct.amountWidgetElem.addEventListener('updated', function () {
      thisProduct.processOrder();
    });
  }

  addToCart() {
    const thisProduct = this;

    thisProduct.name = thisProduct.data.name;
    thisProduct.amount = thisProduct.amountWidget.value;

    // app.cart.add(thisProduct);

    const event = new CustomEvent('add-to-cart', {
      bubbles: true,
      detail: {
        product: thisProduct,
      }
    });

    thisProduct.element.dispatchEvent(event);
  }
}

export default Product;
