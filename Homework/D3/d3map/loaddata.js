window.onload = function() {
  years = [1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,
    1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013]
  console.log(years)
  var dataDict = []
  // loading the data
  d3.json("allDataWithout0.json", function(data) {
  var data = data.map(function(d) {

    k = 0
    var l = []
    console.log(k)
    for (var p = 0; p<years.length;p++){

      dataDict.push( {
        year: years[k],
        countryCode: (d[0]),
        lifeExpectancy: d[k+1]

      });
      k++
    }
  });
  lengthdataDict = dataDict.length
  // get life expactation according to the right country
  function getLifeExpectation(country){
    for(var i = 0;i<lengthdataDict; i++ ){

  if (dataDict[i].countryCode == country && dataDict[i].year == 2013){
    console.log(dataDict[i].lifeExpectancy)
  return dataDict[i].lifeExpectancy;

  }
  }
  };
  // create map
  var map = new Datamap({
          element: document.getElementById('container'),
          fills: {
              HIGH: '#afafaf',
              LOW: '#123456',
              MEDIUM: 'blue',
              UNKNOWN: 'rgb(0,0,0)',
              defaultFill: 'grey'
          },
          geographyConfig: {
        popupTemplate: function(geo, data) {
            console.log(geo)
            return ['<div class="hoverinfo"><strong>',
                    'life expacatncy in ' + geo.properties.name, // geo.id geeft de key bijv. USA
                    ': ' + getLifeExpectation(geo.id),
                    '</strong></div>'].join('');
        }

    }
      });

      // data.map gewone for loop gebruiken
      // allDataWithout0.json voor data zonder landen zonder gegevens
      // allData.json voor alle data

// give collor to the country according to their life expactancy.

for(var i = 0;i<lengthdataDict; i++ ){
  if (dataDict[i].year == 2013){
    if (dataDict[i].lifeExpectancy <= 50){
        map.updateChoropleth({
            [dataDict[i].countryCode] : 'red' // vrange waarom een [] element?? http://stackoverflow.com/questions/2274242/using-a-variable-for-a-key-in-a-javascript-object-literal
        })
    }
    else if (dataDict[i].lifeExpectancy <= 55) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'orangeRed',
          lifeExpectancy: dataDict[i].lifeExpectancy
      })

    }

    else if (dataDict[i].lifeExpectancy <= 60 && dataDict[i].lifeExpectancy > 55) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'orange'
      })
    }
    else if (dataDict[i].lifeExpectancy <= 65 && dataDict[i].lifeExpectancy > 60) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'yellow'
      })
    }
    else if (dataDict[i].lifeExpectancy <= 70 && dataDict[i].lifeExpectancy > 65) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'YellowGreen'
      })
    }
    else if (dataDict[i].lifeExpectancy <= 75 && dataDict[i].lifeExpectancy > 70) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'lightgreen'
      })
    }
    else if (dataDict[i].lifeExpectancy <= 80 && dataDict[i].lifeExpectancy > 75) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'green'
      })
    }
    else if (dataDict[i].lifeExpectancy > 80) {
      map.updateChoropleth({
          [dataDict[i].countryCode] : 'DarkGreen'
      })
    }
  }

}

console.log(map)









});



}
