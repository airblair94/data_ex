import get_data as gd
import get_data2 as gd2
import numpy as np

dicts = gd.get_data_list_of_dicts()
headers = gd.get_headers()
print len(headers)
for i in range(len(headers)):
    print headers[i]

rows_lol = []
for i in range(len(gd.get_data_slice(headers[0], dicts))):
    rows_lol.append([])
#print len(rows_lol)    
"""
rows_with_cadences = []
cadence_colm = gd.get_data_slice("cadence", dicts)
for i in range(len(cadence_colm)):
    if cadence_colm[i] == "Yes" or cadence_colm[i] == "True":
	rows_with_cadences.append(i)

print len(rows_with_cadences)
"""
column_length = len(gd.get_data_slice(headers[0], dicts))
for i in range(len(headers)):
    if i == 8 or i==18:
	column = gd.get_data_slice_numbers(headers[i], dicts)
    else:
	column = gd.get_data_slice(headers[i], dicts)
    for j in range(column_length):
	if i == 6:
	    rows_lol[j].append(column[j])
	elif i ==22:
	    rows_lol[j].append(column[j])
	elif i == 34:
	    rows_lol[j].append(column[j])
	elif i==11:
	    rows_lol[j].append(column[j])
	elif i==15:
	    rows_lol[j].append(column[j])
	elif i ==8:
	    rows_lol[j].append(column[j])
	elif i==18:
	    rows_lol[j].append(column[j])
"""
for i in range(len(headers)):
    column = gd.get_data_slice(headers[i], dicts)
    for j in range(len(column)):
	if i-1 in rows_with_cadences:
	    rows_lol[j].append(column[j])
	else:
	    print "no cadence"
"""
new_headers = ["id","start_measure","cadence_alter","cadence_final_tone","stop_measure","cadence","cadence_kind"]
gd.write_data("test1.csv", new_headers, rows_lol)

sp_col = 5;
old_data = rows_lol
new_data = []
"""
for i in range(len(gd.get_data_slice(headers[0], dicts))):
    new_data.append([])
"""  
 
for j in range(column_length):
    if (old_data[j][sp_col] == "True" or old_data[j][sp_col] == "Yes"):
	new_data.append(old_data[j])

gd.write_data("test2.csv", new_headers, new_data)
changing_csv = new_data
#this next part will be mostly code borrowed form casey.  The idea is to create two extra columns in the csv that check the tone of the cadence before and the tone after the current cadence
#Written by Casey
def make_cadence_map(csv_input, csv_output, index_of_interest, lol):
  #Variable Setup.
  headers = gd2.get_headers()
  #print headers
  start_measure_index = headers.index("start_measure")
  #print start_measure_index
  id_index = headers.index("id")
  header = headers[index_of_interest]
  headers += ["{}_before".format(header)]
  headers += ["{}_after".format(header)]
  new_dicts = gd2.get_data_list_of_dicts()
  data = lol
  data_by_composition = {row[id_index]:[] for row in data}
  new_data = []

  #Sort (ascending) the individual entries for each composition by the first element.
  for row in data:
    composition_id = row[id_index]
    data_by_composition[composition_id].append(row)
    #try:
    data_by_composition[composition_id].sort(key=lambda x: int(x[start_measure_index]))
    #data_by_composition[composition_id].sort(key = start_measure_index)
    #except ValueError:
	#print row
  #For each entry, find the next one consecutively.
  for row in data:
    comp_entries = data_by_composition[row[id_index]]
    i = comp_entries.index(row)

    element_before = comp_entries[i-1][index_of_interest] if i>0 else "None"
    element_after = comp_entries[i+1][index_of_interest] if i<len(comp_entries)-1 else "None"
    new_data.append(row + [element_before, element_after])
  
  print "File written successfully! Added 'before' and 'after' for {}".format(header)
  gd2.write_data(csv_output, new_headers, new_data)

make_cadence_map("test2.csv", "test3.csv", 3, changing_csv)
