import { IntegratorUser } from "./Filter/IntegratorUser";

const init = (): void => {
  const integratorUser = new IntegratorUser();
  if (window.location.href.indexOf("www.vinted.it/catalog") > -1) {
    window.addEventListener("DOMContentLoaded", () => {
      setTimeout(execute, 5000);
    });
  }
};

const execute = (): void => {
  let integratorUser = new IntegratorUser();
  const users = document.querySelectorAll(
    ".feed-grid > .feed-grid__item .new-item-box__container .web_ui__Cell__cell.web_ui__Cell__narrow.web_ui__Cell__link",
  );
  const products = document.querySelectorAll(
    ".feed-grid > .feed-grid__item > .feed-grid__item-content > .u-flex-grow.u-fill-width > .new-item-box__container .new-item-box__overlay",
  );
  const count = users.length;
  for (let i = 0; i < count; i++) {
    integratorUser.integrate(users[i] as HTMLBaseElement, products[i] as HTMLBaseElement);
  }
};

// Ignore iframes
if (window.self === window.top) init();
