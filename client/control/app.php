<?php
!defined('IN_UC') && exit('Access Denied');

class appcontrol extends base {
	function appcontrol() {
		$this->base();
		$this->load('app');
	}
	function onls() {
		$applist = $_ENV['app']->get_apps('appid, type, name, url, tagtemplates');
		$applist2 = array();
		foreach($applist as $key => $app) {
			$app['tagtemplates'] = uc_unserialize($app['tagtemplates']);
			$applist2[$app['appid']] = $app;
		}
		return $applist2;
	}
}
?>