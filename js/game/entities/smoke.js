var Smoke = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session,point);

		this.count = 0;
		this.spriteCount = 1; 
		this.init_render();
	},
	init_render: function (){
		this.changeSprite(1,1)
	},

	update: function update(){
		var tile = this.session.map.getTile(~~(this.position.x/20),~~(this.position.y/20));

		tile.fire = this;
		if(tile.type == 0){
			tile.fire = [][0];
			this.remove();
			return;
		}


		
		if(Math.random() <.005){
			var tile = this.session.map.getTile(~~(this.position.x/20),~~(this.position.y/20));
			tile.fire = [][0];
			this.remove();
			
		}
	},
	destroy_render: function (){

	},
	render: function render(){
		
		if(this.count++ > 15){
			this.count = 0
			if(this.spriteCount++%2==0)
				this.changeSprite(1,1)
			else
				this.changeSprite(1,2)
		}
		
		render.base.call(this);
		
	}
});