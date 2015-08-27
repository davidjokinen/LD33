var Pod = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session,point);

		this.count = 0;
		this.spriteCount = 1; 
		this.init_render();
		this.tile = [][0]
		this.properties["health"] = {value:500,max:500};
		this.properties["pod"] = {working:true};
		this.last = false; 
		this.last2 = this.properties["pod"].working; 
	},
	init_render: function (){
		this.changeSprite(3,3)
	},

	update: function update(){
		if(this.tile == [][0]){
			this.tile = this.session.map.getTile(~~(this.position.x/20),~~(this.position.y/20));
			this.tile.entity = this;
			
		}
		
	},
	destroy_render: function (){

	},
	render: function render(){
		if(this.last2 != this.properties["pod"].working){
			this.properties["pod"].working = false;
			this.changeSprite(5,3)
		}
		if(this.last != (this.session.display.player.properties["money"].value >= this.session.display.player.properties["money"].goal)){
			this.last = (this.session.display.player.properties["money"].value >= this.session.display.player.properties["money"].goal);
			if((this.session.display.player.properties["money"].value >= this.session.display.player.properties["money"].goal)){
				
				//this.properties["airswitch"].working = false;
				this.changeSprite(4,3)
			} else {
				this.changeSprite(3,3)
			}
		}
		
		render.base.call(this);
		
	}
});