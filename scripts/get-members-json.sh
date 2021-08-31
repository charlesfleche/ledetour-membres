#!/bin/sh

DST=$1
SRC=https://script.google.com/macros/s/AKfycbxn8qstSRiod-92Op2hSUACZW3tbsa3ytdu4X8JbykXfFQ9VUBU2tuXCdHUKVIt8z3dkg/exec

LOG=/tmp/get-members-json.log

wget --output-document=$DST --output-file=$LOG $SRC
