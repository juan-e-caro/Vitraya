import { useState } from "react";

export default function Cart() {
  // Estado para mostrar u ocultar el aviso
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tu Carrito</h1>

      {/* Tabla de productos en el carrito */}
      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Producto 1</td>
            <td>2</td>
            <td>$20.000</td>
            <td>$40.000</td>
          </tr>
          <tr>
            <td>Producto 2</td>
            <td>1</td>
            <td>$35.000</td>
            <td>$35.000</td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div className="text-end mb-3">
        <h4>Total: $75.000</h4>
      </div>

      {/* Botón para confirmar compra */}
      <div className="text-end">
        <button
          className="btn btn-success"
          onClick={() => setShowConfirm(true)}
        >
          Proceder a la compra
        </button>
      </div>

      {/* Aviso de confirmación */}
      {showConfirm && (
        <div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
          <h5 className="alert-heading">¿Estás seguro?</h5>
          <p>
            Una vez confirmada la compra, no podrás deshacer esta acción.
          </p>
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => setShowConfirm(false)}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={() => alert("Compra confirmada ✅")}
            >
              Confirmar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
