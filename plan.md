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
