//boton login para insertar data en la table customer

$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);  
    
    function onDeviceReady() {
        document.addEventListener("backbutton", onBackKeyDown, false); 

        var fbLoginSuccess = function (userData) {
          console.log("UserInfo: ", userData);
          facebookConnectPlugin.getAccessToken(function(token) {
            console.log("Token: " + token);
          });
        }

        facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
          function loginError (error) {
            console.error(error)
          }
        );



        // facebookConnectPlugin.appInvite(
        //     {
        //         url: "https://play.google.com/store/apps/details?id=com.realcs.report&hl=es_419",
        //         picture: "http://retailcs.com/demos/logodescuentosperu.html"
        //     },
        //     function(obj){
        //         if(obj) {
        //             if(obj.completionGesture == "cancel") {
        //                 // user canceled, bad guy
        //             } else {
        //                 // user really invited someone :)
        //             }
        //         } else {
        //             // user just pressed done, bad guy
        //         }
        //     },
        //     function(obj){
        //         // error
        //         console.log(obj);
        //     }
        // );


        





      
    }
    function onBackKeyDown() { 
         navigator.app.exitApp();
    }
    //localStorage.clear();
    onInit();
    validationEmail();   
});





$(window).load(function(){
    $('.btnLogin').click(function () {
        var email=$('.valEmail').val();
        if(checkNetConnection()){
            if (email=='') {
                noEmailMessage();
            }else{
                if(validarEmail(email)==1){
                    var check="";
                    if($('.chkremenber').is(':checked')){
                        check = "1";
                    }else{
                        check = "0";
                    }
                    Login(email,check);
                }else{
                    invalidEmailMessage();
                }
            }
        }else{
            noConexionMessage();// this method is in scripts.js      
        }
    });




});



//funcion de validacion de correo
function validarEmail( email ) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)){
        return 0;
    }else{
        var array = email.split("@");
        var array2=array[1].split(".");
        var dominios=[ "aol", "att", "comcast", "facebook", "gmail", "gmx", "googlemail",
        "google", "hotmail", "mac", "me", "mail", "msn","outlook",
        "live", "sbcglobal", "verizon", "yahoo","realcs"];
        for(var i=0 ; i<dominios.length;i++){
            if(array2[0]==dominios[i]){
                return 1;
            }
        }
        return 0;
    } 
}




//function de login
function Login(email,check) {
    try {
        var array;
        //select veriifca que que el ussuario esta registrado en la base de datos
        var query1="SELECT * FROM CUSTOMER";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results){
                if(results.rows.length!=0){
                deletedTableCustomer();
                }
                //si hay data en la tabla customer
                var queryInsert = "INSERT INTO " + TABLE_CUSTOMER + "(" + KEY_CUSTOMEREMAIL + ", " + KEY_SAVE + ") VALUES (?,?)";
                localDB.transaction(function (transaction) {
                    transaction.executeSql(queryInsert, [email,check], function (transaction, results){
                        array = {email:email};
                        $.ajax({
                            url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/Login/Post",
                            type: 'POST',
                            data: JSON.stringify(array),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            async: true,
                            crossdomain: true,
                            beforeSend: function () {
                                showLoading();
                            }, complete: function () {
                                hideLoading();
                            }, success: function (data) {
                                localStorage.existUser=data.Exist;
                                localStorage.email= email;
                                localStorage.Categories= JSON.stringify(data.Data);
                                window.location = "./views/promotions.html";  
                            }, error: function (xhr, ajaxOptions, thrownError) {
                                console.log(xhr.status);
                                console.log(xhr.statusText);
                                console.log(xhr.responseText);
                                hideLoading();
                                if (current_lang == 'es'){
                                    mostrarModalGeneral("Error de Conexión");
                                }
                                else{
                                    mostrarModalGeneral("No Connection");
                                }
                            }
                        });
                    });
                });



                

/*
                //si es distinto a 0 que ya esta registrado
                if(results.rows.length!=0){
                    if(check=='1'){
                        var query2="UPDATE CUSTOMER SET save='1' WHERE customerEmail='"+email+"'";
                         localDB.transaction(function (transaction) {
                            transaction.executeSql(query2, [], function (transaction, results){
                                $.ajax({
                                    type: "POST",
                                    url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/Login/Post",
                                    async: false,
                                    dataType: "json",
                                    crossdomain: true,
                                    beforeSend: function () {
                                        showLoading();
                                    },
                                    complete: function () {
                                        hideLoading();
                                    },
                                    success: function (result) {
                                        localStorage.newUser= 0;
                                        localStorage.lastCategoryVisited="";
                                        localStorage.email= email;
                                        localStorage.Categories= JSON.stringify(result);
                                        window.location = "./views/promotions.html";         
                                    },
                                    error: function (error, ajaxOptions, thrownError) {
                                        console.log(error.statusText);
                                        console.log(error.responseText);  
                                    }
                                });
                            });
                        });

                    }else{
                        var query3="UPDATE CUSTOMER SET save='0' WHERE customerEmail='"+email+"'";
                        localDB.transaction(function (transaction) {
                            transaction.executeSql(query3, [], function (transaction, results){
                                $.ajax({
                                    type: "POST",
                                    url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/Login/Post",
                                    async: false,
                                    dataType: "json",
                                    crossdomain: true,
                                    beforeSend: function () {
                                        showLoading();
                                    },
                                    complete: function () {
                                        hideLoading();
                                    },
                                    success: function (result) {
                                        localStorage.newUser= 0;
                                        localStorage.lastCategoryVisited="";
                                        localStorage.email= email;
                                        localStorage.Categories= JSON.stringify(result);
                                        window.location = "./views/promotions.html";         
                                    },
                                    error: function (error, ajaxOptions, thrownError) {
                                        console.log(error.statusText);
                                        console.log(error.responseText);  
                                    }
                                });
                            });
                        });
                     }

                   
                }else{
                    //
                    var queryInsert = "INSERT INTO " + TABLE_CUSTOMER + "(" + KEY_CUSTOMEREMAIL + ", " + KEY_SAVE + ") VALUES (?,?)";
                    localDB.transaction(function (transaction) {
                        transaction.executeSql(queryInsert, [email,check], function (transaction, results) {
                        $.ajax({
                            type: "GET",
                            url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/Login/Post",
                            async: false,
                            dataType: "json",
                            crossdomain: true,
                            beforeSend: function () {
                                showLoading();
                            },
                            complete: function () {
                                hideLoading();
                            },
                            success: function (result) {
                                localStorage.newUser= 1;
                                localStorage.email= email;
                                localStorage.lastCategoryVisited="";
                                localStorage.Categories= JSON.stringify(result);
                                window.location = "./views/promotions.html";         
                            },
                            error: function (error, ajaxOptions, thrownError) {
                                console.log(error.statusText);
                                console.log(error.responseText);  
                            }
                        });
                    });
                });
                }
*/


            });
        });
    } catch (e) {
    console.log("Error login " + e + ".");   
    }
}




function validationEmail(){
    if(checkNetConnection()){
        try {
        var query1="SELECT * FROM "+ TABLE_CUSTOMER +" WHERE save='1'";
        var cant=0;
        var email="";
        localDB.transaction(function (tx) {
            tx.executeSql(query1, [], function (tx, results) {
                cant= results.rows.length;
                if(cant!=0){
                    email=results.rows.item(0).customerEmail;
                    localStorage.email=email;
                    localStorage.existUser="1";
                    window.location ="./views/promotions.html";
                }
            });
        });
        } catch (e) {
            console.log("Error validationEmail " + e + ".");
        }
    }else{
        noConexionMessage();
    }
}

