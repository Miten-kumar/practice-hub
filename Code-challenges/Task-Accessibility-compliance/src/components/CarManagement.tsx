import { useEffect, useRef, useState } from "react";
import "../styles.css";

type Car = {
  id: number;
  name: string;
  brand: string;
};

const Cars: Car[] = [
  { id: 1, name: "XUV 700", brand: "Mahindra" },
  { id: 2, name: "Lord Alto", brand: "Suzuki" },
  { id: 3, name: "Verna", brand: "Hyundai" },
];

export const CarManagement = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filter, setFilter] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const filteredCars = Cars.filter((u) =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (isToggled) inputRef.current?.focus();
  }, [isToggled]);

  useEffect(() => {
    if (selectedCar) modalRef.current?.focus();
  }, [selectedCar]);

  const closeModal = () => {
    setSelectedCar(null);
    toggleRef.current?.focus();
  };

  const handleTrapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;

    const focusable = modalRef.current?.querySelectorAll<
      HTMLButtonElement | HTMLInputElement
    >("button, input");

    if (!focusable || focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

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
  };

  return (
    <div className="container">
      
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div className="live-region" aria-live="polite">
        {filteredCars.length === 0
          ? "No cars found"
          : `${filteredCars.length} cars found`}
      </div>


      <button
        ref={toggleRef}
        className="button"
        onClick={() => setIsToggled(!isToggled)}
        aria-expanded={isToggled}
        aria-controls="search-panel"
      >
        {isToggled ? "Close Search" : "Open Search"}
      </button>

      {isToggled && (
        <div id="search-panel" className="search-panel">
          <label htmlFor="search">Search Cars</label>
          <input
            id="search"
            ref={inputRef}
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      )}

      <main id="main">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <tr key={car.id}>
                  <td>{car.name}</td>
                  <td>{car.brand}</td>
                  <td>
                    <button
                      onClick={() => setSelectedCar(car)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {selectedCar && (
        <>

          <div className="overlay"></div>

          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            tabIndex={-1}
            ref={modalRef}
            onKeyDown={(e) => {
              if (e.key === "Escape") closeModal();
              handleTrapFocus(e);
            }}
          >
            <h2 id="modal-title">{selectedCar.name}</h2>
            <p id="modal-desc">Brand: {selectedCar.brand}</p>

            <button onClick={closeModal}>Close</button>
          </div>
        </>
      )}
    </div>
  );
};