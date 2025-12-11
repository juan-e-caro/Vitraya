import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  vendor_id: number;
}

export default function ProductVendor() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const vendorId = user.id;

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ListProduct", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al cargar productos");

      const data = await res.json();
      const vendorProducts = data.filter(
        (p: Product) => p.vendor_id === vendorId
      );
      setProducts(vendorProducts);
    } catch (err) {
      setError("No se pudieron cargar tus productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      description: data.get("description") as string,
      price: Number(data.get("price")),
      stock: Number(data.get("stock")),
      image_url: data.get("image_url") as string,
      vendor_id: vendorId,
    };

    try {
      let res;
      if (editingProduct) {
        res = await fetch(
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
      } else {
        res = await fetch("http://localhost:8000/api/CreateProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Error al guardar producto");

      fetchProducts();
      setShowModal(false);
    } catch (err) {
      alert("No se pudo guardar el producto");
    }
  };

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

      if (!res.ok) throw new Error("Error al eliminar producto");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert("No se pudo eliminar el producto");
    }
  };

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Mis Productos</h1>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => handleOpenModal()} variant="primary">
          + Crear Producto
        </Button>
      </div>

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-3">
                    No tienes productos creados aún.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.description}</td>
                    <td>${p.price.toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td>
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="img-thumbnail"
                        style={{ width: "75px", height: "75px", objectFit: "cover" }}
                      />
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => handleOpenModal(p)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Editar Producto" : "Crear Producto"}
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
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                defaultValue={editingProduct?.description || ""}
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

            <Form.Group className="mb-3">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                type="url"
                name="image_url"
                defaultValue={editingProduct?.image_url || ""}
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
