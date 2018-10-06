/**
 * C++之读取INI文件
 */

#include <iostream>
#include <fstream>
#include <cstdio>
#include <string>
#include <map>
#include <algorithm>

using std::cerr;
using std::cout;
using std::endl;

using kv_pairs = std::map<std::string, std::string>;

inline bool is_valid(size_t pos)
{
    return pos != std::string::npos;
}

inline void remove_char(std::string& str, const char c)
{
    str.erase(std::remove(str.begin(), str.end(), c), str.end());
}

int main()
{
    std::ifstream fs;

    fs.open("./conf.ini", std::ios_base::in);

    std::string buf;

    std::string curr_section, k, v;

    std::map<std::string, kv_pairs> settings;

    if (!fs.is_open())
    {
        cerr << "Failed to open file!\n";
        return 1;
    }
    else
    {
        while (!fs.eof())
        {
            std::getline(fs, buf);

            remove_char(buf, ' ');

            size_t left = buf.find('['), right = buf.find(']');

            // Section合法
            if (is_valid(left) && is_valid(right))
            {
                if (left < right)
                {
                    remove_char(buf, '['); remove_char(buf, ']');

                    curr_section = buf;

                    settings.insert(std::make_pair(curr_section, kv_pairs()));
                }
            }

            size_t pos = buf.find('=');

            // Key-Value合法
            if (is_valid(pos))
            {
                k = buf.substr(0, pos), v = buf.substr(pos + 1);

                settings[curr_section].insert(std::make_pair(k, v));
            }
        }
    }

    for (auto it = settings.begin(); it != settings.end(); ++it)
    {
        std::printf("[%s]\n", it->first.c_str());

        auto mmp = it->second;

        for (auto qt = mmp.begin(); qt != mmp.end(); ++qt)
        {
            std::printf("%s = %s\n", qt->first.c_str(), qt->second.c_str());
        }
    } return 0;
}
