#!/bin/bash
sed -e 's/[0-9A-F]*://; s/#.*$//' sample.txt | xxd -r -p > a.gif
