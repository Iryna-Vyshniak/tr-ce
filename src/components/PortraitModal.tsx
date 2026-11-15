import { useEffect, useRef } from "react";

interface PortraitModalProps {
  alt: string;
  closeLabel: string;
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

export function PortraitModal({
  alt,
  closeLabel,
  isOpen,
  onClose,
  src,
}: PortraitModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    function handleClose() {
      onClose();
    }

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={alt}
      className="trce-portrait-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="trce-portrait-modal__content">
        <img alt={alt} src={src} />
        <button
          aria-label={closeLabel}
          className="trce-portrait-modal__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </div>
    </dialog>
  );
}
