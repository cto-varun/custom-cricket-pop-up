import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import './popUp.css';

const RenderContent = ({ content: Content, variables }) => {
    return <Content variables={variables} />;
};

const textToTakeOutButtons = [
  'maxPlanTablet',
  'cancelling all tablets',
  'BLTB line'
]

const ESimPopUp = ({
    confirmationESimPopUp,
    setConfirmationESimPopUp,
    statusData,
    telephoneData,
    contentConfirmationModal,
    setEsimProvision,
    selectedPlan,
    buttonDisabled,
    setButtonDisabled,
}) => {

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
      return
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
  }
  const selectedCase = {
    payment: () => paymentCase(),
    new: () => newCase(),
    tablet: () => tabletCase(),
    tabletMultiLine: () => tabletMultiLineCase(),
    tableMultiLineCancellation: () => tabletMultiLineCancellationCase(),
    tabletMultiLineCancelSubscription: () => tabletMultiLineCancelSubscription(),
  };
  const onConfirmationESim = () => {
    setConfirmationESimPopUp(false);
    selectedCase[contentConfirmationModal?.clickFrom]();
  };
  const disabledButton = buttonDisabled || false;
  const className = `disabled-${disabledButton}`
  const clickFromPopUpSelector = textToTakeOutButtons.includes(contentConfirmationModal?.clickFrom);

  return (
    <>
      <Modal
        title={contentConfirmationModal?.title}
        open={confirmationESimPopUp && !clickFromPopUpSelector}
        okButtonProps={{ disabled: disabledButton }}
        onCancel={onCancelESim}
        footer={null}
      >
        {typeof contentConfirmationModal?.content === 'string' ?
          <p>{contentConfirmationModal?.content}</p> :
          <RenderContent
            content={contentConfirmationModal?.content}
            variables={contentConfirmationModal?.variables}
          />
        }
        <div className="ant-modal-footer">
          <Button
              className='ant-btn'
              type="button"
              onClick={onCancelESim}
          >
              {(!contentConfirmationModal?.cancelText) ? "Cancel" : contentConfirmationModal?.cancelText}
          </Button>
          <Button
              className={`ant-btn ${className}`}
              type="button"
              onClick={onConfirmationESim}
              disabled={(disabledButton)}
          >
              {(!contentConfirmationModal?.okText) ? "Confirm" : contentConfirmationModal?.okText}
          </Button>
        </div>
      </Modal>
      <Modal
        title={contentConfirmationModal?.title}
        open={confirmationESimPopUp && clickFromPopUpSelector}
        onCancel={onCancelESim}
        footer={null}
      >
        {typeof contentConfirmationModal?.content === 'string' ?
          <p>{contentConfirmationModal?.content}</p> :
          <RenderContent
            content={contentConfirmationModal?.content}
            variables={contentConfirmationModal?.variables}
          />
        }
      </Modal>
    </>
  );
};
export default ESimPopUp;
