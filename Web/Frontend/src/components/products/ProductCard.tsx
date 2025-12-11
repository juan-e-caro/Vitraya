import { Button, Card } from "react-bootstrap";

interface ProductProps {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  onAddToCart?: (productId: number) => void;
}

export default function ProductsCard({
  id,
  name,
  description,
  price,
  stock,
  image_url,
  onAddToCart,
}: ProductProps) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={image_url || "https://via.placeholder.com/300x200?text=Sin+imagen"}
        alt={name}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <Card.Text className="text-truncate">{description}</Card.Text>
        <div className="mt-auto">
          <h5 className="text-primary mb-2">${price.toLocaleString()}</h5>
          <p className="mb-2 text-muted">Stock: {stock}</p>
          <Button
            variant="success"
            className="w-100"
            disabled={stock === 0}
            onClick={() => onAddToCart?.(id)}
          >
            {stock === 0 ? "Agotado" : "Agregar al carrito"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
