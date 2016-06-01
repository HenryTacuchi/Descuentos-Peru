//boton login para insertar data en la table customer

$(document).ready(function () {
     document.addEventListener("deviceready", onDeviceReady, false);  
    function onDeviceReady() {
      document.addEventListener("backbutton", onBackKeyDown, false); 
    }
    function onBackKeyDown() { 
    }

    //localStorage.clear();
    onInit();
    validationEmail();   
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
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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

        //select veriifca que que el ussuario esta registrado en la base de datos
        var query1="SELECT * FROM CUSTOMER WHERE customerEmail='"+email+"'";
        localDB.transaction(function (transaction) {
            transaction.executeSql(query1, [], function (transaction, results){
                //si es distinto a 0 que ya esta registrado

                if(results.rows.length!=0){
                    if(check=='1'){
                        var query2="UPDATE CUSTOMER SET save='1' WHERE customerEmail='"+email+"'";
                         localDB.transaction(function (transaction) {
                            transaction.executeSql(query2, [], function (transaction, results){
                                $.ajax({
                                    type: "GET",
                                    url: "http://72.87.163.31/ServicePromotions/Service.svc/Login/"+email,
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
                                        alert(error.status + " ajax ");
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
                                    type: "GET",
                                    url: "http://72.87.163.31/ServicePromotions/Service.svc/Login/"+email,
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
                                        alert(error.status + " ajax ");
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
                            url: "http://72.87.163.31/ServicePromotions/Service.svc/Login/"+email,
                            async: false,
                            dataType: "json",
                            crossdomain: true,
                            beforeSend: function () {
                                showLoading();
                                //alert("showloading");
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
                                alert(error.status + " ajax ");
                                console.log(error.statusText);
                                console.log(error.responseText);  
                            }
                        });
                    });
                });
                }
            });
        });
    } catch (e) {
    alert("Error login " + e + ".");   
    }
}




function validationEmail() {
    try {
        query1="SELECT * FROM "+ TABLE_CUSTOMER +" WHERE save='1'";
        var cant=0;
        var email="";
        localDB.transaction(function (tx) {
            tx.executeSql(query1, [], function (tx, results) {
             cant= results.rows.length;
            if(cant!=0){
                email=results.rows.item(0).customerEmail;
                localStorage.email=email;
                localStorage.newUser=0;
                window.location ="./views/promotions.html";
            }
        });
        });
    } catch (e) {
        alert("Error validationEmail " + e + ".");
    }
}





