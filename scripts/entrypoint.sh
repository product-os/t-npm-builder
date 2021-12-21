#!/bin/sh

echo "input contents at $INPUT:"
find "$(dirname $INPUT)" -maxdepth 2
echo "output contents at $OUTPUT:"
find "$(dirname $OUTPUT)" -maxdepth 2

echo "my working dir"
pwd

echo "ls my dir"
ls .

node ./build/index.js
