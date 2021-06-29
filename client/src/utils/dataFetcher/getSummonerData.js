
import cheerio from 'cheerio'
import getHTMLPage from './getHTMLPage'
import getRank from './getRank'
import getLeaguePoints from './getLeaguePoints'
// const getMostPlayedRolesWithWinRates = require('./getMostPlayedRolesWithWinrates')
// const getMostPlayedChampions = require('./getMostPlayedChampions')

const getSummonerData = async ({ summonerName, region }) => {
  try {
    const sanitizedSummonerName = summonerName.toLowerCase().split(' ').join('').trim()
    const sanitizedRegion = region.toLowerCase().trim()
    const html = await getHTMLPage(sanitizedSummonerName, sanitizedRegion)
    const $ = cheerio.load(html)
    const lp = getLeaguePoints($)
    const rankScore = getRank($)
    // const mostPlayedRoles = getMostPlayedRolesWithWinRates($)
    // const mostPlayedChamps = getMostPlayedChampions($)
    const data = {
      summonerName: sanitizedSummonerName,
      region: sanitizedRegion,
      lp,
      rankScore
    //   ...mostPlayedRoles,
    //   ...mostPlayedChamps
    }

    return data
  } catch (error) {
    console.error(`Something went wrong processing summoner data for ${summonerName} in region ${region}`, error)
    console.error({
      summonerName,
      region,
      error,
      timestamp: new Date().toISOString()
    })
    return { lp: null, rankScore: null }
  }
}

export default getSummonerData
