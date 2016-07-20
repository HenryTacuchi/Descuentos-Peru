// In this jquery, you can find animations, append sections for this app.
$(document).ready(function(){

  document.addEventListener("deviceready", onDeviceReady, false);  
  function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false); 
  }
  function onBackKeyDown() { 
  }




	// detect device type
	var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());

	if (isiPad)
	{
	  // add your code for Ipad Devices
	}
	var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
	if (isAndroid)
	{
	  // add your code for Android Devices
	}
  //---end detect device type


  // iconos Descuentos
  $('.imgUser').append(
    "<svg version='1.1' id='iconUser' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'  viewBox='39 -39.6 108.6 108.6' style='enable-background:new 39 -39.6 108.6 108.6;' xml:space='preserve'><path fill='white' stroke='white' d='M96.5,62c11.6-1.9,30-12.2,39-12.2l-3.1-13.5c-1-1-2.1-1.8-3.4-2.5c-6.6-3.4-13.4-6.2-20.2-8.8c-0.5-0.2-1.1-0.6-1.3-1  c-0.6-1.2-0.9-2.6-1.4-3.8c-0.2-0.8-0.5-1.6-1.4-2c-0.2-0.1-0.5-0.6-0.5-0.9c0.1-3-0.6-6.2,1.6-8.8c0.1-0.1,0.1-0.2,0.1-0.3  c1.2-2.6,1.4-5.7,3.1-8.1c0-0.1,0.1-0.1,0.1-0.2c0.2-1.9,0.4-3.7,0.6-5.6c0-0.2-0.2-0.6-0.4-0.7c-0.9-0.3-0.9-1.1-0.9-1.8  c0-3.7,0-4.2,0-7.9c0-2.1-0.6-4-2.2-5.5c-1.8-1.6-3.7-3.2-5.6-4.8c-0.9-0.8-1-1.4-0.1-2.2c0.4-0.4,0.9-0.6,1.3-1  c-0.1-0.1-0.2-0.3-0.3-0.4c-0.6,0-1.1-0.1-1.7,0c-2.1,0.3-4.2,0.6-6.2,1.1c-3.9,0.9-7.7,2.1-10.9,4.8c-2.2,1.8-3.9,3.9-4.1,6.8  c-0.1,1.5-0.1,3.1-0.1,4.6c0,2.5,0,1.9,0,4.4c0,0.4-0.2,1.1-0.5,1.2c-1,0.3-1,1-0.9,1.8c0.1,0.6,0,1.2,0.2,1.8  c0.3,1.6,0.7,3.1,1.2,4.7c0.3,1.2,1,2.2,1.2,3.4c0.4,2.3,1.2,4.4,2.8,6.2c0.3,0.3,0.5,0.8,0.4,1.2c-0.1,1.8-0.3,3.6-0.6,5.4  c-0.1,0.3-0.4,0.9-0.7,0.9c-1.2,0.2-1.4,1.2-1.7,2.1c-0.4,1.2-0.8,2.5-1.3,3.7c-0.1,0.4-0.5,0.8-0.9,0.9c-2.1,0.9-4.3,1.8-6.4,2.7  c-2.3,1-4.6,1.9-6.8,2.9c-2.3,1.1-4.5,2.3-6.8,3.5c-1.3,0.7-2.6,1.5-3.6,2.5l-3.1,13.3c15.3,0,23.2,11,39.1,12.4L96.5,62z'/></svg>"
    // "<img src='../img/iconUser.svg'>"
  );

  $('.logoutUser').append(
    "<svg version='1.1' id='logoutIcon' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-982 982.4 870.3 870.3' style='enable-background:new -982 982.4 870.3 870.3;' xml:space='preserve'> <g fill='white' stroke='white'> <path stroke-width='0' d='M-421,1271.3c27.9,11.8,53.7,27.3,77.1,46.2v-133.6c0-111.1-90.4-201.5-201.5-201.5h-3.1c-111,0-201.4,90.4-201.4,201.5 v133.6c23.4-18.9,49.2-34.4,77.1-46.2c7.5-3.2,15.2-6.1,22.9-8.7v-78.7c0-56,45.5-101.5,101.5-101.5h3.1 c56,0,101.5,45.5,101.5,101.5v78.8C-436.2,1265.2-428.5,1268.1-421,1271.3z'/> <path stroke-width='0' d='M-830.3,1569.3c0,156.5,126.9,283.4,283.4,283.4s283.4-126.8,283.4-283.4c0-76.9-30.7-146.7-80.4-197.8 c-28-28.7-62-51.5-100-66.4c-31.9-12.5-66.7-19.3-103-19.3c-36.3,0-71.1,6.8-103,19.3c-38,14.8-72,37.6-100,66.4 C-799.7,1422.6-830.3,1492.4-830.3,1569.3z M-619.9,1512.1c1-38.7,32.5-70.2,71.2-71.1c41.1-1,74.8,32.1,74.8,73 c0,4.3-0.4,8.5-1.1,12.5c-3.6,20.7-15.9,38.5-33.1,49.3c-7.1,4.5-10.7,12.9-8.9,21l21.7,102.9c1.3,6.2-3.4,12.1-9.8,12.1h-83.6 c-6.4,0-11.1-5.8-9.8-12.1l21.7-102.9c1.7-8.2-1.8-16.6-8.9-21.1c-17.2-10.8-29.5-28.5-33.1-49.3 C-619.6,1521.8-620,1517-619.9,1512.1z'/> </g> </svg> "
  );


	// Add Size of email text
	$('.emailUser').width(
		$('.panelUser').width() - $('.imgUser').width() - $('.logoutUser').width()
   ).css(
   'max-width',$('.swiper-slide').width() - $('.imgUser').width() - $('.logoutUser').width()-20
   );
  //---end Add Size of email text


  // Event to close the Welcome Message
  $('.modalWelcomeMessage').click(function(){
    $(this).modal('hide');
  });
  $('.modalWelcomeMessage').on('hidden.bs.modal', function (e) {
    $('.areaFire').hide();
  })
  //---end Event

  // Event to add effects when the Welcome Message is open or hide
  $('.modalWelcomeMessage').on('show.bs.modal', function (e) {
    setTimeout(function () { showFireworks();}, 700);
  });
  $('.modalWelcomeMessage').on('hide.bs.modal', function (e) {
    $('.place').remove();
  });
  //---end Event 


  // Function to size the Icon Favorite in Swipe 2
  setDimensionFavorite();


  // Function to call Storm, this method animate the categories, locate in Swipe 0
  storm();


  //Implementation of the function Storm
  function storm()
  {
    var ry,tz,d;
    $('.categories li').each(function(){
     d = Math.random()*1000;
     $(this).delay(d).animate({opacity: 1}, {
      step: function(n){
					//rotating the images on the Y axis from 360deg to 0deg
					ry = (1-n)*360;
					//translating the images from 1000px to 0px
					tz = (1-n)*3000;
					//applying the transformation
					$(this).css("transform", "rotateY("+ry+"deg) translateZ("+tz+"px)");
				}, 
				duration: 1800, 
				//some easing fun. Comes from the jquery easing plugin.
				easing: 'easeOutQuint', 
			})
   })
  }	
  //--- end Function Storm

});
//---end Document ready event


//Event resize: only work when you resize the window of the browser
$(window).resize(function(){
	resizeCategories();
	heightPromotions();
  heightMap();
	setSocialsPosition();
	setDimensionFavorite();
	$('.pagination').width('100%');
});
//---end Event resize


//Implementation of the function to asign the size the Categories in Swipe 0
function resizeCategories(){
	var windowH = $(document).height();
	var paginationH = $('.pagination').height();
	var panelUserH = $('.panelUser').height();

  // Categories divide in 3 rows
  var categorySizes = (windowH - paginationH - panelUserH)/3;

  $('.categories').height(
    windowH-paginationH-panelUserH
    );

  $('.categories li').height(categorySizes);
}
//---end Implementation


//Implementation of the function to show or hide the Favorite Icon in Swipe 2
function setFavoritePosition(swiper){
	if(swiper.activeIndex == 2)
		$('.favorite-area').addClass('showFav');
	else
		$('.favorite-area').removeClass('showFav');	
}
//---end Implementation

//Implementation of the function to set the dimension of the Favorite Icon in Swipe 2
function setDimensionFavorite(){
	$('.favorite-area .checkbox_wrapper')
  .width(
    $('.pagination').height()
    ).height(
    $('.pagination').height()
    );	
  }
//---end Implementation


//Implementation of the function to set Icons in the Category List in Swipe 0
function loadIconsCategories(){
  $('.clothing').append(
    "<img src='../img/clothing.svg'>"
    );
  $('.shoes').append(
    "<img src='../img/shoes.svg'>"
    );
  $('.accesories').append(
    "<img src='../img/accesories.svg'>"
    );
  $('.home').append(
    "<img src='../img/home.svg'>"
    );
  $('.sports').append(
    "<img src='../img/sports.svg'>"
    );
  $('.others').append(
    "<img src='../img/others.svg'>"
    );
} 
//---end Implementation


//Implementation of the function to set Discount Icon in the Promotions List in Swipe 1
function loadIconDiscount(){
  $('.discountPromo').append(
    "<svg version='1.1' id='iconDiscount' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-1403 1404.2 27.5 27.5' style='enable-background:new -1403 1404.2 27.5 27.5;' xml:space='preserve'> <path d='M-1379,1410l-14.5,0.9c-0.5,0-1.3,0.4-1.6,0.8l-5.4,5.7c-0.4,0.4-0.4,1,0,1.4l5.4,5.7c0.4,0.4,1.1,0.7,1.6,0.8l14.5,0.9 c0.5,0,1-0.4,1-0.9l0-14.1C-1378,1410.3-1378.5,1409.9-1379,1410z M-1394,1417.9c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4 c0-0.8,0.6-1.4,1.4-1.4C-1394.6,1416.5-1394,1417.1-1394,1417.9z'/> </svg>"
    );
}
//---end Implementation


//Implementation of the function to set Discount Icon in the Detail Promotion in Swipe 2
function loadIconDiscountDetail(){
  $('.discountDetail ').append(
    "<svg version='1.1' id='iconDiscountDetail' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-1403 1404.2 27.5 27.5' style='enable-background:new -1403 1404.2 27.5 27.5;' xml:space='preserve'> <path d='M-1379,1410l-14.5,0.9c-0.5,0-1.3,0.4-1.6,0.8l-5.4,5.7c-0.4,0.4-0.4,1,0,1.4l5.4,5.7c0.4,0.4,1.1,0.7,1.6,0.8l14.5,0.9 c0.5,0,1-0.4,1-0.9l0-14.1C-1378,1410.3-1378.5,1409.9-1379,1410z M-1394,1417.9c0,0.8-0.6,1.4-1.4,1.4c-0.8,0-1.4-0.6-1.4-1.4 c0-0.8,0.6-1.4,1.4-1.4C-1394.6,1416.5-1394,1417.1-1394,1417.9z'/> </svg>"
    );
}
//---end Implementation


//Implementation of the function to set Promotion Size and Promotions List Size in Swipe 1
function heightPromotions(){
  var swiperH = $('.swiper-container').height();
  var paginationH = $('.pagination').height();

  //Get the size area of the promotions list
  var mapSize = swiperH - paginationH;

  $('.mapLocation').height(mapSize);
}
function heightMap(){
  var swiperH = $('.swiper-container').height();
  var paginationH = $('.pagination').height();

  //Get the size area of the promotions list
  var promotionsListSize = swiperH - paginationH;

  $('.scrollPromo').height(promotionsListSize);
}
//---end Implementation


//Implementation of the function to set Socials Position in Swipe 2
function setSocialsPosition(){
  var widthSocial= 0;
  var sizeWindow = $(window).width();
  var decre = 0;
  if(sizeWindow>768){
    decre = 67
  }else{
    if(sizeWindow>375){
      decre = 56
    }else{
      if(sizeWindow>320){
        decre = 47
      }else
      decre = 65
    }
  }
  $('.likely-big>div').each(function(){
    widthSocial = widthSocial + decre +2;
  });

  $('.likely-big').width(widthSocial);
}
//---end Implementation


//Implementation of the function to animate the Promotions when you Scroll in Swipe 1
function fade() {
  $('.promotions li').each(function() {
    /* Check the location of each desired element */
    var objectBottom = $(this).offset().top + $(this).outerHeight();
    var total = ($('.swiper-container').scrollTop() + $('.swiper-container').innerHeight());
    var windowBottom = total*1.2;
    
    /* If the object is completely visible in the window, fade it in */
    if (objectBottom < windowBottom) { //object comes into view (scrolling down)
      if ($(this).hasClass('fadeOut')) $(this).removeClass('fadeOut');
      $(this).addClass('animated fadeInDown');
      $(this).find('.discountPromo').addClass('slideUp');

    } else { //object goes out of view (scrolling up)
      if ($(this).hasClass('fadeInDown')) {
        $(this).removeClass('fadeInDown');
        $(this).addClass('animated fadeOut');
      }else{
        $(this).css('opacity',0);
      }
      $(this).find('.discountPromo').removeClass('slideUp');
    }
  });
}
//---end Implementation


//Implementation of the function to set center the position of any Modal window in the app
function setModalMaxHeight(element) {
  this.$element     = $(element);  
  this.$content     = this.$element.find('.modal-content');
  var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
  var dialogMargin  = $(window).width() < 768 ? 20 : 60;
  var contentHeight = $(window).height() - (dialogMargin + borderWidth);
  var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
  var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
  var maxHeight     = contentHeight - (headerHeight + footerHeight);

  this.$content.css({
    'overflow': 'hidden'
  });
  
  this.$element
  .find('.modal-body').css({
    'max-height': maxHeight,
    'overflow-y': 'auto'
  });
}
//---end Implementation


//Implementations to show or hide the loader in the app
function showLoading(){
  $('.loader').addClass("showLoader");
}
function hideLoading(){
  $('.loader').removeClass("showLoader");  
}
//---end Implementation

function showFireworks(){

  var colors = ['white','white','yellow','yellow'];

  $('.areaFire').height($('.welcomeContent .modal-header').height());

  var time = 500;

  $('.boom').each(function(index){
      var $b = $(this);
      var ne = 0;
      if(index%2 == 0) ne = 1
      else ne = -1;
      var ta, i, 
      cnt = Math.floor(Math.random()*20)+70, 
      x = 0, y = 0, z = 0, 
      incZ = 360 / cnt * 20,
      incY = Math.floor(360 / cnt * 10), 
      clr = colors[index],  
      posX = ($(window).width()/2)*ne +(Math.floor(Math.random() * 100) + 10) +'px', 
      posY = Math.floor(Math.random() * 50)+10+'px',  
      size = 50 * Math.floor((cnt / 50 + 1));

      $b.css({ top: posY, left: posX });

      for (i=0;i<cnt;i++){

        z += Math.floor(incZ + Math.random() * 10 - 20);

        if ( z > 360 ){

         y += incY;
         z = Math.floor(Math.random() * 5 - 10);

         if ( y > 360 )

          y = 0;
        
        }

        x = Math.floor(Math.random() * 20 );

        $('<div class="place"><div class="spark '+clr+'"></div></div>')
        .appendTo($b)
        .css('transform', 'translateX('+x+'px) rotateY('+y+'deg) rotateZ('+z+'deg)')
        .find('.spark')
        .css('transform', 'rotateY(-'+y+'deg)');
      }

      // Enable Debugging
      $.keyframe.debug = false;

      // Get the css browser code (ie: -moz-)
      var pfx = $.keyframe.getVendorPrefix();

      //Note the variable notation to be able to add vendor specific prefix
      var transform = pfx + 'transform';

      var topi = -size/1.5;
      var lefi = -size/(2 + Math.random() - 0.5);

      // Adding a new animation sequences (keyframe)

      $.keyframe.define([{
        name: 'ball-move',
        '0%': {
          'top' : topi+50+'px',
          'left' : lefi+50+'px',
          'width' : '0px',
          'height' : '0px',
          'opacity': 1
        },
        '30%': {
          'top' : topi+'px',
          'left' : lefi+'px',
          'width' : size+'px',
          'height' : size+'px',
          'opacity': 0.9
        },
        '100%': {
          'top': -60+'px',
          'height': 150+'px',
          'opacity': 0
        }
      }]);  

    
  });

  $('.boom').each(function(index){
    var rand = Math.random()+0.1;
    $(this).find('.place').playKeyframe({
      name: 'ball-move',
      duration: "1.4s",
      timingFunction: 'ease',
      delay: rand+'s',
      iterationCount: 'infinite',
      direction: 'normal',
      fillMode: 'forwards',
      complete: function(){
      }
    });
    //end animation 
  });
  
}
