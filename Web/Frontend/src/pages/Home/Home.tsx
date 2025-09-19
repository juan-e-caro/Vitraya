export default function Home() {
  return (
    <div className="container mt-4">
      {/* Hero */}
      <div className="p-5 mb-4 bg-primary text-white rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Bienvenido a Vitraya</h1>
          <p className="col-md-8 fs-4">
            Aquí encontrarás los mejores productos destacados y ofertas especiales.
          </p>
          <button className="btn btn-light btn-lg" type="button">
            Ver Productos
          </button>
        </div>
      </div>

      {/* Productos destacados */}
      <h2 className="mb-4">Productos Destacados</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Producto 1 */}
        <div className="col">
          <div className="card h-100">
            <img
              src="https://via.placeholder.com/300x200"
              className="card-img-top"
              alt="Producto 1"
            />
            <div className="card-body">
              <h5 className="card-title">Producto 1</h5>
              <p className="card-text">Descripción breve del producto 1.</p>
              <button className="btn btn-primary">Comprar</button>
            </div>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="col">
          <div className="card h-100">
            <img
              src="https://via.placeholder.com/300x200"
              className="card-img-top"
              alt="Producto 2"
            />
            <div className="card-body">
              <h5 className="card-title">Producto 2</h5>
              <p className="card-text">Descripción breve del producto 2.</p>
              <button className="btn btn-primary">Comprar</button>
            </div>
          </div>
        </div>

        {/* Producto 3 */}
        <div className="col">
          <div className="card h-100">
            <img
              src="https://via.placeholder.com/300x200"
              className="card-img-top"
              alt="Producto 3"
            />
            <div className="card-body">
              <h5 className="card-title">Producto 3</h5>
              <p className="card-text">Descripción breve del producto 3.</p>
              <button className="btn btn-primary">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
