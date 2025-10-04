import React from "react";

type ConfirmModalProps = {
  title: string;
  message: string;
  confirmAction: () => void;
  modalName?: string;
};

const ConfirmModal = ({
  title,
  message,
  confirmAction,
  modalName,
}: ConfirmModalProps) => {
  const onClose = () => {
    const modal = document.getElementById(
      modalName || "confirm_modal"
    ) as HTMLDialogElement;
    modal.close();
  };

  const handleConfirm = () => {
    confirmAction();
    onClose();
  };
  return (
    <dialog
      id={modalName || "confirm_modal"}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box space-y-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action flex gap-4 justify-between">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-error">Close</button>
          </form>
          <button className="btn btn-info" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ConfirmModal;
