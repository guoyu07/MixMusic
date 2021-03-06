		var cookiepre = '3KLp_2132_',
			cookiedomain = '',
			cookiepath = '/';
		var headers = new Array('index', 'global', 'style', 'content', 'user', 'plugin', 'system', 'app', 'uc'),
			admincpfilename = '',
			menukey = '';

		function switchheader(key) {
			if (!key || !$('header_' + key)) {
				return;
			}
			for (var k in top.headers) {
				if ($('menu_' + headers[k])) {
					$('menu_' + headers[k]).style.display = headers[k] == key ? '' : 'none';
				}
			}
			var lis = $('topmenu').getElementsByTagName('li');
			for (var i = 0; i < lis.length; i++) {
				if (lis[i].className == 'navon') lis[i].className = '';
			}
			$('header_' + key).parentNode.parentNode.className = 'navon';
		}
		var headerST = null;

		function previewheader(key) {
			if (key) {
				headerST = setTimeout(function () {
					for (var k in top.headers) {
						if ($('menu_' + headers[k])) {
							$('menu_' + headers[k]).style.display = headers[k] == key ? '' : 'none';
						}
					}
					var hrefs = $('menu_' + key).getElementsByTagName('a');
					for (var j = 0; j < hrefs.length; j++) {
						hrefs[j].className = '';
					}
				}, 1000);
			} else {
				clearTimeout(headerST);
			}
		}

		function toggleMenu(key, url) {
			menukey = key;
			switchheader(key);
			if (url) {
				parent.main.location = admincpfilename + url;
				var hrefs = $('menu_' + key).getElementsByTagName('a');
				if(hrefs[0]) {
					hrefs[0].className = 'tabon';
				}
			}
			setMenuScroll();
		}

		function setMenuScroll() {
			//$('frametable').style.width = document.body.offsetWidth < 1000 ? '1000px' : '100%';
			var obj = $('menu_' + menukey);
			if (!obj) {
				return;
			}
			var scrollh = document.body.offsetHeight - 160;
			obj.style.overflow = 'visible';
			obj.style.height = '';
			$('scrolllink').style.display = 'none';
			if (obj.offsetHeight + 150 > document.body.offsetHeight && scrollh > 0) {
				obj.style.overflow = 'hidden';
				obj.style.height = scrollh + 'px';
				$('scrolllink').style.display = '';
			}
		}

		function resizeHeadermenu() {
			var lis = $('topmenu').getElementsByTagName('li');
			var maxsize = $('frameuinfo').offsetLeft - 160,
				widths = 0,
				moi = -1,
				mof = '';
			if ($('menu_mof')) {
				$('topmenu').removeChild($('menu_mof'));
			}
			if ($('menu_mof_menu')) {
				$('append_parent').removeChild($('menu_mof_menu'));
			}
			for (var i = 0; i < lis.length; i++) {
				widths += lis[i].offsetWidth;
				if (widths > maxsize) {
					lis[i].style.visibility = 'hidden';
					var sobj = lis[i].childNodes[0].childNodes[0];
					if (sobj) {
						mof += '<a href="' + sobj.getAttribute('href') + '" onclick="$(\'' + sobj.id + '\').onclick()">&rsaquo; ' + sobj.innerHTML + '</a><br style="clear:both" />';
					}
				} else {
					lis[i].style.visibility = 'visible';
				}
			}
			if (mof) {
				for (var i = 0; i < lis.length; i++) {
					if (lis[i].style.visibility == 'hidden') {
						moi = i;
						break;
					}
				}
				mofli = document.createElement('li');
				mofli.innerHTML = '<em><a href="javascript:;">&raquo;</a></em>';
				mofli.onmouseover = function () {
					showMenu({
						'ctrlid': 'menu_mof',
						'pos': '43'
					});
				}
				mofli.id = 'menu_mof';
				$('topmenu').insertBefore(mofli, lis[moi]);
				mofmli = document.createElement('li');
				mofmli.className = 'popupmenu_popup';
				mofmli.style.width = '150px';
				mofmli.innerHTML = mof;
				mofmli.id = 'menu_mof_menu';
				mofmli.style.display = 'none';
				$('append_parent').appendChild(mofmli);
			}
		}

		function menuScroll(op, e) {
			var obj = $('menu_' + menukey);
			var scrollh = document.body.offsetHeight - 160;
			if (op == 1) {
				obj.scrollTop = obj.scrollTop - scrollh;
			} else if (op == 2) {
				obj.scrollTop = obj.scrollTop + scrollh;
			} else if (op == 3) {
				if (!e) e = window.event;
				if (e.wheelDelta <= 0 || e.detail > 0) {
					obj.scrollTop = obj.scrollTop + 20;
				} else {
					obj.scrollTop = obj.scrollTop - 20;
				}
			}
		}

		function menuNewwin(obj) {
			var href = obj.parentNode.href;
			if (obj.parentNode.href.indexOf(admincpfilename + '?') != -1) {
				href += '';
			}
			window.open(href);
			doane();
		}

		function initCpMenus(menuContainerid) {
			var key = '',
				lasttabon1 = null,
				lasttabon2 = null,
				hrefs = $(menuContainerid).getElementsByTagName('a');
			for (var i = 0; i < hrefs.length; i++) {
				if (menuContainerid == 'leftmenu' && 'action=index'.indexOf(hrefs[i].href.substr(hrefs[i].href.indexOf(admincpfilename + '?') + admincpfilename.length + 1)) != -1) {
					if (lasttabon1) {
						lasttabon1.className = '';
					}
					if (hrefs[i].parentNode.parentNode.tagName == 'OL') {
						hrefs[i].parentNode.parentNode.style.display = '';
						hrefs[i].parentNode.parentNode.parentNode.className = 'lsub desc';
						key = hrefs[i].parentNode.parentNode.parentNode.parentNode.parentNode.id.substr(5);
					} else {
						key = hrefs[i].parentNode.parentNode.id.substr(5);
					}
					hrefs[i].className = 'tabon';
					lasttabon1 = hrefs[i];
				}
				if (!hrefs[i].getAttribute('ajaxtarget')) hrefs[i].onclick = function () {
					if (menuContainerid != 'custommenu') {
						var lis = $(menuContainerid).getElementsByTagName('li');
						for (var k = 0; k < lis.length; k++) {
							if (lis[k].firstChild && lis[k].firstChild.className != 'menulink') {
								if (lis[k].firstChild.tagName != 'DIV') {
									lis[k].firstChild.className = '';
								} else {
									var subid = lis[k].firstChild.getAttribute('sid');
									if (subid) {
										var sublis = $(subid).getElementsByTagName('li');
										for (var ki = 0; ki < sublis.length; ki++) {
											if (sublis[ki].firstChild && sublis[ki].firstChild.className != 'menulink') {
												sublis[ki].firstChild.className = '';
											}
										}
									}
								}
							}
						}
						if (this.className == '') this.className = menuContainerid == 'leftmenu' ? 'tabon' : '';
					}
					if (menuContainerid != 'leftmenu') {
						var hk, currentkey;
						var leftmenus = $('leftmenu').getElementsByTagName('a');
						for (var j = 0; j < leftmenus.length; j++) {
							if (leftmenus[j].parentNode.parentNode.tagName == 'OL') {
								hk = leftmenus[j].parentNode.parentNode.parentNode.parentNode.parentNode.id.substr(5);
							} else {
								hk = leftmenus[j].parentNode.parentNode.id.substr(5);
							}
							if (this.href.indexOf(leftmenus[j].href) != -1) {
								if (lasttabon2) {
									lasttabon2.className = '';
								}
								leftmenus[j].className = 'tabon';
								if (leftmenus[j].parentNode.parentNode.tagName == 'OL') {
									leftmenus[j].parentNode.parentNode.style.display = '';
									leftmenus[j].parentNode.parentNode.parentNode.className = 'lsub desc';
								}
								lasttabon2 = leftmenus[j];
								if (hk != 'index') currentkey = hk;
							} else {
								leftmenus[j].className = '';
							}
						}
						if (currentkey) toggleMenu(currentkey);
						hideMenu();
					}
				}
			}
			return key;
		}

		function lsub(id, obj) {
			display(id);
			obj.className = obj.className != 'lsub' ? 'lsub' : 'lsub desc';
			if (obj.className != 'lsub') {
				setcookie('cpmenu_' + id, '');
			} else {
				setcookie('cpmenu_' + id, 1, 31536000);
			}
			setMenuScroll();
		}
		var header_key = initCpMenus('leftmenu');
		toggleMenu(header_key ? header_key : 'index');

		function initCpMap() {
			var ul, hrefs, s = '',
				count = 0;
			for (var k in headers) {
				if (headers[k] != 'index' && headers[k] != 'app' && headers[k] != 'uc' && $('header_' + headers[k])) {
					s += '<tr><td valign="top"><h4>' + $('header_' + headers[k]).innerHTML + '</h4></td><td valign="top">';
					ul = $('menu_' + headers[k]);
					if (!ul) {
						continue;
					}
					hrefs = ul.getElementsByTagName('a');
					for (var i = 0; i < hrefs.length; i++) {
						s += '<a href="' + hrefs[i].href + '" target="' + hrefs[i].target + '" k="' + headers[k] + '">' + hrefs[i].innerHTML + '</a>';
					}
					s += '</td></tr>';
					count++;
				}
			}
			var width = 720;
			s = '<div class="cnote" style="width:' + width + 'px"><span class="right"><a href="javascript:void(0)" class="flbc" onclick="hideMenu();return false;"></a></span><h3>管理中心导航</h3></div>' + '<div class="cmlist" style="width:' + width + 'px;height: 410px"><table id="mapmenu" cellspacing="0" cellpadding="0">' + s + '</table></div>';
			$('cmain').innerHTML = s;
			$('cmain').style.width = (width > 1000 ? 1000 : width) + 'px';
		}
		initCpMap();
		initCpMenus('mapmenu');
		var cmcache = false;

		function showMap() {
			showMenu({
				'ctrlid': 'cpmap',
				'evt': 'click',
				'duration': 3,
				'pos': '00'
			});
		}

		function resetEscAndF5(e) {
			e = e ? e : window.event;
			actualCode = e.keyCode ? e.keyCode : e.charCode;
			if (actualCode == 27) {
				if ($('cpmap_menu').style.display == 'none') {
					showMap();
				} else {
					hideMenu();
				}
			}
			if (actualCode == 116 && parent.main) {
				parent.main.location.reload();
				if (document.all) {
					e.keyCode = 0;
					e.returnValue = false;
				} else {
					e.cancelBubble = true;
					e.preventDefault();
				}
			}
		}
		_attachEvent(document.documentElement, 'keydown', resetEscAndF5);
		_attachEvent(window, 'resize', setMenuScroll, document);
		_attachEvent(window, 'resize', resizeHeadermenu, document);
		if (BROWSER.ie) {
			$('leftmenu').onmousewheel = function (e) {
				menuScroll(3, e)
			};
		} else {
			$('leftmenu').addEventListener("DOMMouseScroll", function (e) {
				menuScroll(3, e)
			}, false);
		}
		resizeHeadermenu();