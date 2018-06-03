const direction = 'http://localhost:3000/api/'; 
let coord = null;

const setCookie = (cname, cvalue, exdays = 2) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const createCookieAccesToken = (cvalue, created, ttl) => {
    const d = new Date(created);
    d.setTime(d.getTime() + ttl);
    const expires = "expires="+ d.toUTCString();
    document.cookie = "access_token=" + cvalue + ";" + expires + ";path=/";
}

const getCookieAccesToken = () => {
    const name = "access_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getFromSessionStorage = (cname) => {
    //return sessionStorage.getItem(cname);
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const removeFromSessionStorage = (cname) => {
    sessionStorage.removeItem(cname);
}


const logIn = (nameOrEmail, password, cb) => {

    alredyLogged(function(isLogged){
        if (false === isLogged){
                $.post(direction+'Usuarios/login',
                {
                    email: nameOrEmail,
                    password: password
                }
                ).then(function(data) {
                    console.log(data);
                    createCookieAccesToken(data.id, data.created, data.ttl);
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
            $.post(direction+'Usuarios/logout?access_token='+getCookieAccesToken()
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

    if (null != getCookieAccesToken()){
        $.get(direction+'Usuarios/getUser', {
            access_token: getCookieAccesToken()
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
            access_token: getCookieAccesToken()
        }).then(function(data) {
            cb(data.User);
        }).fail(function(){
            cb(null);
        });
    else
        cb(null);
    })

}

const getMyAds = (cb) => {
    alredyLogged(function(is){
        if (is)
        $.get(direction+'Usuarios/getMyAds', {
            access_token: getCookieAccesToken()
        }).then(function(data) {
            cb(data.Ads);
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

const insertUser = (name, coord, userName, email, password, cb) => {

    if (null === coord) {
        coord = {
            coords: {
                latitude: 0,
                longitude: 0
            }
        };
    }
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
       cb(true);
    }).fail(function(){
        cb(false);
    });
}

const insertAd = (title, presupMAX, materialsINC, coord, description, categoryId, cb) => {

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
            cb(true);
         }).fail(function(){
             cb(false);
         });
}