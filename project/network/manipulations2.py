#from sklearn.neighbors import KNeighborsClassifier
from sklearn.neighbors import NearestNeighbors
from sklearn.neighbors.kd_tree import KDTree
#from sklearn.neighbors import DistanceMetric
import numpy as np
import get_data2 as gd

headers = gd.get_headers()
dicts = gd.get_data_list_of_dicts() 

rows_lol = []
for i in range(len(gd.get_data_slice(headers[0], dicts))):
	rows_lol.append([])

for i in range(len(headers)):
	if i ==1 or i==4:
		column = gd.get_data_slice_numbers(headers[i], dicts)
	else:
		column = gd.get_data_slice_numbers(headers[i], dicts)
	for j in range(len(gd.get_data_slice(headers[0], dicts))):
		rows_lol[j].append(column[j])

X = np.array(rows_lol)
#nbrs = NearestNeighbors(n_neighbors=5, algorithm ='kd_tree', metric ='jaccard').fit(X)
kdt = KDTree(X, leaf_size=30, metric='euclidean')
kdt.query(X, k=3, return_distance=False)
