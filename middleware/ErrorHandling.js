function errorHandling(err, req, res, next) {
    if (err) {
        return res.status(err.status || 500).json({
            status: err.status || 500,
            err: "We apologize, an error seems to have occurred. Please try again later."
        })
    }

    if (res.statusCode >= 400) {
        return res.json({
            status: res.statusCode,
            err: "We apologize, an error seems to have occurred. Please try again later."
        });
    }

    next();
}

export { errorHandling };
