
function ProductsDAO(connection) {
    // Setting connection as a private attr to the class
    this._connection = connection;
}

// Adding list function property to default prototype class
// This way we reuse methods instead of adding dinamically
ProductsDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM products', callback);
}

ProductsDAO.prototype.save = function(product, callback) {
    this._connection.query('INSERT INTO products set ?', product, callback);
    // this._connection.query('INSERT INTO products (title, price, description) values (?, ?, ?)',  [product.title, product.price, product.description], callback);
}

// Prototype wrapper
module.exports = function() {
    return ProductsDAO;
};