class ReferrerCookieHandler {
  constructor(cookieName, expirationDays) {
    this.cookieName = cookieName;
    this.expirationDays = expirationDays;
  }

  getQueryStringValue(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }

  setCookie(value) {
    const date = new Date();
    date.setTime(date.getTime() + this.expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${this.cookieName}=${value};${expires};path=/`;
  }

  saveReferrerIdAsCookie() {
    const ref = this.getQueryStringValue('ref');
    if (ref && !this.getCookie().includes(`${this.cookieName}=`)) {
      this.setCookie(ref);
    }
  }

  saveReferrerIdAsCookieRefresh() {
    const ref = this.getQueryStringValue('ref');
    if (ref) {
      this.setCookie(ref);
    }
  }

  getCookie() {
    return document.cookie || '';
  }
}

const referrerCookieHandler = new ReferrerCookieHandler('referrerId', 30);
// referrerCookieHandler.saveReferrerIdAsCookie();
referrerCookieHandler.saveReferrerIdAsCookieRefresh();
