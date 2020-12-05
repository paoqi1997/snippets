#!/bin/sh

javac -cp src -d bin src/app/Main.java
java -cp bin app/Main
