$(document).ready(function () { 
   
    // currentLocation();

   /* getCurrentUserLogged(function(user){
        if (null !== user)
            $("#GetNameSurnames").text(user.name);
            $("#GetEmail").text(user.email);
    });*/


    /*$("#loginButtonJW").click(function(){
        
       valueLoginUsarName= $("#valueLoginUserJW").val();
       valueLoginPassword= $("#valueLoginPassJW").val();
        alert("Rtttt");
       logIn(valueLoginUsarName, valueLoginPassword, function(seHaCreadoBien){
        
            if (seHaCreadoBien){
                $(location).attr('href', './index.html');
            }else
                console.log('No');

            getMyAds(function(da){
                console.log(da)
            });


        }); 
        
        console.log(getFromSessionStorage('access_token'));
        logOut(function(){});

        $(location).attr('href', './index.html')

        insertUser("ne", coord, "ume", "eml@mail.sd", "paword", function(isCreatedOk) {
            console.log(isCreatedOk);
        });
    });*/

    $(".logOutButtonJWClass").click(function(){

        logOut(function(seHaCerradoBien){
            if (seHaCerradoBien)
                $(location).attr('href', './Login.html');
            else
                console.log('No');

                getMyAds(function(da){
                    console.log(da)
                });
        });
        
    });

    $("#registerButtonJW").click(function(){

        valueRigesterNombre= $("#valueRigesterNombreJW").val();
        valueRigesterUsarName= $("#valueRigesterUserJW").val();
        valueRigesterEmail= $("#valueRigesterEmailJW").val();
        valueRigesterPassword= $("#valueRigesterPassJW").val();
        

        insertUser(valueRigesterNombre, coord, valueRigesterUsarName, valueRigesterEmail, valueRigesterPassword, function(isCreatedOk) {
            if (isCreatedOk){
                $(location).attr('href', './profile.html');
            }else
                console.log('No');
        });
        
    });

})