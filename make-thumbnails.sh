#! /bin/bash

thumbnailify() {
    mutool draw -r 40 -o - $1 0 | convert -gravity Center -crop 500x500+0+0 png:- "${1%.*}.png"
}

find cv -iname '*.pdf' | while read file; do thumbnailify "$file"; done
find research -iname '*.pdf' | while read file; do thumbnailify "$file"; done
find teaching -iname '*.pdf' | while read file; do thumbnailify "$file"; done
