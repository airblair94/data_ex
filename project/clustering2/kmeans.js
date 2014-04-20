/**
 * Given an array of point objects, uses k-means (Lloyd's algorithm) to compute a clustering
 * of those points.
 */
function distances_to_center(points, center) {
    var list_of_distances;
    for(var i = 0; i<points.length; i++) {
	list_of_distances.push(center.distTo(points[i]));
    }
    return list_of_distances
}

function min_in_list(distances) {
    var smallest = 100000000000000000000;
    var index_of_smallest;
    for(var i = 0; i<distances.length; i++) {
	if(distances[i] < smallest) {
	    distances[i] = smallest;
	    index_of_smallest = i;
	}
    }
    return index_of_smallest;
}

function kcenters(points, k) {
    var rand_int = Math.floor((Math.random()*points.length));
    var list_of_points = points;
    var list_of_centers;
    var list_no_centers = list_of_points.splice(rand_int,1);
    list_of_centers.push(list_of_points[rand_int]);
    while(list_of_centers.length < k) {
	var list_of_distances;
	for(var i = 0; i<list_of_centers; i++) {
	    list_of_distances.push(distances_to_center(_list_no_centers, list_of_centers[i]));
	}
    }
}

/*
var point1 = new Point([1,2]);
var point2 = new Point([5,10]);
var point3 = new Point([1,20]);
var point4 = new Point([20,10]);
var pointlist = [point1, point2, point4];
kcenters(pointlist, 2);
*/

function distances_to_center(points, center) {
    var list_of_distances = [];
    for(var i = 0; i<points.length; i++) {
	list_of_distances.push(center.distTo(points[i]));
    }
    return list_of_distances
}

function min_in_list(distances) {
    var smallest = 100000000000000000000;
    var index_of_smallest;
    for(var i = 0; i<distances.length; i++) {
	if(distances[i] < smallest) {
	    smallest = distances[i];
	    index_of_smallest = i;
	}
    }
    return index_of_smallest;
}

function mode(array){
    if(array.length == 0)
	return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
	var el = array[i];
	if(modeMap[el] == null)
	    modeMap[el] = 1;
	else
	    modeMap[el]++;  
	if(modeMap[el] > maxCount)
	{
	    maxEl = el;
	    maxCount = modeMap[el];
	}
    }
    return maxEl;
}


/*function average_of_points(list_of_points) {
    var centroid_point = []
    for (var i=0; i<list_of_points[0].d; i++) {
	var centroid_dim = 0;
	for (var j=0; j<list_of_points.length; j++) {
	    centroid_dim = centroid_dim + list_of_points[j].getDim(i);
	}
	centroid_point.push(centroid_dim/list_of_points.length);
    }
    return new Point(centroid_point);
}
*/

function average_of_points(list_of_points) {
    var centroid_point = []
    for (var i=0; i<list_of_points[0].d; i++) {
	if (i ==1 || i==4) {
	    var centroid_dim = 0;
	}else{
	     centroid_dim = [];
	}
	for (var j=0; j<list_of_points.length; j++) {
	    if (i==1 || i==4){
		centroid_dim = centroid_dim + list_of_points[j].getDim(i);
	    } else {
		centroid_dim.push(list_of_points[j].getDim(i));
	    }
	}
	if (i==1 || i==4) {
	    centroid_point.push(centroid_dim/list_of_points.length);
	}else{
	    centroid_point.push(mode(centroid_dim));
	}
    }
    return new Point(centroid_point);
}

function kcenters(points, k) {
    //var rand_int = Math.floor((Math.random()*points.length));
    var rand_int = 1;
    //console.log(points);
    var list_of_points = points.slice();
    var list_of_centers = [];
    var list_no_centers = list_of_points;
    list_no_centers.splice(rand_int, 1);
    list_of_centers.push(list_of_points[rand_int]);
    //console.log(list_no_centers);
    while(list_of_centers.length < k) {
	var list_of_distances = [];
	for (var i=0; i<list_of_centers.length; i++) {
	    list_of_distances.push(distances_to_center(list_no_centers, list_of_centers[i]));
	}
	//console.log(list_of_distances);
	var list_of_smallest = [];
	for(var i = 0; i<list_of_distances.length; i++) {
	    list_of_smallest.push(min_in_list(list_of_distances[i]));
	}
	var max = 0;
	var index_of_max;
	for(var i = 0; i<list_of_smallest.length; i++) {
	    if (list_of_smallest[i] > max) {
		max = list_of_smallest[i];
		index_of_max = i;
	    }
	}
	list_of_centers.push(list_no_centers[index_of_max]);
	list_no_centers.splice(index_of_max, 1);
    }
    return list_of_centers;
}

function equallist(list1, list2) {
    if (list1.length != list2.length) {
	return false;
    } else {
	for (var i=0; i<list1.length; i++) {
	    if (!list1[i].equals(list2[i])) {
		return false;
	    }
	}
	return true;
    }
}
/*Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}	
*/
//var point1 = new Point([1,2]);
//var point2 = new Point([5,10]);
//var point3 = new Point([1,20]);
//var point4 = new Point([20,10]);
//var pointlist = [point1, point2, point4];
//console.log(kcenters(pointlist, 2));
//console.log(distances_to_center(pointlist, point3));

function kmeans(points, k) {
    console.log(points)
    var old_centers;
    old_centers = kcenters(points, k);
    //console.log(old_centers);
    for(var j=0; j<30; j++) {
	var new_centers = [];
	//console.log(old_centers);
	//console.log(points);
	var clustering_from_old = makeClustering(old_centers, points);
	//console.log(clustering_from_old);
	var cluster_thing = clustering_from_old.getClusters().slice();
	//console.log(cluster_thing);
	for (var i=0; i<cluster_thing.length; i++) {
	    //console.log("in_this");
	    var cluster_points = cluster_thing[i].getPoints().slice();
	    //console.log("past_this");
	    //console.log(cluster_points); 
	    new_centers.push(average_of_points(cluster_points));
	}
	//console.log(new_centers);
	//console.log(equallist(new_centers, old_centers))
	
	if (equallist(new_centers, old_centers)) {
	    break;
	} else {
	    old_centers = new_centers;
	}
	//console.log(new_centers);
	//console.log(old_centers);
	//console.log("new")	
    }
    return makeClustering(new_centers, points);
}
//console.log(average_of_points(pointlist));
//console.log(kmeans(pointlist, 2))
