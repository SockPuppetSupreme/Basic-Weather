
function Vector2(x,y){
	
	this.x = x;
	this.y = y;
	
	//returns a new vector with the two vectors added together
	this.add = function(vector){
		return new Vector2(this.x+vector.x,this.y+vector.y);
	}
	
}