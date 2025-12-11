module.exports = (err, req, res, _next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  if (req.accepts('html')) {
    return res.status(status).render('error', {
      title: `Erro ${status}`,
      status,                 // <-- ESSENCIAL
      message,
      error: process.env.NODE_ENV === 'development' ? err : {},

      // Enviar detalhes de validação caso existam
      details: err.details || null
    });
  }

  res.status(status).json({
    status,
    error: message,
    details: err.details || null
  });
};
