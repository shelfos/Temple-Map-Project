# Overview

My intent with this project was to learn the basics of the ArcGIS (Arc Geographic Information System) software suite.  I decided to make a map with all the temples of the Church of Jesus Christ of Latter-day Saints as data points.  Some temples have only been announced, while others are in various stages of construction, and finally those that have been dedicated for active use by members of the Church.  There are a few temples that have been included for historical reasons but either no longer exist, or are in some other status.  I wanted to incorporate the use of a date/time slider in order to visualize the hastening of temple building in the latter part of the 20th century to today.  Clicking on a data point will show a picture of the temple as well as useful locational information and links to external sites with more information about the temple.

ArcGIS has many, many options.  In fact, sometimes it seemed like there were multiple ways to do the same thing.  The tutorials are good, but for some reason I found it difficult to always find clear paths on how to incorporate what I wanted to learn and do.  Maybe my data is just too simple.  They have SO many cool features and ways to do things.  I've only scratched the surface.  To start, you need to include the stylesheet and SDK for arcGis in your <head> tag.  You'll also need an API key, which will require you to set up an account.  I chose the free version since I'm just learning.  In your main js script, you'll need to specify the modules you want include and then use JavaScript and objects to customize your map and data.  You can connect to an external data source, but I chose to create my own .geojson file locally.  The main reason for this is because the temple data I used is not available via API, at least not from a known source.   

I was able to download .kml and .csv files with the temple location data from a site called churchofjesuschristtemples.org.  They are not affiliated with the official church (The Church of Jesus Christ of Latter-day Saints), but their site is amazing!  The .kml data is really just map data in <xml> format.  I needed this to be in .geojson format (basically the same thing but JSON).  I ended up creating a PowerShell script to convert the .kml to .geojson.  I then created a GeoJSONLayer for pulling in the data, as well as various components to make the map more usable.  For example, a legend, a date/time slider, and a pop-up template to display a temple image, temple information, and links to the churchofjesuschristtemples.org site.  All the image links are also from that site.  While these are nice, I would prefer to point to the actual church website instead, but was beyond the scope of this specific project.

[Software Demo Video](https://youtu.be/4Kww-nahmeo)

# Development Environment

I used VS Code for code development.  I downloaded an extension called Live Server so I could test my changes locally while I made them.  The html, css, and Javascript are pretty vanilla.  Of course, I also made heavy use of the ArcGIS SDK.  I also used an online tool call JSON formatter which is really handy for testing your JSON data for validity and also for "prettifying" it.

# Useful Websites

* [ArcGIS developer documentation](https://developers.arcgis.com/)
* [ArcGIS Maps SDK for JavaScript](https://developers.arcgis.com/javascript/latest/)
* [Tutorial for Creating an API key](https://developers.arcgis.com/documentation/security-and-authentication/api-key-authentication/tutorials/create-an-api-key/)
* [ArcGIS TimeSlider](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-TimeSlider.html)
* [GeoJSON](https://geojson.org/)
* [GeoJSON Reference](https://doc.arcgis.com/en/arcgis-online/reference/geojson.htm)
* [How to Enable Live Server on Visual Studio Code](https://www.geeksforgeeks.org/how-to-enable-live-server-on-visual-studio-code/)
* [JSON formatter](https://jsonformatter.org/json-pretty-print)
* [Temple data download from churchofjesuschristtemples.org](https://churchofjesuschristtemples.org/maps/downloads/)
* [The Church of Jesus Christ of Latter-day Saints Temple List](https://www.churchofjesuschrist.org/temples/list?lang=eng)

# Future Work

* Even though there aren't any APIs readily available for gathering temple data, I would like to write some scripts to get live data from the official church website (churchofjesuschrist.org).  The downside to this is that their site is very dynamic, which means the scripts could easily break if the church decides to update their site pages.
* I'd like to make the data more accurate.  The dates used by the date slider reference the most recent status date.  For example, if a temple was announced in January 1995, under construction as of May 1996, and dedicated in August 1999, the August 1999 would be the latest status.  While sliding the data slider you wouldn't see that point displayed until August 1999 since that is the latest status date. It would be better to see all milestone dates, with the appropriate color for the corresponding time ranges.  
* I'd like allow the user to display/hide the various status data points.  For example, you could display temples that are Under Construction during a given time range.  As part of this, it could also be useful to include a "left-side" slider that allows you to narrow the date range.  You could to this to see only those temples whose status dates are in that narrow time range (all temples dedicated in the month of May 2020 for example).
* Maybe this wouldn't be very useful, but if the square footage of the temple is known, it could be used to size the map markers accordingly.
* If it's available somehow, it would be interesting to display the temple "district" boundaries.