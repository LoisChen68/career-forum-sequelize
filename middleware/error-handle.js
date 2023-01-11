module.exports = {
  apiErrorHandler(err, req, res, next) {
    if (err instanceof Error) {
      const status = err.statusCode ? err.statusCode : err.status || 500
      res.status(status || 500).json({
        status: 'error',
        title: `${err.message}`
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: `${err}`
      })
    }
    next(err)
  }
}
