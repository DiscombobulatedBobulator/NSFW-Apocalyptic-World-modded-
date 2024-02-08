const image_list = {
	asian: {
		black: 5
	},
	white:{
		black:		5,
		blonde:		5,
		brun:		5,
		red:		5
	},
	latina:{
		black:		5,
		blonde:		5,
		brun:		5,
		red:		5
	}
}
class CustomImage{
	constructor(containerElement){
		if (!V.custom_images) V.custom_images = {};
		this.base_dir = "images/custom_portraits"
		//this.base_dir = "../fc-pregmod-pregmod-master/bin/public/resources/custom"
		
		this.containerElement = containerElement;
		this.slave = getCharacter(containerElement.attr('data-id'));
		
		if (this.containerElement && this.slave){
			this.custom_image = V.custom_images[this.slave.id];
			this.injectDice();
			this.update_custom_image();
		}
	}
	injectDice(){
		let thisClass = this;
		$('[data-id]').filter(() => { return !$(this).find('> .dice').length }).toArray().forEach((container)=>{ //containers without .dice
			if (!$(container).hasClass('companion')){
				let h = $(container).height(),
					w = $(container).width();
					
				$(container).css('position', 'relative')
				$(container).append('<img src="images/dice.png" class="dice" alt="Randomize image">');
				
				//insert dice
				let dice = $(container).find('img');
				dice.css({ 'opacity': (!this.custom_image) ? 0.75 : 0.25 });
				dice.click((e)=>{
					thisClass.randomize_imageURL();
					thisClass.update_custom_image();
				});
				dice.hover(
					()=>{ dice.css('opacity', 1.0) },
					()=>{ dice.css('opacity', (!this.custom_image) ? 0.75 : 0.25) }
				);
			}
		})
	}
	update_custom_image(){
		let thisClass = this;
		if ( this.slave.gender == 0  && this.custom_image){
			if (this.custom_image && this.containerElement) {
				$(`[data-id="${this.slave.id}"]`).toArray().forEach((container)=>{
					let w = $(container).width(),
						h = $(container).height();
					if (!$(container).find('.custom_image')[0]){
						$(container).find(':not(.custom_image, .dice)').remove();
						$(container).css('position', 'relative');
						$(container).append("<div class='custom_image'></div>")
					}
					$(container).find('.custom_image').css({
						'height':	`${h}px`,
						'width':	`${w}px`,
						'background':`url('${thisClass.custom_image}') center`,
						'background-size':`auto ${h}px`,
					})
				})
			}
		}
	}
	randomize_imageURL(){
		//get hair
		let hair_category =
			(['blonde', 'black', 'red'].includes(this.slave.hair)) ? this.slave.hair :
			(this.slave.hair == "brown") ? "brun" :
			(this.slave.hair == "ginger") ? "red" :
			"misc";
			
		//check if there is a valid image
		let has_valid_directory = !image_list[this.slave.race] ? false: !image_list[this.slave.race][hair_category] ? false : image_list[this.slave.race][hair_category]
		//generate path
		if (has_valid_directory) {
			let img_name = jsRandom(image_list[this.slave.race][hair_category]).toString() + ".png";
			let img_path = `${this.base_dir}/race_asian/${hair_category}/${img_name}`;

			/*switch (this.slave.race){
				case "white":
					img_name = jsRandom(image_list.white[hair_category]).toString() + ".png";
					img_path = `${this.base_dir}/hair_${hair_category}/${img_name}`;
					break;
				case "latina":
					img_name = jsRandom(image_list.white[hair_category]).toString() + ".png";
					img_path = `${this.base_dir}/hair_${hair_category}/${img_name}`;
					break;
				case "asian":
					img_name = jsRandom(image_list.asian.total).toString() + ".png";
					img_path = `${this.base_dir}/race_asian/${img_name}`;
					break;
			}*/
			//console.log(img_path, this.slave)
			if (this.checkIfImageExists(img_path)){
				V.custom_images[this.slave.id] = img_path;
				this.custom_image = img_path;
				this.update_custom_image();
			}
		}
	}
	checkIfImageExists(url) {
		let img = new Image();
		let status = true
		img.src = url;

		if (img.complete) {
			//console.log("Image exists")
		}
		else {
			img.onload = () => {
				//console.log("Image exists")
			};
			img.onerror = () => {
				//console.log("Image doesn't exists"); 
				status = false
			};
		}
		return status
	}
}