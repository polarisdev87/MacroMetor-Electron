const axios = require('axios')
// const rateLimit = require('axios-rate-limit')

// const axiosStuff = axios.create({
//   headers: { 'User-Agent': 'Mozilla/5.0' }
// })

// const axiosRateLimited = rateLimit(axiosStuff, { maxRequests: 1, perMilliseconds: 400 })

const getHTMLPage = async (rawSummonerName, region) => {
  const summonerName = rawSummonerName.split(' ').join('')
  const url = `https://www.leagueofgraphs.com/summoner/${region}/${summonerName}`
  const { data: html } = await axios.get(url)

  return html
}

export default getHTMLPage
