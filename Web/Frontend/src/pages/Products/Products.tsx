export default function Products() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Todos los Productos</h1>

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
              <p className="card-text">
                Descripción breve del producto 1. Ideal para tus necesidades.
              </p>
            </div>
            <div className="card-footer">
              <span className="fw-bold me-3">$20.000</span>
              <button className="btn btn-primary btn-sm">Agregar al carrito</button>
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
              <p className="card-text">
                Descripción breve del producto 2. Excelente calidad garantizada.
              </p>
            </div>
            <div className="card-footer">
              <span className="fw-bold me-3">$35.000</span>
              <button className="btn btn-primary btn-sm">Agregar al carrito</button>
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
              <p className="card-text">
                Descripción breve del producto 3. Perfecto para el día a día.
              </p>
            </div>
            <div className="card-footer">
              <span className="fw-bold me-3">$50.000</span>
              <button className="btn btn-primary btn-sm">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
