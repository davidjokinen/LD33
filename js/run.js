'use strict'
var that = this;
var session = new Session(); 

function start(){
	var c = document.getElementById("screen");
	var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.view);
	//renderer.backgroundColor = 0xFFFFFF;

	this.session.renderer = renderer;
	this.session.container = new PIXI.Container();
	this.session.display = new ActionDisplay(this.session);
	this.session.space = new Space(this.session);
	
	that.session.camera = new Camera(renderer.view);
	this.session.spriteentitycontroller = new SpriteEntityController(this.session); 
	this.session.map = new Map(this.session);
	this.session.airLevel = 100.0;
	this.session.airGen = false;
	//this.session.renderer.render(this.session.container);

	this.session.list = [];
	this.session.count = 0;
	this.session.invertFilter = new PIXI.filters.InvertFilter();
	this.session.rgbSplitterFilter = new PIXI.filters.RGBSplitFilter();

	this.session.display.init_render();
	this.session.win = false;
	this.session.lose = false;
	//this.session.pixelateFilter = new PIXI.filters.PixelateFilter();
	//this.session.container.filters = [this.session.invertFilter]
	

	var player = new Player(this.session, {x:20*103,y:20*103});
	that.session.camera.focus = player;
	this.session.display.player = player;
	this.session.map.openRandomDoor();
	this.session.map.startFire();
	this.session.map.openRandomDoor();
	this.session.map.startFire();

	draw();
}

function draw(){
	if(that.session.win){
		alert("win :)")
		window.location.reload();
		return;
	}
	if(that.session.lose){
		alert("lose ):")
		window.location.reload();
		return;
	}
	if(Math.random()<.1){
		//this.session.pixelateFilter.size.x = ~~(Math.random()*4)
		//this.session.pixelateFilter.size.y = this.session.pixelateFilter.size.x
		var dis = 57-that.session.airLevel;
		that.session.rgbSplitterFilter.blue.x = ~~(Math.random()*dis)
		that.session.rgbSplitterFilter.blue.y = ~~(Math.random()*dis)
		that.session.rgbSplitterFilter.red.x = ~~(Math.random()*dis)
		that.session.rgbSplitterFilter.red.y = ~~(Math.random()*dis)
		that.session.rgbSplitterFilter.green.x = ~~(Math.random()*dis)
		that.session.rgbSplitterFilter.green.y = ~~(Math.random()*dis)
	}
	if(that.session.airGen){
		that.session.airLevel += .1;
	} else {
		that.session.airLevel -= .001;

	}
	if(that.session.count++ > 1800){
		that.session.map.openRandomDoor();
		that.session.map.startFire();
		that.session.count = ~~(500*Math.random());
	}
	
	that.session.camera.update();
	that.session.spriteentitycontroller.update();
	that.session.spriteentitycontroller.render();
	that.session.map.render();
	that.session.space.render();
	that.session.display.render();
	that.session.renderer.render(that.session.container);

	requestAnimationFrame(draw);
}

//document.addEventListener("load", that.start());
that.start();