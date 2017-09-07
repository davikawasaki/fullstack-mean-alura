
module.exports = function(app) {

    var productsList = function(req, res) {
        var connection = app.infra.connectionFactory();
        // Creating a new scope, instead of using a global one
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.list(function(err, results) {
            
            // Receives a literal object and return a format depending on the request content negotiation
            res.format({
                html: function() {
                    res.render('products/list',{list:results});
                },
                json: function() {
                    res.json(results);
                }
            });

        });

        connection.end();
    };

    /**
     * GET: products list rendered by EJS
     */
    app.get('/products', productsList);

    /**
     * GET: register a new product page
     */
    app.get('/products/register', function(req, res) {
        res.render('products/form');
    });

    /**
     * POST: register a new product request
     * Address (/products) + verb (POST)
     */
    app.post('/products', function(req, res) {

        var product = req.body;

        var connection = app.infra.connectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.save(product, function(err, results) {
            res.redirect('/products');
        });

        connection.end();
    });
}