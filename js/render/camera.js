var _camera = [][0];
var Camera = Class.extend({
	init: function (div){
		this.x = 0;
		this.y = 0;
		this.sx = 1;
		this.sy = 1;
		this.click = {CX: -1,CY: -1,tStart: 0,mouseX:0,mouseY:0};

		this.onChange = [];

		this.onClick = [];
		this.onClickDown = [];
		this.onMove = [];
		this.onZoom = [];

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.focus = [][0];

		this.selected = [][0];
		this.hovered = [][0];

		this.key = []
		for(var i =0;i<255;i++)
			this.key[i] = false;

		if(_camera != [][0]){
			console.error("There is already a camera!");
			return _camera
		}

		this.div = div || document.body
		_camera = this;
		this.div.addEventListener('mousedown', this.mousedownCanvas.bind(_camera), false);
		this.div.addEventListener('mouseup', this.mouseupCanvas.bind(_camera), false);
		this.div.addEventListener('mousemove', this.mousemoveCanvas.bind(_camera), false);
		//this.div.addEventListener('mousewheel', this.mousewheelCanvas.bind(_camera), false);

		window.addEventListener('keydown', this.keydown.bind(_camera), false);
		window.addEventListener('keyup', this.keyup.bind(_camera), false);
	

	},
	update: function(){
		if(this.focus != [][0]){
			this.x += -((this.focus.position.x*this.sx -this.width/2+10*this.sx)+this.x)*.111111;
			this.y += -((this.focus.position.y*this.sy -this.height/2+10*this.sx)+this.y)*.111111;

		}else{
			var move = 50;
			if(this.key[37]){//left
				this.x += move;
			}
			if(this.key[38]){//up
				this.y += move;
			}
			if(this.key[39]){//right
				this.x -= move;
			}
			if(this.key[40]){//down
				this.y -= move;
			}
		}

		

	},
	addOnChange: function(event){
		this.onChange.push(event);
	},
	addOnClick: function(event){
		this.onClick.push(event);
	},
	addOnClickDown: function(event){
		this.onClickDown.push(event);
	},
	addOnMove: function(event){
		this.onMove.push(event);
	},
	addOnZoom: function(event){
		this.onZoom.push(event);
	},
	changed: function(){
		for(var i =0;i<this.onChange.length;i++)
			this.onChange[i]();
	},
	clickdown: function(){
		for(var i =0;i<this.onClickDown.length;i++)
			this.onClickDown[i]();
		this.changed();
	},
	clicked: function(){
		for(var i =0;i<this.onClick.length;i++)
			this.onClick[i]();
		this.changed();
	},
	moved: function(){
		for(var i =0;i<this.onMove.length;i++)
			this.onMove[i]();
		this.changed();
	},
	zoomed: function(){
		for(var i =0;i<this.onZoom.length;i++)
			this.onZoom[i]();
		this.changed();
	},
	keydown: function(e) {
		var code = e.keyCode;
		console.log(code)
		if(code < 0)return;
		if(code > 255)return;

		this.key[code] = true;

	},
	keyup: function(e) {
		var code = e.keyCode;
		if(code < 0)return;
		if(code > 255)return;

		this.key[code] = false;

	},
	mousedownCanvas: function(e) {
	    
		this.click.CX = e.pageX;
		this.click.CY = e.pageY;
		this.click.tStart = Date.now();
		this.clickdown();
		if(e.button==0){
			if(this.selected != [][0]){
				if(this.selected.move != [][0])
					this.selected.move(0,0,0)
			} else {
				document.body.style.cursor="move";
			}
		}
		
	}, 
	mouseupCanvas: function(e) {
		if(this.click.CX == -1)	
			return;
		if(e.button==0){
			if(this.selected != [][0]){
				if(this.selected.move != [][0])
					this.selected.move(e.pageX - this.click.CX,e.pageY - this.click.CY,2)
			} else {
				this.x += e.pageX - this.click.CX;
				this.y += e.pageY - this.click.CY;
			}
			this.clicked();
		}
		//if(Date.now()-tStart<200)
		//	click(e.button);
		this.click.CX = -1;
		this.click.CY = -1;
		document.body.style.cursor="auto";

	},
	mousemoveCanvas: function(e) {
	    
		if(this.click.CX != -1){
			if(e.button==0){
				if(this.selected != [][0]){
					this.selected.move(e.pageX - this.click.CX,e.pageY - this.click.CY,1)
				} else {
					this.x += e.pageX - this.click.CX;
					this.y += e.pageY - this.click.CY;
				}
				
				this.click.CX = e.pageX;
				this.click.CY = e.pageY;
			}
			
		}
		this.click.mouseX = e.pageX;
		this.click.mouseY = e.pageY;
		this.moved();
	},
	mousewheelCanvas: function(e) {
		
		if(this.sx+((e.wheelDelta)/1800.0)>=.34&&this.sx+((e.wheelDelta)/1800.0)<20)
		{
			var oldSX = this.sx;
			var oldSY = this.sy;
			
			this.sx += (e.wheelDelta)/1800.0;
			this.sy += (e.wheelDelta)/1800.0;

			var oldX = this.x;
			var oldY = this.y;
			this.x += (this.click.mouseX* (1-this.sx/oldSX));
			this.x -= (oldX* (1-this.sx/oldSX));
		 	this.y += (this.click.mouseY* (1-this.sy/oldSY));
		 	this.y -= (oldY* (1-this.sy/oldSY));
		 	this.zoomed();
		}
		
	},
	changeZoom: function(val) {
		
		//if(this.sx+((e.wheelDelta)/1800.0)>=.34&&this.sx+((e.wheelDelta)/1800.0)<20)
		{
			var oldSX = this.sx;
			var oldSY = this.sy;
			
			this.sx = val;
			this.sy = val;

			var oldX = this.x;
			var oldY = this.y;
			this.x += (this.click.mouseX* (1-this.sx/oldSX));
			this.x -= (oldX* (1-this.sx/oldSX));
		 	this.y += (this.click.mouseY* (1-this.sy/oldSY));
		 	this.y -= (oldY* (1-this.sy/oldSY));
		 	this.zoomed();
		 	if(this.focus != [][0]){
			this.x += -((this.focus.position.x*this.sx -this.width/2+10*this.sx)+this.x);
			this.y += -((this.focus.position.y*this.sy -this.height/2+10*this.sx)+this.y);

		}
		}
		
	}
});