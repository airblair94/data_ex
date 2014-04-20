import csv
import time
import json
from pprint import pprint

DATA_FILENAME = "graph.json"

"""
def get_data_list_of_dicts():
    list = []
    with open(DATA_FILENAME) as f:
	f_csv = csv.DictReader(f)
	for row in f_csv:
	    list.append(row)
	    if len(list) == scale:
		break
    return list


dicts = get_data_list_of_dicts()
print dicts
"""

json_data = open(DATA_FILENAME)
data = json.load(json_data)
#pprint(data)



counter = 0
for key in data:
    counter = counter +1
print counter

names_list = data.keys()
print names_list[0]

link_list = []
for key in data:
    link_list.append(data[key])

links = []
for i in range(len(names_list)):
    for j in range(len(link_list[i])):
	links.append([i, names_list.index(link_list[i][j])])

print links[0]
print len(links)

actual_name = []
for i in range(len(names_list)):
    actual_name.append({"name": names_list[i]})

actual_links = []
for i in range(len(links)):
    actual_links.append({"source": links[i][0], "target": links[i][1], "value": 1})     
new_dict = { "nodes": actual_name, "links": actual_links} 
    
"""
print len(nodes_list)
print nodes_list[0]
#print data[0]
link_list = []
for key in data:
    for entry in data[key]:
	[nodes_list.index(
"""	

with open("test.json", "wb") as fp:
    json.dump(new_dict, fp)

json_data.close()
