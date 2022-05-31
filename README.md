# Overview

Project used to test search ranking adjustments.

## TODOs
### Technical

- [ ] Extract client connection to typescript class
- [ ] Move elastic search settings and volume mounts to their own files: (ex. see [recommendations here](https://www.elastic.co/guide/en/elastic-stack-get-started/current/get-started-stack-docker.html#load-settings-file))

### Research

- [ ] Experiment with function-based queries
- [ ] Experiment with document expansion
- [ ] Experiment with query expansion

## Proposed Algorithm Changes

### Expansion

Expand queries and documents

- **Temporal**
  - Temporal granularity ("second", "minute", "day", "month")
  - Temporal ranges ("May-June")
  - Temporal frequency ("monthly")
  - Temporal relevance ("past", "previous", "upcoming", "soon")
- **Spatial**
  - Spatial granularity ("block", "state", "country")
    - *use Foursquare or Mapzen hierarchy*
  - Spatial reference ("45, -75", "DC", "1711 Mass Ave.")
  - spatial relation ("near me", "within", "next to")
- **Thematic**
  - Thematic granularity ("homicide", "crime")

### Filtering & Relevance Adjustments

Weighting certain attributes and expansions, or filtering them out.


## Questions

- How do we identify algorithmic changes in query, document?
  - TAH: annotate a query
  - TAH: annotate a document with regex matching "near", "recent"
- How do we effectively integrate algorithmic changes into a ranking function?
  - TAH: Make index migrations
  - TAH: Add boolean + function to `query: {}` algorithm
  - TAH: have different experimental `query1()`, `query2()`, ... functions and call each one or run A/B/C testing
- How do we test?
  - A/B/C query environments on different routes (or randomize between them)
  - Test against MAP, CTR
  - Tune algorithm if not effective & see which tunes produce better results (possible research findings)

## Start

- Start the services: `docker-compose up -d`
- Stop the services: `docker-compose down -v`
