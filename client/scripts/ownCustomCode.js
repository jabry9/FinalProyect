const direction = 'http://localhost:3000/api/'; 
let coord = null;

const setCookie = (cname, cvalue, exdays = 2) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const createCookieAccesToken = (cvalue) => {
    const d = new Date();
    d.setTime(d.getTime() + (10*24*60*60*1000));
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

const removeCookieAccesToken = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const getCookie = (cname) => {
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

const logOut = (cb) => {

    $.post(direction+'Usuarios/logout?access_token='+getCookieAccesToken()).
    then(function(data) {
        removeCookieAccesToken();
        cb(true);
    }).fail(function(error){
        cb(false);
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
            removeCookieAccesToken();
        });
    }else 
        cb(false);
}

const getCurrentUserLogged = (cb) => {

    if (is)
        $.get(direction+'Usuarios/getUser', {
            access_token: getCookieAccesToken()
        }).then(function(data) {
            cb(data.User);
        }).fail(function(){
            cb(null);
        });

}

const getMyAds = (cb) => {
    
        $.get(direction+'Usuarios/getMyAds', {
            access_token: getCookieAccesToken()
        }).then(function(data) {
            cb(data.Ads);
        }).fail(function(){
            cb(null);
        });
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