import numpy as np
import math

class Point:
    def __init__(self, valuesArr):
	self.values = valuesArr
	self.d = len(valuesArr)
	self.is_num = False
   
    def get_dim(self, dim_index):
	return self.values[dim_index]

    def assign_group(self, group_num):
	self.group = group_num
    
    def set_id(self, pid):
	self.pid = pid 

    def equals(self, other):
	if not other:
	    return False
	if self.d != other.d:
	    return False
	for i in range(len(self.d)):
	    if slef.get_dim(i) != other.get_dim(i) and self.get_dim(i)*0 == otherPoint.get_dim(i)*0:
		return False
	return True

    def dist_to(self, other):
	return jaccard_dist(self, other)

# do jaccard distance

def jaccard_dist(p1, p2):
    union_count = 0
    intersection_count = 0
    for i in range(0,p1.d):
	val1 = p1.get_dim(i)
	val2 = p2.get_dim(i)
	if val1 == val2:
	    intersection_count += 1
	    union_count += 1
	else:
	    union_count += 2
    return (union_count - intersection_count) / union_count

def euclidean_dist(p1, p2):
    my_sum = 0
    for i in range(len(p1.d)):
	if i==5:
	    pass
	else:
	    diff = p1.get_dim(i) - p2.get_dim(i)
	my_sum += math.sqrt(my_sum)


class node:
	def __init__(self, root, pl, pr):
		self.root = root
		self.pl = pl
		self.pr = pr

	
	def __repr__(self):
		if self.get_left() is None and self.get_right() is None:
			list =  [self.root.values, 0, 0]
		elif self.get_left() is not None and self.get_right() is not None:
			list = [self.root.values, 1, 1]
		elif self.get_left() is None and self.get_right() is not None:
			list =  [self.root.values, 0, 1]
		else:
			list = [self.root.values, 1, 0]
		return str(list)


	def get_left(self):
		return self.pl
    
	def get_right(self):
		return self.pr

	def is_leaf(self):
		return self.get_right() is None and self.get_left() is None

	def get_root(self):
		return self.root

def maketree(axis, points):
	if len(points) == 0:
		return null
	if len(points) == 1:
		return node(points[0], None, None)
	else:
		dim_num = len(points[0].values)
		if axis > dim_num:
			axis = 0
		sorted_list = sorted(points)
		mid_point_float = len(points)//2
		mid_point = int(math.floor(mid_point_float))
		print mid_point	
		assert(isinstance(mid_point, int))
		return node(sorted_list[mid_point], maketree(axis+1, sorted_list[0: mid_point]), maketree(axis+1, sorted_list[mid_point:]))

def nearest_neighbor(current_node, best_node, qp, axis, k_nearest_final):
	if len(k_nearest_final) >= 2:
		return k_nearest_final
	else:
		return nearest_neighbor_helper(current_node, best_node, qp, axis, k_nearest_final)

def nearest_neighbor_helper(current_node, best_node, qp, axis, k_nearest):
	c = 2
	if axis > len(current_node.get_root().values)-1:
		axis = 0
	if current_node.get_root().dist_to(qp) < qp.dist_to(best_node.get_root()):
		best_node = current_node
	if current_node.is_leaf():
		k_nearest.append(best_node.get_root())
	elif current_node.get_right() is None:
		nearest_neighbor(current_node.get_left(), best_node, qp, axis +1, k_nearest)
	elif current_node.get_left() is None:
		nearest_neighbor(current_node.get_right(), best_node, qp, axis +1, k_nearest)
	else:
		if qp.values[axis] <= current_node.get_root().values[axis]:
			nearest_neighbor(current_node.get_left(), best_node, qp, axis +1, k_nearest)
			if abs(qp.values[axis] - current_node.get_root().values[axis] <= best_node.get_root().dist_to(qp)*c):
				nearest_neighbor(current_node.get_right(), best_node, qp, axis +1, k_nearest)
		else:
			nearest_neighbor(current_node.get_right(), best_node, qp, axis +1, k_nearest)
			if abs(qp.values[axis] - current_node.get_root().values[axis] <= best_node.get_root().dist_to(qp)*c):
				nearest_neighbor(current_node.get_left(), best_node, qp, axis +1, k_nearest)
	k_nearest.append(best_node.get_root())
	return nearest_neighbor(current_node, best_node, qp, axis, k_nearest)
	
A = Point([10,20]) 
B = Point([5, 15])
C = Point([2, 4])
D = Point([15, 10])
E = Point([20, 25])
Q = Point([18,22])

tree = maketree(0, [A,B,C,D,E])
print tree
list_of_nearest = nearest_neighbor(tree, tree, Q, 0, [])
for entry in list_of_nearest:
	print entry.values
