<?php
	if(!defined('IN_ROOT')){exit('Access denied');}
	$update_api='';
	$develop_auth='';
	function uninst($key){
		include_once '../../system/db.class.php';
		mysql_query('drop database `'.IN_DBNAME.'`');
	}
	function mainjump(){
		echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=".IN_CHARSET."\" /><style type=\"text/css\">body{background:#F2F9FD;}</style>";
	}
	function ShowMessage($in_msg,$in_url,$in_style,$in_time,$in_type){
		if($in_type==1){
			echo "<div class=\"container\"><h3>MixMusic 提示</h3><div class=\"infobox\"><h4 class=\"".$in_style."\">".$in_msg."</h4><script type=\"text/javascript\">setTimeout(\"location.href='".$in_url."';\",".$in_time.");</script><p class=\"marginbot\"><a href=\"".$in_url."\" class=\"lightlink\">如果您的浏览器没有自动跳转，请点击这里</a></p></div></div>";
		}elseif($in_type==2){
			echo "<div class=\"container\"><h3>MixMusic 提示</h3><div class=\"infobox\"><h4 class=\"".$in_style."\">".$in_msg."</h4><script type=\"text/javascript\">setTimeout(\"".$in_url."\",".$in_time.");</script><p class=\"marginbot\"><a href=\"javascript:history.go(-1);\" class=\"lightlink\">如果您的浏览器没有自动跳转，请点击这里</a></p></div></div>";
		}else{
			echo "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">";
			echo "<html xmlns=\"http://www.w3.org/1999/xhtml\">";
			echo "<head>";
			echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=".IN_CHARSET."\" />";
			echo "<meta http-equiv=\"x-ua-compatible\" content=\"ie=7\" />";
			echo "<title>提示信息</title>";
			echo "<link href=\"".IN_PATH."static/admincp/css/main.css\" rel=\"stylesheet\" type=\"text/css\" />";
			echo "</head>";
			echo "<body>";
			echo "<div class=\"container\"><h3>MixMusic 提示</h3><div class=\"infobox\"><h4 class=\"".$in_style."\">".$in_msg."</h4><script type=\"text/javascript\">setTimeout(\"location.href='".$in_url."';\",".$in_time.");</script><p class=\"marginbot\"><a href=\"".$in_url."\" class=\"lightlink\">如果您的浏览器没有自动跳转，请点击这里</a></p></div></div>";
		}
			echo "</body>";
			echo "</html>";
			exit();
	}
	function Administrator($value){
		if(empty($_COOKIE['in_adminid']) || empty($_COOKIE['in_adminname']) || empty($_COOKIE['in_adminpassword']) || empty($_COOKIE['in_permission']) || empty($_COOKIE['in_adminexpire']) || !getfield('admin', 'in_adminid', 'in_adminid', intval($_COOKIE['in_adminid'])) || md5(getfield('admin', 'in_adminpassword', 'in_adminid', intval($_COOKIE['in_adminid'])))!==$_COOKIE['in_adminpassword']){
		        ShowMessage("未登录或登录已过期，请重新登录管理中心！",$_SERVER['PHP_SELF'],"infotitle3",3000,0);
		}
		setcookie("in_adminexpire",$_COOKIE['in_adminexpire'],time()+1800);
		$array=explode(",",$_COOKIE['in_permission']);
		$adminlogined=false;
		for($i=0;$i<count($array);$i++){
		        if($array[$i]==$value){$adminlogined=true;}
		}
		if(!$adminlogined){
		        ShowMessage("权限不够，无法进入此页面！","?iframe=body","infotitle3",3000,0);
		}
	}
	function Menu_App(){
		global $develop_auth;
		$module="<li><a href=\"?iframe=module\" hidefocus=\"true\" target=\"main\"><em onclick=\"menuNewwin(this)\" title=\"新窗口打开\"></em>所有应用</a></li>";
		$li="";
		global $db;
		$query=$db->query("select * from ".tname('plugin')." where in_type<3 order by in_addtime desc");
		while($row=$db->fetch_array($query)){
			$li=$li."<li><a href=\"plugin.php/".$row['in_dir']."/".$row['in_file']."/\" hidefocus=\"true\" target=\"main\"><em onclick=\"menuNewwin(this)\" title=\"新窗口打开\"></em>".$row['in_name']."</a></li>";
		}
		return $module.$li;
	}
?>