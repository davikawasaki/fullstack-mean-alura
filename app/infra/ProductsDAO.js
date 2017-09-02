
function ProductsDAO(connection) {
    // Setting connection as a private attr to the class
    this._connection = connection;
}

// Adding list function property to default prototype class
// This way we reuse methods instead of adding dinamically
ProductsDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM products', callback);
}

// Prototype wrapper
module.exports = function() {
    return ProductsDAO;
};