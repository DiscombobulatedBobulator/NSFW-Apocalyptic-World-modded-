class sexual_actions{
	constructor(slave){
		this.slave = slave;
	}
	anal(){
		let oldHorny = this.slave.traits.includes("analslut") ? 20: 0,
			newHorny = Math.clamp(10 + V.player.sexual_skill + jsRandom(-10, 10), 0, 75);
			
		return {
			"id": "fuck anal",
			"oldHorny": oldHorny,
			"newHorny": this.slave.traits.includes("analslut") ? newHorny: 0,
		}
	}
	anal_fingering(){
		let oldHorny = 0,
			newHorny = Math.clamp(10 + V.player.sexual_skill + jsRandom(-5, 10), 0, 75);
			
		return {
			"id": "anal fingering",
			"oldHorny": oldHorny,
			"newHorny": this.slave.traits.includes("analslut") ? newHorny: 0,
		}
	}
	bj(){
		let oldHorny = this.slave.traits.includes("cumslut") ? 20: 0,
			newHorny = Math.clamp(10 + V.player.sexual_skill + jsRandom(-5, 0), 0, 75);
			
		return {
			"id": "blowjob",
			"oldHorny": oldHorny,
			"newHorny": this.slave.traits.includes("cumslut") ? newHorny : 0,
		}
	}
	dp(){
		let oldHorny = this.slave.traits.includes("cumslut") ? 20: 0,
			newHorny = Math.clamp(10 + V.player.sexual_skill + jsRandom(-5, 5), 0, 75);
			
		return {
			"id": "deepthroat",
			"oldHorny": oldHorny,
			"newHorny": this.slave.traits.includes("cumslut") ? newHorny : 0,
		}
	}
	footjob(){
	}
	handjob(){
	}
	titjob(){
	}
	
	pussy_lick(){
		let oldHorny = !this.slave.traits.includes("analslut") ? 20: 0,
			newHorny = Math.clamp(15 + V.player.sexual_skill + jsRandom(-5, 10), 0, 75);
			
		return {
			"id": "cunnilingus",
			"oldHorny": oldHorny,
			"newHorny": !this.slave.traits.includes("analslut") ? newHorny : 0,
		}
	}
	pussy(){
		let oldHorny = !this.slave.traits.includes("analslut") ? 20 : 0,
			newHorny = Math.clamp(10 + V.player.sexual_skill + jsRandom(-10, 10), 0, 75);
			
		return {
			"id": "fuck pussy",
			"oldHorny": oldHorny,
			"newHorny": !this.slave.traits.includes("analslut") ? newHorny : 0,
		}
	}
}