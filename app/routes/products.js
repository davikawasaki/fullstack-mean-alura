
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
        res.render('products/form',{validationErrors:{}, product:{}});
    });

    /**
     * POST: register a new product request
     * Address (/products) + verb (POST)
     */
    app.post('/products', function(req, res) {

        var product = req.body;

        // Returns a validator chain from attr assertion
        req.assert('title', 'Título é obrigatório!').notEmpty();
        req.assert('price', 'Formato de preço inválido!').isFloat();

        var errors = req.validationErrors();
        if(errors) {
            // Receives a literal object and return a format depending on the request content negotiation
            res.format({
                html: function() {
                    res.status(400).render('products/form',{validationErrors:errors, product:product});
                },
                json: function() {
                    res.status(400).json(errors);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);

        productsDAO.save(product, function(err, results) {
            res.redirect('/products');
        });

        connection.end();
    });
}