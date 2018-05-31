'use strict';

module.exports = function(Anuncio) {

    // Asignar como 'owner' de la lista que se va a crear, al usuario que solicita su creación
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
            else
                next();

        })
        
    });

    Anuncio.getMyAds = function(context, callback) {
        const usrLogId = context.req.accessToken.userId;

        Anuncio.find({where: {usuarioId: usrLogId},include: ['multimedia', 'solicitudes']}, function (err, Ads) {
            if (err)
                callback(err);

            callback(null, Ads);
        });
    }

    Anuncio.GetByPaginatione = function(title, category, page, adsPerPage, position, callback) {

        if (0 < page)
            page = ((page-1)*adsPerPage);

        Anuncio.app.models.Category.find({},function (err, d) {
            if (err)
                callback(err);

            let ar = [];

            Anuncio.find({where: {titulo: {like: "%"+title+"%"}, categoriaId: {inq: filter(category, d, ar), location: {
                near : position, }}},include: ['multimedia', 'solicitudes'], limit: adsPerPage, offset: page}, function(err, ad){
                if (err)
                    callback(err);

                callback(null, ad);
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