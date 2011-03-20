$(document).ready(function() {

 count = 4035;
 
 form_count = 0;
 
 var settings = { 
	ajax_url:'table_controller.php', 
	table_name : "city_table", 
	// define element where table will be placed
	table_container : "data_table", 
	// define element where table will be placed
	pg_links_container:"page_links", 
	// display items per page drop-down menu?
	ipp_select_enabled:true,
	// define element where ipp drop-down will be placed
	ipp_container:"ipp_select",
	// display page drop-down menu?
	page_select_enabled: true,
	// define element where page drop-down will be placed
	page_container:"page_select",
	// define start page on initial boot
	default_page: 1,
	// define items per page
	ipp:25,
	mid_range: 7,
	// display table search field?
	search_enabled:true,
	// define element where search field will be placed
	search_container:"page_select",
	// display checkbox in each row?
	checkbox_enabled:true,
	// display row controls on hover?
	controls_enabled:true,
	// Define table columns that will be shown in table
	key : {
                id       : 'ID' 
		},
	columns: [{
                id       : 'Name',
                header   : 'Name', 
                sortable : true
             },
			 {
                id       : 'CountryCode',
                header   : 'Country Code', 
                sortable : true
            },
			{
                id       : 'District',
                header   : 'District', 
                sortable : true
            },
			{
                id       : 'Population',
                header   : 'Population', 
                sortable : true
            }]
 };
 
 $.data.table(settings);	
	
});