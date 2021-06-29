const cheerio = require('cheerio')

const axios = require('axios')

// Use the `get` method of axios with the URL of the ButterCMS documentation page as an argument
const formatRank = (rawRankText) => {
  const rankText = rank.trim()
  const rankStrings = rankText.split(' ')

  if(rankStrings.length === 1) {
    return { rank: rankStrings[0].lowerCase(), division: 0 }
  }
  const division = {
    'I' : 1,
    'II': 2,
    'III': 3,
    'IV': 4
  }[rankStrings[1]]
  return { rank: `${rankStrings[0].lowerCase()}`, division }
}

const getSummonerData = async(summonerName, region='NA') => {
  
  const { data }  = await axios.get('https://www.leagueofgraphs.com/summoner/las/exselor')
  const $ = cheerio.load(data)
  /* get LP, Rank, Top champions, Roles */
  const lp = Number($('.league-points > span').text())
  const { rank, division } = formatRank($('.mainRankingDescriptionText').find('.leagueTier').text())
  console.log(Rank)
  console.log(LP)
}

getSummonerData()