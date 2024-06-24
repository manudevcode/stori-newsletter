export const NotFound = () => {
  return (
    <section className="bg-white h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-slate-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-slate-600 md:text-4xl">
            Pagina no encontrada
          </p>
          <p className="mb-4 text-lg font-light text-slate-500 dark:text-slate-400"></p>
          <a
            href="/"
            className="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    </section>
  );
};
