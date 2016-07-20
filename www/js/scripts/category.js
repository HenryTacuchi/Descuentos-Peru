$(document).ready(function () {
    document.addEventListener("deviceready", onDeviceReady, false);  


    function onDeviceReady() {
        document.addEventListener("backbutton", onBackKeyDown, false);  
    }

    function onBackKeyDown() { 
         navigator.app.exitApp();
    }
});

$(window).load(function () {
  onInit();
  writeEmail();
  $('.btnLogout').click(function () {
    closeSession();
  });

});

function closeSession(){  
  try {
    var queryDelete1 = "DELETE FROM  " + TABLE_CUSTOMER;
    localDB.transaction(function (tx) {
      tx.executeSql(queryDelete1, [], function (tx, results) {
        var queryDelete2 = "DELETE FROM  " + TABLE_PROMO;
        localDB.transaction(function (tx) {
          tx.executeSql(queryDelete2, [], function (tx, results) {
            localStorage.DescuentosPeruLastCategoryVisited="";
            window.location.href= "../index.html";
          }, errorHandler);
        });
      }, errorHandler);
    });
  } catch (e) {
    console.log("Error closeSession " + e + ".");
  }
}


function writeEmail(){
  try {
    $('.emailUser').text(localStorage.DescuentosPeruEmail); 
  } catch (e) {
    console.log("Error writeEmail " + e + ".");
  }
}