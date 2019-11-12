#!/bin/sh

DST=$1
SRC=https://script.google.com/macros/s/AKfycbymoT_TtWoUXj4NqNJWLR-hnzo4fhk1w50VLpi21z_lHxM-Rek/exec
LOG=/tmp/get-members-json.log

wget --output-document=$DST --output-file=$LOG $SRC
