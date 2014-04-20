/**
 * Given an array of values (either numerical or categorical) where there is one
 * value per dimension, creates a point object.
 */
function Point(valuesArr) {
    this.values = valuesArr;
    //this.cv = this.normalizedVal();
    this.d = valuesArr.length;
    this.isNumerical = true;
    if (this.d > 0 && (typeof valuesArr[0] != "number")) {
        this.isNumerical = false;
    }
}

Point.prototype.getDimcv = function(dimIndex) {
    return this.cv[dimIndex];
}

/**
 * Given the index of a dimension, returns the value of the point along that axis.
 */
Point.prototype.getDim = function(dimIndex) {
    return this.values[dimIndex];
}

Point.prototype.assignGroup = function(groupNum) {
    this.group = groupNum;
}

Point.prototype.setId = function(id) {
    this.id = id;
}

Point.prototype.normalizedVal = function() {
    var new_array = [];
    for (var i=0; i<this.values.length; i++) {
	if (i==2 || i==1 || i==9 || i==10 || i==12 || i==13 || i==15 || i==24 || i==27){
	    new_array.push(this.values[i]);
	} else{
	    if (i<=1) {
		new_array.push((this.values[i] - statArr[1][i])/statArr[2][i]);
	    } else if (i >=1 && i<9){
		new_array.push((this.values[i] - statArr[1][i-2])/statArr[2][i-2]);
	    } else if( i>=11 && i<=12){
		new_array.push((this.values[i] - statArr[1][i-4])/statArr[2][i-4]);
	    } else if( i>=13 && i<=15){
		new_array.push((this.values[i] - statArr[1][i-6])/statArr[2][i-6]);
	    } else if(i==18){
		new_array.push((this.values[i] - statArr[1][i-6])/statArr[2][i-6]);
	    } else if( i>=15 && i<=24){
		new_array.push((this.values[i] - statArr[1][i-7])/statArr[2][i-7]);
	    } else if( i>=24 && i<=27){
		new_array.push((this.values[i] - statArr[1][i-8])/statArr[2][i-8]);
	    }else if( i>=27){
		new_array.push((this.values[i] - statArr[1][i-9])/statArr[2][i-9]);
	    }
	}
    }
    return new_array;
}
/**
 * Given a point, returns true if this point is the same as the other point.
 */
Point.prototype.equals = function(otherPoint) {
    if (!otherPoint) {
        return false;
    }
    if (this.d !== otherPoint.d) {
        return false;
    } 
    for (var i = 0; i < this.d; i++) {
 if (this.getDim(i) !== otherPoint.getDim(i) && this.getDim(i)*0==otherPoint.getDim(i)*0) {
            return false;
        }
    }
    return true;
}

/**
 * Finds the distance from the current point (this) to the given other point.
 * If both points contain numerical values, the Euclidean distance is used.
 * If both points contain categorical values, the Jaccard distance is used.
 * If the point types don't match, null will be returned.
 */
Point.prototype.distTo = function(otherPoint) {
    if (this.isNumerical && otherPoint.isNumerical) {
        return euclideanDist(this, otherPoint);
    } else if (!this.isNumerical && !otherPoint.isNumerical) {
        return jaccardDist(this, otherPoint);
    } else {
        return null;
    }
}

/* Warning: assumes both points have the same number of dimensions.
 * Ignores any dimensions that are actually not numerical.
 */
function euclideanDist(point1, point2) {
    var sum = 0;
    for (var i = 0; i < point1.d; i++) {
	if (i==5) {
	continue;
	}else {
        var diff = point1.getDim(i) - point2.getDim(i);                                               
        if (!isNaN(diff)) {                                                                           
            sum += Math.pow(diff, 2);
        }
	}
    }                                                                                                 
    return Math.sqrt(sum);
}
/*
function euclideanDist(point1, point2) {
    var sum = 0;
    for (var i = 0; i < point1.d; i++) {
        if (typeof point1.getDim(i) == "number" && typeof point2.getDim(i) == "number") {
            sum += Math.pow(point1.getDim(i) - point2.getDim(i), 2);
        }
    }
    return Math.sqrt(sum);
}*/

/* Warning: assumes both points have the same number of dimensions. */
function jaccardDist(point1, point2) {
    var unionCount = 0;
    var intersectionCount = 0;
    for (var i = 0; i < point1.d; i++) {
        var val1 = point1.getDim(i);
        var val2 = point2.getDim(i);
        if (val1 === val2) {
            intersectionCount++;
            unionCount++;
        } else {
            unionCount += 2;
        }
    }
    return (unionCount - intersectionCount) / unionCount;
}


