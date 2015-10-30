#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest ranking tv series.
'''
# IF YOU WANT TO TEST YOUR ATTEMPT, RUN THE test-tvscraper.py SCRIPT.
import csv

from pattern.web import URL, DOM,plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# alles moet comma separated! list van lists
def extract_tvseries(dom):
    url = URL("http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series")
    dom = DOM(url.download(cached = True))
    # create two arrays to make a list at the end to write off
    infoserie = []
    infoSerieList = []
    a = ''
    for e in dom.by_tag("tr.detailed")[:50]: # Top 50 imdb entries.
        # get title
        for a in e.by_tag("a")[:1]: # First <a class="title"> in entry.
            infoserie = []
            s = a.attrs["title"]
            infoserie += [s.split('(')[0].strip()]
        # get rating
        for rating in e.by_tag("div.rating-list")[:1]:
            rating = rating.attrs["title"]
            infoserie +=[rating[17:20]]
        # get genre
        for genre in e.by_tag("span.genre")[:1]:
            for m in genre.by_tag("a"):
                infoserie += [m.content]
        # get actors
        for actors in e.by_tag("span.credit"):
            for actors_sub in actors.by_tag("a"):

                infoserie +=[actors_sub.content]
        #get time
        for time in e.by_tag("span.runtime")[:1]:

            infoserie += [time.content[:3]]
        infotopserie =[]
        # encode to get rid of unicode error
        for encoding in infoserie:

            infotopserie += [encoding.encode('utf-8')]
        # add row to list
        infoSerieList.append(infotopserie)

    '''
    Extract a list of highest ranking TV series from DOM (of IMDB page).

    Each TV series entry should contain the following fields:
    - TV Title
    - Ranking
    - Genres (comma separated if more than one)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    '''

    # ADD YOUR CODE HERE TO EXTRACT THE ABOVE INFORMATION ABOUT THE
    # HIGHEST RANKING TV-SERIES
    # NOTE: FOR THIS EXERCISE YOU ARE ALLOWED (BUT NOT REQUIRED) TO IGNORE
    # UNICODE CHARACTERS AND SIMPLY LEAVE THEM OUT OF THE OUTPUT.

    return infoSerieList  # replace this line as well as appropriate


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest ranking TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Ranking', 'Genre', 'Actors', 'Runtime'])

    for row in tvseries:
        # prints everything row by row
        # not correct :(
        writer.writerow(row)


    # ADD SOME CODE OF YOURSELF HERE TO WRITE THE TV-SERIES TO DISK

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in testing / grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)
