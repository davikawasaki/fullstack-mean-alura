
function LoginDAO(connection) {
    // Setting connection as a private attr to the class
    this._connection = connection;
}

// Adding login function property to default prototype class
// This way we reuse methods instead of adding dinamically
LoginDAO.prototype.login = function(login, callback) {
    console.log(login)
    this._connection.query("SELECT * FROM login WHERE username=? AND pass=SHA1(?)", [login.username, login.password], callback);
}

LoginDAO.prototype.register = function(register, callback) {
    this._connection.query('INSERT INTO login (username, pass) values (?, SHA1(?))',  [register.username, register.password], callback);
}

// Prototype wrapper
module.exports = function() {
    return LoginDAO;
};