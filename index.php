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
 <hr />
 <p>A <a href="http://en.wikipedia.org/wiki/Table_(information)" target="_blank">table</a> is a means of arranging <a href="http://dev.mysql.com/doc/world-setup/en/world-setup.html" target="new">data</a> in rows and columns. The use of tables is pervasive throughout all communication, research and data analysis. </p>
 
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
  <div id="ipp_select" class="right"></div>
 </div>
 
 <!-- Table Filter -->
 <div id="filter" class="clearfix">		 
 </div>
 
 <!-- Data Table -->
 <div class="data_table clearfix">
  <table id="city_table">
  <thead>
  <tr>
  <th style="width: 30px; text-align:center;"><input id="check_all" name="check_all" type="checkbox" /></th>
  <th>Name</th>
  <th>CountryCode</th>
  <th>District</th>
  <th>Population</th>
  </tr>
  </thead>
  <tbody>
  <!-- Data Will Load Here -->
  </tbody>
  </table>
 </div>
 
 <!-- Table Footer -->
 <div class="table_foot clearfix">
  <div id="page_info" class="left"><p><span class="current_page"><span class="low"></span> - <span class="high"></span> of <span id="count"></span> entries.</p></div>
  <div id="page_links" class="right"></div>
  <div id="page_select" class="right"></div>
 </div>
 
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