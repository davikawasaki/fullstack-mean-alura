
module.exports = function(app) {
    app.get('/', function(req, res) {
        var connection = app.infra.connectionFactory();
        var productsDAO = new app.infra.ProductsDAO(connection);
        productsDAO.list(function(err, results) {
            res.render('home/index',{books:results});
        });
        connection.end();
    });
}