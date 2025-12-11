import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Cargar carrito desde la API
  useEffect(() => {
    if (!user) return;
    fetch(`/api/cart?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(console.error);
  }, [user]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = async (itemId: number, quantity: number) => {
    const q = Math.max(1, quantity);
    await fetch(`/api/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: q }),
    });
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity: q } : item));
  };

  const handleRemoveItem = async (itemId: number) => {
    await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleConfirmPurchase = async () => {
    // Crear orden
    await fetch(`/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, items: cart }),
    });

    // Vaciar carrito del usuario
    await fetch(`/api/cart/clear/${user.id}`, { method: "DELETE" });
    setCart([]);
    setShowConfirm(false);
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Debes iniciar sesión para ver tu carrito.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="alert alert-secondary">Tu carrito está vacío.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td style={{ maxWidth: "80px" }}>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={item.quantity}
                        min={1}
                        onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                    </td>
                    <td>${item.price.toLocaleString()}</td>
                    <td>${(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <i className="bi bi-trash"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end align-items-center mt-3">
            <h4 className="me-4">Total: ${total.toLocaleString()}</h4>
            <button
              className="btn btn-success btn-lg"
              onClick={() => setShowConfirm(true)}
            >
              Proceder a la compra
            </button>
          </div>
        </>
      )}

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="modal fade show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">Confirmar Compra</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Una vez confirmada la compra, no podrás deshacer esta acción.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={handleConfirmPurchase}>
                  Confirmar compra
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={() => setShowConfirm(false)}
          ></div>
        </div>
      )}
    </div>
  );
}
