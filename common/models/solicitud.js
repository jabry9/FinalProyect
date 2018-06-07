'use strict';

module.exports = function(Solicitud) {

    Solicitud.beforeRemote('create', function (context, solicitud, next) {
        var usrLogId = context.req.accessToken.userId;
        

        Solicitud.app.models.Empresa.findOne({where: {usuarioId: usrLogId}}, function (err, empresa) {
            if (err)
                next(err);
            
            if (null === empresa){
                var error = new Error('Can not create solicitud because user dont have have Empresa');
                error.name = 'requestNotOk';
                error.statusCode = 409
                next(error);
            }else {
                context.args.data.empresaId = empresa.id;
                Solicitud.app.models.Anuncio.findOne({where: {id: context.args.data.anuncioId}}, function (err, anuncio) {
                    if (err)
                        next(err);
                        
                        if (null === anuncio){
                            var error = new Error('Can not create solicitud because anuncio doesnt exist');
                            error.name = 'requestNotOk';
                            error.statusCode = 409
                            next(error);
                        } else {
                            Solicitud.findOne({where: {anuncioId: context.args.data.anuncioId, empresaId: empresa.id}}, function (err, solicitud) {
                                if (err)
                                    next(err);


                                if (null !== solicitud){
                                    var error = new Error('Can not create solicitud because solicitud already exist');
                                    error.name = 'requestNotOk';
                                    error.statusCode = 409
                                    next(error);
                                } else {
                                    next();
                                }
                                
                            });
                            
                        }
                });
                
            }          
        });

    });


};