import json

def hurricaneDetail_csv_to_json(line):
	latitudeHemisphere = line[27]
	latitude = float(line[23:27].strip())

	if (latitudeHemisphere == 'S'):
		latitude = -latitude

	longitudeHemisphere = line[35]
	longitude = float(line[30:35].strip())

	if (longitudeHemisphere == 'W'):
		longitude = -longitude
		
	details = {
		# Hurricane detail means every line-item/ data point under a hurricane header
		#Date using ISO 8601 datetime format 'yyyy-MM-ddTHH:mm:ssZ'
		'Date': f'{line[0:4]}-{line[4:6]}-{line[6:8]}T{line[10:12]}:{line[12:14]}:00Z',
		'RecordIdentifier': line[16],
		'SystemStatus': line[19:21].strip(),
		'Latitude': latitude,
		'Longitude': longitude,
		'WindSpeed_Knots': int(line[38:41].strip()),
		'MinimumPressure_Millibars': int(line[43:47].strip()),
		'MaximumWindRadius_NM': int(line[121:125].strip()),
		'WindRadii_NE_34Knots': int(line[49:53].strip()),
		'WindRadii_SE_34Knots': int(line[55:59].strip()),
		'WindRadii_SW_34Knots': int(line[61:65].strip()),
		'WindRadii_NW_34Knots': int(line[67:71].strip()),
		'WindRadii_NE_50Knots': int(line[73:77].strip()),
		'WindRadii_SE_50Knots': int(line[79:83].strip()),
		'WindRadii_SW_50Knots': int(line[85:89].strip()),
		'WindRadii_NW_50Knots': int(line[91:95].strip()),
		'WindRadii_NE_64Knots': int(line[97:101].strip()),
		'WindRadii_SE_64Knots': int(line[103:107].strip()),
		'WindRadii_SW_64Knots': int(line[109:113].strip()),
		'WindRadii_NW_64Knots': int(line[115:119].strip())
	}
	return details

def hurricane_csv_to_json(line):
	hurricaneHeader = {
		'Basin': line[0:2],
		'ATCFCycloneNumber': line[2:4].strip(),
		'Year': int(line[4:8]),
		'Name': line[18:28].strip(),
		"MaxWindSpeed_Knots": 0,
		"LandFallDate": "0001-01-01T01:00:00Z",
		'HurricaneDetails': []
	}
	return hurricaneHeader

# for now im just manually adding a HURDAT2.csv file into the same directory and generating another json file then manually uploading into mongoDB. 
with open('HURDAT2.csv', 'r') as file, open('HURDAT2.json', 'w', encoding='utf-8') as output:
	rowNumber = 0
	fileJson = []
	hurricaneJson = ''
	for line in file:
		sline = line.rstrip()
		if (rowNumber == 0): #if row number is 0 then it must be a Hurricane Header which includes number of line-item details below
			rowNumber = int(sline[33:36])
			hurricaneJson = hurricane_csv_to_json(sline)
			continue
		else:
			rowNumber -= 1
			details = hurricaneDetail_csv_to_json(sline)
			if (details["RecordIdentifier"] == "L"):
				hurricaneJson["LandFallDate"] = details["Date"]
			if (details["WindSpeed_Knots"] > hurricaneJson["MaxWindSpeed_Knots"]):
				hurricaneJson["MaxWindSpeed_Knots"] = details["WindSpeed_Knots"]
			hurricaneJson['HurricaneDetails'].append(details)
			if (rowNumber == 0): # if there are 0 rows left add the entire hurricane to json file. 
				fileJson.append(hurricaneJson)
	
	json.dump(fileJson, output, ensure_ascii=False, indent=4)


			
    
    

