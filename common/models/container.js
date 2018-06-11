module.exports = function(Container) {

 Container.beforeRemote('upload', function (context, archivo, next) {

        Container.getContainers(function (err, containers) {
            if (err)
                next(err);

		
            const already = containers.filter(cont => cont.name === context.req.params.container);

            if (0 === already.length){
                Container.createContainer({name: context.req.params.container}, function(err, c) {
                    if (err)
                        next(err);
                    
                    next();
                });
            }else
                next();
       });

});

};
