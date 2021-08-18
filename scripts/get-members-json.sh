#!/bin/sh

DST=$1
SRC=https://script.google.com/macros/s/AKfycbwYoR0gLZGJDd-6cJExE5oPQMcArmVKqNNyV1a4FV_kl5--BfVV5N-bbB0T014nY3mO/exec

LOG=/tmp/get-members-json.log

wget --output-document=$DST --output-file=$LOG $SRC
