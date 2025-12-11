import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // --------------------------
  //   Cargar productos
  // --------------------------
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ListProduct", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al cargar productos");

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --------------------------
  //   Guardar producto (solo actualizar)
  // --------------------------
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProduct) return; // No crear nuevos productos

    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      price: Number(data.get("price")),
      stock: Number(data.get("stock")),
    };

    try {
      const res = await fetch(
        `http://localhost:8000/api/UpdateProduct/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Error al guardar producto");

      fetchProducts();
      setShowModal(false);
    } catch (err) {
      alert("No se pudo guardar el producto");
    }
  };

  // --------------------------
  //   Eliminar producto
  // --------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/DeleteProduct/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Error eliminando producto");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };

  const handleOpenModal = (product: Product) => {
    setEditingProduct(product); // Solo abrir modal si es edición
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Administrar Productos</h1>

      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
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
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3">
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              products.map((p) => (
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
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
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
