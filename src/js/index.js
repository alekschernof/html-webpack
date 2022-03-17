/* eslint-disable no-unused-vars */
import dispatcher from './modules/dispatcher';
import './vendor/polyfills';
import './modules/sitePreloader';
import documentReady from './utils/documentReady';
import documentLoaded from './utils/documentLoaded';
import resize from './modules/resize';
import cssVars from './modules/cssVars';
import lazyload from './modules/lazyload';
import map from './modules/maps';
import selects from './modules/selects';
import validation from './modules/validation';
import modals from './modules/modals';
import cookies from './modules/cookies';
import confImail from './modules/confirmEmail';
import result from './modules/result';
import logOut from './modules/logOut';
import lk from './modules/lk';
import openMenu from './modules/openMenu';
import sliders from './modules/sliders';
import topNavigation from './modules/topNavigation';
import sections from './modules/sections';
import iframeResize from './modules/iframeResize';
import progressDonate from './modules/progressDonate';
import dropDown from './modules/dropDown';
import testUser from './modules/testUser';
import scrollTo from './modules/scroll';
import notificationLabel from './modules/notification-label';
import visiblePassword from './modules/visible-password';
import './modules/vue';
import './modules/react';

documentReady(() => {
  resize.init();
  cssVars.init();
  lazyload.init();
  map.init();
  lk.init();
  selects.init();
  validation.init();
  modals.init();
  cookies.init();
  confImail.init();
  result.init();
  logOut.init();
  scrollTo.init();
  testUser.init();
  openMenu.openHeader();
  sliders.init();
  topNavigation.openTopNavigation();
  topNavigation.closeTopNavigation();
  sections.init();
  iframeResize.init();
  scrollTo.scrollTo();
  progressDonate.init();
  dropDown.init();
  validation.formSubscribeValidate();
  validation.sendFormFeedback();
  sliders.footerSliders();
  notificationLabel.init();
  visiblePassword.init();
});

documentLoaded(() => {
  dispatcher.dispatch({
    type: 'document:loaded',
  });
});
