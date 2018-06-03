
alredyLogged(function(isLogged){
    if (isLogged)
        $(location).attr('href', './index.html');

});

const logIn = (nameOrEmail = '', password = '', cb) => {
    alredyLogged(function(isLogged){
        if (false === isLogged){
                $.post(direction+'Usuarios/login',
                {
                    username: nameOrEmail,
                    password: password
                }
                ).then(function(data) {
                    console.log(data);
                    createCookieAccesToken(data.id, data.created, data.ttl);
                    cb('user');
                }).fail(function(xhr, status, error){
                    $.post(direction+'Usuarios/login',
                        {
                            email: nameOrEmail,
                            password: password
                        }
                        ).then(function(data) {
                            console.log(data);
                            createCookieAccesToken(data.id, data.created, data.ttl);
                            cb('user');
                        }).fail(function(xhr, status, error){
                            cb(false);
                        });
                });
            }
        else
            cb(true);
    });

}