#!/bin/sh

echo "input contents at $INPUT:"
find "$(dirname $INPUT)" -maxdepth 2
echo "output contents at $OUTPUT:"
find "$(dirname $OUTPUT)" -maxdepth 2


echo "ls build dir"
ls ./build

node ./build/index.js
