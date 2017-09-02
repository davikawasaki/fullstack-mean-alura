
module.exports = function(app) {
    /**
     * GET: products list rendered by EJS
     */
    app.get('/products', function(req, res) {
        var connection = app.infra.connectionFactory();
        // Creating a new scope, instead of using a global one
        var dbProducts = new app.infra.ProductsDAO(connection);

        dbProducts.list(function(err, results) {
            res.render('products/list',{list:results});
        });

        connection.end();
    });
}