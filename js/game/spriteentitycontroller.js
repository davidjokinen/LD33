var SpriteEntityController = Class.extend({
	init: function init(session){
		this.session = session;

		this.entityList = []

		this.fastSprite = [][0];
		this.spriteSheet = []
		this.spriteMap = []

		this.init_render();		
	},
	add: function(e){
		e.sprite =  new PIXI.Sprite(this.session.spriteSheet[0][0]);
		e.sprite.position.x = e.position.x;
		e.sprite.position.y = e.position.y;
		e.sprite.anchor.x = .5;
		e.sprite.anchor.y = .5;
		this.session.fastTiles.addChild(e.sprite );
		this.entityList.push(e);
	},
	remove: function(e){
		this.session.fastTiles.removeChild(e.sprite );
		for(var i =0;i<this.entityList.length;i++){
			if(e == this.entityList[i]){
				this.entityList.splice(i,1);
				break;
			}

		}
	},
	changeSprite: function(that, x,y){
		that.sprite.texture = this.session.spriteSheet[x][y];
	},
	init_render: function (){
		this.tileSheetTexture  = this.session.tileSheetTexture;
		this.fastSprite = this.session.fastTiles 
		


	},
	destroy_render: function (){

	},
	update: function (){
		for(var i =0;i<this.entityList.length;i++){
			var e = this.entityList[i];
			e.update();
		}
	},
	render: function (){
		for(var i =0;i<this.entityList.length;i++){
			var e = this.entityList[i];
			e.render();
		}

	}
});