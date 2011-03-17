$(document).ready(function() {

 count = 238;
 
 form_count = 0;
 
 var settings = { 
	ajax_url:'table_controller.php',
	table_container:"city_table",
	ipp_container:"ipp_select",
	page_container:"page_select",
	start_page: 1,
	ipp:10,
	mid_range: 7,
	search_enabled:true,
	page_select_enabled: true,
	ipp_select_enabled:true,
	cols:['Name', 'CountryCode', 'District', 'Population'],
 };
 
 $.data.table(settings);	
	
});