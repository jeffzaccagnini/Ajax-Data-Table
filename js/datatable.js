(function($) {
	
 $.data.table = function(settings) {
	 
	$.extend(s = {
		default_page: 1, 
		ipp:10,
		mid_range: 7,
		search_enabled:true,
		search_container:"search_field",
		page_select_enabled: true,
		page_container:"page_select",
		ipp_select_enabled:true,
		ipp_container:"ipp_select"
	}, settings);
	
	// define containers
	table_container = $('#'+s.table_container);
	pg_links_container = $('#'+s.pg_links_container);
	ipp_container = $('#'+s.ipp_container);
	page_container = $('#'+s.page_container);
	
	values = {};
	selected_rows = [];	
	
	num = 0;
	
	//items per page default = 10
	ipp = s.ipp;	
	
	values.ipp = s.ipp;
	
	//set page as default page
	page = s.default_page;
	values.page = s.default_page;
	
	//calculate low for limit in the SQL query
	values.limit = get_limit(values.page, values.ipp);

	num_pgs = get_num_pgs(count, ipp);
	values.num_pgs = get_num_pgs();
	
	values.count = count;
	values.action = "initialize";
	
	//initial action
	action = "initialize";
	
	store_values(values)
	
	//send ajax get request
	fns.ajax.get_data(values, s.ajax_url, 'json');
	
	if(s.ipp_select_enabled) {
		fns.display_ipp_select(ipp);
		fns.ipp_select_change();
	}
	
	if(s.page_select_enabled) {
		fns.display_page_select(page, num_pgs);
		fns.page_select_change(ipp);
	}
	
	if(s.checkbox_enabled) {
		fns.check_all_rows();
	}
	
	fns.page_links_click();
	fns.row_select();
	// store id of active row with localStorage
};

var fns = {
	display_jump_links : function() {
		var a = '';
		v = values;
		a += (v.page != 1 ? '<li><a class="paginate" value="previous" >Prev</a></li> ':'');	
		for (var i = 1; i <= v.num_pgs; i++) {
			if(i == 1 || i == v.num_pgs || fns.in_array(i, range)){ 
				a += (i == v.page ? 
				'<li class="current"><a title="Go to page '+i+ ' of '+v.num_pgs+'" value="'+i+'" >'+i+'</a></li> ' :
				'<li><a class="paginate" title="Go to page '+i+ ' of '+v.num_pgs+'" value="'+i+'" >'+i+'</a></li>');			
			};
		}		
		a += (v.page != v.num_pgs &&  v.page != "initialize" ? '<li><a class="paginate" value="next" >Next</a></li> ':'');	
		$(pg_links_container).html('<ul class="paginate clearfix">'+a+'</ul>');
	},
	page_links_click : function() {
		$('a.paginate').live('click', function() {
			var page = $(this).attr("value");
			
			if(page == "next") { page = parseInt(get('page'))+1; } 
			else if (page == "previous") { page = parseInt(get('page'))-1; } 
			else  { page = parseInt($(this).attr("value")); }
			
			values.page = page;
			values.limit = get_limit(values.page, get('ipp'));
			values.num_pgs = get_num_pgs();
			store_values(values);
			
			fns.ajax.get_data(values, s.ajax_url, 'json');
		});	
	},
	display_ipp_select : function(ipp) {
		var items = '';
		var ipp_array = Array(10,25,50,100);
		$.each(ipp_array, function(k, v) { 					   
			items += (v == ipp) ? '<option selected value="'+v+'">'+v+'</option>' : '<option value="'+v+'">'+v+'</option>'
		});
		ipp_container.html('<select id="ipp" class="paginate">'+items+'</select>');
	},
	ipp_select_change : function() {
		$('#ipp').change(function() {	
			values.page = 1;
			values.ipp = parseInt($(this).val());		
			values.limit = get_limit(values.page, values.ipp);
			values.num_pgs = get_num_pgs();
			store_values(values);
			
			fns.ajax.get_data(values, s.ajax_url, 'json');
		
			fns.display_page_select(values.page, values.num_pgs);
			fns.page_select_change(values.ipp);
		});
	},
	display_page_select : function(){
		var option = '';
		for(i = 1; i <= values.num_pgs; i++){
			option += (i==values.page) ? '<option value="'+i+'">'+i+'</option>':'<option value="'+i+'">'+i+'</option>';
		}
		page_container.html('<select id="page" class="paginate">'+option+'</select>');
	},
	page_select_change : function(ipp) {
		$('#page').change(function() { 
			values.page = parseInt($('#page').val());
			values.limit = get_limit(values.page, values.ipp);
			store_values(values);
			fns.ajax.get_data(values, s.ajax_url, 'json');
		});
	},
	ajax : {
		get_data : function(get_req, url, response_type) {
			fns.show_loader();
			$.get(url, get_req, function(data){ 
				store_data(data);
				values.count = data.data.count;
				values.num_pgs = get_num_pgs();
				store_values(values);
				start_range = page-(Math.floor(s.mid_range/2));
				end_range = page+(Math.floor(s.mid_range/2));
				range = fns.range(start_range, end_range, num_pgs);
				table = fns.build_table();
				table_container.html(table);
				tbl_rows = fns.fill_rows(data.data.rows);
				var empty;
				(count <= 0) ? $('#'+s.table_name+' tbody').html(empty) :  $('#'+s.table_name+' tbody').html(tbl_rows);
				fns.display_jump_links(page, num_pgs, range, s.mid_range);

				var myJSONText = JSON.stringify(data.data.rows);
				
				$('#result').html(myJSONText);
				
				$('#result2').html(get('active'));
	
				
				$('.count').html(values.count);
				$('.current_page').html(values.page);
				$('.ipp').html(values.ipp);
				$('.total_pages').html(values.num_pgs);
				
				$('#page').val(get('page'));
				
				
				fns.hide_loader();
				
			}, response_type);
		},
	},
	
	build_table : function() {
		var table = '';
			table += '<table id="'+ s.table_name +'">';
		 	table += '<thead>';
 			table += ' <tr>';
			table += (s.checkbox_enabled) ? '<th><center><input id="check_all" name="check_all" type="checkbox" /></center></th>':'<th></th>';
 			$.each(s.columns, function(k, v) {  table += '<th>' + s.columns[k].header + '</th>'; });		
 			table += '<th></th>';
 			table+= '</tr>';
 			table += '</thead>';
			table += ' <tbody>';
			table += ' </tbody>';
			table += '</table>';
		return table;
		
	},
	fill_rows : function(rows) {
		var row = '';
		for (var r = 0; r < rows.length; r++) {
			row += '<tr id="'+rows[r][s.key.id]+'">';
			row += (s.checkbox_enabled) ? '<td class="center"><input value="rows[r][s.key.id" class="checkbox" type="checkbox" /></td>':'<td></td>';
			$.each(s.columns, function(k, v) {  row += '<td>' + rows[r][s.columns[k].id] + '</td>'; });
			row += (s.controls_enabled) ? '<td><div class="controls"><a class="delete"></a></div></td>':'<td></td>';		
		}
		return row;	
	},
	row_select : function() {
		$("#"+s.table_container+" table tbody tr, .controls a, input[type='checkbox']").live('click',function(){							   
	  		set('id', $(this).closest('tr').attr('id'));
		});
		
		$('#'+s.table_container+' table tbody tr').live('click', function(event){							   
			var active = get(this.rowIndex - 1)
			var obj = JSON.parse(active);
			store_active(obj);
			 if (event.target.type !== 'checkbox') {
				$("input[type='checkbox']").attr( 'checked', $( this ).is( ':checked' ) ? '' : '' );
				$('#'+s.table_container+' table tbody tr').removeClass('active');
				$('#'+s.table_container+' table tbody tr').removeClass('selected');
				$(':checkbox', this).attr('checked', function() {
					selected_count = 0;
					selected_rows = [];
			 		return !this.checked;
     			 });
			 } 
			 if(selected_count > 0){
				 $('#delete_btn').fadeIn('fast');
			 } 
			if($(':checkbox', this).attr('checked')) {
				selected_count += 1;
				$(this).addClass('selected');
				if(!fns.in_array(obj.ID, selected_rows)) {
				 	selected_rows.unshift(obj.ID);
			 	}
     		} else {
				selected_count -= 1;
				$(this).removeClass('selected');
				$('#'+obj.ID).removeClass('active');
			 	selected_rows.shift(obj.ID);
			}
			
			if (selected_count <= 0) {
				$('table tbody tr').removeClass('active');
				$('table tbody tr').removeClass('selected');
				$('#delete_btn').fadeOut('fast');
			}

			$('#selected_ids').html('');
			$.each(selected_rows, function(k, v) {
				$('#selected_ids').append(v + ' ');
			});
			$('#active').html(active);
			$('#selected').html(selected_count);
		});
	
		$("table tbody tr").live('mouseover mouseout', function(event) {
  			(event.type == 'mouseover') ? $(this).closest('tr').find('.controls').css('visibility','visible') : $(this).closest('tr').find('.controls').css('visibility','hidden');
		}); 
		
		$('.controls a.delete').live('click',function(){
			if (confirm("Delete item?")) { 
				values.action = 'delete';
				values.id = get('id');
				store_values(values);
				fns.ajax.get_data(values, s.ajax_url, 'json');
			}
		});
	
		$('#delete_btn').live('click',function(){
			if (confirm("Delete item?")) { 
				values.action = 'delete_multiple';
				values.ids = selected_rows;
				store_values(values);
				fns.ajax.get_data(values, s.ajax_url, 'json');
			}
		});
	},
	check_all_rows : function() {
		$('#check_all').live('change', function() {
			var td = $('table tbody tr');
			$("input[type='checkbox']").attr( 'checked', $( this ).is( ':checked' ) ? 'checked' : '' );
			if($("input[type='checkbox']").attr( 'checked')) { 
				$('#delete_btn').fadeIn('fast');
				td.addClass('selected'); 
				$.each(td, function(index, value) { selected_rows.unshift(this.id); });
			} else  {
				$('#delete_btn').fadeOut('fast');
				td.removeClass('selected'); 
				$.each(td, function(index, value) { selected_rows.shift(this.id); });
			}
		});
	},
	range : function(start_range, end_range, num_pgs) {
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
        	if(h[i] == n) { return true; }
    	}
    	return false;
	},
	show_loader: function() { $('#table_loader').fadeIn('fast'); },
	hide_loader: function() { $('#table_loader').fadeOut('fast'); }
};

function set(name, value) {
	localStorage.setItem(name, value);
};

function get(name) {
	return localStorage.getItem(name);
};

function store_values(values) {
   $.each(values, function(name, value) { set(name, value); });
   return true;
};

function store_data(obj) {
	var ipp = values.ipp;
	for(var i = 0; i <= ipp; i++) {
		localStorage.setItem(i, JSON.stringify(obj.data.rows[i]));
	}	
	return true;
};

function store_active(obj) {
	var ipp = values.ipp;
	localStorage.setItem('active', JSON.stringify(obj));
	return true;
};

store_active(obj);

function get_limit(page, ipp) {
	low = (page-1) * ipp;
	limit = low+','+ipp;
	return limit;
};

function get_num_pgs() {
	var count = get('count');
	var ipp = get('ipp');
	return Math.ceil(count/ipp)
};

})(jQuery);
