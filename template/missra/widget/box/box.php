<?php
include '../../../../source/system/db.class.php';
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-type: text/html;charset=".IN_CHARSET);
close_browse();
$id = SafeRequest("id","get");
$audio = geturl(getfield('music', 'in_audio', 'in_id', $id));
$name = getfield('music', 'in_name', 'in_id', $id);
$singer = getfield('singer', 'in_name', 'in_id', getfield('music', 'in_singerid', 'in_id', $id), '未知歌手');
$cover = geturl(getfield('music', 'in_cover', 'in_id', $id), 'cover');
$type = substr(strrchr($audio, '.'), 1);
echo "<list><m type=\"".$type."\" src=\"".$audio."\" label=\"".$name." - ".$singer."\" image=\"".$cover."\" _id=\"".$id."\" /></list>";
?>