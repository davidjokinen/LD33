var Player = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session, point);

		this.session.camera.changeZoom(3.3);
		this.dir = 0;
		this.count = 0;
		this.count2 = 0;

		this.view = 0;
		this.hurt = 0;
		this.properties["charges"] = {value:40,max:40};
		this.properties["health"] = {value:100,max:100};
		this.lastHealth  = this.properties["health"].value;
		this.properties["money"] = {value:0,goal:42000};
		this.init_render();
	},
	init_render: function (){
		this.changeSprite(4,1)
	},
	remove: function remove(){
		this.session.lose = true;
		remove.base.call(this);
	},
	destroy_render: function (){

	},
	update: function update(){
		this.properties["money"].value += 2;
		if(this.session.airLevel < 20)
			this.properties["health"].value -= 1;
		if(this.properties["health"].value < 0){
			this.remove();
		}
		if(this.hurt == 0)
		if(this.lastHealth  != this.properties["health"].value){
			this.hurt += 10;
			this.lastHealth  = this.properties["health"].value;
		}
		if(this.hurt > 0){
			this.session.container.filters = [this.session.invertFilter];
			
			this.hurt--;
			if(this.hurt == 0)
				this.session.container.filters = [][0];
		} else if(this.session.airLevel < 50){
			this.session.container.filters = [this.session.rgbSplitterFilter];


		} else {
			this.session.container.filters = [][0];
		}
		var dir = -1;
		if(this.session.camera.key[87])dir = 0;
		if(this.session.camera.key[65])dir = 3;
		if(this.session.camera.key[83])dir = 2;
		if(this.session.camera.key[68])dir = 1;
		if(this.count > 0) this.count--;
		if(this.count2 > 0) this.count2--;
		if(this.count == 0)
		if(dir != -1){
			if(this.dir != dir){
				this.dir = dir;
				if(dir == 1) this.rotation = 270;
				if(dir == 2) this.rotation = 0;
				if(dir == 3) this.rotation = 90;
				if(dir == 0) this.rotation = 180;
				this.count = 2;
			} else {
				var newPos = {x:this.position.x/20,y:this.position.y/20}
				var oldTile = this.session.map.getTile(newPos.x,newPos.y);
				if(this.dir == 1) newPos.x++;
				if(this.dir == 2) newPos.y++;
				if(this.dir == 3) newPos.x--;
				if(this.dir == 0) newPos.y--;
				var tile = this.session.map.getTile(newPos.x,newPos.y);
				if(tile != [][0]){
					if(tile.walkable != [][0] && tile.walkable && tile.entity == [][0] ){
						oldTile.entity = [][0]
						tile.entity = this;
						this.position.x = ~~(20*newPos.x);
						this.position.y = ~~(20*newPos.y);
						this.count = 5;
					}

				}
			}
			
		} 
		if(this.count == 0)
		if(this.session.camera.key[69]){
			var newPos = {x:this.position.x/20,y:this.position.y/20}
				if(this.dir == 1) newPos.x++;
				if(this.dir == 2) newPos.y++;
				if(this.dir == 3) newPos.x--;
				if(this.dir == 0) newPos.y--;
				var tile = this.session.map.getTile(newPos.x,newPos.y);
				if(tile != [][0]){
					if(tile.type == 7){
						this.session.map.openDoor(newPos.x,newPos.y)
						this.count = 15;
					} else if(tile.type == 8){
						this.session.map.closeDoor(newPos.x,newPos.y)
						this.count = 15;
					} else {
						if(tile.entity != [][0]){
							if(tile.entity.properties["grave"] != [][0] ){
								this.properties["money"].value += 1000+ ~~(70*Math.random())*10;
								tile.entity.remove();
								tile.entity = [][0]

							}
							else if(tile.entity.properties["recharge"] != [][0] && tile.entity.properties["recharge"].working){
								this.properties["charges"].value += 1;//
								if(this.properties["charges"].value > this.properties["charges"].max)
								this.properties["charges"].value = this.properties["charges"].max;
					
								this.count = 5;
							}
							else if(tile.entity.properties["airswitch"] != [][0] && tile.entity.properties["airswitch"].working){

								this.session.airGen = ! this.session.airGen;
								this.count = 15;
							}
							else if(tile.entity.properties["pod"] != [][0] && tile.entity.properties["pod"].working){

								if(this.properties["money"].value >= this.properties["money"].goal){
									this.session.win = true;
								}
							}


						}
					}
				}
		}
		if(this.count == 0)
		if(this.session.camera.key[32]){
			var newPos = {x:this.position.x/20,y:this.position.y/20}
				if(this.dir == 1) newPos.x++;
				if(this.dir == 2) newPos.y++;
				if(this.dir == 3) newPos.x--;
				if(this.dir == 0) newPos.y--;
				var tile = this.session.map.getTile(newPos.x,newPos.y);
				if(tile != [][0]){
					//oh man shit code...  fuck it ship it
					  {
					  	if(this.properties["charges"].value > 0){
					  		this.session.map.clearFire(newPos.x,newPos.y,this.dir,3);
					  		this.properties["charges"].value--;
							this.count = 10;
					  	} else {
					  		this.session.map.clearFire(newPos.x,newPos.y,this.dir,1);
							this.count = 20;
					  	}
						
					}
				}

		}
		if(this.count2 == 0)
		if(this.session.camera.key[86]){
			this.view = (this.view+1)%3;
			if(this.view == 0) {
				this.session.camera.changeZoom(3.3);
			}
			if(this.view == 1) {
				this.session.camera.changeZoom(1.5);
			}
			if(this.view == 2) {
				this.session.camera.changeZoom(.37);
			}
			this.count2 = 15;
		}
			
	},
	render: function render(){
		render.base.call(this);
		
		
		
	}
});