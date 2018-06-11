'use strict';

module.exports = function(Solicitud) {

    Solicitud.beforeRemote('create', function (context, solicitud, next) {
        var usrLogId = context.req.accessToken.userId;
        

        Solicitud.app.models.Empresa.findOne({where: {usuarioId: usrLogId}}, function (err, empresa) {
            if (err)
                next(err);


            if (null === empresa){
                var error = new Error('Can not create solicitud because user dont have Empresa');
                error.name = 'requestNotOk';
                error.statusCode = 409
                next(error);
            }else if (empresa.credits <= 0){
                var error = new Error('Can not create solicitud because Empresa dont have credits');
                error.name = 'requestNotOk';
                error.statusCode = 409
                next(error);
            } else  {
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
                                    empresa.credits = empresa.credits -1;
                                    empresa.save();
                                    next();
                                }
                                
                            });
                            
                        }
                });
                
            }          
        });

    });

    //-----------------------------------------------------------------------------

    Solicitud.getIfSolicitudIsMy = function(context, anuncioId, callback) {
        var usrLogId = context.req.accessToken.userId;
        

        Solicitud.app.models.Empresa.findOne({where: {usuarioId: usrLogId}}, function (err, empresa) {
            if (err)
                callback(err);
            
            if (null === empresa){
                var error = new Error('Can not given solicitud because user dont have have Empresa');
                error.name = 'requestNotOk';
                error.statusCode = 409;
                callback(error);
            }else {

                            Solicitud.findOne({where: {anuncioId: anuncioId, empresaId: empresa.id}}, function (err, solicitud) {
                                if (err)
                                callback(err);


                                if (null === solicitud){
                                    var error = new Error('Can not given solicitud because solicitud not exist exist');
                                    error.name = 'requestNotOk';
                                    error.statusCode = 404;
                                    callback(error);
                                } else {
                                    callback(null, solicitud);
                                }
                                
                            });
                
            }          
        });
    }

    //----------------------------------------------------------------------------------------
    Solicitud.getSolicitudWithEmpresa = function(anuncioId, callback) {
        

        Solicitud.find({where: {anuncioId: anuncioId}, include: ['empresa']}, function (err, solicitud) {
            if (err)
            callback(err);


            if (null === solicitud){
                var error = new Error('Can not given solicitud because solicitud not exist exist');
                error.name = 'requestNotOk';
                error.statusCode = 404;
                callback(error);
            } else {
                callback(null, solicitud);
            }
            
        });
    }


};