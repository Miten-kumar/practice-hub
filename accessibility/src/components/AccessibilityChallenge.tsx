import { useEffect, useRef, useState } from "react";

export default function AccessibilityChallenge() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const users = ["Alice", "Bob", "Charlie", "David"];

  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const modalRef = useRef(null);
  const modalButtonRef = useRef(null);

  // ================= DROPDOWN =================

  const handleDropdownKeyDown = (e) => {
    if (!dropdownOpen && (e.key === "ArrowDown" || e.key === "Enter")) {
      setDropdownOpen(true);
      setAnnouncement("Dropdown opened");
      return;
    }

    if (dropdownOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % users.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === 0 ? users.length - 1 : prev - 1
        );
      }

      if (e.key === "Enter") {
        setAnnouncement(`${users[activeIndex]} selected`);
        alert(users[activeIndex]);
        setDropdownOpen(false);
        buttonRef.current.focus();
      }

      if (e.key === "Escape") {
        setDropdownOpen(false);
        buttonRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      listRef.current?.focus();
    }
  }, [dropdownOpen]);

  // ================= MODAL =================

  useEffect(() => {
    if (modalOpen) {
      setAnnouncement("Modal opened");
      modalRef.current?.focus();
    } else {
      modalButtonRef.current?.focus();
    }
  }, [modalOpen]);

  const trapFocus = (e) => {
    const focusable = modalRef.current.querySelectorAll(
      "button"
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    if (e.key === "Escape") {
      setModalOpen(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Accessibility Challenge (Fixed)</h1>

      {/* ================= DROPDOWN ================= */}

      <h2>User Dropdown</h2>

      <button
        ref={buttonRef}
        aria-expanded={dropdownOpen}
        aria-controls="userlist"
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
          setAnnouncement("Dropdown opened");
        }}
        onKeyDown={handleDropdownKeyDown}
      >
        Select User
      </button>

      {dropdownOpen && (
        <ul
          id="userlist"
          role="listbox"
          tabIndex={-1}
          ref={listRef}
          onKeyDown={handleDropdownKeyDown}
          style={{
            border: "1px solid #ccc",
            padding: 0,
            marginTop: "5px",
            width: "200px",
            listStyle: "none",
          }}
        >
          {users.map((user, index) => (
            <li
              key={user}
              role="option"
              aria-selected={activeIndex === index}
              style={{
                padding: "8px",
                background:
                  activeIndex === index ? "#ddd" : "white",
                cursor: "pointer",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                setAnnouncement(`${user} selected`);
                alert(user);
                setDropdownOpen(false);
                buttonRef.current.focus();
              }}
            >
              {user}
            </li>
          ))}
        </ul>
      )}

      {/* Screen reader announcements */}
      <div aria-live="polite">{announcement}</div>

      {/* ================= MODAL ================= */}

      <h2 style={{ marginTop: "40px" }}>Modal</h2>

      <button
        ref={modalButtonRef}
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </button>

      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            tabIndex={-1}
            onKeyDown={trapFocus}
            style={{
              background: "white",
              width: "300px",
              margin: "100px auto",
              padding: "20px",
            }}
          >
            <h2 id="modal-title">Delete Account</h2>
            <p id="modal-desc">
              Are you sure you want to delete your account?
            </p>

            <button onClick={() => alert("Deleted")}>
              Confirm
            </button>

            <button onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}