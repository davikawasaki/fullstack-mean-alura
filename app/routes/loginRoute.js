
module.exports = function(app) {

    var loginCtrl = new app.controllers.LoginCtrl(app);

    /**
     * GET: Render login page
     * @param {Function} callback
     */
    app.get('/login', function(req, res, next) {
        res.render('login/form', {loginErrors:{}, login:{}});
    });

    app.post('/login', function(req, res, next) {
        loginCtrl.login(req, res, next);
    });

}