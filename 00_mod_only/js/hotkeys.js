var links=[], hotkeys_created=false;
function addHotkeyTags(){
	if (!hotkeys_created){
		//RESET
		$('.hotkey-tags').remove();
		links = []

		//grab relevant html objects
		$("#story a.link-internal").toArray().forEach((link) => {
			let parentClass = $($(link).parent()).attr('class'),
				isHidden = $(link).css('display') !== "none" && $(link).css('visibility') !== "hidden",
				isButton = $(link).css('background-color') == "rgb(125, 1, 1)",
				isCharacter = parentClass ? parentClass.includes('gender') : false;
			
			if ( isHidden && (isButton || isCharacter) ) links.push(link);
		});
		
		//add hotkey tags
		for (let i=1; i<=links.length; i++){
			let link = $(links[i-1]);
			let txt = link.text();
			
			var tag = '<span class="hotkey-tags" style="font-size:9px">[' + i + ']ㅤ</span>'
			$(tag).prependTo(link)
			
			link.on('click', function(){
				const link_pressed_e = new CustomEvent("e:link_pressed", {
					detail: {
						"html":	link[0].innerHTML,
						"content": txt.length ? txt : link.find('img').length ? link.find('img').attr('src') : ""
					}
				});
				document.dispatchEvent(link_pressed_e);
			})
		}
		hotkeys_created = true
	}
}

var hotkey_can_trigger = true;
function cooldown(){
	return new Promise(resolve => {
		setTimeout(()=>{
			hotkey_can_trigger = true;
		}, 10)
		if (hotkey_can_trigger) resolve();
	});
}
function init_hotkeyTags(){
	var num_arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
	var input_text_arr = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week']
	document.addEventListener('keydown', async function(event){
		if (!(document.activeElement.tagName == 'INPUT' || input_text_arr.includes(document.activeElement.type))){
			if (hotkey_can_trigger){
				hotkey_can_trigger = false
				
				if (num_arr.includes(event.key)){
					if(event.key-1 < links.length){
						$(links[event.key-1]).trigger("click")
						cooldown();
					}
				}
				else {
					switch(event.key){
						case 'q':
							$('#history-backward').click();
							await cooldown(); break;
						case 'w':
							$('#history-forward').click();
							await cooldown(); break;
						case 'i':
							if ($('img[src="images/game/misc/inventory.png"]').parent()){
								$('img[src="images/game/misc/inventory.png"]').parent().click();
								await cooldown(); break;
							}
							else hotkey_can_trigger = true; break;
						case '`':
							var weekDays_dom = $($('#sidebar-wrapper #t1 span').toArray()[4]),
								hourMins_dom = $($('#sidebar-wrapper #t1 span').toArray()[6]),
								dayCount_dom = $($('#sidebar-wrapper #t1 span').toArray()[8]);
							
							V.gameDate.setHours(V.gameDate.getHours() - 1);
							
							weekDays_dom.empty();
							hourMins_dom.empty();
							dayCount_dom.empty();
							
							let hour = V.gameDate.getHours() > 9 ? `${V.gameDate.getHours()}`: `0${V.gameDate.getHours()}`,
								mins = V.gameDate.getMinutes() > 9 ? `${V.gameDate.getMinutes()}`: `0${V.gameDate.getMinutes()}`,
								wkMn = `${hour}:${mins}`,
								wDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][V.gameDate.getDay()],
								dayC = `Day ${V.game.day}`;
							
							weekDays_dom.text(wDay);
							hourMins_dom.text(wkMn);
							dayCount_dom.text(dayC);
							
							await cooldown(); break;
							
						default:
							hotkey_can_trigger = true
							break;
					}
				}
			}
		}
		/*var hotkeyCooldown = new Promise(function(resolve){
			if (hotkey_can_trigger) resolve()
			
		})
		.then(() => {
			hotkey_can_trigger = true
		})*/
	})
}





