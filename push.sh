#!/bin/bash
#
# Script for pushing
# to GitHub through the CLI
#

if [ $# -ne 2 ]
then
    echo -e '\e[31m<Error>\e[0m Incorrect command syntax!'
    echo -e 'The \e[32mcorrect\e[0m usage is: ./push.sh <"message"> <branch>'
else
    echo "-- Adding changes to your GH repo --"
    git add .
    git commit -m "$1"
    git push origin $2
    echo "-- Done --"
fi