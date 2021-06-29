import _ from 'lodash'

const formatMostPlayedChamps = (mostPlayedChamps, gamesWinRates) => {
  const [champion1, champion2, champion3] = mostPlayedChamps

  return {
    topChampion1: _.get(champion1, 'championName', null),
    topChampion1AvgKills: _.get(champion1, 'avgKills', null),
    topChampion1AvgAssists: _.get(champion1, 'avgAssists', null),
    topChampion1AvgDeaths: _.get(champion1, 'avgDeaths', null),
    topChampion1Played: Number(gamesWinRates[0]) || null,
    topChampion1WinRate: Number(gamesWinRates[1]) || null,

    topChampion2: _.get(champion2, 'championName', null),
    topChampion2AvgKills: _.get(champion2, 'avgKills', null),
    topChampion2AvgAssists: _.get(champion2, 'avgAssists', null),
    topChampion2AvgDeaths: _.get(champion2, 'avgDeaths', null),
    topChampion2Played: Number(gamesWinRates[2]) || null,
    topChampion2WinRate: Number(gamesWinRates[3]) || null,

    topChampion3: _.get(champion3, 'championName', null),
    topChampion3AvgKills: _.get(champion3, 'avgKills', null),
    topChampion3AvgAssists: _.get(champion3, 'avgAssists', null),
    topChampion3AvgDeaths: _.get(champion3, 'avgDeaths', null),
    topChampion3Played: Number(gamesWinRates[4]) || null,
    topChampion3WinRate: Number(gamesWinRates[5]) || null
  }
}

const getMostPlayedChamps = ($) => {
  const mostPlayedChampions = []
  const favChampsSelector = $('#favchamps > div.tabs-content > div:nth-child(2)')
  favChampsSelector.find('.champColumn').each((i, champCol) => {
    const championData = $(champCol).text().split('\n').map(i => i.trim()).filter(Boolean)
    mostPlayedChampions.push({
      championName: championData[0].toLowerCase(),
      avgKills: Number(championData[championData.length - 3].split(' ')[0]),
      avgDeaths: Number(championData[championData.length - 2].split(' ')[0]),
      avgAssists: Number(championData[championData.length - 1].split(' ')[0])
    })
  })

  const championGamesAndWinRates = []
  favChampsSelector.find('tr').each((i, tr) => {
    $(tr).find('progressbar').each((i, ele) => {
      championGamesAndWinRates.push($(ele).attr('data-value'))
    })
  })

  return formatMostPlayedChamps(mostPlayedChampions, championGamesAndWinRates)
}

export default getMostPlayedChamps
