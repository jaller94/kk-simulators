#!/bin/bash

avconv -i pngs/world%03d.png -vf vflip out.mp4
