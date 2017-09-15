
var jwt = require('jsonwebtoken');

function LoginCtrl(app) {

    /**
     * Login POST method
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     */
    this.login = function(req, res, next) {
        loginAndRedirect(req, res, next, app);
    }

    /**
     * Check authentication in all routes
     * @param {Object} req (request)
     * @param {Object} res (response)
     * @param {Function} next (event flow call)
     */
    this.checkAuth = function(req, res, next) {
        var token = req.headers['Authorization'];
        if(token) {
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if(err) {
                    res.sendStatus(401);
                }
                req.username = decoded;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}

module.exports = function() {
    return LoginCtrl;
};

/**
 * Check login credentials and set authentication
 * @param {Object} req (request)
 * @param {Object} res (response)
 * @param {Function} next (event flow call)
 * @param {Object} app (express object)
 */
function loginAndRedirect(req, res, next, app) {
    var connection = app.infra.connectionFactory();
    var loginDAO = new app.infra.LoginDAO(connection);
    var productsCtrl = new app.controllers.ProductsCtrl(app);
    loginDAO.login(req.body, function(err, results) {
        // Throwing errors to the next element of express flow
        if(err) {
            connection.end();
            return next(err);
        }

        // User or password wrong, so send an Unauthorized status with error message to login form page
        if(results.length === 0) {
            res.status(401).render('login/form', {loginErrors: [{msg: "Usuário e/ou senha inválidas!"}], login: {username: req.body.username}});
            connection.end();
        }
        // Login was successful, so we sign a authentication token with JWT and redirect to homepage with products list
        else {
            var token = jwt.sign({username: req.body.username}, app.get('secret'), {expiresIn: 84600});
            // You can send the token through the response headers
            res.set('Authorization', token);
            res.status(300).redirect('/');
            connection.end();
        }

    });
}
