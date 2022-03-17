export default {
  init() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const param = Object.fromEntries(urlSearchParams.entries());

    const testArrIds = param.childServiceData;

    if (testArrIds) {
      window.localStorage.setItem('testArr', JSON.stringify(testArrIds.split(',')));
    }
  },
};
