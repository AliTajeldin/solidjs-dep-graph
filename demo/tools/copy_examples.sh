#!/bin/bash

if [ ! -d public ]; then
  echo no public directory
  exit 1
fi

rm -rf public/examples
mkdir public/examples

cp src/examples/*.tsx public/examples