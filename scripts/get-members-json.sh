#!/bin/sh

DST=$1
SRC=https://script.google.com/macros/s/AKfycbx6Pupe8ricIXIOcut-XQ27wqSFFjCXkqDszfrkf54xEmxJp3QhO_x3ZCSuEKLRjbeY/exec
LOG=/tmp/get-members-json.log

wget --output-document=$DST --output-file=$LOG $SRC
