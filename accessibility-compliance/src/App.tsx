import { useState } from "react";
import { AccessibleModal } from "./components/AccessibleModal";
import { AccessibleMenu } from "./components/AccessibleMenu";
import { LiveAnnouncer } from "./components/LiveAnnouncer";

// import DropdownMenu from "./components/DropdownMenu";

function App() {
  const [open, setOpen] = useState(false);

  const pageStyle = {
    maxWidth: "48rem",
    margin: "0 auto",
    padding: "1.5rem 1rem 3rem",
    fontFamily: "Arial, sans-serif",
    color: "#1f2933",
  } satisfies React.CSSProperties;

  const sectionStyle = {
    marginBottom: "1rem",
    padding: "1rem",
    border: "1px solid #d0d7de",
    borderRadius: "8px",
    backgroundColor: "#fff",
  } satisfies React.CSSProperties;

  const buttonStyle = {
    padding: "0.6rem 0.9rem",
    border: "1px solid #1f5f8b",
    borderRadius: "6px",
    backgroundColor: "#1f5f8b",
    color: "#fff",
    cursor: "pointer",
  } satisfies React.CSSProperties;

  return (
    // <DropdownMenu />
    <>
      <main style={pageStyle}>
        <section style={sectionStyle} aria-labelledby="modal-demo-title">
          <h1 id="modal-demo-title" style={{ marginTop: 0 }}>
            Accessibility Playground
          </h1>
          <p>
            Simple examples with keyboard support, visible focus, and
            screen-reader friendly labels.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={buttonStyle}
          >
            Open Modal
          </button>
          <AccessibleModal isOpen={open} onClose={() => setOpen(false)} />
        </section>

        <section style={sectionStyle} aria-labelledby="menu-demo-title">
          <h2 id="menu-demo-title">Menu</h2>
          <AccessibleMenu />
        </section>

        <section style={sectionStyle}>
          <LiveAnnouncer />
        </section>
      </main>
    </>
  );
}

export default App;
