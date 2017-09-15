
module.exports = function(app) {

    var promotionsCtrl = new app.controllers.PromotionsCtrl(app);

    /**
     * GET: Render promotions form page
     * @param {Function} callback
     */
    app.get('/promotions/form', function(req, res, next) {
        promotionsCtrl.getPromotionRegister(req, res, next);
    });

    /**
     * POST: Register a new promotion with WS
     * Address (/products) + verb (POST)
     * @param {Function} callback
     */
    app.post('/promotions', function(req, res) {
        promotionsCtrl.postPromotionRegister(req, res);
    });
}