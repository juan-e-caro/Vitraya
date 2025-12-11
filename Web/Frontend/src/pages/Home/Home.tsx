export default function Home() {
  return (
    <div className="container-fluid px-0">

      {/* HERO PRINCIPAL */}
      <section
        className="hero d-flex flex-column justify-content-center align-items-center text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "70vh",
          padding: "4rem 1rem",
        }}
      >
        <h1 className="display-3 fw-bold">Encuentra lo Mejor para tu Hogar</h1>
        <p className="lead col-11 col-md-7 mt-3"> 
          Productos seleccionados, calidad garantizada y las mejores ofertas para ti.
        </p>
        <button className="btn btn-light btn-lg mt-3 px-4">Explorar Productos</button>
      </section>

      <div className="container mt-5">

        {/* CATEGORÍAS DESTACADAS */}
        <h3 className="text-center mb-4 fw-bold">Categorías Destacadas</h3>
        <div className="row row-cols-2 row-cols-md-4 g-4">

          <div className="col">
            <div className="category-card rounded-4 shadow-sm overflow-hidden position-relative">
              <img
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=80"
                alt="Decoración"
                className="w-100"
              />
              <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-white p-2 text-center">
                <strong>Decoración</strong>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="category-card rounded-4 shadow-sm overflow-hidden position-relative">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
                alt="Cocina"
                className="w-100"
              />
              <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-white p-2 text-center">
                <strong>Cocina</strong>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="category-card rounded-4 shadow-sm overflow-hidden position-relative">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
                alt="Tecnología"
                className="w-100"
              />
              <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-white p-2 text-center">
                <strong>Tecnología</strong>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="category-card rounded-4 shadow-sm overflow-hidden position-relative">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
                alt="Ropa"
                className="w-100"
              />
              <div className="position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-white p-2 text-center">
                <strong>Ropa</strong>
              </div>
            </div>
          </div>

        </div>

        {/* PRODUCTOS DESTACADOS */}
        <h3 className="text-center fw-bold mt-5 mb-4">Productos Destacados</h3>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">

          <div className="col">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src="https://via.placeholder.com/400x250"
                className="card-img-top rounded-top-4"
                alt="Producto 1"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Producto 1 <span className="badge bg-success ms-2">Nuevo</span>
                </h5>
                <p className="card-text">
                  Diseño moderno para transformar tu espacio.
                </p>
                <button className="btn btn-primary w-100">Comprar</button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src="https://via.placeholder.com/400x250"
                className="card-img-top rounded-top-4"
                alt="Producto 2"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Producto 2 <span className="badge bg-danger ms-2">Oferta</span>
                </h5>
                <p className="card-text">
                  Elegante y funcional, ideal para el día a día.
                </p>
                <button className="btn btn-primary w-100">Comprar</button>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <img
                src="https://via.placeholder.com/400x250"
                className="card-img-top rounded-top-4"
                alt="Producto 3"
              />
              <div className="card-body">
                <h5 className="card-title">Producto 3</h5>
                <p className="card-text">
                  Estilo y utilidad en un mismo producto.
                </p>
                <button className="btn btn-primary w-100">Comprar</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
