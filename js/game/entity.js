var Entity = Class.extend({
	init: function init(session,point){
		this.session = session;
		this.position = point || {x:0,y:0};

		this.parent = [][0];
		this.children = [];
		this.properties = {};
	},
	getProperty: function(id){
		var prop = this.properties[id];
		if(prop == [][0]){
			if(this.parent != [][0])
				return this.parent.getProperty(id);
		} 
		return prop;
	},
	getName: function(){
		return this.name;
	},
	contains: function(x,y){
		return false;
	},
	updatePolygon: function (){
		for(var i =0;i<this.children.length;i++)
			this.children[i].updatePolygon();
	},
	isSelectable: function (){
		return true;
	},
	init_render: function (){

	},
	destroy_render: function (){

	},
	render: function (){
		

	}
});