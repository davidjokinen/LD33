var Map = Entity.extend({
	init: function init(session){
		init.base.call(this,session);

		this.session = session;
		this.graphics;

		this.height = 200;
		this.width = 200;

		this.grid = []
		this.fastTiles = [][0];
		this.spriteSheet = []
		this.spriteMap = []

		for(var x=0;x<this.width;x++){
			this.grid[x] = [];
			for(var y=0;y<this.height;y++){
				this.grid[x][y] = {type:0,walkable:false}
			}
		}

		this.generateMap();
		this.init_render();
		for(var x=0;x<this.width;x++){
			for(var y=0;y<this.height;y++){
				
				if(this.grid[x][y].type == 1){
					if(Math.random() < .025){
						var person = new Person(this.session,{x:x*20,y:y*20});
						person.position.x = x*20;
						person.position.y = y*20;
					}

					else if(Math.random() < .002){
						//var fire = new Fire(this.session,{x:(x*20),y:(y*20)});
						//fire.position.x = x*20;
						//fire.position.y = y*20;
					}
					else if(Math.random() < .009){
						var charge = new Recharge(this.session,{x:x*20,y:y*20});
						
					}
					else if(Math.random() < .006){
						var charge = new AirSwitch(this.session,{x:x*20,y:y*20});
						
					}
					else if(Math.random() < .0045){
						var charge = new Pod(this.session,{x:x*20,y:y*20});
						
					}

				}
				
			}
		}
	},
	startFire: function(){
		for(var i =0;i<200;i++){
			var x = ~~(Math.random()*this.width)
			var y = ~~(Math.random()*this.height)
			if(this.grid[x][y].type == 1){
				var fire = new Fire(this.session,{x:(x*20),y:(y*20)});
				break;
			}
		}
	},
	openRandomDoor: function(){
		for(var i =0;i<200;i++){
			var x = ~~(Math.random()*this.width)
			var y = ~~(Math.random()*this.height)
			if(this.grid[x][y].type == 7){
				this.openDoor(x,y);
				break;
			}
		}
	},
	clearFire: function(x,y,dir,count){
		if(x<0)return ;
		if(y<0)return ;
		if(x>=this.width)return ;
		if(y>=this.height)return ;
		if(count < 0)return;
		var tile = this.grid[x][y];
		if(!(tile.walkable != [][0] && tile.walkable  ))return;
		if(this.grid[x][y].fire != [][0]){
			this.grid[x][y].fire.remove();
			this.grid[x][y].fire = [][0]
		}
		var smoke = new Smoke(this.session,{x:x*20,y:y*20})
		var newPos = {x:x,y:y}

		if(dir == 1) newPos.x++;
		if(dir == 2) newPos.y++;
		if(dir == 3) newPos.x--;
		if(dir == 0) newPos.y--;

		this.clearFire(newPos.x,newPos.y,dir,count-1);
		var newPos2 = {x:newPos.x,y:newPos.y}
		if(dir == 1) newPos2.y++;
		if(dir == 2) newPos2.x++;
		if(dir == 3) newPos2.y--;
		if(dir == 0) newPos2.x--;
		if(Math.random() < .7)
		this.clearFire(newPos2.x,newPos2.y,dir,count-1);

		var newPos2 = {x:newPos.x,y:newPos.y}
		if(dir == 1) newPos2.y--;
		if(dir == 2) newPos2.x--;
		if(dir == 3) newPos2.y++;
		if(dir == 0) newPos2.x++;
		if(Math.random() < .7)
		this.clearFire(newPos2.x,newPos2.y,dir,count-1);
	},
	openDoor: function(x,y){
		if(x<0)return [][0];
		if(y<0)return [][0];
		if(x>=this.width)return [][0];
		if(y>=this.height)return [][0];
		if(this.grid[x][y].type != 7) return;

		this.grid[x][y].type = 8;
		this.spriteMap[x][y].texture = this.session.spriteSheet[this.grid[x][y].type][0];
		this.grid[x][y].walkable = true;
		this.openDoor(x-1,y)
		this.openDoor(x+1,y)
		this.openDoor(x,y-1)
		this.openDoor(x,y+1)
	},
	closeDoor: function(x,y){
		if(x<0)return ;
		if(y<0)return ;
		if(x>=this.width)return ;
		if(y>=this.height)return ;
		if(this.grid[x][y].type != 8) return;
		this.grid[x][y].type = 7;
		this.spriteMap[x][y].texture = this.session.spriteSheet[this.grid[x][y].type][0];
		this.grid[x][y].walkable = false;
		this.closeDoor(x-1,y)
		this.closeDoor(x+1,y)
		this.closeDoor(x,y-1)
		this.closeDoor(x,y+1)
	},
	getTile: function(x,y){
		if(x<0)return [][0];
		if(y<0)return [][0];
		if(x>=this.width)return [][0];
		if(y>=this.height)return [][0];

		return this.grid[x][y];
	},
	generateMap: function(){
		var rooms = [];
		//start room
		var newRoom = {x:~~(80),y:~~(80),w:30,h:30};
			
		rooms.push(newRoom);
		restart:for(var i=0;i<400;i++){
			var newRoom = {x:~~(110/5*Math.random())*5+5,y:~~(110/5*Math.random())*5+5,w:10+5*~~(3*Math.random()),h:10+5*~~(3*Math.random())};
			for(var q=0;q<rooms.length;q++){
				var r = rooms[q]
				if(Math.abs(r.x - newRoom.x) < (r.x > newRoom.x ? newRoom.w : r.w)+1 && Math.abs(r.y - newRoom.y) < (r.y > newRoom.y ? newRoom.h : r.h)+1 )
					continue restart;
			
				//if(r.y < newRoom.y && r.y+r.h > newRoom.y)
				//	continue restart;
				//if(r.x < newRoom.x && r.x > newRoom.x+newRoom.w)
				//	continue restart;
				//if(r.y < newRoom.y && r.y > newRoom.y+newRoom.h)
				//	continue restart;
			}
			rooms.push(newRoom);
		}

		




		for(var q=0;q<rooms.length;q++){
			var r = rooms[q]
			for(var x=0;x<r.w;x++)
				for(var y=0;y<r.h;y++){
					this.grid[r.x+x][r.y+y].type =1;
					if(x==0)this.grid[r.x+x][r.y+y].type =2;
					if(y==0)this.grid[r.x+x][r.y+y].type =2;
					if(x==r.w-1)this.grid[r.x+x][r.y+y].type =2;
					if(y==r.h-1)this.grid[r.x+x][r.y+y].type =2;
				}
		}

		//Add paths 
		var paths = []

		restartPath:for(var i=0;i<140;i++){
			var newPath = []
			var dir = ~~(4*Math.random())
			var start = {x:~~(120/10*Math.random())*10+2,y:~~(120/10*Math.random())*10+2}
			var lastPoint = start;
			var connected = 0;
			newPath.push(start);

			var count = 0;
			if(this.grid[lastPoint.x][lastPoint.y].type != 0)
				continue restartPath;

			while(true){
				var newPoint = {x:lastPoint.x,y:lastPoint.y};
				if(dir ==0)newPoint.x++;
				if(dir ==1)newPoint.y++;
				if(dir ==2)newPoint.x--;
				if(dir ==3)newPoint.y--;
				if(count>50)break;
				if(lastPoint.x<=3)break;
				if(lastPoint.y<=3)break;
				if(lastPoint.x>120)break;
				if(lastPoint.y>120)break;
				if(this.grid[lastPoint.x][lastPoint.y].type != 0){
					connected++;
					break;
				}

				count++;
				newPath.push(newPoint);
				lastPoint = newPoint

			}

			dir = (dir+2)%4;
			lastPoint = start;

			while(true){
				var newPoint = {x:lastPoint.x,y:lastPoint.y};
				if(dir ==0)newPoint.x++;
				if(dir ==1)newPoint.y++;
				if(dir ==2)newPoint.x--;
				if(dir ==3)newPoint.y--;
				if(count>50)break;
				if(lastPoint.x<=3)break;
				if(lastPoint.y<=3)break;
				if(lastPoint.x>120)break;
				if(lastPoint.y>120)break;
				if(this.grid[lastPoint.x][lastPoint.y].type != 0){
					connected++;
					break;
				}

				count++;
				newPath.push(newPoint);
				lastPoint = newPoint

			}
			if(connected > 0)
				paths.push(newPath);

		}

		for(var q=0;q<paths.length;q++){
			var p = paths[q]
			for(var w=0;w<p.length;w++){
			var r = p[w]
			for(var x=-2;x<3;x++)
				for(var y=-2;y<3;y++){
					if(this.grid[r.x+x][r.y+y].type == 0)
						this.grid[r.x+x][r.y+y].type = 4;
					//if(x==0)this.grid[r.x+x][r.y+y].type =5;
					//if(y==0)this.grid[r.x+x][r.y+y].type =5;
					//if(x==4-1)this.grid[r.x+x][r.y+y].type =5;
					//if(y==4-1)this.grid[r.x+x][r.y+y].type =5;
					
				}
			}
		}

		for(var x=0;x<this.width;x++){
			for(var y=0;y<this.height;y++){
				var empty = 0;
				var path = 0;

				for(var x2=-1;x2<=1;x2++){
					for(var y2=-1;y2<=1;y2++){
						if(x+x2<0)continue;
						if(x+x2>=this.width)continue;
						if(y+y2<0)continue;
						if(y+y2>=this.height)continue;
						if(this.grid[x+x2][y+y2].type == 0)empty++;
						if(this.grid[x+x2][y+y2].type == 4)path++;

					}
				}
				if(this.grid[x][y].type != 0){
					if(this.grid[x][y].type == 2 && empty == 0)
						this.grid[x][y].type = 7;
					
					if(empty>0 )
						this.grid[x][y].type = 2;
				}
				
			}
		}
		for(var x=0;x<this.width;x++){
			for(var y=0;y<this.height;y++){
				var empty = 0;
				var path = 0;
				var room = 0;

				for(var x2=-1;x2<=1;x2++){
					for(var y2=-1;y2<=1;y2++){
						if(x+x2<0)continue;
						if(x+x2>=this.width)continue;
						if(y+y2<0)continue;
						if(y+y2>=this.height)continue;
						if(this.grid[x+x2][y+y2].type == 0)empty++;
						if(this.grid[x+x2][y+y2].type == 4)path++;
						if(this.grid[x+x2][y+y2].type == 1)room++;

					}
				}
				if(this.grid[x][y].type != 0){
					
					if(empty>0 && path>0 && room ==0)
						this.grid[x][y].type = 9;
					
					
				}
				if(this.grid[x][y].type == 1)this.grid[x][y].walkable = true;
				if(this.grid[x][y].type == 8)this.grid[x][y].walkable = true;
				if(this.grid[x][y].type == 4)this.grid[x][y].walkable = true;
							
				
			}
		}


	},
	isAddable: function (){
		return false;
	},
	init_render: function (){

		PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

		//SSSSOOOOOOOO FASSSSTTTTTT
		this.session.tileSheetTexture  = new PIXI.BaseTexture.fromImage("objects.png");
		//SONIC FAST
		this.session.fastTiles = new PIXI.ParticleContainer(60000,{position:true, uvs: true,alpha: true,rotation: true,scale: true});
		this.session.fastTiles.roundPixelsboolean = true;
		this.session.spriteSheet = [];
		var tileSize = 20;
		for(var x =0;x<10;x++){	
			this.session.spriteSheet[x] = new Array();
			for(var y =0;y<10;y++){
				this.session.spriteSheet[x][y] = new PIXI.Texture(this.session.tileSheetTexture, new PIXI.Rectangle(x*(tileSize), y*(tileSize), tileSize, tileSize));
			}
		}
	
		for(var x =0;x<this.width;x++){	
			this.spriteMap[x] = [];
			for(var y =0;y<this.height;y++){
			
				this.spriteMap[x][y] = new PIXI.Sprite(this.session.spriteSheet[this.grid[x][y].type][0]);
				this.spriteMap[x][y].position.x = (tileSize-.01)*x;
				this.spriteMap[x][y].position.y = (tileSize-.01)*y;

				if(this.grid[x][y].type != 0)
					//this.spriteMap[x][y].alpha = 0;
				this.session.fastTiles.addChild(this.spriteMap[x][y]);
			}
		}

		this.session.container.addChild(this.session.fastTiles);
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

		this.session.fastTiles.position.x = offsetX;
		this.session.fastTiles.position.y = offsetY;
		this.session.fastTiles.scale.x = camera.sx;
		this.session.fastTiles.scale.y = camera.sy;


		//console.log(1);
		

		
	}
});