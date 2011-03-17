(function($) {
	
 $.data.table = function(settings) {
	 
	$.extend(s = {
		start_page: 1, 
		ipp:10,
		mid_range: 7,
		search_enabled:true,
		search_container:"search_field",
		page_select_enabled: true,
		page_container:"page_select",
		ipp_select_enabled:true,
		ipp_container:"ipp_select"
	}, settings);

	var selected_items = [];
	data = [];
	cols = s.cols;
	select_arr = [];
	
	//place the table contents inside the table tbody
	table_container = $('#'+s.table_container+' tbody');
	
	//where the items per page drop-down list will be placed
	ipp_container = $('#'+s.ipp_container);
	
	//where the page drop-down list will be placed
	page_container = $('#'+s.page_container);
	
	
	//items per page default = 10
	ipp = s.ipp;
	
	//page default = 1
	page = s.start_page;
	
	//calculate low for limit in the SQL query
	low = (page-1) * ipp;
	
	//calculate number of data pages
	num_pgs = Math.ceil(count/ipp);
	
	//store values in localStorage
	set('ipp', ipp);
	set('page', page);
	set('low', low);
	set('count', count);
	set('num_pgs', num_pgs);
	
	//initial action
	action = "initialize";
	
	//get request data
	get_req = {"action":action, "limit":get('low')+","+get('ipp'),"page":get('page'), "ipp":get('ipp')};
	
	//send ajax get request
	fns.ajax.get(get_req, s.ajax_url, 'json');
	
	if(s.ipp_select_enabled) {
		fns.display_ipp_select(ipp);
		fns.ipp_select_change();
	}
	
	if(s.page_select_enabled) {
		fns.display_page_select(page, num_pgs);
		fns.page_select_change(ipp);
	}
	
	fns.jump_links_click();
	
	// store id of active row in local storage 
	$('.controls a').live('click',function(e){							   
		set('id', $(this).closest('tr').attr('id'));
	});
	
	$('a.delete').live('click',function(){
		if (confirm("Delete item?")) { 
			get_req = {"action":"delete", "id":get('id'), "limit":get('low')+","+get('ipp'),"page":get('page'), "ipp":get('ipp')};
			fns.ajax.get(get_req, 'ajax.php', 'json');
		}
	});
	
	$('#delete_btn').live('click',function(){
		if (confirm("Delete item?")) { 
			get_req = {"action":'delete_multiple', "ids":select_arr, "limit":get('low')+","+get('ipp'),"page":get('page'), "ipp":get('ipp')};
			fns.ajax.get(get_req, s.ajax_url, 'json');
		}
	});
	
	$("table tbody tr").live('mouseover mouseout', function(event) {
  		if (event.type == 'mouseover') {
   			$(this).closest('tr').find('.actions').css('visibility','visible');
  		} else {
  			$(this).closest('tr').find('.actions').css('visibility','hidden');
  	}
	});
	
	
	fns.check_all_rows();

	$('#filter_btn').toggle(
		function() { $('#filter').slideDown('fast'); },
		function() { $('#filter').slideUp('fast'); 
 	});
	
	
	$("table tbody").each(function(){
		$("tr", this).live("hover", function(){
			$(this).toggleClass("hover");
			
		});
	});
};

var fns = {
	display_jump_links : function(page, num_pgs, range, mid_range) {
		var a = '';
		a += (page != 1 ? '<li><a class="paginate" value="previous" >Prev</a></li> ':'');	
		for (var v = 1; v <= num_pgs; v++) {
			if(range[0] > 1 && v == range[0]){ a += '<li class="off">...</li>'; }
			if(range[mid_range-1] < num_pgs+1 && v == range[mid_range-1]+2){ a += '<li  class="off">...</li>'; }	
			if(v == 1 || v == num_pgs || fns.in_array(v, range)){ 
				a += (v == page ? 
				'<li class="current"><a title="Go to page '+v+ ' of '+num_pgs+'" value="'+v+'" >'+v+'</a></li> ' :
				'<li><a class="paginate" title="Go to page '+v+ ' of '+num_pgs+'" value="'+v+'" >'+v+'</a></li>');			
			};
		}	
		a += (page != num_pgs &&  page != "initialize" ? '<li><a class="paginate" value="next" >Next</a></li> ':'');	
		$('#page_links').html('<ul class="paginate clearfix">'+a+'</ul>');
	},
	jump_links_click : function() {
		$('a.paginate').live('click', function() {
			page = $(this).attr("value");
			if(page == "next") {
				page = parseInt(get('page'))+1; 
				set('page', page);
			} else if (page == "previous") {
				page = parseInt(get('page'))-1;
				set('page', page);
			} else  {
				page = parseInt($(this).attr("value")); 
				set('page', page);
			}
			low = (page-1) * ipp;
			set('low', low);
		
			get_req = {"action":action, "limit":get('low')+","+get('ipp'),"page":get('page'), "ipp":get('ipp')};
			fns.ajax.get(get_req, s.ajax_url, 'json');
		});	
	},
	display_ipp_select : function(ipp) {
		var items = '';
		var ipp_array = Array(10,25,50,100);
		$.each(ipp_array, function(k, v) { 					   
			items += (v == ipp) ? '<option selected value="'+v+'">'+v+'</option>' : '<option value="'+v+'">'+v+'</option>'
		});
		ipp_container.html('Show <select id="ipp" class="paginate">'+items+'</select> entries per page.');
	},
	ipp_select_change : function() {
		$('#ipp').change(function() {
			page = 1;
			ipp = parseInt($(this).val());
			low = (page-1) * ipp;
			num_pgs = Math.ceil(count/ipp);
		
			set('ipp', ipp);
			set('page', page);
			set('low', low);
			set('num_pgs', num_pgs);
	
			get_req = {"action":action, "limit":get('low')+","+get('ipp'),"page":get('page'), "ipp":get('ipp')};
			fns.ajax.get(get_req, s.ajax_url, 'json');
		
			fns.display_page_select(page, num_pgs);
			fns.page_select_change(ipp);
		});
	},
	display_page_select : function(page, num_pgs){
		var option = '';
		for(i=1;i<=num_pgs;i++){
			option += (i==page) ? '<option value="'+i+'">'+i+'</option>':'<option value="'+i+'">'+i+'</option>';
		}
		page_container.html('<span class="paginate">Page <select id="page" class="paginate">'+option+'</select> of '+num_pgs+'</span>');
	},
	page_select_change : function(ipp) {
		$('#page').change(function() { 
		page = parseInt($('#page').val());
		low = (page-1) * ipp;
			
		set('page', page);
		set('low', low);
			
		get_req = {"action":action, "limit":get('low')+","+get('ipp'),"page":get('page'), "ipp":get('ipp')};
		fns.ajax.get(get_req, s.ajax_url, 'json');
		});
	},
	check_all_rows : function() {
		$('#check_all').live('change', function() {
			var td = $('table tbody tr');
 			$("input[type='checkbox']").attr( 'checked', $( this ).is( ':checked' ) ? 'checked' : '' );
			if($("input[type='checkbox']").attr( 'checked')) { 
				$('#delete_btn').fadeIn('fast');
					td.addClass('selected'); 
					$.each(td, function(index, value) { 
					select_arr.unshift(this.id);
				});
			} else  {
				$('#delete_btn').fadeOut('fast');
					td.removeClass('selected'); 
					$.each(td, function(index, value) { 
					select_arr.shift(this.id);
				});
			}
		});
	},
	ajax : {
		get : function(get_req, url, response_type) {
			fns.show_loader();
			var ipp = parseInt(get('ipp'));
			var low = parseInt(get('low'));
			low += 1;
			var high = low+ipp;
			high -= 1;
			$('.low').html(low);
			$('.high').html(high);
			$.get(url, get_req, function(resp_data){ 
				fns.ajax.get_success(resp_data);  
			}, response_type);
		},
		get_success : function(resp_data) {
			for(var i = 1; i <= ipp; i++) {
				localStorage.setItem(i, JSON.stringify(resp_data.data.rows[i]));
			}		  
			var count = resp_data.data.count;
			var num_pgs = Math.ceil(count/ipp);
			
			set('count', count);
			set('num_pgs', num_pgs);
	
			start_range = page-(Math.floor(s.mid_range/2));
			end_range = page+(Math.floor(s.mid_range/2));
			range = fns.make_range(start_range, end_range, num_pgs);

			table = fns.fill_table(resp_data.data.rows);	
	
			var empty = '<div class="empty"><p>Empty! :/</p></div>';
			(count <= 0) ?  table_container.html(empty) : table_container.html(table);
				
			fns.display_jump_links(page, num_pgs, range, s.mid_range);
			
			$('#count').html(count);
			$('#page').val(get('page'));

			fns.table_select();
			fns.hide_loader();
		}
	},
	fill_table : function(rows) {
		var table = '';
		var row_id;
		for (var r = 0; r < rows.length; r++) {
			table += '<tr id="'+rows[r].ID+'">';
			table += '<td class="center"><input id="'+ rows[r].ID +'" type="checkbox"/></td>';
			$.each(cols, function(k, v) { 
				table += '<td class="yp">'+rows[r][v]+'</td>';
			});
			table += '<td><div class="actions"><a class="delete"></a></div></td>';
		}
		return table;	
	},
	table_select : function() {
		num = 0;
		
		$('input[type="checkbox"]').bind('click',function(e) {
        var $this = $(this);
        if($this.is(':checked')) { 
               num += 1;
               $('#delete_btn').fadeIn('fast');
               $this.parents('tr').addClass('selected'); 
               select_arr.unshift(this.id);
        } else { 
               num -= 1;
               if(num  <= 0) { 
                $('#delete_btn').fadeOut('fast'); 
               }
           $this.parents('tr').removeClass('selected'); 
               select_arr.shift(this.id);
        }
		
			$("table tbody tr").child("input:checkbox").click(); 	
			
  		});
		function delete_check() {
			if(num  <= 0) { 
				$('#delete_btn').fadeOut('fast'); 
			} else {
				$('#delete_btn').fadeIn('fast'); 
			}
		}	
		
	},
	make_range : function(start_range, end_range, num_pgs) {
		var range = [];
		if(start_range <= 0){
			end_range += Math.abs(start_range)+1;
			start_range = 1;
		}
		if(end_range > num_pgs){
			start_range -= end_range-num_pgs;
			end_range = num_pgs;
		}
		for (var i = start_range; i <= end_range; i++){ 
			range.push(i); 
			}
		return range;
	},
	in_array : function(n, h) {
		var length = h.length;
   		for(var i = 0; i < length; i++) {
        	if(h[i] == n) {
				return true;
			}
    	}
    	return false;
	},
	show_loader : function() {
		$('#table_loader').fadeIn('fast');
	},
	hide_loader : function() {
		$('#table_loader').fadeOut('fast');	
	}
};

function set(name, value) {
	localStorage.setItem(name, value);
};

function get(name) {
	return localStorage.getItem(name);
};

})(jQuery);
