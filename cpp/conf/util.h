#ifndef UTIL_H
#define UTIL_H

#include <algorithm>
#include <cstdio>
#include <fstream>
#include <string>
#include <map>
#include <utility>

using kv_pairs = std::map<std::string, std::string>;

inline bool findC(const std::string& s, char c)
{
    if (s.find(c) != std::string::npos) {
        return true;
    } else {
        return false;
    }
}

inline void removeC(std::string& s, char c)
{
    auto begin = std::remove(s.begin(), s.end(), c);
    s.erase(begin, s.end());
}

class INIReader
{
public:
    INIReader(const char *sFileName, std::ios_base::openmode mode = std::ios_base::in)
    {
        std::ifstream is(sFileName, mode);

        if (!is.is_open()) {
            std::printf("Failed to open %s.\n", sFileName);
        } else {
            std::string line;
            std::string currSection;
            while (!is.eof()) {
                std::getline(is, line);

                if (findC(line, ';')) {
                    line.erase(line.find(';'));
                }
                removeC(line, ' ');

                if (findC(line, '[') && findC(line, ']')) {
                    std::size_t left = line.find('['), right = line.find(']');
                    std::string section = line.substr(left + 1, right - (left + 1));
                    currSection = section;
                    properties[section] = kv_pairs();
                }
                else if (findC(line, '=')) {
                    std::size_t pos = line.find('=');
                    std::string key = line.substr(0, pos);
                    std::string value = line.substr(pos + 1);
                    properties[currSection][key] = value;
                }
            }
        }

        if (is.is_open()) {
            is.close();
        }
    }

    void printInfo()
    {
        for (auto& _kv : properties) {
            std::printf("[%s]\n", _kv.first.c_str());
            for (auto& kv : _kv.second) {
                std::printf("%s=%s\n", kv.first.c_str(), kv.second.c_str());
            }
        }
    }
private:
    std::map<std::string, kv_pairs> properties;
};

inline void test_ini()
{
    INIReader oReader("config.ini");
    oReader.printInfo();
}

#endif // UTIL_H
