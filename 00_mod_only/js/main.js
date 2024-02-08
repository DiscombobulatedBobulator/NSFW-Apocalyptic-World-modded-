function getCharacter(id){
	if ( id && (V.slaves.length > 0 || V.guests.length > 0) ){
		/*let slave = V.slaves.filter((slave)=>{ return slave.id == id })[0],
			guest = V.guests.filter((guest)=>{ return guest.id == id })[0];
		
		return !slave ? guest : slave;*/
		
		for (let i=0; i < V.slaves.length; i++){
			let slave = V.slaves[i]
			if (slave.id == id) return slave;
		}
		for (let i=0; i < V.guests.length; i++){
			let guest = V.guests[i]
			if (guest.id == id) return guest;
		}
	}
}
function getSlave(id){
	if (id && V.slaves.length > 0){
		return V.slaves.filter((slave)=>{ return slave.id == id })[0];
	}
}
function getGuest(id){
	if (id && V.guests.length > 0){
		return V.guests.filter((guest)=>{ return guest.id == id })[0];
	}
}
var jsRandom = (min, max=null) => {
	if (!max) return Math.floor(Math.random() * (min-1)) + 1 //only 1 parameter -> parameter is max
	else return Math.clamp(Math.floor(Math.random() * (max-min+1)) + min, min, max);
};

$(window).ready(()=>{
	var myPromise = new Promise(function(resolve){
		var main_init = false;
		setTimeout(function(){
			Object.defineProperty(window, 'V', {
				get: function() { return window.SugarCube.State.variables }
			});
			V
			main_init = true
		}, 200);
		
		resolve(main_init);
	})
	.then(
		(value) => {
			applyMods();
		}
	)
})

var link_pressed_inPassage
function applyMods(){
	$(document).ready(()=>{
		init_hotkeyTags();
		link_pressed_inPassage = 0
		$(document).on(':passagerender', function (e) {
			hotkeys_created = false;
			link_pressed_inPassage = 0;
			setTimeout(function(){
				console.log('!')
			
				//update variables
				V.passage = window.SugarCube.State.passage;
				if (!window.V.player.sexual_skill) window.V.player.sexual_skill = 0;
				//setup hotkeys
				addHotkeyTags();
				hotkeys_created = true;
			
				//override images
				$('#npc_info_right').toArray().forEach((container)=> {new CustomImage(container)});
				$('.npc-say-visual').toArray().forEach((container)=> {new CustomImage(container)});
				$('.companion.tooltip').toArray().forEach((container)=> {new CustomImage(container)});
				
				//reset passageMods
				prev_passage_injectors.forEach((value) => {
					if (passage_mods[value]) passage_mods[value].fired = false
					//$('.clearMe').remove();
				});
				prev_passage_injectors = [];
				
				//inject relevant passageMods
				inject_passageMod(e);
			}, 200);
		});
		
		document.addEventListener("e:link_pressed", (e) => {
			link_pressed_inPassage++;
			if (link_pressed_inPassage > 0) hotkeys_created = false;
			setTimeout(function(){
				//setup hotkeys
				addHotkeyTags();
				
				//override images
				$('#npc_info_right').toArray().forEach((container)=> {new CustomImage(container)});
				$('.npc-say-visual').toArray().forEach((container)=> {new CustomImage(container)});
				$('.companion.tooltip').toArray().forEach((container)=> {new CustomImage(container)});
				
				//reset passageMods
				prev_passage_injectors.forEach((value) => {
					if (passage_mods[value]) passage_mods[value].fired = false
					//$('.clearMe').remove();
				});
				prev_passage_injectors = [];
				
				//inject relevant passageMods
				inject_passageMod(e);
			}, 200);
		})
	})	
}