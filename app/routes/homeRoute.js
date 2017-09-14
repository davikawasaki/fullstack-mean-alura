
module.exports = function(app) {
    
    var productsCtrl = new app.controller.ProductsCtrl(app);

    /**
     * GET: Render index main page
     * @param {Function} callback
     */
    app.get('/', function(req, res, next) {
        productsCtrl.getHomeList(req, res, next);
    });
}