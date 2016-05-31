$(document).ready(function(){
	var lang = navigator.language.split("-");
	current_lang = (lang[0]);
	localStorage.lang = current_lang;

	var iconStores = "<svg version='1.1' id='iconLocation' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='192 -191.1 413.1 413.1' style='enable-background:new 192 -191.1 413.1 413.1;' xml:space='preserve'> <path d='M398.5-191.1L398.5-191.1c-82.6,0-149.3,66.7-149.3,149.3c0,28.8,9.2,56.3,22,78.9l97.3,168.4c6.1,11,18.4,16.5,30,16.5 c11.6,0,23.3-5.5,30-16.5l97.3-168.3c12.9-22.6,22-49.6,22-78.9C547.8-124.3,481.1-191.1,398.5-191.1z M398.5,2.3 c-30,0-54.5-24.5-54.5-54.5s24.5-54.5,54.5-54.5S453-82.2,453-52.2C453-22.1,428.5,2.3,398.5,2.3z'/> </svg> ";
	var iconResctriction = "<svg version='1.1' id='iconRestriction' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 30 30' style='enable-background:new 0 0 30 30;' xml:space='preserve'> <style type='text/css'> .st0{fill:#E0E31C;} </style> <g id='Layer_1'> <circle id='XMLID_1_' cx='15' cy='15' r='13.9'/> </g> <g id='bolitas'> <circle id='XMLID_2_' class='st0' cx='7.2' cy='15' r='2.8'/> <circle id='XMLID_4_' class='st0' cx='15' cy='15' r='2.8'/> <circle id='XMLID_5_' class='st0' cx='22.8' cy='15' r='2.8'/> </g> </svg>";
	
	if (current_lang =='es'){
		//INDEX
		$('.animated.bounceInDown.bounceIn').text('Descuentos Perú');
		$('.lblMail').text('Ingrese su correo');
		$('.btn.btn-default.btnLogin').text('Ingresar');
		$('.lblRemember').text('Recordar Correo');
		//MESSAGE
		$('.noEmail').text('Ingrese Correo');
		$('.invalidEmail').text('Correo Inválido');
		$('.noConexion').text('No Hay Conexión');
		//promotions
		$('.btn.btn-default.btnStores.left').html(iconStores+'Ubicanos');
		$('.btn.btn-default.btnRestriction.right').html(iconResctriction+'Restricciones');
	}else{

		//INDEX
		$('.animated.bounceInDown.bounceIn').text('Peru Discounts');
		$('.lblMail').text('Enter your Email');
		$('.btn.btn-default.btnLogin').text('Login');
		$('.lblRemember').text('Remember Email');		
		//MESSAGE
		$('.noEmail').text('Empty Email');
		$('.invalidEmail').text('Invalid Email');
		$('.noConexion').text('No Internet Conection');
		//promotions
		

		$('.btn.btn-default.btnStores.left').html(iconStores+'Locations');
		$('.btn.btn-default.btnRestriction.right').html(iconResctriction+'Restrictions');
	}
});

function captionCategories(){
	var lang = navigator.language.split("-");
	current_lang = (lang[0]);
	localStorage.lang = current_lang;
	if (current_lang =='es'){
		$('#favorites .categoryName').text('Favoritos');
		$('#clothing .categoryName').text('Ropa');
		$('#shoes .categoryName').text('Zapatos');
		$('#accesories .categoryName').text('Accesorios');
		$('#home .categoryName').text('Casa');
		$('#sports .categoryName').text('Deportes');
		$('#others .categoryName').text('Otros');
	}
	else{
		$('#favorites .categoryName').text('Favorites');
		$('#clothing .categoryName').text('Clothing');
		$('#shoes .categoryName').text('Shoes');
		$('#accesories .categoryName').text('Accesories');
		$('#home .categoryName').text('Home');
		$('#sports .categoryName').text('Sports');
		$('#others .categoryName').text('Others');
	}
}

function paginationName(swiper){
	var lang = navigator.language.split("-");
		current_lang = (lang[0]);
		localStorage.lang = current_lang;
	if(swiper==0){	
		if (current_lang =='es'){
			$('.categoryNameButton').text("Categorías");
		}
		else{
			$('.categoryNameButton').text("Categories");
		}
	}else if(swiper==2){
		if (current_lang =='es'){
			$('.categoryNameButton').text("Detalle");
		}
		else{
			$('.categoryNameButton').text("Detail");
		}
	}
}