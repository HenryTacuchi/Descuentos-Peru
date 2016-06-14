$(document).ready(function(){
  //localStorage.clear();
  onInit();
  LoadCategries();
  loadIconsCategories();
  setSocialsPosition();
  //Inicializa el objeto Swiper con sus parametros.
  var swiper;
  //usuario nuevo
  if(localStorage.existUser==0){
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
    if(localStorage.lastCategoryVisited==""){
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
      LoadParticularCategory(localStorage.lastCategoryVisited,swiper);
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

  $(document.body).on('click', '.categories li' ,function(){ 
    var qty= $(this).children('div .categoryQty').text();
    var name=$(this).children('div .categoryName').text();
    if(qty>0){
      //guarda categorias y cantidades
      localStorage.lastCategoryVisited= $(this).children('div .categoryName').text();
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
      if(!(name=="Favorites" || name=="Favoritos"))   GetCategoryInfo($(this).find('#CategoryId').val());      
    }
    else return false;
  });






$(document.body).on('click', '.promotions li' ,function(){
  $('.categoryNameButton').addClass("hide");
  $('.categoryNameButton').removeClass('bounceIn');
  swiper.unlockSwipeToNext();
  swiper.slideNext();
  localStorage.promoId= $(this).find('#PromoId').val();
  var query1="SELECT count(*) as cant FROM PROMO WHERE promoId='"+localStorage.promoId+"' AND emailId='"+localStorage.email+"'";
  localDB.transaction(function (tx){
    tx.executeSql(query1, [], function (tx, results){
      var chkfavorite =results.rows.item(0).cant;
      if(chkfavorite==1){
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
  var email=localStorage.email;

  if(!($('.heartIcon').hasClass('redheart'))){
    var query1="INSERT INTO PROMO(promoId,emailId) VALUES('"+idpromo+"','"+email+"')";
    localDB.transaction(function (tx){
      tx.executeSql(query1, [], function (tx, results){
        $('.heartIcon').addClass('redheart animated flip');
        $('.heartIcon').sparkleh();
      });
    });      
  }
  else{
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
    $(this).removeClass("menu-on");

    swiper.unlockSwipeToNext();
    swiper.slideNext();
    GetCategoryInfo($('.categories li').first().childNodes.item(3).value);   
  }else{
    $(this).addClass("menu-on");
    swiper.slideTo(0);

  }    
});





//Load store per promotion
$(document.body).on('click', '.btnStores' ,function(){ 
  $('.StoreLocationList li').remove();
  $.ajax({
    type: "GET",
    url: "http://192.168.1.157/ServicePromotions/Service.svc/GetCompanies/"+localStorage.promoId,
    async: false,
    dataType: "json",
    crossdomain: true,
    beforeSend: function () {
      showLoading(); 
    },
    complete: function () {
      hideLoading();
    },
    success:function(result){            
      var data= result.GetCompaniesResult;
      if (data!=null){                          
        $.each(data, function( index, value ){
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
      alert('Error');
    }                 
  });  

});


$('.imgUser').append(
    // "<svg version='1.1' id='iconUser' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'  viewBox='39 -39.6 108.6 108.6' style='enable-background:new 39 -39.6 108.6 108.6;' xml:space='preserve'><path fill='black' stroke='black' d='M96.5,62c11.6-1.9,30-12.2,39-12.2l-3.1-13.5c-1-1-2.1-1.8-3.4-2.5c-6.6-3.4-13.4-6.2-20.2-8.8c-0.5-0.2-1.1-0.6-1.3-1  c-0.6-1.2-0.9-2.6-1.4-3.8c-0.2-0.8-0.5-1.6-1.4-2c-0.2-0.1-0.5-0.6-0.5-0.9c0.1-3-0.6-6.2,1.6-8.8c0.1-0.1,0.1-0.2,0.1-0.3  c1.2-2.6,1.4-5.7,3.1-8.1c0-0.1,0.1-0.1,0.1-0.2c0.2-1.9,0.4-3.7,0.6-5.6c0-0.2-0.2-0.6-0.4-0.7c-0.9-0.3-0.9-1.1-0.9-1.8  c0-3.7,0-4.2,0-7.9c0-2.1-0.6-4-2.2-5.5c-1.8-1.6-3.7-3.2-5.6-4.8c-0.9-0.8-1-1.4-0.1-2.2c0.4-0.4,0.9-0.6,1.3-1  c-0.1-0.1-0.2-0.3-0.3-0.4c-0.6,0-1.1-0.1-1.7,0c-2.1,0.3-4.2,0.6-6.2,1.1c-3.9,0.9-7.7,2.1-10.9,4.8c-2.2,1.8-3.9,3.9-4.1,6.8  c-0.1,1.5-0.1,3.1-0.1,4.6c0,2.5,0,1.9,0,4.4c0,0.4-0.2,1.1-0.5,1.2c-1,0.3-1,1-0.9,1.8c0.1,0.6,0,1.2,0.2,1.8  c0.3,1.6,0.7,3.1,1.2,4.7c0.3,1.2,1,2.2,1.2,3.4c0.4,2.3,1.2,4.4,2.8,6.2c0.3,0.3,0.5,0.8,0.4,1.2c-0.1,1.8-0.3,3.6-0.6,5.4  c-0.1,0.3-0.4,0.9-0.7,0.9c-1.2,0.2-1.4,1.2-1.7,2.1c-0.4,1.2-0.8,2.5-1.3,3.7c-0.1,0.4-0.5,0.8-0.9,0.9c-2.1,0.9-4.3,1.8-6.4,2.7  c-2.3,1-4.6,1.9-6.8,2.9c-2.3,1.1-4.5,2.3-6.8,3.5c-1.3,0.7-2.6,1.5-3.6,2.5l-3.1,13.3c15.3,0,23.2,11,39.1,12.4L96.5,62z'/></svg>"
    "<img src='../img/iconUser.svg'>"
    );

$('.logoutUser').append(
  "<svg version='1.1' id='logoutIcon' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-982 982.4 870.3 870.3' style='enable-background:new -982 982.4 870.3 870.3;' xml:space='preserve'> <g fill='white' stroke='white'> <path stroke-width='0' d='M-421,1271.3c27.9,11.8,53.7,27.3,77.1,46.2v-133.6c0-111.1-90.4-201.5-201.5-201.5h-3.1c-111,0-201.4,90.4-201.4,201.5 v133.6c23.4-18.9,49.2-34.4,77.1-46.2c7.5-3.2,15.2-6.1,22.9-8.7v-78.7c0-56,45.5-101.5,101.5-101.5h3.1 c56,0,101.5,45.5,101.5,101.5v78.8C-436.2,1265.2-428.5,1268.1-421,1271.3z'/> <path stroke-width='0' d='M-830.3,1569.3c0,156.5,126.9,283.4,283.4,283.4s283.4-126.8,283.4-283.4c0-76.9-30.7-146.7-80.4-197.8 c-28-28.7-62-51.5-100-66.4c-31.9-12.5-66.7-19.3-103-19.3c-36.3,0-71.1,6.8-103,19.3c-38,14.8-72,37.6-100,66.4 C-799.7,1422.6-830.3,1492.4-830.3,1569.3z M-619.9,1512.1c1-38.7,32.5-70.2,71.2-71.1c41.1-1,74.8,32.1,74.8,73 c0,4.3-0.4,8.5-1.1,12.5c-3.6,20.7-15.9,38.5-33.1,49.3c-7.1,4.5-10.7,12.9-8.9,21l21.7,102.9c1.3,6.2-3.4,12.1-9.8,12.1h-83.6 c-6.4,0-11.1-5.8-9.8-12.1l21.7-102.9c1.7-8.2-1.8-16.6-8.9-21.1c-17.2-10.8-29.5-28.5-33.1-49.3 C-619.6,1521.8-620,1517-619.9,1512.1z'/> </g> </svg> "
  );
});





function LoadParticularCategory(name,swiper){
  if(name=="Favorites" || name=="Favoritos"){
    GetCategoryInfo("6");
  }else{
    category= "#"+name;
    var qty= $(category).children('div .categoryQty').text();

    if(qty>0){
      localStorage.lastCategoryVisited= $(category).children('div .categoryName').text();
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
    if(localStorage.lastCategoryVisited=="Favorites" || localStorage.lastCategoryVisited=="Favoritos"){
     var query1="SELECT count(*) AS cant FROM PROMO WHERE emailID='"+localStorage.email+"'";
     var cant=0;
     localDB.transaction(function (tx) {
      tx.executeSql(query1, [], function (tx, results) {
        cant=results.rows.item(0).cant;
        localStorage.cantPromo=cant;
        $('.categoryNameButton').text(localStorage.lastCategoryVisited+"("+
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
    $('.categoryNameButton').text(localStorage.lastCategoryVisited+"("+
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
    $('.promotions').empty();  
    if(CategoryId=='6'){

      var query1="SELECT promoId FROM PROMO WHERE emailID='"+localStorage.email+"'";
      var promoIds="";
      localDB.transaction(function (tx) {
        tx.executeSql(query1, [], function (tx, results) {

          for( i=0;i<results.rows.length;i++){
            promoIds=promoIds+results.rows.item(i).promoId+",";
          }

          $.ajax({
            type: 'GET',
            url: "http://192.168.1.157/ServicePromotions/Service.svc/GetFavorites/"+promoIds,
            async: false,
            dataType: "json",
            crossdomain: true,
            beforeSend: function () {
              showLoading();
            },
            complete: function () {
              hideLoading();
            },
            success:function(result){

              var data=result.GetFavoritesResult;

              if (data!=null){

                var count = 1;   

                $.each(data.Promotions, function( index, value ){
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
                  }
                  heightPromotions();
                  loadIconDiscount();  
                }
});
});
});
}else{

  $.ajax({
    type: 'GET',
    url: "http://192.168.1.157/ServicePromotions/Service.svc/GetPromotions/"+CategoryId,
    async: false,
    dataType: "json",
    crossdomain: true,
    beforeSend: function () {
      showLoading();
    },
    complete: function () {
      hideLoading();
    },
    success:function(result){

      var data= result.GetPromotionsResult;

      if (data!=null){

        var count = 1;   

        $.each(data.Promotions, function( index, value ){
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
  alert('error GetCategoryInfo: '+ xhr.status+" "+xhr.ajaxOptions +" "+xhr.thrownError);  
}
});
}   
}catch (e) {
  alert("Error validationEmail " + e + ".");
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
  var email= localStorage.email.toString();
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
  var email= localStorage.email.toString();
  if(!(localStorage.lastCategoryVisited=="Favorites" || localStorage.lastCategoryVisited=="Favoritos")){
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
 var query1="SELECT count(*) AS cant FROM PROMO WHERE emailID='"+localStorage.email+"'";
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