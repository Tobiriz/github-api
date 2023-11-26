#!/bin/bash
# Get organization secrets using GitHub REST-API

# Store arguments in variables and convert to integer
token=$1
organization=$2
githubApi=$3
results_per_page=$(($4 + 0))
page=$(($5 + 0))

# Checking input parameters
if [ -z "$organization" ];
then
    echo "[ERROR]Required field \"organization\" cannot be empty"
    exit 2
fi
if [ $results_per_page -lt 1 || $results_per_page -gt 100 ];
then
    echo "[ERROR]$results_per_page results per page is not a valid input"
    echo "[ERROR]Results per page must be between 1 and 100 (included)"
    exit 3
fi
if [ $page -lt 1 ];
then
    echo "[ERROR]Page $page is not a valid input"
    echo "[ERROR]Pagenumber cannot be negative"
    exit 4
fi

# Call REST-API
curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${token}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    ${githubApi}/orgs/${organization}/actions/secrets
