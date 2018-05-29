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


    Anuncio.GetByPaginatione = function(title, category, page, adsPerPage, callback) {
        var ads;
        Anuncio.find({where: {titulo: { like: "%"+title+"%" }, categoriaId: category }, limit: adsPerPage, offset: ((page-1)*adsPerPage)}, function(data){
            console.log(data);
        });
        callback(null, ads);
      };
};
