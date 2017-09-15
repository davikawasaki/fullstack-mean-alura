
module.exports = function(app) {
    
    var productsCtrl = new app.controllers.ProductsCtrl(app);
    var loginCtrl = new app.controllers.LoginCtrl(app);

    /**
     * GET: Render index main page
     * @param {Function} callback
     */
    app.get('/', function(req, res, next) {
        productsCtrl.getHomeList(req, res, next);
    });

    app.use('/*', function(req, res, next) {
        loginCtrl.checkAuth(req, res, next);
    });
}