$(document).ready(function () { 
    currentLocation();
    getCurrentUserLogged(function(user){
        if (null !== user)
            $("#modificar").text(user.email + "-----" +user.name);
    });


    $("#loginButtonJW").click(function(){
        //logOut(function(){});
        //logIn('a@a.a', 'a', function(){}); 

        logIn('a@a', 'a', function(seHaCreadoBien){


        }); 
        
        /*console.log(getFromSessionStorage('access_token'));*/
        //logOut(function(){});

        //$(location).attr('href', './index.html')

        /*insertUser("ne", coord, "ume", "eml@mail.sd", "paword", function(isCreatedOk) {
            console.log(isCreatedOk);
        });*/
    });

})