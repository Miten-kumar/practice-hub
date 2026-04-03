import { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibleModal = ({ isOpen, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  } satisfies React.CSSProperties;

  const modalStyle = {
    width: "100%",
    maxWidth: "28rem",
    backgroundColor: "#fff",
    border: "1px solid #d0d7de",
    borderRadius: "8px",
    padding: "1rem",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
  } satisfies React.CSSProperties;

  const inputStyle = {
    width: "100%",
    marginTop: "0.75rem",
    marginBottom: "0.75rem",
    padding: "0.65rem 0.75rem",
    border: "1px solid #c2c8cf",
    borderRadius: "6px",
  } satisfies React.CSSProperties;

  const buttonStyle = {
    padding: "0.6rem 0.9rem",
    border: "1px solid #1f5f8b",
    borderRadius: "6px",
    backgroundColor: "#1f5f8b",
    color: "#fff",
    cursor: "pointer",
  } satisfies React.CSSProperties;

  useEffect(() => {
    if (!isOpen) return;

    prevFocus.current = document.activeElement as HTMLElement;

    modalRef.current?.focus();

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      prevFocus.current?.focus();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={overlayStyle}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        style={modalStyle}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" style={{ marginTop: 0 }}>
          Accessible Modal
        </h2>

        <input placeholder="Type here..." style={inputStyle} />

        <button type="button" onClick={onClose} style={buttonStyle}>
          Close
        </button>
      </div>
    </div>
  );
};
