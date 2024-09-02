#!/bin/bash

echo "Starting Server"
cd server
npm install
npm run start:dev &

echo "Starting Clinet"
cd ../client
npm install 
npm run dev &

wait

echo "Both Server and Client is running"
