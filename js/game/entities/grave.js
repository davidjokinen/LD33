var Grave = SpriteEntity.extend({
	init: function init(session, point){
		init.base.call(this,session,point);

		this.count = 0;
		this.spriteCount = 1; 
		this.init_render();
		this.properties["grave"] = {};
	},
	init_render: function (){
		this.changeSprite(2,1)
	},

	update: function update(){
		
	},
	destroy_render: function (){

	},
	render: function render(){
		
		
		render.base.call(this);
		
	}
});