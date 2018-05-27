const direction = 'http://localhost:3000/api/'; 
let coord = '';

const setSessionStorage = (cname, cvalue) => {
    sessionStorage.setItem(cname, cvalue);
}

const getFromSessionStorage = (cname) => {
    return sessionStorage.getItem(cname);
}

const removeFromSessionStorage = (cname) => {
    sessionStorage.removeItem(cname);
}


const logIn = (nameOrEmail, password, cb) => {

    alredyLogged(function(isLogged){
        if (false === isLogged){
            
               /* var fd = new FormData();
                fd.append("email", nameOrEmail);
                fd.append("password", password);

                $.ajax({
                    type: "POST",
                    url: direction+'Usuarios/login',
                    contentType : "text/xml",
                    data: fd,
                    success: function(data,status,xhr){
                        alert("Hurrah!");
                    },
                    error: function(xhr, status, error){
                        alert("Error!" + xhr.status);
                    },
                    dataType: "xml"
                });*/

                $.post(direction+'Usuarios/login',
                {
                    email: nameOrEmail,
                    password: password
                }
                ).then(function(data) {
                    setSessionStorage('access_token', data.id);
                    cb(true);
                }).fail(function(xhr, status, error){
                    cb(false);
                });
            }
        else
            cb(true);
    });

}

const logOut = (cb) => {

    alredyLogged(function(is){
        if (is)
            $.post(direction+'Usuarios/logout?access_token='+getFromSessionStorage('access_token')
            ).then(function(data) {
                removeFromSessionStorage('access_token');
                cb(true);
            }).fail(function(error){
                cb(false);
            });
        else
            cb(true);
    });


}

const alredyLogged = (cb) => {

    if (null != getFromSessionStorage('access_token')){
        $.get(direction+'Usuarios/getUser', {
            access_token: getFromSessionStorage('access_token')
        }).then(function(data) {
            cb(true);
        }).fail(function(){
            cb(false);
            removeFromSessionStorage('access_token'); 
        });
    }else 
        cb(false);
}

const getCurrentUserLogged = (cb) => {
    alredyLogged(function(is){
        if (is)
        $.get(direction+'Usuarios/getUser', {
            access_token: getFromSessionStorage('access_token')
        }).then(function(data) {
            cb(data.User);
        }).fail(function(){
            cb(null);
        });
    else
        cb(null);
    })

}

const currentLocation = () => {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(setCoord);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

const setCoord = (position) => {
    coord = position;
}

const insertUser = (name, coord, userName, email, password) => {

    let insertedOK = false;

     $.post(direction+'Usuarios',
        {
        name: name,
        location: {
            lat: coord.coords.latitude,
            lng: coord.coords.longitude
        },
        username: userName,
        email: email,
        password: password
        }
    ).then(function() {
       insertedOK = true;
    });

    return insertedOK;
}

const insertAd = (title, presupMAX, materialsINC, coord, description, categoryId) => {

    let insertedOK = false;

    if (alredyLogged())
        $.post(direction+'Anuncios?access_token='+getFromSessionStorage('access_token'),
        {
            titulo: title,
            presupMAX: presupMAX,
            materialsINC: materialsINC,
            location: {
                lat: coord.coords.latitude,
                lng: coord.coords.longitude
            },
            categoriaId: categoryId,
            description: description
        }
        ).then(function() {
            insertedOK = true;
        });

    return insertedOK;

}