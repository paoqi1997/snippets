# https://cmake.org/cmake/help/v3.22/release/3.8.html
cmake_minimum_required(VERSION 3.8)
# https://cmake.org/cmake/help/v3.22/command/project.html
project(hello-cs LANGUAGES CSharp)

# devenv hello-cs.sln /build Debug
add_executable(app main.cs)
