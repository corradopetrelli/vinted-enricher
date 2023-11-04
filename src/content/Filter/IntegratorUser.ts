export type IIntegratorUser = {
  integrate(user: HTMLBaseElement, product: HTMLBaseElement): void
}

export class IntegratorUser implements IIntegratorUser {
  private static readonly PRODUCT_LINK_SELECTOR: string = '.web_ui__Text__text.web_ui__Text__caption.web_ui__Text__left'
  private static readonly USER_LINK_SELECTOR: string = '.web_ui__Text__text.web_ui__Text__caption.web_ui__Text__left'

  integrate(user: HTMLBaseElement, product: HTMLBaseElement): void {
    if (user.href?.length > 0) {
      const host = window.location.host
      const userCode = this.vintedCodeExtractor(user.href, `https://${host}/member/`)
      const productCode = this.vintedCodeExtractor(product.href, `https://${host}/items/`)

      Promise.all([
        fetch(`https://${host}/api/v2/users/${userCode}`).then((value) => value.json()),
        fetch(`https://${host}/api/v2/items/${productCode}/shipping_details`).then((value) => value.json()),
      ]).then(([serverUser, serverProducts]) => {
        const flag = this.getFlagEmoji(serverUser.user?.country_iso_code)
        const shippingCurrency: string = serverProducts.shipping_details.currency
        const shippingPrice: number = serverProducts.shipping_details.price
        const shippingText: string = this.getPriceText(shippingPrice, shippingCurrency)
        user.querySelectorAll(IntegratorUser.USER_LINK_SELECTOR)[0].innerHTML += ' ' + flag
        user.querySelectorAll(IntegratorUser.PRODUCT_LINK_SELECTOR)[0].innerHTML += ' ' + shippingText
      })
    }
  }

  private vintedCodeExtractor(url: string, initiator: string, terminator = '-'): string {
    let code = url.replace(initiator, '')
    code = code.substring(0, code.indexOf(terminator))
    return code
  }

  private getFlagEmoji(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  private getPriceText(shippingPrice: number, shippingCurrency: string = 'EUR'): string {
    if (shippingPrice < 0.1) {
      return '🆓'
    } else {
      return new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: shippingCurrency,
      }).format(shippingPrice)
    }
  }
}
