#include "pimpl.h"

class CTeam::Impl
{
public:
    Impl() = default;
    bool addTeammate(std::set<UID>& team, UID uid) {
        if (team.find(uid) != team.end()) {
            return false;
        } else {
            team.insert(uid);
            return true;
        }
    }
    bool delTeammate(std::set<UID>& team, UID uid) {
        if (team.find(uid) == team.end()) {
            return false;
        } else {
            team.erase(uid);
            return true;
        }
    }
};

CTeam::CTeam() : m_impl(new Impl) {}

CTeam::~CTeam() = default;

void CTeam::addTeammate(UID uid)
{
    m_impl->addTeammate(m_team, uid);
}

void CTeam::delTeammate(UID uid)
{
    m_impl->delTeammate(m_team, uid);
}

std::size_t CTeam::count() const
{
    return m_team.size();
}
