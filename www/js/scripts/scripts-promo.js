$(document).ready(function(){
  //localStorage.clear();
  onInit();
  LoadCategries();
  loadIconsCategories();
  setSocialsPosition();
  CategoryVisitedDefault();
  //Inicializa el objeto Swiper con sus parametros.
  var swiper;
  //usuario nuevo
  if(localStorage.existUser=="0"){
    swiper = new Swiper('.swiper-container', {
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 0,
      initialSlide: 0
    }); 
    $(".menuButton").addClass("menu-on");
    //welcome message
    setTimeout(function() { $('.modalWelcomeMessage').modal('show'); }, 2000);
  }else{
    //usuario registrado 
    if(localStorage.DescuentosPeruLastCategoryVisited==""){
      swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: 0
      }); 
      $(".menuButton").addClass("menu-on");
    }else{
      swiper = new Swiper('.swiper-container', {
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: 1
      });
      LoadParticularCategory(localStorage.DescuentosPeruLastCategoryVisited,swiper);
      $(".menuButton").removeClass("menu-on");    
    }
  }

setFavoritePosition(swiper);
configSlides(swiper);

  // Llamados al momento de hacer swipe
  swiper.on('slideChangeStart', function () {
    configSlides(swiper);
    setFavoritePosition(swiper);
  });

  $('.scrollPromo').scroll(function() {
    fade();
  }); //Fade in elements during scroll

//click en cada categoria
  $(document.body).on('click', '.categories li' ,function(){ 
    var qty= $(this).children('div .categoryQty').text();
    var name=$(this).children('div .categoryName').text();
    if(qty>0){
      //guarda categorias y cantidades
      localStorage.DescuentosPeruLastCategoryVisited= $(this).children('div .categoryName').text();
      localStorage.cantPromo=$(this).children('div .categoryQty').text();
      $('.categoryNameButton').addClass('hide');
      $('.categoryNameButton').removeClass('bounceIn');
      $(".menuButton").removeClass("menu-on");
      $('.categories li').removeClass("active");
      $(this).addClass("active");
      swiper.unlockSwipeToNext();
      swiper.slideNext();     
      $('.categoryNameButton').text($(this).children('div .categoryName').text()+"("+
        $(this).children('div .categoryQty').text()+")");  
      localStorage.categoryId= $(this).find('#CategoryId').val();
      //SaveCategoryUser();

      //we fill the category information except for the favorites category because we will consider that category
      //in the swipe section. 
      if(!(name=="Favorites" || name=="Favoritos")) GetCategoryInfo($(this).find('#CategoryId').val());      
    }
    else return false;
  });


//click en cada promotions take in Promoid unicos
$(document.body).on('click', '.promotions li' ,function(){
  $('.categoryNameButton').addClass("hide");
  $('.categoryNameButton').removeClass('bounceIn');
  swiper.unlockSwipeToNext();
  swiper.slideNext();
  var promoid= $(this).find('#PromoId').val();
  var query1="SELECT * FROM PROMO WHERE promoId='"+promoid+"' AND emailId='"+localStorage.DescuentosPeruEmail+"'";
  localDB.transaction(function (tx){
    tx.executeSql(query1, [], function (tx, results){
      var chkfavorite =results.rows.length;
      if(chkfavorite>0){
        $('.heartIcon').addClass('redheart');
      }else{
        $('.heartIcon').removeClass('redheart animated flip');
      }
    });
  });
  localStorage.promoId= $(this).find('#PromoId').val();
  LoadSlideNext(this);
      //SavePromoUser();
    });


// click favorites   
$(document.body).on('click', '.chkfavorite' ,function(){ 
  var idpromo=localStorage.promoId;
  var email=localStorage.DescuentosPeruEmail;

  if(!($('.heartIcon').hasClass('redheart'))){
    var query1="INSERT INTO PROMO(promoId,emailId) VALUES('"+idpromo+"','"+email+"')";
    localDB.transaction(function (tx){
      tx.executeSql(query1, [], function (tx, results){
        $('.heartIcon').addClass('redheart animated flip');
        $('.heartIcon').sparkleh();
      });
    });      
  }else{
    var query2="DELETE FROM PROMO WHERE promoId='"+idpromo+"' AND  emailId='"+email+"'";
    localDB.transaction(function (tx){
      tx.executeSql(query2, [], function (tx, results){
        $('.heartIcon').removeClass('redheart animated flip');
      });     
    });
  }
});


$('.btnRestriction').click(function(){
  $('.card').addClass('flipped');
});
$('.areaRestriction').click(function(){
  $('.card').removeClass('flipped');
});


$('.pagination').width($('.swiper-slide').width());


$('.modalStoresLocations').on('show.bs.modal', function() {
  $(this).show();
  setModalMaxHeight(this);
});

$(".menuButton").on("click",function(){

  if($(this).hasClass('menu-on')){
    //not categories
    $(this).removeClass("menu-on");

    swiper.unlockSwipeToNext();
    swiper.slideNext();
    GetCategoryInfo($('.categories li').first().childNodes.item(3).value);   
  }else{

    if(swiper.activeIndex == 3){
      swiper.unlockSwipeToPrev();
      swiper.slideTo(2);
    }else{
      //categories
      $(this).addClass("menu-on");
      swiper.slideTo(0);
    }
    
  }    


});





  //Load store for promotion
  $(document.body).on('click', '.btnStores' ,function(){ 
    $('.StoreLocationList li').remove();
    var array={PromoIds:localStorage.promoId}

    $.ajax({
      type: "POST",
      url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/GetStore/Post",
      data: JSON.stringify(array),
      contentType: 'application/json; charset=utf-8',
      async: true,
      dataType: "json",
      crossdomain: true,
      beforeSend: function () {
        showLoading(); 
      },
      complete: function () {
        hideLoading();
      },
      success:function(result){  
        if (result.Quantity!=null){                          
          $.each(result.Data, function( index, value ){
           var template= _.template($('#locationsTemplate').html());
           var html= template ({
            storeName: value.CompanyName,
            storeAddress: value.Address,
            storePhone: value.phone1
          });
           $('.StoreLocationList').append(html);
         } );  
        }

        $('.modalStoresLocations').modal('show');

      },                
      error: function(error) {
        console.log('Error');
      }                 
    });  

  });



  // show new swiper for map
  $(document.body).on('click', '.StoreLocationList li' ,function(){ 
    $('.modalStoresLocations').modal('hide');

    swiper.unlockSwipeToNext();
    swiper.slideTo(3);
    swiper.lockSwipeToPrev();

  });


});





function LoadParticularCategory(name,swiper){
  if(name=="Favorites" || name=="Favoritos"){
    GetCategoryInfo("6");
  }else{
    category= "#"+name;
    var qty= $(category).children('div .categoryQty').text();

    if(qty>0){
      localStorage.DescuentosPeruLastCategoryVisited= $(category).children('div .categoryName').text();
      $('.categoryNameButton').addClass('hide');
      $('.categoryNameButton').removeClass('bounceIn');
      $('.categories li').removeClass("active");
      $(category).addClass("active");
      //swiper.unlockSwipeToNext();
      //swiper.slideNext();
      GetCategoryInfo($(category).find('#CategoryId').val());
    }
    else return false;
  }
}


 //Fade in elements during scroll
 function configSlides(swiper){
  //Configuracion de los Slides al inicio
  if(swiper.activeIndex == 1){
    if(localStorage.DescuentosPeruLastCategoryVisited=="Favorites" || localStorage.DescuentosPeruLastCategoryVisited=="Favoritos"){
     var query1="SELECT count(*) AS cant FROM PROMO WHERE emailID='"+localStorage.DescuentosPeruEmail+"'";
     var cant=0;
     localDB.transaction(function (tx) {
      tx.executeSql(query1, [], function (tx, results) {
        cant=results.rows.item(0).cant;
        localStorage.cantPromo=cant;
        $('.categoryNameButton').text(localStorage.DescuentosPeruLastCategoryVisited+"("+
          localStorage.cantPromo
          +")");
        if(cant==0){
          swiper.slideTo(0);
        }else{
          GetCategoryInfo("6");
        }
      });
    });
   }
    //GetCategoryInfo("6");
    $('.scrollPromo').scrollTop(0);
    $('.descriptionPromo').scrollTop(0);
    $('.cardContainer').removeClass('flipped');
    //Bloqueamos el detalle    
    swiper.lockSwipeToNext();
    //Habilitamos para que se dirija a Categoria
    swiper.unlockSwipeToPrev();
    $('.categoryNameButton').text(localStorage.DescuentosPeruLastCategoryVisited+"("+
      localStorage.cantPromo
      +")");
    //$('.categoryNameButton').text("Descuentos");
    $('.categoryNameButton').removeClass("hide");
    setTimeout(function(){ 
      $('.categoryNameButton').addClass('animated bounceIn');
    }, 50);
    fade();
    $(".menuButton").removeClass("menu-on");
    //

  }else if(swiper.activeIndex == 0){
    countFavorite();
    
    $(".menuButton").addClass("menu-on");

    swiper.lockSwipeToPrev(); //disable swipe to left
    swiper.lockSwipeToNext(); //disable swipe to right
    paginationName(swiper.activeIndex);
  }else{
    $('.descriptionDetail').scrollTop(0);    

    $('.categoryNameButton').removeClass("hide");

    $(".menuButton").removeClass("menu-on");

    setTimeout(function(){ 
      $('.categoryNameButton').addClass('animated bounceIn');
    }, 50);

    swiper.lockSwipeToNext();
    paginationName(swiper.activeIndex);
  }
}


//Update Promos by CategoryId
function GetCategoryInfo(CategoryId){
  try {
    var array="";
    $('.promotions').empty();

    if(CategoryId=='6'){
      var query1="SELECT promoId FROM PROMO WHERE emailID='"+localStorage.DescuentosPeruEmail+"'";
      var promoIds="";
      localDB.transaction(function (tx) {
        tx.executeSql(query1, [], function (tx, results) {
          for( i=0;i<results.rows.length;i++){
            if(i==results.rows.length-1){
              promoIds=promoIds+results.rows.item(i).promoId;
            }else{
              promoIds=promoIds+results.rows.item(i).promoId+",";
            }
          }

          array={PromoIds:promoIds};

          var query2="DELETE FROM "+TABLE_PROMO+ " WHERE "+KEY_EMAIL+"='"+localStorage.DescuentosPeruEmail+"'";
          localDB.transaction(function (tx) {
            tx.executeSql(query2, [], function (tx, results) {
              $.ajax({
              type: 'POST',
              url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/Favorites/Post",
              data: JSON.stringify(array),
              contentType: 'application/json; charset=utf-8',
              async: true,
              dataType: "json",
              crossdomain: true,
              beforeSend: function () {
                showLoading();
              },
              complete: function () {
                hideLoading();
              },
              success:function(result){

                if (result.Quantity!=null){

                  var count = 1;   

                  $.each(result.Data, function( index, value ){
                    $('.promotions').append("<li class='delay-"+count+"'>"+
                      '<div class="discountPromo"><div class="discountPercent">'+value.DicountPercent+'%</div></div>'+
                      '<img src="'+value.ImagePath+'" title="Promotion" class="imgPromo">'+
                      '<div class="areaDescription">'+
                      '<div class="titlePromo">'+value.CompanyName+'</div>'+
                      '<div class="descriptionPromo">'+value.ShortDescriptions+'</div>'+
                      '</div>'+
                      '<input type="hidden" id="descriptionPromo" value="'+value.Description+'"></input>'+
                      '<input type="hidden" id="CategoryId" value="'+value.CategoryId+'"></input>'+
                      '<input type="hidden" id="PromoId" value="'+value.PromoId+'"></input>'+
                      '<input type="hidden" id="restrictionDetail" value="'+value.Restrinctions+'"></input>'+
                      '<input type="hidden" id="ImagePathLogo" value="'+value.ImagePathLogo+'"></input>'+
                      '</li>'
                      );
                    insertTablePromo(value.PromoId,localStorage.DescuentosPeruEmail);
                    count = count + 1;
                  });
                }
                heightPromotions();
                loadIconDiscount();  
                }
              });



            })
          })


        });
      });
    }else{
      array={PromoIds:CategoryId};
      $.ajax({
        type: 'POST',
        url: "http://192.168.1.157/DescuentosPeru/WCFDescuentosPeru.svc/PromotionsByCategory/Post",
        data: JSON.stringify(array),
        contentType: 'application/json; charset=utf-8',
        async: true,
        dataType: "json",
        crossdomain: true,
        beforeSend: function () {
          showLoading();
        },
        complete: function () {
          hideLoading();
        },
        success:function(result){

          if (result.Quantity!=null){
            var count = 1;   
            $.each(result.Data, function( index, value ){
              $('.promotions').append("<li class='delay-"+count+"'>"+
                '<div class="discountPromo"><div class="discountPercent">'+value.DicountPercent+'%</div></div>'+
                '<img src="'+value.ImagePath+'" title="Promotion" class="imgPromo">'+
                '<div class="areaDescription">'+
                '<div class="titlePromo">'+value.CompanyName+'</div>'+
                '<div class="descriptionPromo">'+value.ShortDescriptions+'</div>'+
                '</div>'+
                '<input type="hidden" id="descriptionPromo" value="'+value.Description+'"></input>'+
                '<input type="hidden" id="CategoryId" value="'+value.CategoryId+'"></input>'+
                '<input type="hidden" id="PromoId" value="'+value.PromoId+'"></input>'+
                '<input type="hidden" id="restrictionDetail" value="'+value.Restrinctions+'"></input>'+
                '<input type="hidden" id="ImagePathLogo" value="'+value.ImagePathLogo+'"></input>'+
                '</li>'
                );
              count = count + 1;
            }); 

            heightPromotions();
            loadIconDiscount();
          }
          fade();
        },                
        error: function(xhr, ajaxOptions, thrownError) {
          console.log('error GetCategoryInfo: '+ xhr.status+" "+xhr.ajaxOptions +" "+xhr.thrownError);  
        }
      });
    }   
  }catch (e) {
    console.log("Error validationEmail " + e + ".");
  }
}


//Load Next Slides
function LoadSlideNext(li){
  $(".logoBrand").attr("src",$(li).find('#ImagePathLogo').val());
  $(".imgDetail").attr("src",$(li).find('.imgPromo').attr('src'));
  $(".descriptionDetail").text($(li).find('#descriptionPromo').val());
  $(".titleDetail").text($(li).find('.titlePromo').text());
  $(".discountPercentDetail").text($(li).find('.discountPercent').text());
  $(".restrictionDetail").text($(li).find('#restrictionDetail').val());
  loadIconDiscountDetail();
}


function SavePromoUser(){  
  var promoId= localStorage.promoId.toString();
  var email= localStorage.DescuentosPeruEmail.toString();
  //{"postPromo":{"Email":"fernandmorausky@gmail.com","PromoId":"0"}}
  $.ajax({
    type: "GET",
    url: "http://192.168.1.157/ServicePromotions/Service.svc/PostSelectedPromo/"+email+"/"+promoId,
    async: false,
    contentType: "json",
    crossdomain: true,
    success:function(result){ 
    },
    error:function(error) {
    }
  });
}


function SaveCategoryUser(){
  var categoryId= localStorage.categoryId.toString();
  var email= localStorage.DescuentosPeruEmail.toString();
  if(!(localStorage.DescuentosPeruLastCategoryVisited=="Favorites" || localStorage.DescuentosPeruLastCategoryVisited=="Favoritos")){
    $.ajax({
      type: "GET",
      url: "http://192.168.1.157/ServicePromotions/Service.svc/PostSelectedCategory/"+ email+"/"+categoryId,
      async: false,
      contentType: "json",
      crossdomain: true,
      success:function(result){                     
      },
      error:function(error) {
      }
    });
  }
}






function countFavorite(){
   var query1="SELECT count(*) AS cant FROM PROMO WHERE emailID='"+localStorage.DescuentosPeruEmail+"'";
   var cant="";
   localDB.transaction(function (tx) {
    tx.executeSql(query1, [], function (tx, results) {
      cant=results.rows.item(0).cant;
      $('.categoryQty.favorites').text(cant);
    });
  });
}


function LoadCategries(){
  var result=JSON.parse(localStorage.Categories);
  $('.categories').append('<li id= "favorites">'+
   '<div class="categoryIcon favorites"><img src="../img/favorites.svg"></div>'+
   '<div class="categoryName">Favorites</div>'+
   '<div class="categoryQty favorites">0</div>'+
   '<input id="CategoryId" type="hidden" value="6"></input>'+
   '</li>'+
   '<li id= "featured">'+
   '<div class="categoryIcon featured"><img src="../img/featured.svg"></div>'+
   '<div class="categoryName">Featured</div>'+
   '<div class="categoryQty favorites">0</div>'+
   '<input id="FeaturedId" type="hidden" value=""></input>'+
   '</li>');
  $.each(result, function( index, value ) {
    $('.categories').append('<li id= "'+ value.CategoryName+'">'+
      '<div class="categoryIcon '+value.CategoryName.toLowerCase().replace(/ /g,'')+'"></div>'+
      '<div class="categoryName">' + value.CategoryName +'</div>'+
      '<div class="categoryQty">'+value.CategoryQty+'</div>'+
      '<input id="CategoryId"type="hidden" value="'+ value.CategoryId +'"></input>'+
      '</li>');
  });
  resizeCategories();
  heightPromotions();
  loadIconDiscount();
  countFavorite();
  //captionCategories();
}

function CategoryVisitedDefault(){
  if(null==localStorage.DescuentosPeruLastCategoryVisited){
    localStorage.DescuentosPeruLastCategoryVisited="";
  }
}