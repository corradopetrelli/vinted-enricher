import { IntegratorUser } from './Filter/IntegratorUser'

const CARD_CLASS = 'feed-grid__item'
const USER_SELECTOR = '.new-item-box__container .web_ui__Cell__cell.web_ui__Cell__narrow.web_ui__Cell__link'
const PRODUCT_SELECTOR =
  '.feed-grid__item-content > .u-flex-grow.u-fill-width > .new-item-box__container .new-item-box__overlay'
const integratorUser = new IntegratorUser()

const init = (): void => {
  firstEnrichment()
  observeCatalog()
}

const firstEnrichment = (delay: number = 2000) => {
  setTimeout(() => {
    document.querySelectorAll(`.${CARD_CLASS}`).forEach((element: Element) => {
      const productCard = element as HTMLBaseElement
      if (productCard.classList.length === 1) {
        integrate(productCard)
      }
    })
  }, delay)
}

const integrate = (productCard: HTMLBaseElement): void => {
  const user = productCard.querySelector(USER_SELECTOR)
  const product = productCard.querySelector(PRODUCT_SELECTOR)
  if (user && product) {
    integratorUser.integrate(user as HTMLBaseElement, product as HTMLBaseElement)
  }
}

const observeCatalog = (): void => {
  if (window.location.href.indexOf('www.vinted.it/catalog') > -1) {
    // Configuration
    const config = { attributes: false, childList: true, subtree: true }

    // Callback function to execute when mutations are observed
    const callback: MutationCallback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (mutation.removedNodes.length === 0 && mutation.addedNodes.length === 1) {
          const productCard = mutation.addedNodes[0] as HTMLBaseElement
          if (productCard.className === CARD_CLASS) {
            integrate(productCard)
          }
        }
      }
    }
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback)

    // Start observing the target node for configured mutations
    observer.observe(document.documentElement || document.body, config)
  }
}

// Ignore iframes
if (window.self === window.top) init()
