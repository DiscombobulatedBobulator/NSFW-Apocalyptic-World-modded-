const image_list = {
	asian: {
		black: 		5
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
		
		this.containerElement = containerElement;
		this.slave = getCharacter(containerElement.attr('data-id'));
		
		if (this.containerElement && this.slave){
			this.custom_image = V.custom_images[this.slave.id];
			this.initInterface();
			this.update_custom_image();
		}
	}
	initInterface(){
		let thisClass = this;
		$('[data-id]').filter(() => { return !$(this).find('> .dice').length }).toArray().forEach((container)=>{ //containers without .dice
			if (!$(container).hasClass('companion')){
				let h = $(container).height(),
					w = $(container).width();
					
				$(container).css('position', 'relative')
				$(container).append('<img class="dice" src="images/dice.png" alt="Randomize image">');
				$(container).append('<div class="type">I</div>');
				
				//insert dice
				let dice = $(container).find('.dice');
					dice.css({ 'opacity': (!this.custom_image) ? 0.75 : 0.25 });
					dice.click((e)=>{
						thisClass.randomize_imageURL();
						//thisClass.update_custom_image();
					});
					dice.hover(
						()=>{ dice.css('opacity', 1.0) },
						()=>{ dice.css('opacity', (!this.custom_image) ? 0.75 : 0.25) }
					);
				
				//insert type
				let type = $(container).find('.type')
					console.log(type)
					type.css({
						'opacity':	(!this.custom_image) ? 0.75 : 0.25,
						'height':	`${type.width()}`,
						
						'transform':	`translateY(${type.width()}px)`
					});
					type.click((e)=>{
						let img_path = prompt(`Enter the path to your image from images/custom_portraits
	Example: for images/custom_portraits/customFile/test.png, enter "customFile/test.png"`);
							if (!img_path || !this.checkIfImageExists(img_path)) alert(`Error: Image ${img_path} invalid.`)
							else {
								img_path = `${this.base_dir}/${img_path}`
								console.log(img_path)
								V.custom_images[this.slave.id] = img_path;
								this.custom_image = img_path;
								this.update_custom_image();
								//race_white/hair_blonde/1.png
							}
					});
					type.hover(
						()=>{ type.css('opacity', 1.0) },
						()=>{ type.css('opacity', (!this.custom_image) ? 0.75 : 0.25) }
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
						$(container).find(':not(.custom_image, .dice, .type)').remove();
						$(container).css('position', 'relative');
						$(container).append("<div class='custom_image'></div>")
					}
					$(container).find('.custom_image').css({
						'height':			`${h}px`,
						'width':			`${w}px`,
						'background':		`url('${thisClass.custom_image}') center`,
						'background-size':	`auto ${h}px`,
					})
				})
			}
		}
	}
	randomize_imageURL(){
		//get hair
		let hair_category =
			(['blonde', 'black', 'red', 'brown'].includes(this.slave.hair)) ? this.slave.hair :
			(this.slave.hair == "ginger") ? "red" :
			"misc";
			
		//check if there is a valid image
		let has_valid_directory = !image_list[this.slave.race] ? false: !image_list[this.slave.race][hair_category] ? false : image_list[this.slave.race][hair_category]
		//generate path
		if (has_valid_directory) {
			let old_img_num = V.custom_images[this.slave.id] ? V.custom_images[this.slave.id] : "0.png";
				old_img_num = parseInt(old_img_num.replace('.png', ''));
			let rand_max = image_list[this.slave.race][hair_category],
				rand_num = jsRandom(rand_max);
				if (rand_num == old_img_num){ //+- 1 depending on if rand_num depending on min(1)/max(rand_max); if only one valid image, don't change;
					rand_num += rand_num < rand_max ? 1 : rand_num > 1 ? -1 : 0;
				}
				
			let img_name = rand_num.toString() + ".png",
				img_path = `${this.base_dir}/race_${this.slave.race}/hair_${hair_category}/${img_name}`;
			
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