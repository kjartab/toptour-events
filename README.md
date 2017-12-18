# Toptour Sync
[![Build Status](https://travis-ci.org/kjartab/toptour-sync.svg?branch=master)](https://travis-ci.org/kjartab/toptour-sync)


## Description
This project sync data from UT.no to a postgis database.


CREATE VIEW toptour_sane

## This is how the system works

1. UtnoFetcher - Function which fetches data routinely (e.g. every 5 minutes)
2. UtnoFetcher - Dispatches an "DocumentUpdate" event onto a message queue
3. UtnoLoader - Loads data from a queue / topic =>
4. UtnoDatabase