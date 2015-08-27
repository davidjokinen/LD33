var SpriteEntity = Entity.extend({
	init: function init(session,point){
		init.base.call(this,session,point);
		this.sprite = [][0];
		this.rotation = 0;
		this.controller = session.spriteentitycontroller;
		this.controller.add(this);


		this.init_render();
	},
	changeSprite: function(x,y){
		this.controller.changeSprite(this,x,y);
	},
	init_render: function (){
		
	},
	destroy_render: function (){

	},
	remove: function remove(){
		this.controller.remove(this);
	},
	update: function update(){

	},
	render: function (){
		if(this.sprite != [][0]){
			if(Math.abs((this.position.x+10)-this.sprite.position.x)>.05|| Math.abs((this.position.y+10)- this.sprite.position.y)>.05){
				this.sprite.position.x += ((this.position.x+10)-this.sprite.position.x)*.2;
				this.sprite.position.y += ((this.position.y+10)- this.sprite.position.y)*.2;
			}
			if(Math.abs((this.rotation/57.295779)-this.sprite.rotation) > .003){
				if( Math.abs((this.rotation/57.295779)-this.sprite.rotation) <= 180)
				this.sprite.rotation += ((this.rotation/57.295779)-this.sprite.rotation)*.2
				else
					this.sprite.rotation -= ((this.rotation/57.295779)-this.sprite.rotation)%180*.2
			}

			

			
		}
		
	}
});