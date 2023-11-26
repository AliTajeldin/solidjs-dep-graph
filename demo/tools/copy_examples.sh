#!/bin/bash

if [ ! -d public ]; then
  echo no public directory
  exit 1
fi

rm -rf public/examples
mkdir public/examples

for src in src/examples/*.tsx; do
  dest="public/examples/$(basename $src)"
  echo copy "$src" to "$dest"
  sed '/\/\/--BEGIN$/,/\/\/--END$/!d;//d' "$src" > "$dest"
done