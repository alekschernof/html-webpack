import iframeResizer from 'iframe-resizer/js/iframeResizer.min';
import dispatcher from './dispatcher';

export default {
  init() {
    document.querySelectorAll('.js-iframe-resize').forEach((el) => {
      const iframes = iframeResizer({ heightCalculationMethod: 'lowestElement' }, el);

      dispatcher.subscribe(({ type }) => {
        if (['resize:default', 'document:loaded'].includes(type)) {
          iframes.forEach(({ iFrameResizer }) => iFrameResizer.resize());
        }
      });
    });
  },
};
