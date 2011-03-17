<?php

class Table{
  
  public function initialize($ipp, $page, $limit) {
	$db = connect();
	$query = "SELECT * FROM city ORDER BY Name ASC LIMIT $limit";
   	$result = @$db->query($query);
   	if (!$result) {
     return false;
   }
   $count = @$result->num_rows;
   if ($count == 0) {
      return false;
   }
    $rows = result_array($result);
   
   $query = "SELECT * FROM city";
   
   $result = @$db->query($query);
   if (!$result) {
     return false;
   }
   $count = @$result->num_rows;
   if ($count == 0) {
      return false;
   }
	echo '{"status":"success", "data":{"rows":'.json_encode($rows).', "count":'.$count.'}}';
	
  }
  
 public function delete($id) {
	$db = connect();
  	$query = "DELETE FROM city WHERE ID=$id";
	$result = @$db->query($query);
	return true;
	
 }
 
  public function delete_multiple($ids) {
	$items = $ids;
		foreach ($items as &$value) {
         self::delete($value);
		}
	return true;
	
 }
 

	
}
	
?>