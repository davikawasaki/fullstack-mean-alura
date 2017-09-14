
function PromotionsCtrl(app) {

    /**
     * Return register new promotion page
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     * @param {Object} app (express object)
     */
    this.getPromotionRegister = function(req, res, next) {
        getNewPromotionPage(req, res, next, app, 'promotions/form');
    };

    /**
     * Process new promotion registration, emit new WS event and redirect to promotions form
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Object} app (express object)
     */
    this.postPromotionRegister = function(req, res) {
        registerNewPromotion(req, res, app);
    };

}

// Prototype wrapper
module.exports = function() {
    return PromotionsCtrl;
};

/**
 * Access productsDAO through DB connection to list products and render to specific page
 * @param {Object} req (request)
 * @param {Object} res (response)
 * @param {Function} next (event flow call)
 * @param {Object} app (express object)
 * @param {String} page (String page to be rendered)
 */
function getNewPromotionPage(req, res, next, app, page) {
    var connection = app.infra.connectionFactory();
    var productsDAO = new app.infra.ProductsDAO(connection);
    productsDAO.list(function(err, results) {
        if(err) {
            return next(err);
        }
        render(res, results, connection, page);
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
 * Process POST method request to register a new promotion; redirect to promotions form page
 * @param {Object} req (request)
 * @param {Object} res (response)
 * @param {Object} app (express object)
 */
function registerNewPromotion(req, res, app) {
    var promotion = req.body;
    app.get('io').emit('newPromotion', promotion);
    res.redirect('promotions/form');
}