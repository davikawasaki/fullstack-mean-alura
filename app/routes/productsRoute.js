
module.exports = function(app) {

    var productsCtrl = new app.controller.ProductsCtrl(app);

    /**
     * GET: Render products list page
     * @param {Function} callback
     */
    app.get('/products', function(req, res, next) {
        productsCtrl.getProductsList(req, res, next);
    });    

    /**
     * GET: Register a new product page
     * @param {Function} callback
     */
    app.get('/products/register', function(req, res) {
        productsCtrl.getProductRegister(req, res);
    });

    /**
     * POST: Register a new product request
     * Address (/products) + verb (POST)
     * @param {Function} callback
     */
    app.post('/products', function(req, res, next) {
        productsCtrl.postProductRegister(req, res, next);
    });
}