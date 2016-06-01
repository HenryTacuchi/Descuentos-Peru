
$(document).ready(function(){

  resizeLogin();
  loadIconsSVG();
  
  //Click al input
  $('.form-group .lblMail').click(function(){
    $(this).addClass("moveRight");
    $(this).next().focus();
  }); 
  
  //Cuando el hace click en cualquier lado menos en el input
  $('input').focusout(function(){
    if($(this).val() != ""){
      // El label se muestra oculto
      $('.msgLogin').removeClass('show');
    }else{
      //Se regresa a su posicion inicial el label
      $(this).prev().removeClass("moveRight");
    }
  });

  $('input').focusin(function(){
    $('.msgLogin').removeClass('show');
  });
  

  $('.logoutUser').click(function(){

    $('.modalConfirmLogout').modal('show');

  });


});

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

$('.modalMessages').on('show.bs.modal', function() {
  $(this).show();
  setModalMaxHeight(this);
});


$(window).resize(function() {
  if ($('.modal.in').length != 0) {
    setModalMaxHeight($('.modal.in'));
  }
});

function resizeLogin(){

}

function heightPromotions(){

}

function loadIconsSVG(){
  $('.lblMail').before(
    "<svg version='1.1' id='mailSVG' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='-1333 1333.9 167.7 167.7' style='enable-background:new -1333 1333.9 167.7 167.7;' xml:space='preserve'> <style type='text/css'> .st0{fill:#fff;stroke:#fff;stroke-miterlimit:10;} </style> <path class='st0' d='M-1189.1,1466h-120c-6,0-10.9-4.9-10.9-10.9v-74.6c0-6,4.9-10.9,10.9-10.9h120c6,0,10.9,4.9,10.9,10.9v74.6 C-1178.2,1461.1-1183.1,1466-1189.1,1466z M-1314.2,1459.6c1.2,1.4,3,2.2,5,2.2h120c2,0,3.7-0.9,5-2.2l-53.5-39.3l-10.2,7.5 c-0.7,0.5-1.7,0.5-2.5,0l-10.3-7.5L-1314.2,1459.6z M-1234.1,1417.7l51.7,37.9c0-0.2,0-0.3,0-0.5v-74.6c0-0.2,0-0.3,0-0.5 L-1234.1,1417.7z M-1315.9,1380.2c0,0.1,0,0.2,0,0.3v74.6c0,0.2,0,0.3,0,0.4l51.6-37.9L-1315.9,1380.2z M-1314.3,1376.1l65.1,47.3 l65-47.4c-1.2-1.4-3-2.2-5-2.2h-120C-1311.2,1373.8-1313,1374.7-1314.3,1376.1z'/> </svg> "
  );
}

function noEmailMessage(){
  var heading = $('.noEmail').clone();

  $('.noEmail').remove();
  $('body').append(heading);
  $('.noEmail').addClass('alertAnimation');
}

function noConexionMessage(){
  var heading = $('.noConexion').clone();
  
  $('.noConexion').remove();
  $('body').append(heading);
  $('.noConexion').addClass('alertAnimation');
}

function invalidEmailMessage(){
  var heading = $('.invalidEmail').clone();
  
  $('.invalidEmail').remove();
  $('body').append(heading);
  $('.invalidEmail').addClass('alertAnimation');
}