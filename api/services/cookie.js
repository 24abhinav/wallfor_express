(function() {
    const tokenService = require('./token');

    setCookie = (name, value, maxAge, response) => {
        response.cookie(name, value, maxAge);
    },

    tokenAuthorization = async (request, response) => {
        const token = await request.cookies.S;

        if (token) {
            const isTokenValid = await tokenService.verifyToken(token);
            if(!isTokenValid) {
                response.status(401).send({message: 'Your Session has been expired! Please Login again'});
                return false;
            } 
        } else {
            response.status(403).send({message: 'Token is missing'});
            return false;
        }
        return true;
    },

    userLogout = async (response) => {
        await response.clearCookie('S');
        response.status(200).send({message: 'Logout successful'});
    },

    module.exports = {
        setCookie,
        tokenAuthorization,
        userLogout,
    };
}());