
import time
from datetime import date

def convertfile():
    import csv
    with open( 'KNMI_19970101.csv','rb' ) as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',')
        with open('converted.csv','wb') as writefile:
            i = 0
            for row in spamreader:
                if i < 13:
                    i += 1
                    continue

                #row[0].split(',')
                print row[0]
                print row[1]
                print row[2]
                date = row[1]
                row = date +','+ row[2].strip()
                print row
                writefile.write(row+'\n')

                #pamwriter = csv.writer(writefile, delimiter = "|" )
                #stringElement = string(row)
                #row = stringElement.split(',',1)[1]
                #spamwriter.writerow(row)

if __name__ == '__main__':
    convertfile()
