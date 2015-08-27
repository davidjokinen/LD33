var AirSwitch = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session,point);

		this.count = 0;
		this.spriteCount = 1; 
		this.init_render();
		this.tile = [][0]
		this.properties["health"] = {value:500,max:500};
		this.properties["airswitch"] = {working:true};
		this.last = this.session.airGen; 
		this.last2 = this.properties["airswitch"].working; 
	},
	init_render: function (){
		this.changeSprite(1,3)
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
		if(this.last2 != this.properties["airswitch"].working){
			this.properties["airswitch"].working = false;
			this.changeSprite(2,3)
		}
		if(this.last != this.session.airGen && this.last2){
			this.last = this.session.airGen;
			if(this.session.airGen){
				
				//this.properties["airswitch"].working = false;
				this.changeSprite(0,3)
			} else {
				this.changeSprite(1,3)
			}
		}
		
		render.base.call(this);
		
	}
});