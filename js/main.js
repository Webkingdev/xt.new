$(function(){

	var viewport_width = $(window).width(),
		viewport_height = $(window).height(),
		center_section_height = $('section .center').height(),
		header_outerheight = $('header').outerHeight();
		// console.log('viewport_height - '+viewport_height);
		// console.log('viewport_width - '+viewport_width);
		// console.log('center_height - '+viewport_height);
		// console.log('header_outerheight - '+header_outerheight);

	if(viewport_width < 711) {

		//Замена картинок баннера
		var banner_img = $('#owl-main_slider img');
		$('#owl-main_slider').css({
			'height': viewport_width,
			'max-height':  $(window).height()*0.8
		});
		$.each( banner_img ,function(index, obj) {
			var src = $(this).attr('data-src'),
				mobile_src = src.replace('banner', 'banner/mobile');
			$(this).attr( 'data-src' , mobile_src);
		});

		//Замена картинок в слайдере миниатюр
		var slider_img = $('#owl-product_mini_img_js img');
		$.each( slider_img ,function(index, obj) {
			var src = $(this).attr('src'),
				mobile_src = src.replace('small', 'medium');
			$(this).attr( 'src' , mobile_src);
		});
		//Удаление класса акт картинки на моб версии
		$('#owl-product_mini_img_js').find('img').removeClass('act_img');
	}

	//Высота сайдбара
	$('.sidebar_wrapp').css('max-height', (viewport_height - header_outerheight - 15));

	//Инициализаци слайдера
	$("#owl-main_slider").owlCarousel({
		autoPlay: true,
		stopOnHover: true,
		slideSpeed: 300,
		paginationSpeed: 400,
		itemsScaleUp: true,
		singleItem: true,
		lazyLoad: true,
		lazyFollow: false,
		pagination: false,
		navigation: true, // Show next and prev buttons
		navigationText: ['<svg class="arrow_left"><use xlink:href="images/slider_arrows.svg#arrow_left"></use></svg>',
						'<svg class="arrow_right"><use xlink:href="images/slider_arrows.svg#arrow_right"></use></svg>']
	});


	//Отправка формы Search
	// $('.mob_s_btn').on('click', function() {
	// 	alert('dfs');
	// 	$(this).closest('form').submit();
	// 	$('#search').focus();
	// });

	// Фокусировка Search
	$('#search').on('focus', function() {
		$('html').css('overflow-y', 'scroll');
		$('body').addClass('active_search');
	});
	// Активация кнопки поиска при вводе
	$('#search').on('keyup', function() {
		var val = $(this).val();
		if(val != ''){
			if(!$('.search_btn').hasClass('color-grey-search')){
				$('.search_btn').addClass('color-grey-search');
			}
		}else{
			if($('.search_btn').hasClass('color-grey-search')){
				$('.search_btn').removeClass('color-grey-search');
			}
		}
	});
	//Отмена обработчика отпраки формы
	$('#category-lower-right').on('click', function(event) {
		event.preventDefault();
	});

	//Емитация Select
	$('.imit_select .mdl-menu__item').on('click', function() {
		var value = $(this).text();
		$('.imit_select .mdl-menu__item').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.imit_select').find('.select_fild').text(value);
	});

	// Активация меню mobile
	$('.menu').on('click', function() {
		var action = $(this).text(),
			indent = $("header").outerHeight(),
			panel_height = viewport_height - indent;
		if(action == 'menu'){
			$(this).html('close');
			$('.panel[data-name="phone_menu"]').height(panel_height);
			$('body').addClass('active_panel');
		}else{
			$(this).html('menu');
			$('body').removeClass('active_panel');
		}
		$('.panel[data-name="phone_menu"]').stop(true, true).slideToggle();
	});

	//Закрытие меню при клике на подложку
	$('body').on('click', '.background_panel', function(){
		//Удаление всех классов у body которые начинаются на active_
		$('body').removeClass(function(index, css){
			return (css.match(/(^|\s)active_\S+/g) || []).join(' ');
		});
		$('.menu').html('menu');
		$('.panel').stop(true, true).slideUp();
	});

	//Закрытие search mobile
	$('.search_close').on('click', function(){
		$('body').removeClass('active_search');
	});

	//Scroll Magic
	var header = $("header"),
		over_scroll = false,
		banner_height = $('.banner').outerHeight();
		console.log('banner_height - '+banner_height);
	$(window).scroll(function(){
		if(banner_height == 0){
			banner_height = $('.banner').outerHeight();
		}
		var height = header.outerHeight(),
			fixed_height = (banner_height/2) - height;
		if(over_scroll == false){
			if($(this).scrollTop() > fixed_height && header.hasClass("default")){
			    header.removeClass("default").addClass("fixed_panel");
			}else if($(this).scrollTop() <= fixed_height && header.hasClass("fixed_panel")){
			    header.removeClass("fixed_panel").addClass("default");
			}
		}
		//Скрытия баннера
		var banner_out_height = banner_height - height;
		if($(this).scrollTop() > banner_out_height && over_scroll == false){
			over_scroll = true;
			$('body').addClass('banner_hide');
			$('#owl-main_slider').height(header_outerheight);
			$(this).scrollTop(0);
		}
	});

	//Возврат баннера если он скрыт
	$('.logo').on('click', function(event) {
		if(over_scroll === true){
			event.preventDefault();
			$('#owl-main_slider').animate({height: banner_height}, 300);
			$('html, body').animate({
				scrollTop: 0
			}, 300);
			$('body').removeClass('banner_hide');
		    header.removeClass("fixed_panel").addClass("default");
			setTimeout(function(){over_scroll = false;},305);
		}
	});

	//Меню
	$('.more_cat').on('click', function() {
		var lvl = $(this).closest('ul').data('lvl'),
			parent = $(this).closest('li'),
			parent_label = parent.hasClass('active');
		$(this).closest('ul').find('li').removeClass('active').find('ul').stop(true, true).slideUp();
		$(this).closest('ul').find('.material-icons').removeClass('rotate');
		if(!parent_label){
			parent.addClass('active').find('> ul').stop(true, true).slideDown();
			$(this).find('.material-icons').addClass('rotate');
		}
	});

	//Переключение вкладок главного меню
	$('.catalog').on('click', '.main_nav li', function() {
		var section = $(this).data('nav');

		if(section == 'filter'){
			var name = $(this).find('i').text();
			if(name == 'filter_list'){
				$(this).find('i').text('highlight_off');
				$(this).find('span.title').text('Скрыть');
				$('.second_nav, .news , .included_filters').fadeOut();
				$('.filters').fadeIn();
				$(this).addClass('active');
			}else{
				$(this).find('i').text('filter_list');
				$(this).find('span.title').text('Фильтры');
				$('.filters').fadeOut();
				$('.second_nav, .news, .included_filters').fadeIn();
				$(this).removeClass('active');
			}
		}else{
			$('.catalog .main_nav li').removeClass('active');
			$(this).addClass('active');
		}


	});

	//Стрелка указывающая на цену
	var price_el = $('.price'),
		price_nav_el = $('.price_nav');
		price_pos = Math.round(price_el.offset().left + (price_el.width()/2) - (price_nav_el.width()/2));
	price_nav_el.offset({left:price_pos });

	//Высота блока главной картики продукта
	$('.product_main_img').css('height', $('.product_main_img').outerWidth());

	//Инициализация owl carousel
	$("#owl-product_mini_img_js").owlCarousel({
		items: 6,
		itemsCustom: [[320, 1], [727, 2], [950, 3], [1250, 4], [1600, 5]],
		navigation: true, // Show next and prev buttons
		pagination: false,
		navigationText: ['<svg class="arrow_left"><use xlink:href="images/slider_arrows.svg#arrow_left_tidy"></use></svg>',
						'<svg class="arrow_right"><use xlink:href="images/slider_arrows.svg#arrow_right_tidy"></use></svg>']
	});
	$("#owl-popular, #owl-last-viewed, #owl-accompanying").owlCarousel({
		autoPlay: false,
		stopOnHover: true,
		slideSpeed: 300,
		paginationSpeed: 400,
		itemsScaleUp: true,
		items: 5,
		navigation: true, // Show next and prev buttons
		navigationText: ['<svg class="arrow_left"><use xlink:href="images/slider_arrows.svg#arrow_left_tidy"></use></svg>',
						'<svg class="arrow_right"><use xlink:href="images/slider_arrows.svg#arrow_right_tidy"></use></svg>']
	});

	//Слайдер картинок
	$('#owl-product_mini_img_js .item').on('click', function(event) {
		var src = $(this).find('img').attr('src');
		if(viewport_width > 711){
			$('#owl-product_mini_img_js').find('img').removeClass('act_img');
			$(this).find('img').addClass('act_img');
			src = src.replace('small', 'original');
			$('.product_main_img').find('img').attr('src', src);
			$('.product_main_img').hide().fadeIn('100');
		}else{
			event.preventDefault();
		}
	});

	// Добавление кнопки Закрыть всем модальным окнам
	$('[class^="modal_"]').append('<a href="#" class="material-icons close_modal">close</a>');

	// Открытие модального окна
	$('.open_modal').on('click', function(event){
		var target = $(this).data('target'),
			data_confirm = $(this).attr('data-confirm');
		event.preventDefault();
		if(data_confirm === undefined || data_confirm == ''){
			openModal(target);
		}else{
			if(!confirm(data_confirm)){
				return false;
			}
			openModal(target);
		}
		$('body').keydown(function(e){
			if(e.keyCode == 27){
				closeModal();
				return false;
			}
		});
	});

	// Закрытие модального окна
	$('#back_modal, .close_modal').on('click', function(event) {
		event.preventDefault();
		closeModal();
	});

	$('.product_main_img').on('click', function() {

	});
});