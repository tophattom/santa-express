var Vector = function(i, j, k) {
	this.i = i;
	this.j = j;
	this.k = k;
};

Vector.prototype.set = function(i, j, k) {
	this.i = i;
	this.j = j;
	this.k = k;

	return this;
};

Vector.prototype.div = function(scalar) {
	this.i /= scalar;
	this.j /= scalar;
	this.k /= scalar;

	return this;
};

Vector.prototype.mul = function(scalar) {
	this.i *= scalar;
	this.j *= scalar;
	this.k *= scalar;

	return this;
};

Vector.prototype.add = function(vec) {
	this.i += vec.i;
	this.j += vec.j;
	this.k += vec.k;

	return this;
};

Vector.prototype.sub = function(vec) {
	this.i -= vec.i;
	this.j -= vec.j;
	this.k -= vec.k;

	return this;
};

Vector.prototype.length = function() {
	return Math.sqrt(this.i * this.i + this.j * this.j + this.k * this.k);
};

Vector.prototype.normalize = function() {
	this.div(this.length());

	return this;
};

Vector.prototype.dot = function(vec) {
	return this.i * vec.i + this.j * vec.j + this.k * vec.k;
};

Vector.prototype.reverse = function() {
	this.mul(-1);

	return this;
};

Vector.prototype.clone = function(vec) {
	return new Vector(this.i, this.j, this.k);
};

Vector.prototype.toString = function() {
	return "[" + this.i + ", " + this.j + ", " + this.k + "]";
};



Vector.angle = function(vec1, vec2) {
	return Math.acos(vec1.dot(vec2) / (vec1.length() * vec2.length()));
}