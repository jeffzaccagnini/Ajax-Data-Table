<?php

function connect() {

   $host = "localhost";

   $user = "";

   $pass = "";

   $db = "world";

   $result = new mysqli($host, $user, $pass, $db);
   if (!$result) {
      return false;
   }
   $result->autocommit(TRUE);
   return $result;
}

function result_array($result) {
   $res_array = array();

   for ($count=0; $row = $result->fetch_assoc(); $count++) {
     $res_array[$count] = $row;
   }

   return $res_array;
}

?>
