const formatRank = (rawRankText) => {
  const [rawRank, rawDivision] = rawRankText.trim().split(' ').filter(Boolean)

  const divisionMap = {
    I: 3,
    II: 2,
    III: 1,
    IV: 0
  }

  const rankMap = {
    iron: 0,
    bronze: 4,
    silver: 8,
    gold: 12,
    platinum: 16,
    diamond: 20,
    master: 24,
    grandmaster: 25,
    challenger: 26
  }

  const rankName = rawRank.toLowerCase()
  const rankScore = rankMap[rankName]
  const divisionScore = divisionMap[rawDivision] || 0

  return rankScore + divisionScore
}

const getRank = ($) => {
  const rawRank = $('.mainRankingDescriptionText').find('.leagueTier').text()
  return formatRank(rawRank)
}

export default getRank
