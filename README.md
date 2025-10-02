This project was made to track Hurricanes and Tropical Storms that make landfall in Florida, but the API takes a search area in the form of a square so different Lat & Lon can be passed in. 

Data comes from https://www.aoml.noaa.gov/hrd/hurdat/Data_Storm.html
parsing data follows https://www.aoml.noaa.gov/hrd/hurdat/hurdat2-format.pdf

For this project I focused on HURDAT 2 data from the Atlantic Basin.


Steps to run on localhost:
1) download HURDAT 2 data as txt
2) put into scripts directory and run in terminal py TOJSON.py
3) Take new Json file and upload to MongoDB 'Add Data' found in YourServer -> YourDatabase -> YourCollection. I recommend using the UI MongoDb Compass, but the desktop app or terminal are fine as well. 
4) open HurricaneApi solution then open Package Manager Console run => Install-Package MongoDB.Driver (you might also want to open powershell and run => dotnet dev-certs https --trust)
5) Open appsettings.json and modify connectionString,DatabaseName and CollectionName to point towards your preferred MongoDb
6) build and start api
7) open HurricaneApp directory and run npm run dev
