var Person = SpriteEntity.extend({
	init: function init(session,point){
		init.base.call(this,session,point);

		this.rotation = 0;
		this.dir = 0;
		this.properties["health"] = {value:50,max:50};
		
		this.hurt = 0;
		this.init_render();
	},
	init_render: function (){
		this.changeSprite(4,1)
	},
	destroy_render: function (){

	},
	remove: function remove(){
		this.session.display.player.properties["money"].value -= 1000;
		remove.base.call(this);
	},
	update: function update(){

		if(Math.random() <.02){
			var dir = ~~(4*Math.random());
			if(dir == 1) this.rotation = 270;
			if(dir == 2) this.rotation = 0;
			if(dir == 3) this.rotation = 90;
			if(dir == 0) this.rotation = 180;
			this.dir = dir;
		}
		else if(Math.random() <.01){
			var dir = this.dir;
			var newPos = {x:this.position.x/20,y:this.position.y/20}
			var oldTile = this.session.map.getTile(newPos.x,newPos.y);
			if(dir == 1) newPos.x++;
			if(dir == 2) newPos.y++;
			if(dir == 3) newPos.x--;
			if(dir == 0) newPos.y--;

			var tile = this.session.map.getTile(newPos.x,newPos.y);
			if(tile != [][0]){
				if(tile.walkable != [][0] && tile.walkable  && tile.entity == [][0]){
					oldTile.entity = [][0]
					tile.entity = this;
					if(dir == 1) this.rotation = 270;
					if(dir == 2) this.rotation = 0;
					if(dir == 3) this.rotation = 90;
					if(dir == 0) this.rotation = 180;
					this.position.x = ~~(20*newPos.x);
					this.position.y = ~~(20*newPos.y);
				}

			}
		}
	},
	render: function render(){
		render.base.call(this);
		
		
		
	}
});