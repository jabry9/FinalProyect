const direction = 'http://localhost:3000/api/'; 

const coord;

$(document).ready(function () { 

    
    currentLocation();
    $("#loginButtonJW").click(function(){


    });



})

const setSessionStorage = (cname, cvalue) => {
    sessionStorage.setItem(cname, cvalue);
}

const getFromSessionStorage = (cname) => {
    return sessionStorage.getItem(cname);
}

const removeFromSessionStorage = (cname) => {
    sessionStorage.removeItem(cname);
}

const login = (nameOrEmail, password) => {

    let hisLogged = true;

    if (false === alredyLogged()){
        $.post(direction+'Usuarios/login',
        {
            email: nameOrEmail,
            password: password
        }
        ).then(function(data) {
            token = data.id;
            setSessionStorage('access_token', data.id);
        }).fail(function(error){
            console.log(error);
            hisLogged = false;
        });
    }

    return hisLogged;

}

const alredyLogged = () => {

    let logged = false;

    if (null !== getFromSessionStorage('access_token')){
        $.get(direction+'Usuarios/getUser', {
            access_token: getFromSessionStorage('access_token')
        }).then(function() {
            logged = true;
        }).fail(function(){
            removeFromSessionStorage('access_token'); 
        });
    }
    
    return logged;
}

const getCurrentUserLogged = () => {

    let user = null;

    if (alredyLogged())
        $.get(direction+'Usuarios/getUser', {
            access_token: getFromSessionStorage('access_token')
        }).then(function(data) {
            user = data;
        });

    return user;
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