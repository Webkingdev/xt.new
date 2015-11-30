/*MODAL WINDOW*/

// Вызов модального окна
function openModal(target){
	$('body').addClass('active_modal');
	$('#'+target+'.modal_hidden').removeClass('modal_hidden').addClass('modal_opened');
}
// Закрытие модального окна
function closeModal(){
	$('.modal_opened').removeClass('modal_opened').addClass('modal_hidden');
	//Удаление всех классов у body которые начинаются на active_
	// $('body').removeClass(function(index, css){
	// 	return (css.match(/(^|\s)active_\S+/g) || []).join(' ');
	// });
	$('body').removeClass('active_modal');
}