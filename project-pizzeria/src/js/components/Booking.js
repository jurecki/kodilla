import { templates, select } from '../settings.js';
import { utils } from '../utils.js';
import AmountWidget from './AmountWidget.js';

class Booking {
  constructor(bookingContainer) {
    const thisBooking = this;

    thisBooking.render(bookingContainer);
    thisBooking.initWidgets();
  }

  render(bookingContainer) {
    const thisBooking = this;

    // generate HTML based on tamplate
    const generateHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = bookingContainer;

    thisBooking.dom.wrapper = utils.createDOMFromHTML(generateHTML);

    // console.log('thisBook.dom.wraper', thisBooking.dom.wrapper);

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);

    // find menu container
    const container = document.querySelector(select.containerOf.booking);

    // add element to menu
    container.appendChild(thisBooking.dom.wrapper);
    //
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
  }

}

export default Booking;
