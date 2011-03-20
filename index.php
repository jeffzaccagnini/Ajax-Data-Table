<?php 
 require 'config.php';
?>
<!doctype html> 
<html xmlns="http://www.w3.org/1999/xhtml">
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->

<head>
 <meta charset="utf-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
 <title>Data Table Example</title>
 <meta name="description" content="">
 <meta name="author" content="">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <link rel="stylesheet" href="css/stylesheet.css" />	
 <link rel="stylesheet" href="css/datatable.css" />
 <!--[if IE]>  
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>  
 <![endif]-->
 <script src="js/jquery.js"></script>
 <script src="js/jquery.ui.js"></script>
 <script src="js/modernizr.js"></script>
 <script src="js/datatable.js"></script>
 <script src="js/init.js"></script>
</head>

<body>
<!-- Content Wrapper -->
<div id="wrapper" class="width960">
 <h1>Data Table Example</h1>
 
 <!-- Start Table -->
 <div class="table_wrap clearfix">
 
 <!-- Table Status Loader -->
 <span id="table_loader"><img src="css/images/ajax-loader.gif" /></span>
 
 <!-- Table Header -->
 <div class="table_head clearfix">
  <h1>City</h1>
  <button id="delete_btn" type="button" class="left" style="display: none;"><span></span>Delete</button>
  <button id="save_all" class="left" style="display: none;">Save All</button>
  <button id="filter_btn" type="button" class="right"><span class="ui-button-text">Filter</span></button>
  <div class="right">Showing <span id="ipp_select"></span> entries</div>
 </div>
 
 <!-- Table Filter -->
 <div id="filter" class="clearfix"></div>
 
 <!-- Data Table -->
 <div id="data_table" class="data_table clearfix"></div>
 
 <!-- Table Footer -->
 <div class="table_foot clearfix">
  <span id="page_links" class="right"></span>
  <div class="left">Page <span id="page_select"></span> of <span class="total_pages"></span></div>
 </div>
</div>

<div id="statistics">
 <h1>Table Stats</h1>
 <table>
 <tr>
 <td><strong>Entries per page:</strong></td>
 <td><span class="ipp"></span></td>
 <tr>
 <tr>
 <td><strong>Current page:</strong></td>
 <td><span class="current_page"></span></td>
 <tr>
 <tr>
 <td><strong>Total entries:</strong></td>
 <td><span class="count"></span></td>
 <tr>
 <tr>
 <td><strong>Total pages:</strong></td>
 <td><span class="total_pages"></span></td>
<tr>
<tr>
 <td><strong>Active entry:</strong></td>
 <td><span id="active"></span></td>
<tr>
<tr>
 <td><strong>Num Selected:</strong></td>
 <td><span id="selected"></span></td>
<tr>
<tr>
 <td><strong>Selected Entries:</strong></td>
 <td><span id="selected_ids"></span></td>
<tr>
</table>
</div>
<div class="spacer"></div>
<div><p>Git: <a href="https://github.com/j3ffz/Ajax-Data-Table/" target="_blank">Ajax-Data-Table</a></p></div>
 </div>
 
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-22110940-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>