
module.exports = function(app) {
    app.get('/promotions/form', function(req, res) {
        var connection = app.infra.connectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);
        productsDAO.list(function(err, results) {
            res.render('promotions/form',{list:results});
        });
        connection.end();
    });

    app.post('/promotions', function(req, res) {
        var promotion = req.body;
        app.get('io').emit('newPromotion', promotion);
        res.redirect('promotions/form');
    });
}