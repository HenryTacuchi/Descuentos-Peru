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
  var promotionsListSize = swiperH - paginationH;
  //Get the size of each promotion, divide by 4
  var promotionsSize = (swiperH - paginationH)/4;

  $('.scrollPromo').height(promotionsListSize);

  $('.promotions li').height(promotionsSize);
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
