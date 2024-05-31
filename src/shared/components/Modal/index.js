import { close } from "../../../helper/icons";
import { forwardRef, useImperativeHandle, useState } from "react";

const Modal = forwardRef((props, ref) => {
  const {
    onClose,
    children,
    showClose = true,
    extraClass = "",
    headerClass = "",
    iconPosition = "right-6",
    overflow = "overflow-scroll",
    preventClickOnOutside = false,
  } = props || {};
  const [modalOpen, setModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      setModalOpen(true);
    },
    closeModal() {
      handleClose();
    },
  }));

  const handleClose = () => {
    setModalOpen(false);
    onClose?.();
  };

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            onClick={() => {
              if (!preventClickOnOutside) {
                handleClose();
              }
            }}
            className="fixed inset-0 bg-gray-900 opacity-70"
          ></div>
          <div className="relative w-auto max-w-3xl flex justify-center">
            <div
              className={`${extraClass} bg-white ${overflow} rounded-lg shadow-lg relative flex flex-col p-6 max-[385px]:w-[90%]`}
            >
              <div
                className={`flex items-start justify-between ${headerClass}`}
              >
                {showClose && (
                  <button
                    onClick={handleClose}
                    className={`text-gray-500 hover:text-gray-700 focus:outline-none absolute ${iconPosition}`}
                  >
                    <img src={close} alt="" className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="modal-content">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default Modal;
