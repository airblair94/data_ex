function Cluster(center) {
    this.center = center;
    this.points = [];
    // Ideally this would be kept in a max heap.  Oh well.  I blame javascript.
    this.pointDistancesToCenter = [];
}

Cluster.prototype.addPoint = function(point, distToPoint) {
    this.points.push(point);
    this.pointDistancesToCenter.push(distToPoint);    
}

Cluster.prototype.getPoints = function() {
    return this.points;
}

Cluster.prototype.getDistToCenter = function(pointIndex) {
    return this.pointDistancesToCenter[pointIndex];
}

Cluster.prototype.setLabel = function(label) {
    this.label = label;
}

Cluster.prototype.getLabel = function() {
    return this.label;
}

Cluster.prototype.getFurthestPointFromCenter = function() {
    var far = 0;
    var farPoint = null;
    for (var i = 0; i < this.pointDistancesToCenter; i++) {
        if (this.pointDistancesToCenter[i] > far) {
            far = this.pointDistancesToCenter[i];
            farPoint = this.points[i];
        }
    }
    return farPoint;
}

function Clustering(clusters) {
    this.clusters = clusters;
    this.k = clusters.length;
}

Clustering.prototype.getClusters = function() {
    return this.clusters;
}

Clustering.prototype.equals = function(otherClustering) {
    if (this.k != otherClustering.k) {
        return false;
    }
    for (var i = 0; i < this.k; i++) {
        if (!this.clusters[i].center.equals(otherClustering.clusters[i].center)) {
            return false;
        }
    }
    return true;
}

/* Warning: this only checks the centers in the same order.  It is NOT a set equality check. */
function centerEquals(centersList1, centersList2) {
    if (!centersList1 || !centersList2) {
        return false;
    }
    if (centersList1.length !== centersList2.length) {
        return false;
    }
    for (var i = 0; i < centersList1.length; i++) {
        if (!centersList1[i].equals(centersList2[i])) {
            return false;
        }
    }
    return true;
}

function makeClustering(centers, points) {
    var clusters = [];
    for (var c = 0; c < centers.length; c++) {
        clusters.push(new Cluster(centers[c]));
    }
    for (var p = 0; p < points.length; p++) {
        var point = points[p];
        var closestClusterIndex = 0;
        var closestClusterDist = centers[0].distTo(point); 
        for (var c = 0; c < centers.length; c++) {
            var dist = centers[c].distTo(point);
            if (dist < closestClusterDist) {
                closestClusterDist = dist;
                closestClusterIndex = c;
            }
        }
        clusters[closestClusterIndex].addPoint(point, closestClusterDist);
    }
    return new Clustering(clusters);
}

function getAllPoints(clustering) {
    var all_points = [];
    var list_of_clusters = clustering.getClusters();
    for (var i=0; i<list_of_clusters.length; i++) {
	var new_points = list_of_clusters[i].getPoints().slice();
	all_points.push(new_points);
    }
    return all_points[0];
}	

function bgv(clustering) {
    var bgv = 0;
    var total_points = getAllPoints(clustering).slice();
    var num_total_points = getAllPoints(clustering).length;
    var list_with_center = kmeans(total_points, 1).getClusters().slice();
    var center_of_graph = list_with_center[0].center;
    var list_of_clusters = clustering.getClusters().slice();
    for(var i=0; i<list_of_clusters.length; i++) {
	var n = list_of_clusters[i].getPoints().slice().length;
	var distance = list_of_clusters[i].center.distTo(center_of_graph);
	bgv = bgv+(n*Math.pow(distance,2)/num_total_points);   
    }
    return bgv;
}

function tv(clustering){
    var tv = 0;
    var total_points = getAllPoints(clustering)
    var num_total_points = getAllPoints(clustering).length;
    var list_with_center = kmeans(total_points, 1).getClusters().slice();
    var center_of_graph = list_with_center[0].center;
    for(var i=0; i<num_total_points; i++) {
	tv = tv + Math.pow(total_points[i].distTo(center_of_graph),2);
    }
    return tv/num_total_points;
}

function findk(list_of_points) {
    var k =0;
    for(var i=0; i<10; i++) {
	var clustering = kmeans(list_of_points, i);
	var clustering2 = kmeans(list_of_points,i+1);
	var clustering_bgv = bgv(clustering);
	var clustering_tv = tv(clustering);
	var clustering_bgv2 = bgv(clustering2);
	var clustering_tv2 = tv(clustering2);
	var perc_var = clustering_bgv/clustering_tv;
	var perc_var2 = clustering_bgv2/clustering_tv2;
	if ((perc_var2 -perc_var) >.6 && (perc_var2 -perc_var) != 0) {
	    k = i;
	    console.log(k);
	    break;
	}
	console.log(perc_var2-perc_var);  
    }
    return k;
}
