var Recharge = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session,point);

		this.count = 0;
		this.spriteCount = 1; 
		this.init_render();
		this.tile = [][0]
		this.properties["health"] = {value:500,max:500};
			this.properties["recharge"] = {working:true};
			this.last = true; 
	},
	init_render: function (){
		this.changeSprite(2,2)
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
		if(this.properties["health"].value <= 0){
			if(this.last){
				this.last = false;
				this.properties["recharge"].working = false;
				this.changeSprite(3,2)
			}
		}
		
		render.base.call(this);
		
	}
});