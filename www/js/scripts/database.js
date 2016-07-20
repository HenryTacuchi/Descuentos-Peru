//DATABASE NAME
var localDB = 'RCS';

//TABLE CUSTOMER
var TABLE_CUSTOMER='CUSTOMER';
//ID
var KEY_CUSTOMEREMAIL='customerEmail';
var KEY_SAVE='save';


//TABLE_CATEGORY
var TABLE_PROMO='PROMO';
//ID
var KEY_PROMOID='promoId';
var KEY_EMAIL='emailId';

//TABLE_STORE
var TABLE_STORE='STORE';
//ID
var KEY_COMPANY='companyId';
var KEY_ADDRESS='address';
var KEY_PHONE='phone';


function initDB() {
    var shortName = 'RCS Prom';
    var version = '1.0';
    var displayName = 'RCS Prom';
    var maxSize = 10240; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}


function createTables() {
    var tableCUSTOMER = "CREATE TABLE " + TABLE_CUSTOMER + " ( "+KEY_CUSTOMEREMAIL+" TEXT PRIMARY KEY, "+KEY_SAVE+" TEXT )";
    var tablePROMO="CREATE TABLE "+ TABLE_PROMO+" ( "+KEY_PROMOID +" TEXT , "+KEY_EMAIL+" TEXT)";
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tableCUSTOMER, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    }catch (e) {
        console.log("Error creando Tabla CUSTOMER " + e + ".");
        return;
    }
    
    try {
        localDB.transaction(function (transaction) {
            transaction.executeSql(tablePROMO, [], nullDataHandler, errorHandler);
            console.log("Tabla URL status: OK.");
        });
    }catch (e) {
        console.log("Error creando Tabla PROMO " + e + ".");
        return;
    }     
    }



function onInit() {
    try {
        if (!window.openDatabase) {
            console.log("No soporta BD");
        }
        else {
            initDB();
            createTables();
        }
    }catch (e) {
        if (e == 2) {
            console.log("Versión de base de datos invalida");
        }
        else {
            console.log("Error de desconexión: " + e + ".");
        }
        return;
    }
}



errorHandler = function (transaction, error) {//THIS VARIABLE IS FOR OUR TRANSACTION.EXECUTESQL IN OUR METHOD CREATETABLE
    console.log("Error: " + error.message);
    return true;
};


nullDataHandler = function (transaction, results) {//THIS VARIABLE IS FOR OUR TRANSACTION.EXECUTESQL IN OUR METHOD CREATETABLE
    console.log("Error: " + results.message);
    return true;
};


error_callback = function(tx){ alert("Error en la transacción"); };
success_callback = function(tx){ alert("Transacción correcta"); };


function checkNetConnection() {
    var status = navigator.onLine;
    if (status) {
        return true;
    } else {
        return false;
    }
}

function deletedTableCustomer(){
    try {
        var queryDelete = "DELETE FROM  " + TABLE_CUSTOMER;
        localDB.transaction(function (tx) {
          tx.executeSql(queryDelete, [], function (tx, results) {}, errorHandler);
        });
    } catch (e) {
        console.log("Error closeSession " + e + ".");
    }

}

function buttonExitApp() {
    navigator.app.exitApp();
}

function insertTablePromo(idpromo,email){
    try {
        var query1="INSERT INTO PROMO(promoId,emailId) VALUES('"+idpromo+"','"+email+"')";
        localDB.transaction(function (tx){
          tx.executeSql(query1, [], function (tx, results){
          });
        });
      } catch (e) {
        console.log("Error closeSession " + e + ".");
    }

}
