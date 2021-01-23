cmake_minimum_required (VERSION 3.4)
project (cpp11unit)

file (GLOB SRCS *.cpp)
file (GLOB INCS *.h)

# 生成IDE工程时为源文件定义分组
source_group ("src" FILES ${SRCS})
source_group ("include" FILES ${INCS})

if (WIN32)
    add_executable (app ${SRCS} ${INCS})
elseif (UNIX)
    add_executable (app ${SRCS} ${INCS})
    target_link_libraries (app pthread)
endif ()
