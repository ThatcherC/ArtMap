alter results table so it has a gold, silver, and bronze column

-------------
Proposed flow: select a year and medals and maybe other stuff

Map shows lines from each country to the host city, varying thickness
info window lists countries and medal counts

Click country in map or info window and get entries from that country in the info window

Click an entry to get its info (new page???)

Click an artist to see all their entries (new page)

-----------
Filters
- Year of Games
- Model
- Country of origin

Front page:
Each circle links to a map info page

Information we want for an artwork
- Year
- Title
- Location
- Artist
- Artist bio
- url?


Plan:
- [ ] Server
  - [ ] Map page html
  - [ ] REST endpoint:
    - [ ] start date
    - [ ] end date
    - [ ] Country of Origin
    - [ ] Type
    - [ ] Medal type
    Returns [[pieces],[artists (index by id)]]
- [ ] Schemes:
  - [ ] Piece
        [title, url, artist, countryOfOrigin??, year, hostCountry, medal]
  - [ ] Artist
        [name, bio, location, personid]
- [ ] Page:
  - [ ] Map Embed
  - [ ] Filters and controls
    - [ ] Year, medal, country
    - [ ] 'Update' button -> ajax request -> repopulate page
