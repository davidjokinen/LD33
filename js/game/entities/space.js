var Space = Entity.extend({
	init: function init(session){
		init.base.call(this,session);

		this.session = session;
		this.graphics;

		this.points = []
		this.points2 = []


		for(var i =0;i<500;i++)
			this.points.push({x:(-1000+4000*Math.random()),y:(-1000+4000*Math.random())})
		for(var i =0;i<2000;i++)
			this.points2.push({x:(4000*Math.random()),y:(4000*Math.random())})

		this.init_render();
	},
	isAddable: function (){
		return false;
	},
	init_render: function (){
		this.graphics = new PIXI.Graphics();
		this.graphics2 = new PIXI.Graphics();
		this.session.container.addChild(this.graphics);
		this.session.container.addChild(this.graphics2);
		this.graphics.beginFill(0xFFFFFF);
		for(var i =0;i<this.points.length;i++){
			var p = this.points[i]
			this.graphics.drawCircle(p.x,p.y,2);
		}
		this.graphics.endFill();

		this.graphics2.beginFill(0xFFFFFF);
		for(var i =0;i<this.points2.length;i++){
			var p = this.points2[i]
			this.graphics2.drawCircle(p.x,p.y,1);
		}
		this.graphics2.endFill();
	},
	move: function (x,y, action){
		
	},
	destroy_render: function (){

	},
	render: function (){
		var camera = this.session.camera;

		//this.graphics.clear();
		
		var offsetX = (camera.x);
		var offsetY = (camera.y);

		this.graphics.position.x = offsetX/3.0;
		this.graphics.position.y = offsetY/3.0;
		this.graphics.scale.x = 1+camera.sx/100.0;
		this.graphics.scale.y = 1+camera.sy/100.0;

		//Zooming is fudged up but who caress... YOLO
		this.graphics2.position.x = offsetX/4.0;
		this.graphics2.position.y = offsetY/4.0;

		this.graphics2.scale.x = 1+camera.sx/100.0;
		this.graphics2.scale.y = 1+camera.sy/100.0;

		//console.log(1);
		

		
	}
});