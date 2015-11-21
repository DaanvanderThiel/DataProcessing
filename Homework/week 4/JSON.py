import json
import csv
date =[]
with open( 'converted.csv','rb' ) as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    with open('listoflist.csv','wb') as writefile:
        for row in spamreader:
            date.append(row)

        print date
            #writefile.write(date)
with open('converted.csv', 'wb') as outfile:
    json.dump(date,outfile)
