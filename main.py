from os import listdir
import json
import numpy
import nltk

data_dir = './data'

excluded_items = set([133, 117, 30])

num_heros = 121
num_items = 266

hero_item_use = numpy.zeros((num_heros, num_items))
hero_item_win_use = numpy.zeros((num_heros, num_items))
win_ratio = numpy.zeros((num_heros, num_items))

pl_count = 0

for idx, data_filename in enumerate(listdir(data_dir)):
	if idx > 1000:
		break

	if idx % 100 == 0:
		print idx

	file_path = data_dir + '/' + data_filename

	with open(file_path, 'r') as input_file:
		match_data = json.loads(input_file.read())

		radiant_win = match_data['radiant_win']
		players_info = match_data['players']

		for player in players_info:
			if player['purchase_log']:
				pl_count += 1
				print match_data['match_id']
				break
			# kills = player['kills']
			# assists = player['assists']
			# deaths = player['deaths']
			# win = player['win']

			# hero_id = player['hero_id']

			# if hero_id > 120:
			# 	print 'hero'

			# items = []

			# for item_idx in xrange(6):
			# 	item_id = player['item_' + str(item_idx)]

			# 	if item_id in excluded_items:
			# 		continue

			# 	hero_item_use[hero_id, item_id] += 1

			# 	if win == 1:
			# 		hero_item_win_use[hero_id, item_id] += 1

print pl_count

# for i in xrange(num_heros):
# 	max_ratio = 0
# 	arg_max_ratio = 0
# 	max_use = 0

# 	for j in xrange(num_items):
# 		if hero_item_use[i, j] == 0:
# 			ratio = 0
# 		else:
# 			ratio = hero_item_win_use[i, j] / hero_item_use[i, j]
# 		win_ratio[i, j] = ratio

# 		if hero_item_use[i, j] > 5 and ratio > max_ratio:
# 			max_ratio = ratio
# 			arg_max_ratio = j
# 			max_use = hero_item_use[i, j]

# 	print i, max_ratio, arg_max_ratio, max_use

# print win_ratio


# 			