
function ProductsCtrl(app) {

    /**
     * Return products list to home page
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     */
    this.getHomeList = function(req, res, next) {
        listProducts(req, res, next, app, 'home/index');
    };

    /**
     * Return register new product page
     * @param {Object} req (request)
     * @param {Object} res (response)
     */
    this.getProductRegister = function(req, res) {
        res.render('products/form', {validationErrors:{}, product:{}});
    };

    /**
     * Process new product registration and redirect to products if validation passes
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    this.postProductRegister = function(req, res, next) {
        registerNewProduct(req, res, next, app);
    };

}

// Prototype wrapper
module.exports = function() {
    return ProductsCtrl;
};

/**
 * Access productsDAO through DB connection to list products and render to specific page
 * @param {Object} req (request)
 * @param {Object} res (response)
 * @param {Function} next (event flow call)
 * @param {Object} app (express object)
 * @param {String} page ('home/index')
 */
function listProducts(req, res, next, app, page, redirect) {
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.list(function(err, results) {
        
        // Throwing errors to the next element of express flow
        if(err) {
            return next(err);
        }

        // Receives a literal object and return a format depending on the request content negotiation
        res.format({
            html: function() {
                render(res, results, connection, page);
            },
            json: function() {
                res.json(results);
                connection.end();
            }
        });
    });
}

/**
 * Render page depending on page args; then close DB connection
 * @param {Object} res (response)
 * @param {Array} results (results list from ProductsDAO)
 * @param {Object} conn (DB connection)
 * @param {String} page (String page to be rendered)
 */
function render(res, results, conn, page) {
    res.render(page, {books:results});
    conn.end();
}

/**
 * Process POST method request to register a new product
 * @param {Object} req (request)
 * @param {Object} res (response)
 * @param {Function} next (event flow call)
 * @param {Object} app (express object)
 */
function registerNewProduct(req, res, next, app) {
    var product = req.body;

    // Returns a validator chain from attr assertion
    req.assert('title', 'Título é obrigatório!').notEmpty();
    req.assert('price', 'Formato de preço inválido!').isFloat();

    var valErrors = req.validationErrors();
    if(valErrors) {
        // Receives a literal object and return a format depending on the request content negotiation
        res.format({
            html: function() {
                res.status(400).render('products/form',{validationErrors:valErrors, product:product});
            },
            json: function() {
                res.status(400).json(valErrors);
            }
        });
        return;
    }

    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);

    productsDAO.save(product, function(err, results) {

        if(err) {
            return next(err);
        }

        res.redirect('/products');
    });

    connection.end();
}