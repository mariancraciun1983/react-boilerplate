#!/bin/bash
set -e

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
if [ "$branch" == "master" ] || [ "$branch" == "dev" ]
then
    yarn run test && yarn run lint
fi
