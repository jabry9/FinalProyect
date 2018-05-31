'use strict';

module.exports = function(Usuario) {

/**
 * Devuelve al usuario loggeado
 * @param {Function(Error, object)} callback
 */

Usuario.getUser = function(context, callback) {
  
    var usrLogId = context.req.accessToken.userId;

    Usuario.findById(usrLogId, function (err, usrLog) {
        if (err)
            callback(err);

            callback(null, usrLog);
    })
  };  
};

