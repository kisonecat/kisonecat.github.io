#! /bin/bash

thumbnailify() {
    mutool draw -r 180 -o - $1 0 | convert -gravity Center  -crop 1000x180+0+0 +repage png:- "${1%.*}.png"
}

find cv -iname '*.pdf' | while read file; do thumbnailify "$file"; done
