class class_slaveTable{
	constructor(fps){
		this.fps = fps;
		this.table = $('#slaves')
		let thisClass = this
		
		this.milk = {
			src: "images/milk.png",
			act(charLink){
				setTimeout(function(){
					$(charLink).click();
				}, 0)
				setTimeout(function(){
					$('a:contains("Milk her")').click()
				}, (thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Back")').click()
				}, 2*(thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Go back")').click()
				}, 3*(thisClass.fps + 50) )
			},
			trigger(slave){
				var text = '',
					tooltip = [
						`You cannot milk ${slave.name} because:`,
						V.backpack.data.breast_pump ? '': `
	You do not have a Breast Pump (Hint: progress ${V.characters.vincent.name}'s quest)`,
						!slave.gender ? '': `
	${slave.name} is not female`,
						!slave.milked ? '': `
	${slave.name} has already been milked today`,
						V.player.energy > 30 ? '': `
	You must have more than 30 energy`,
					];
					
				tooltip.forEach((line) => {
					if (line != "") text = text.concat(line);
				})
				return {
					is_true:			!slave.gender && !slave.milked && V.player.energy > 30 && V.backpack.data.breast_pump,
					tooltip_disabled:	text,
					tooltip_active:		`Milk ${slave.name}`
				}
			}
		}
		this.wash = {
			src: "images/wash.png",
			act(charLink){
				setTimeout(function(){
					$(charLink).click();
				}, 0)
				setTimeout(function(){
					$('a:contains("Wash")').click()
				}, (thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Help wash")').click()
				}, 2*(thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("back to the cell")').click()
				}, 3*(thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Go back")').click()
				}, 4*(thisClass.fps + 50) )
			},
			trigger(slave){
				var text = '',
					tooltip = [
						`You cannot wash ${slave.name} because:`,
						V.game.hotShower ? '' : `
	You do not have a Hot Shower (Hint: explore`,
						!slave.washed ? '' : `
	${slave.name} has already been washed today`,
						V.player.energy >= 10 ? '' : `
	You do not have at least 10 energy`
					];
				
				tooltip.forEach((line) => {
					if (line != "") text = text.concat(line);
				})
				return {
					is_true:			V.game.hotShower && !slave.washed && V.player.energy >= 10,
					tooltip_disabled:	text,
					tooltip_active:		`Wash ${slave.name}`
				}
			}
		}
		this.grope = {
			src: "images/grope.png",
			act(charLink){
				setTimeout(function(){
					$(charLink).click();
				}, 0)
				setTimeout(function(){
					$('a:contains("Grope")').click()
				}, (thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Back")').click()
				}, 2*(thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Go back")').click()
				}, 3*(thisClass.fps + 50) )
			},
			trigger(slave){
				var text = '',
					tooltip = [
						`You cannot grope ${slave.name} because:`,
						!slave.gender ? '': `
	${slave.name} is not female`,
						V.player.energy >= 20 ? '': `
	You do not have at least 20 energy`,
					];
				
				tooltip.forEach((line) => {
					if (line != "") text = text.concat(line);
				})
				return {
					is_true:			!slave.gender && V.player.energy >= 20,
					tooltip_disabled:	text,
					tooltip_active:		`Grope ${slave.name}`
				}
			}
		}
		this.workout = { //weight training
			src: "images/workout.png",
			act(charLink){
				setTimeout(function(){
					$(charLink).click();
				}, 0)
				setTimeout(function(){
					$('a:contains("Workout")').click()
				}, (thisClass.fps + 50) )
				setTimeout(function(){
					$('a:contains("Finish")').click()
				}, 2*(thisClass.fps + 50) )
			},
			trigger(slave){
				var text = '',
					tooltip = [
						`You cannot workout with ${slave.name} because:`,
						!slave.workout ? '': `
	${slave.name} already did their weights today`,
						V.player.energy >= 10 ? '': `
	You do not have at least 10 energy`,
					];
				
				tooltip.forEach((line) => {
					if (line != "") text = text.concat(line);
				})
				return {
					is_true:			!slave.workout && V.player.energy >= 10,
					tooltip_disabled:	text,
					tooltip_active:		`Workout with ${slave.name}`
				}
			}
		}
	
	}
	//use on column
	get_slaveName(row){
		return $(row).find('td:first-child').find('a').contents()[1].nodeValue
	}
	add_icons(parentElement, action, slave){
		let button = $(document.createElement("img"));
			button.attr({
				'src': 		action.src,
				'class':	"clearMe"
			});
			
		$(parentElement).append(button);
		//style buttons
		button.css({
			'margin-left': '8px',
			'white-space':	'pre',
			'transition':	'opacity 1s',
			
			'width':	'28.8px',
			'height':	'28.8px'
		});
		if (action.trigger(slave).is_true){
			//button resting opacity
			button.css({'opacity':	'0.66'});
			
			//button tooltip
			button.attr({
				'alt':		action.trigger(slave).tooltip_active,
				'title':	action.trigger(slave).tooltip_active
			})
			
			//hover animation
			button.hover(function(){
				$(this).css('opacity', '1' );
			}, function(){
				$(this).css('opacity', '0.66' );
			});
			
			//click event
			button.click((e)=>{
				let charLink = $(parentElement).parent().find('td:first-child a');
				action.act(charLink);
			})
		}
		else{
			button.attr({
				'alt':		action.trigger(slave).tooltip_disabled,
				'title':	action.trigger(slave).tooltip_disabled
			})
			button.css({'opacity':	'0.33'});
		}
	}
}
const slaveTable = new class_slaveTable(300);
const passage_mods = {
	"Grope":{
		effect(){
			let slave = getSlave($('#npc_info_right').attr('data-id'))
			if (slave){
				let dom_node = "<p>" + (!slave.gender ? "Her" : "His") + " body reacts positively to you. <b>(Horny + 20)</b></p>)";
				$(dom_node).insertBefore($('.say.npcsay'));
				slave.horny += 20;
			}
		},
		fired: false
	},
	"Slave - wash":{
		effect(){
			if ($('#story > div:contains("enjoy")')){
				let slave = getSlave($('#npc_info_right').attr('data-id'))
				if (slave){
					let dom_node = "<p>" + (!slave.gender ? "Her" : "His") + " body reacts positively to you. <b>(Horny + 20)</b></p>)";
					$(dom_node).insertBefore($('#story').find('a.link-internal:contains("Fuck")'));
					slave.horny += 20;
				}
			}
		},
		fired: false
	},
	"Girl milk":{
		effect(){
			let slave = getSlave($('#npc_info_right').attr('data-id'))
			if (slave){
				$('[data-passage]').contents().filter(function(){ return this.nodeType == 3 && this.nodeValue == " moans as you milk her.  " })
				.replaceWith(" moans as you milk her. Her body reacts positively to you. <b>(Horny + 20)</b>");
				slave.horny += 20;
			}
		},
		fired: false
	},
	"Fight cage - fight":{
		effect(){
			let prizeMoney = Math.round(-0.1 * V.player.fighter_rank + 15);
			
			if ($('#passages').text().includes("WON")){
				V.player.money += prizeMoney - 5;
				$('#t3 .money').text(`${V.player.money}`)
				$('[data-passage]').contents().filter(function(){ return this.nodeType == 3 && this.nodeValue == " the fight.  " })
				.replaceWith(` the fight. You've won $${prizeMoney}.`);
			}
		},
		fired: false
	},
	"Basement":{ //action buttons
		effect(){
			var rows = $('#slaves tr').toArray();
			rows.forEach((row) => {
				let lastCell = $(document.createElement("td"));
					$(row).append(lastCell);
					lastCell.addClass('clearMe', 'lastCell');
				
				let	slaveName = slaveTable.get_slaveName(row),
					slave = V.slaves.filter((slave) => { return slave.name == slaveName })[0];
				
				if (slave){
					lastCell.css({
						'display':		'flex',
						'align-items':	'center',
						'height':		'100%'
					});
					
					[slaveTable.milk, slaveTable.wash, slaveTable.workout].forEach((action) => {
						slaveTable.add_icons(lastCell, action, slave);
					});
				}
			})
		},
		fired: false
	},
	"Greenhouse":{ //action buttons
		effect(){
			var rows = $('#slaves tr').toArray();
			rows.forEach((row) => {
				let lastCell = $(document.createElement("td"));
					$(row).append(lastCell);
					lastCell.addClass('clearMe', 'lastCell');
				
				let	slaveName = slaveTable.get_slaveName(row),
					slave = V.slaves.filter((slave) => { return slave.name == slaveName })[0];
				
				if (slave){
					lastCell.css({
						'display':		'flex',
						'align-items':	'center',
						'height':		'100%'
					});
					
					[slaveTable.wash, slaveTable.grope, slaveTable.workout].forEach((action) => {
						slaveTable.add_icons(lastCell, action, slave);
					});
				}
			})
		},
		fired: false
	},
	"Guest house":{ //action buttons
		effect(){
			var rows = $('#slaves tr').toArray();
			rows.forEach((row) => {
				let lastCell = $(document.createElement("td"));
					$(row).append(lastCell);
					lastCell.addClass('clearMe', 'lastCell');
				
				let	guestName = slaveTable.get_slaveName(row),
					guest = V.guests.filter((guest) => { return guest.name == guestName })[0];
				
				if (guest){
					lastCell.css({
						'display':		'flex',
						'align-items':	'center',
						'height':		'100%'
					});
					
					[slaveTable.workout].forEach((action) => {
						slaveTable.add_icons(lastCell, action, guest);
					});
				}
			})
		},
		fired: false
	},
	"Mc fuck":{ //action buttons
		effect(e){
			if (e.type == ":passagerender"){
				let orgasmBar_container = '<div id="orgasmBar_container"></div>',
					orgasmBar = `<div><b>${V.tmpGirl.horny}/100</b> arousal</div>`;
					
				$('.action-image').after(orgasmBar_container);
				$('#orgasmBar_container').append(orgasmBar);
				
				$('#orgasmBar_container').css({
					'width':		'80%',
					'transform':	'translate(10%, 2.5%)',
					'height':		'20px',
					'background':	'rgba(0, 0, 0, 0.6)',
					'border':		'2px sold rgba(100, 100, 100, 0.5)'
				})
				$('#orgasmBar_container > div').css({
					'width':		`${V.tmpGirl.horny}%`,
					'height':		'20px',
					'background':	'rgb(200, 20, 130)',
					'transition':	'width 1s ease-in',
					'display':		'flex',
					//'justify-content':	'center',
					'align-items':	'center',
					'white-space':	'pre'
				})
			}
			
			if (e.type == "e:link_pressed"){
				$('.clearMe').remove();
				if (e.detail.html.includes('img')){
					let link = $(e.detail),
						slave = V.tmpGirl,
						sex_action = e.detail.content.replace('images/game/misc/actions/', '').replace('.png', '');
					let action_dict = new sexual_actions(slave),
						outcome = action_dict[sex_action]();
					
					if (outcome){
						slave.horny -= outcome.oldHorny;
						slave.horny += outcome.newHorny;
						slave.horny = Math.clamp(slave.horny, 0, 199);
						
						if (slave.horny >= 100){ //orgasm
							slave.horny -= 100
							slave.relationship = Math.min(slave.relationship + 5, 100);
							slave.happy = Math.min(slave);
							slave.orgasms++
							let guyGirl = slave.gender == 0 ? 'girl' : 'guy;'
							$('#passages strong:contains("Horny + ")').after(`<p style="white-space:'pre'"><span class="gender-${guyGirl}">${slave.name}</span> has an orgasm! <strong> (Happy / Relationship + 5)</strong></p>`)
						}
						
						$('#passages strong:contains("Horny + ")').text(`Horny + ${outcome.newHorny}`);
						if (V.player.sexual_skill <= jsRandom(100)){
							V.player.sexual_skill++;
							$('#passages strong:contains("Horny + ")').append(`<br><i class="clearMe">Your sexual prowess has increased <b>(sexual skill: + 1)</i>`);
						}
					}
					
					let orgasmBar_container = $('#orgasmBar_container'),
						orgasmBar = $('#orgasmBar_container > div');
						
					orgasmBar.css('width', `${slave.horny}%`)
				}
			}
		},
		fired: false,
		dont_clearMe: true
	},
	"Forest-action-chop-wood": {
		effect(){
			var outputDOM = $('strong:contains("get 30 wood")')[0];
			if (outputDOM){
				let extraWood = Math.round(V.player.strength/5);
					extraWood = Math.clamp(extraWood, 0, 20);
				let newOutputText = $(outputDOM).html().replace('30', `${30 + extraWood}`);
				
				outputDOM.innerHTML = newOutputText
				V.backpack.data.wood += extraWood;
			}
		},
		fired: false
	},
	"Fight": {
		effect(){
			//add chance to miss against player
			var enemyActions = [], hasDodged = false;
			V.fight.log = []
			$('#passage-fight').contents().filter(function(){
				return this.nodeType == 3 && (this.data.includes("punched you")||this.data.includes("kicked you")||this.data.includes("hit you")||this.data.includes("stabbed you"))
			}).toArray().forEach((value) => {
				if (!enemyActions.includes(value.data)){
					enemyActions.push(value.data);
					V.fight.log.push({'enemy': "", 'attack': 0, 'src': value})
				}
			})
			
			new Promise((resolve)=>{
				V.fight.log.forEach((action) => {
					let actionText = action.src.data;
						
					let enemyName = actionText.match(/^(.*?)\s/)[1],
						enemyAttack = actionText.match(/\(-(.*)\)/)[1].replace(' ', ''),
						dodgeChance = Math.round((100 - V.player.fighter_rank) / 4) + Math.round(V.player.int/2);
					
					action.name = enemyName;
					action.attack = enemyAttack;
					
					if (dodgeChance <= jsRandom(100)){
						hasDodged = true;
						V.fight.hp += parseInt(enemyAttack);
						action.src.replaceWith(`You've succesfully dodged ${enemyName}'s attempt to hit you!`);
					}
				})
				resolve(hasDodged)
			}).then((value => {
				if (hasDodged){
					$('#fight-your-hp-bar').width(`${V.fight.hp}%`);
					$('#fight-your-hp-count').html(`${V.fight.hp}`);
				}
			}))
		},
		fired: false
	},
}

const passage_mods_map = {
	":passagerender": {
		"Grope":				passage_mods["Grope"],
		"Girl milk":			passage_mods["Girl milk"],
		"Fight cage - fight":	passage_mods["Fight cage - fight"],
		"Basement":				passage_mods["Basement"],
		"Greenhouse":			passage_mods["Greenhouse"],
		"Guest house":			passage_mods["Guest house"],
		"Mc fuck": 				passage_mods["Mc fuck"],
		"Fight": 				passage_mods["Fight"],
		
		"Forest-action-chop-wood": 	passage_mods["Forest-action-chop-wood"],
	},
	"e:link_pressed": {
		"Slave - wash": passage_mods["Slave - wash"],
		"Mc fuck":		passage_mods["Mc fuck"],
	}
}

var prev_passage_injectors = [];

function inject_passageMod(e){
	let dict_key = V.passage;
	if (passage_mods_map[e.type]){
		if (passage_mods_map[e.type][dict_key] && !passage_mods_map[e.type][dict_key].fired){
			if (!passage_mods_map[e.type][dict_key].dont_clearMe) $('.clearMe').remove();
			passage_mods_map[e.type][dict_key].effect(e);
			passage_mods_map[e.type][dict_key].fired = true;
		}
		prev_passage_injectors.push(dict_key);
	}
}