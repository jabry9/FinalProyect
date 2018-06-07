'use strict';

module.exports = function(Empresa) {


    Empresa.beforeRemote('create', function (context, anuncio, next) {
        var usrLogId = context.req.accessToken.userId;
        context.args.data.usuarioId = usrLogId;

        Empresa.findOne({where: {usuarioId: usrLogId}}, function (err, empresa) {
            if (err)
                next(err);
            
            if (null !== empresa){
                var error = new Error('Can not create empresa because user already have one');
                error.name = 'requestNotOk';
                error.statusCode = 409
                next(error);
            }else {
                next();
            }          
        });

    });
    //----------------------------------------------------
    Empresa.getCurrentLogedEmpresa = function(context, callback) {
  
        var usrLogId = context.req.accessToken.userId;
    
        Empresa.findOne({where: {usuarioId: usrLogId}}, function (err, empresa) {
            if (err)
                callback(err);
      
            callback(null, empresa);
        });
      };   
};