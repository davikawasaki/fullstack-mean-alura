module.exports = function(app) {
    /**
     * GET: products list rendered by EJS
     */
    app.get('/products', function(req, res) {
        res.render("products/list");
    });
}