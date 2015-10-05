# Houlihan Code Challenge - Foursquare Yelp 2015 10 04  

This repo was built with node v4.0.0 and npm v2.14.2

# Commits

## Three hour mark

Data mine of yelp done.

Data mine of foursquare without pagination.


## The End

### Done

Paginated search of the foursquare and yelp APIs, which populate mongo collections.

Fuzzy logic to match address and business name, and save correlations into new collection.


### Not Done

what3words api.

Pagination only works on square geographical areas.  counties.json has a few examples.  That said, it doesn't work on any county in Texas and/or California.

Some problems with fuzzy logic.  Some correlations created for not-identical businesses.


### Example

Run it on localhost:3000

```
# Query Yelp for all restuarants in moore county texas
localhost:3000/yelp/mine-yelp?county=moore

# Query Foursquare for all restaurants in moore county texas
localhost:3000/fs/userless/mine-foursquare?county=moore

# Create correlations collection
localhost:3000/fuzzy/correlate-data

# Get all correlation records and mongoose populate into them the associated yelpBusiness and foursquareVenue records
localhost:3000/fuzzy/get-correlations
```