"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
require("./popUp.css");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const RenderContent = _ref => {
  let {
    content: Content,
    variables
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(Content, {
    variables: variables
  });
};
const textToTakeOutButtons = ['maxPlanTablet', 'cancelling all tablets', 'BLTB line'];
const ESimPopUp = _ref2 => {
  let {
    confirmationESimPopUp,
    setConfirmationESimPopUp,
    statusData,
    telephoneData,
    contentConfirmationModal,
    setEsimProvision,
    selectedPlan,
    buttonDisabled,
    setButtonDisabled
  } = _ref2;
  const onCancelESim = () => {
    setConfirmationESimPopUp(false);
    if (setButtonDisabled) setButtonDisabled(false);
    if (contentConfirmationModal?.clickFrom === 'tablet') {
      statusData(content => ({
        ...content,
        next: false
      }));
    } else if (contentConfirmationModal?.clickFrom === 'cancelling all tablets') {
      statusData(content => ({
        ...content,
        next: true
      }));
    } else if (contentConfirmationModal?.clickFrom === 'BLTB line') {
      contentConfirmationModal?.variables?.setIsThePopUpShowBefore(true);
    }
  };
  const paymentCase = () => {
    statusData(telephoneData?.telephoneNumber);
  };
  const newCase = () => {
    setEsimProvision(true);
    statusData('e');
  };
  const tabletCase = () => {
    //debugger
    statusData(content => ({
      ...content,
      next: true
    }));
  };
  const tabletMultiLineCase = () => {
    //debugger
    const multiCtn = contentConfirmationModal?.variables?.multiCtn;
    const plansSelected = contentConfirmationModal?.variables?.plansSelected;
    console.log('pop up', !contentConfirmationModal?.variables?.showPopup);
    const popUpConfirmation = contentConfirmationModal?.variables?.showPopup;
    const secondPopUp = popUpConfirmation !== undefined ? !popUpConfirmation : multiCtn.length === plansSelected.length;
    if (secondPopUp) {
      statusData(content => ({
        ...content,
        next: true
      }));
      return;
    }
    setButtonDisabled(true);
    selectedPlan[contentConfirmationModal?.nextPlan]();
  };
  const tabletMultiLineCancellationCase = () => {
    //debugger
    contentConfirmationModal?.variables?.setCancelLines(true);
  };
  const tabletMultiLineCancelSubscription = () => {
    contentConfirmationModal?.variables?.setPopUpClicked(true);
  };
  const selectedCase = {
    payment: () => paymentCase(),
    new: () => newCase(),
    tablet: () => tabletCase(),
    tabletMultiLine: () => tabletMultiLineCase(),
    tableMultiLineCancellation: () => tabletMultiLineCancellationCase(),
    tabletMultiLineCancelSubscription: () => tabletMultiLineCancelSubscription()
  };
  const onConfirmationESim = () => {
    setConfirmationESimPopUp(false);
    selectedCase[contentConfirmationModal?.clickFrom]();
  };
  const disabledButton = buttonDisabled || false;
  const className = `disabled-${disabledButton}`;
  const clickFromPopUpSelector = textToTakeOutButtons.includes(contentConfirmationModal?.clickFrom);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: contentConfirmationModal?.title,
    open: confirmationESimPopUp && !clickFromPopUpSelector,
    okButtonProps: {
      disabled: disabledButton
    },
    onCancel: onCancelESim,
    footer: null
  }, typeof contentConfirmationModal?.content === 'string' ? /*#__PURE__*/_react.default.createElement("p", null, contentConfirmationModal?.content) : /*#__PURE__*/_react.default.createElement(RenderContent, {
    content: contentConfirmationModal?.content,
    variables: contentConfirmationModal?.variables
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "ant-modal-footer"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "ant-btn",
    type: "button",
    onClick: onCancelESim
  }, !contentConfirmationModal?.cancelText ? "Cancel" : contentConfirmationModal?.cancelText), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: `ant-btn ${className}`,
    type: "button",
    onClick: onConfirmationESim,
    disabled: disabledButton
  }, !contentConfirmationModal?.okText ? "Confirm" : contentConfirmationModal?.okText))), /*#__PURE__*/_react.default.createElement(_antd.Modal, {
    title: contentConfirmationModal?.title,
    open: confirmationESimPopUp && clickFromPopUpSelector,
    onCancel: onCancelESim,
    footer: null
  }, typeof contentConfirmationModal?.content === 'string' ? /*#__PURE__*/_react.default.createElement("p", null, contentConfirmationModal?.content) : /*#__PURE__*/_react.default.createElement(RenderContent, {
    content: contentConfirmationModal?.content,
    variables: contentConfirmationModal?.variables
  })));
};
var _default = ESimPopUp;
exports.default = _default;
module.exports = exports.default;