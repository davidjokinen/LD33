var ActionDisplay = Entity.extend({
	init: function init(session){
		init.base.call(this,session);

		this.session = session;
		this.graphics;

		this.player = [][0];
		this.fires = 0;

		this.text1 = [][0];
		this.text2 = [][0];
		this.text3 = [][0];
		this.text4 = [][0];

		//this.init_render();
	},
	init_render: function (){
		this.graphics = new PIXI.Graphics();
		this.text1 = new PIXI.Text("???", {font:"30px Arial", fill:"white"});
		this.text2 = new PIXI.Text("???", {font:"30px Arial", fill:"white"});
		this.text3 = new PIXI.Text("???", {font:"30px Arial", fill:"white"});
		this.text4 = new PIXI.Text("??", {font:"30px Arial", fill:"white"});
		this.text5 = new PIXI.Text("??", {font:"30px Arial", fill:"white"});
		this.session.container.addChild(this.graphics);
		this.session.container.addChild(this.text1);
		this.session.container.addChild(this.text2);
		this.session.container.addChild(this.text3);
		this.session.container.addChild(this.text4);
		this.session.container.addChild(this.text5);
		
	},
	move: function (x,y, action){
		
	},
	destroy_render: function (){

	},
	render: function (){
		var camera = this.session.camera;
		if(this.player != [][0]){
			var health = this.player.properties["health"];
			var money = this.player.properties["money"];
			var fire = this.player.properties["charges"];
			this.text1.text = "Health: "+health.value+"/"+health.max;
			this.text1.position.x = 10;
			this.text1.position.y = 10;

			this.text2.text = "Fires: "+this.fires;
			this.text2.position.x = 10;
			this.text2.position.y = 40;

			this.text3.text = "Money: "+money.value+" need "+money.goal;
			this.text3.position.x = camera.width- this.text3.width-20;
			this.text3.position.y = 40;

			var status = "normal"
			if(this.session.airLevel<70)
				status = "below normal"
			if(this.session.airLevel<40)
				status = "low"
			if(this.session.airLevel<0)	
				status = "really low"
			if(this.session.airLevel>130)
				status = "above normal"
			if(this.session.airLevel>165)
				status = "high"
			if(this.session.airLevel>200)	
				status = "really high"

			this.text4.text = "Oxygen level: "+status;
			this.text4.position.x = camera.width- this.text4.width-20;
			this.text4.position.y = 10;

			this.text5.text = "Fire ext uses: "+fire.value;
			this.text5.position.x = 10;
			this.text5.position.y = camera.height- this.text5.height-20;

		}
		
	}
});