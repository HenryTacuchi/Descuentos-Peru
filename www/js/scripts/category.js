$(window).load(function () {
  onInit();
  writeEmail();
  $('.btnLogout').click(function () {
    closeSession();
  });

});

function closeSession(){  
  try {
    var queryDelete = "UPDATE " + TABLE_CUSTOMER+" SET save='0' WHERE customerEmail='"+localStorage.email+"'";
    localDB.transaction(function (tx) {
      tx.executeSql(queryDelete, [], function (tx, results) {
        localStorage.lastCategoryVisited="";
        window.location = "../index.html";
      }, errorHandler);
    });
  } catch (e) {
    console.log("Error closeSession " + e + ".");
  }
}

function writeEmail(){
  try {
        $('.emailUser').text(localStorage.email); 
  } catch (e) {
    console.log("Error writeEmail " + e + ".");
  }
}