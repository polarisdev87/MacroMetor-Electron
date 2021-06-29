
const formatMostPlayedRolesWithWinRates = (roles = [], gamesAndWinRates = []) => {
  const roleFormat = (role) => (typeof role === 'string') ? role.toLowerCase() : null

  return {
    topRole1: roleFormat(roles[0]),
    topRole1Games: Number(gamesAndWinRates[0]) || null,
    topRole1WinRate: Number(gamesAndWinRates[1]) || null,
    topRole2: roleFormat(roles[1]),
    topRole2Games: Number(gamesAndWinRates[2]) || null,
    topRole2WinRate: Number(gamesAndWinRates[3]) || null,
    topRole3: roleFormat(roles[2]),
    topRole3Games: Number(gamesAndWinRates[4]) || null,
    topRole3WinRate: Number(gamesAndWinRates[5]) || null
  }
}

// Get most played roles with win rates
const getMostPlayedRolesWithWinRates = ($) => {
  const profileSelector = $('#profileRoles > div.tabs-content > div:nth-child(2)')

  const roles = profileSelector.text()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(3)

  const dataArr = []
  profileSelector.find('progressbar')
    .each((i, element) => {
      dataArr.push($(element).attr('data-value'))
    })

  return formatMostPlayedRolesWithWinRates(roles, dataArr)
}

export default getMostPlayedRolesWithWinRates
