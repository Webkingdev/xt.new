$(function(){

	var center_obj = $('section .center');
	var viewport_width = $(window).width(),
		viewport_height = $(window).height(),
		center_section_height = $('section .center').height();
		console.log('viewport_width - '+viewport_width);
		console.log('center_height - '+center_section_height);
		console.log(center_obj);
	if(viewport_width < 711) {
		$('.banner').css({
			'height': viewport_width,
			'max-height':  $(window).height()*0.8
		}).find('img').attr('src', 'http://lorempixel.com/728/728/sports');
	}
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
		console.log(banner_height);
	$(window).scroll(function(){
		if(banner_height == 0){
			banner_height = $('.banner').outerHeight();
		}
		console.log(banner_height);
		var height = header.outerHeight(),
			fixed_height = (banner_height/2) - height;
		if(over_scroll == false){
			if($(this).scrollTop() > fixed_height && header.hasClass("default")){
			    header.removeClass("default").addClass("fixed_panel");
			    // $('#wrapper').css('margin-top', height);
			}else if($(this).scrollTop() <= fixed_height && header.hasClass("fixed_panel")){
			    header.removeClass("fixed_panel").addClass("default");
			    // $('#wrapper').css('margin-top', '0');
			}
		}
		//Скрытия баннера
		var banner_out_height = banner_height - height;
		if($(this).scrollTop() > banner_out_height && over_scroll == false){
			over_scroll = true;
			$('.banner').height('45px');
			$(this).scrollTop(0);
		}
	});

	//Возврат баннера если он скрыт
	$('.logo').on('click', function(event) {
		if(over_scroll === true){
			event.preventDefault();
			$('.banner').animate({height: banner_height}, 300);
			$('html, body').animate({
				scrollTop: 0
			}, 300);
		    header.removeClass("fixed_panel").addClass("default");
			setTimeout(function(){over_scroll = false;},305);
		}
	});

	//Меню
	$('.more_cat i').on('click', function() {
		// $(this).closest('')
	});

	//Переключение вкладок главного меню
	$('.catalog').on('click', '.main_nav li', function() {
		var section = $(this).data('nav');

		$('.catalog .main_nav li').removeClass('active');
		$(this).addClass('active');

		if(section == 'filter'){
			var name = $(this).find('i').text();
			console.log(name);
			if(name == 'filter_list'){
				$(this).find('i').text('highlight_off');
				$(this).find('span').text('Скрыть');
				$('.second_nav, .news').fadeOut();
				$('.filters').fadeIn();
			}else{
				$(this).find('i').text('filter_list');
				$(this).find('span').text('Фильтры');
				$('.filters').fadeOut();
				$('.second_nav, .news').fadeIn();
			}
		}

	});

});