#ifndef PIMPL_H
#define PIMPL_H

#include <iostream>
#include <memory>
#include <set>

class CTeam
{
public:
    using UID = std::size_t;
    CTeam();
    ~CTeam();
    void addTeammate(UID uid);
    void delTeammate(UID uid);
    std::size_t count() const;
private:
    std::set<UID> m_team;
    class Impl;
    std::unique_ptr<Impl> m_impl;
};

inline void test_pimpl()
{
    CTeam team;
    team.addTeammate(1);
    team.addTeammate(2);
    team.addTeammate(3);
    team.addTeammate(4);

    std::cout << team.count() << std::endl;

    team.delTeammate(2);
    team.delTeammate(3);

    std::cout << team.count() << std::endl;
}

#endif // PIMPL_H
