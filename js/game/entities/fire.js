var Fire = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session,point);

		this.count = 0;
		this.count2 = 0;
		this.spriteCount = 1; 
		this.session.display.fires++;
		this.init_render();
	},
	init_render: function (){
		this.changeSprite(0,1)
	},
	move: function (x,y, action){
		
	},
	remove: function remove(){
		this.session.display.fires--;
		remove.base.call(this);
	},
	update: function update(){
		var tile = this.session.map.getTile(~~(this.position.x/20),~~(this.position.y/20));

		tile.fire = this;
		if(tile.type == 0 || (tile.walkable != [][0] && !tile.walkable)){
			tile.fire = [][0];
			this.remove();
			return;
		}
		if(this.count2 > 0)this.count2--;

		if(this.count2 == 0)
		if(tile.entity != [][0]){
			var health = tile.entity.properties["health"]
			var fireEx = tile.entity.properties["recharge"]
			var airSwitch = tile.entity.properties["airswitch"]
			var pod = tile.entity.properties["pod"]
			if(health != [][0]){
				health.value -= ~~(7*Math.random());
				if(fireEx == [][0] && airSwitch == [][0] && pod == [][0]){
					if(health.value <= 0){
						var grave = new Grave(this.session,{x:tile.entity.position.x,y:tile.entity.position.y});
						tile.entity.remove();
						tile.entity = grave;
					}
				} else if(fireEx != [][0]) {
					if(health.value <= 0){
						fireEx.working = false;
					}
				}
				 else if(airSwitch != [][0]) {
					if(health.value <= 0){
						airSwitch.working = false;
					}
				}
				else if(pod != [][0]) {
					if(health.value <= 0){
						pod.working = false;
					}
				}
				
				this.count2 =5;
			}
		}

		var airMulti = (this.session.airLevel/100.0-.3)* (this.session.airLevel/100.0-.3)* (this.session.airLevel/100.0-.3)* (this.session.airLevel/100.0-.3);
		if(airMulti<1)airMulti = 1;
		var removeFire = 0.003
		//if(this.session.airLevel < 50)removeFire = 0.02
		if(this.session.airLevel < 30)removeFire = 0.006
		if(this.session.airLevel < 19)removeFire = 0.05
		if(Math.random() <.013*airMulti){
			var dir = ~~(4*Math.random());
			var newPos = {x:~~(this.position.x/20),y:~~(this.position.y/20)}
			if(dir == 1) newPos.x++;
			if(dir == 2) newPos.y++;
			if(dir == 3) newPos.x--;
			if(dir == 0) newPos.y--;

			var tile = this.session.map.getTile(~~(newPos.x),~~(newPos.y));
			if(tile != [][0]){
				if(tile.walkable != [][0] && tile.walkable && tile.fire == [][0]){
			

					var give = {x:~~(this.position.x),y:~~(this.position.y)}
					var fire = new Fire(this.session,give);
					tile.fire = fire;
					fire.position.x = ~~(20*newPos.x);
					fire.position.y = ~~(20*newPos.y);
				}

			}
		}
		if(Math.random() <removeFire){
			var tile = this.session.map.getTile(~~(this.position.x/20),~~(this.position.y/20));
			tile.fire = [][0];
			this.remove();
			
		}
		this.session.airLevel -= .000033;
	},
	destroy_render: function (){

	},
	render: function render(){
		
		if(this.count++ > 15){
			this.count = 0
			if(this.spriteCount++%2==0)
				this.changeSprite(0,1)
			else
				this.changeSprite(0,2)
		}
		
		render.base.call(this);
		
	}
});