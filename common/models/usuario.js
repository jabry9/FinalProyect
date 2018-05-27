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

  Usuario.getMyAds = function(context, callback) {
  
    const usrLogId = context.req.accessToken.userId;

    Usuario.app.models.Anuncio.find({where: {usuarioId: usrLogId}}, function (err, Ads) {
        if (err)
            callback(err);
        
        let allAdsWithMultimedia = [];

        Ads.forEach(ad => {
            allAdsWithMultimedia.push(appendMultimedia(ad));
        });

        let allAdsWithVacantes = [];
        
        Promise.all(allAdsWithMultimedia)
        .then(function(allAdsWithMultimedia) {
            allAdsWithMultimedia.forEach(ad => {
                allAdsWithVacantes.push(appendVacantes(ad));
            });
            Promise.all(allAdsWithVacantes)
            .then(function(allAdsWithVacantes) {
                callback(null, allAdsWithVacantes);
            })
            .catch(function(err){
                callback(err);
            });
        })
        .catch(function(err){
            callback(err);
        });


    })
  };
  
  const appendMultimedia = (ad) => {
    let promise = new Promise(function(resolve, reject){

        Usuario.app.models.Multimedia.find({where: {anuncioId: ad.id}}, function (err, multimedia){
            if(err) 
            reject(err);

            let newAd = {
                    titulo: ad.titulo,
                    presupMAX: ad.presupMAX,
                    materialsINC: ad.materialsINC,
                    location: ad.location,
                    description: ad.description,
                    date: ad.date,
                    visitas: ad.visitas,
                    id: ad.id,
                    multimedia: multimedia
                };
            resolve(newAd);
        });
    });

    return promise;
   }

   const appendVacantes = (ad) => {
    let promise = new Promise(function(resolve, reject){

        Usuario.app.models.Solicitud.count({anuncioId: ad.id}, function (err, vacantes){
            if(err) 
            reject(err);

            let newAd = {
                    titulo: ad.titulo,
                    presupMAX: ad.presupMAX,
                    materialsINC: ad.materialsINC,
                    location: ad.location,
                    description: ad.description,
                    date: ad.date,
                    visitas: ad.visitas,
                    id: ad.id,
                    multimedia: ad.multimedia,
                    vacantes: vacantes
                };
                
            resolve(newAd);
        });
    });

    return promise;
  }

  
};
