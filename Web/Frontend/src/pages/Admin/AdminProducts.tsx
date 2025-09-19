import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AdminProducts() {
  // Estado simulado para productos (más adelante vendrá del backend)
  const [products, setProducts] = useState([
    { id: 1, name: "Producto 1", price: 20000, stock: 10 },
    { id: 2, name: "Producto 2", price: 35000, stock: 5 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Manejar abrir modal
  const handleOpenModal = (product: any = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  // Manejar guardar producto
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: data.get("name") as string,
      price: Number(data.get("price")),
      stock: Number(data.get("stock")),
    };

    if (editingProduct) {
      // Editar
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? newProduct : p))
      );
    } else {
      // Agregar
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
  };

  // Manejar eliminar producto
  const handleDelete = (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Administrar Productos</h1>

      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          + Agregar Producto
        </button>
      </div>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price.toLocaleString()}</td>
              <td>{p.stock}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleOpenModal(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de agregar/editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Editar Producto" : "Agregar Producto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                defaultValue={editingProduct?.name || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                defaultValue={editingProduct?.price || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                defaultValue={editingProduct?.stock || ""}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="success">
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
