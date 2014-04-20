#!/usr/bin/python
import get_data as gd
import numpy as np
"""
Here, you should put your linear regression analysis, i.e., the functions you
need to go through the data and find interesting linearly related variables
(pairs that have small residuals).  You should feel free to use the numpy
linear regression function to do the calculation for you.  For information on
the numpy linear regression function see:
http://docs.scipy.org/doc/numpy/reference/generated/numpy.linalg.lstsq.html
"""
dicts = gd.get_data_list_of_dicts()
headers = gd.get_headers()
dicts1000 = gd.get_data_list_of_dicts_for_scale(1000)
#print headers
#print dicts[0]
g_active = gd.get_data_slice('Global_active_power', dicts)
g_intensity = gd.get_data_slice('Global_intensity', dicts)

g_active1000 = gd.get_data_slice('Global_active_power', dicts1000)
g_intensity1000 = gd.get_data_slice('Global_intensity', dicts1000)
#print g_active

print len(g_active)
rows_list_of_lists = []
for i in range(len(g_active1000)):
	rows_list_of_lists.append([g_active1000[i], g_intensity1000[i]])
gd.write_data('test2.csv', ['column1', 'column2'], rows_list_of_lists)
#print hello



array = np.vstack([g_active, np.ones(len(g_active))]).T
#print array

m, c = np.linalg.lstsq(array, g_intensity)[0]

print m, c

residual = 0
for i in range(len(g_active)):
	residual = residual + (m*float(g_active[i]) + c - float(g_intensity[i]))**2
print residual
