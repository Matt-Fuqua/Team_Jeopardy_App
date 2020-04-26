import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'carbon-components-react';

import { closeAnnouncementModal } from '../actions/announcementDisplay';
import { announcementDisplayOpen } from '../selectors';

const AnnouncementModal = props => {
  const dispatch = useDispatch();
  console.log('refreshed');

  const modalOpen = useSelector(announcementDisplayOpen);
  console.log('modal open is set to: ', modalOpen);

  return (
    <Modal
      hasScrollingContent={false}
      iconDescription="Close the modal"
      modalAriaLabel="A label to be read by screen readers on the modal root node"
      onRequestClose={() => dispatch(closeAnnouncementModal())}
      onSecondarySubmit={() => dispatch(closeAnnouncementModal())}
      open={modalOpen}
      passiveModal={false}
      primaryButtonDisabled={true}
      primaryButtonText=""
      secondaryButtonText="Ok"
      size="sm"
    >
      {props.text}
    </Modal>
  );
};

export default AnnouncementModal;