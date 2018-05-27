$(document).ready(function () { 
    currentLocation();
    getCurrentUserLogged(function(user){
        if (null !== user)
            $("#modificar").text(user.email + "-----" +user.name);
    });


    $("#loginButtonJW").click(function(){
        logOut(function(){});
        //logIn('a@a.a', 'a', function(){}); 

        /*logIn('a@a.a', 'a', function(seHaCreadoBien){
            if (seHaCreadoBien)
                console.log('Si');
            else
                console.log('No');

        }); */
        
        //console.log(getFromSessionStorage('access_token'));
        //logOut(function(){});

        //$(location).attr('href', './index.html')
    });

})