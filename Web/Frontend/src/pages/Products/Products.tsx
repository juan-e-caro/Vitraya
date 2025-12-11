import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductsCard from "../../components/products/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Cargar productos desde la API
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ListProduct", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
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

  // Función opcional para agregar al carrito
  const handleAddToCart = (productId: number) => {
    alert(`Producto ${productId} agregado al carrito`);
    // Aquí podrías llamar a tu API de carrito
  };

  if (loading) return <p className="text-center mt-4">Cargando productos...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Todos los Productos</h1>

      <Row xs={1} md={3} className="g-4">
        {products.length === 0 ? (
          <p className="text-center">No hay productos disponibles.</p>
        ) : (
          products.map((product) => (
            <Col key={product.id}>
              <ProductsCard {...product} onAddToCart={handleAddToCart} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
