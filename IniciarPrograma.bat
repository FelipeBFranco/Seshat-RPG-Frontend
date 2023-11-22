@echo off


cd front


start cmd /k ng s


cd ..


cd back

start cmd /k mvn spring-boot:run
