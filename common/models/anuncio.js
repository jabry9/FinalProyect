'use strict';

module.exports = function(Anuncio) {

    // Asignar como 'owner' de la lista que se va a crear, al usuario que solicita su creaci�n
    Anuncio.beforeRemote('create', function (context, anuncio, next) {
        context.args.data.usuarioId = context.req.accessToken.userId;
        context.args.data.date = new Date();

        Anuncio.app.models.Category.findById(context.args.data.categoriaId, function (err, category) {
            if (err)
                next(err);
            
            if (null === category){
                var error = new Error('Can not create abs because category doesnt exist');
                error.name = 'requestNotOk';
                error.statusCode = 409
                next(error);
            }
            else{
                var NodeGeocoder = require('node-geocoder');
 
                var options = {
                provider: 'google',
                
                // Optional depending on the providers
                httpAdapter: 'https', // Default
                apiKey: 'AIzaSyCajyKVMEbcYe6_2fsL8e_WRnqUQPkZ4lY', // for Mapquest, OpenCage, Google Premier
                formatter: null         // 'gpx', 'string', ...
                };
                
                var geocoder = NodeGeocoder(options);
                
                
                geocoder.reverse({lat: context.args.data.location.lat, lon: context.args.data.location.lng}, function(err, res) {
                    if (err === null)
                        context.args.data.city = res[0].city;
                    else 
                        context.args.data.city = 'In World';
                    next();
                  });

                



            }
                

        })
        
    });


    //----------------------------------------------------------


    Anuncio.getMyAds = function(context, callback) {
        const usrLogId = context.req.accessToken.userId;

        Anuncio.find({where: {usuarioId: usrLogId},include: ['multimedia', 'solicitudes']}, function (err, Ads) {
            if (err)
                callback(err);

            callback(null, Ads);
        });
    }
    //---------------------------------------------------------------

    Anuncio.afterRemote('getAd', function (context, anuncio, next) {

        anuncio.ad.visitas = anuncio.ad.visitas + 1;
        anuncio.ad.save();
        next();
    });

    //-----------------------------------------------------

    Anuncio.getAd = function(anuncioId, callback) {

        Anuncio.findOne({where: {id: anuncioId},include: ['multimedia', 'solicitudes', 'usuario']}, function (err, Ads) {
            if (err)
                callback(err);
      
            callback(null, Ads);
        });
    }

    //---------------------------------------------------

    Anuncio.GetByPaginatione = function(title = '', category = 0, page, adsPerPage, position = {"lat": 0, "lng": 0}, callback) {

        if (0 < page)
            page = ((page-1)*adsPerPage);

        Anuncio.app.models.Category.find({},function (err, d) {
            if (err)
                callback(err);

            let ar = [];

            Anuncio.find({where: {titulo: {like: "%"+title+"%"}, categoriaId: {inq: filter(category, d, ar), location: {
                near : position, }}},include: ['usuario', 'multimedia', 'solicitudes'], limit: adsPerPage, offset: page, order: 'date DESC'}, function(err, Ads){
                if (err)
                    callback(err);

                callback(null, Ads);
            });
        });


      };
};





const filter = (category, categoryArray, categoriesArrayGood) => {

    categoriesArrayGood.push(category);

    categoryArray.forEach(cat => {
        if (cat.parentCategoryId == category){
            categoriesArrayGood = filter(cat.id, categoryArray, categoriesArrayGood);
        }
            
    });

    return categoriesArrayGood;
};