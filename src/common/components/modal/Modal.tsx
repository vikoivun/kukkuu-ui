import * as React from 'react';
import ReactModal from 'react-modal';
import { useTranslation } from 'react-i18next';

import styles from './modal.module.scss';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import happyChildIcon from '../../../assets/icons/svg/happyChild.svg';

interface ModalProps {
  isOpen: boolean;
  label: string;
  toggleModal: (value: boolean) => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  label,
  children,
  toggleModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.modalWrapper}>
      {isOpen && (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={() => toggleModal(false)}
          contentLabel={label}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <div className={styles.modalContent}>
            <div className={styles.heading}>
              <Icon
                className={styles.happyChild}
                src={happyChildIcon}
                alt="Happy happy child"
              ></Icon>

              <h1>{label}</h1>
              <Button
                className={styles.closeButton}
                onClick={() => toggleModal(false)}
              >
                {t('common.modal.close.text')}
              </Button>
            </div>
            <div className={styles.modalChildren}>{children}</div>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Modal;