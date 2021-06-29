import errors from './errors'
import system from './system'

const detectCfgLineType = (line) => {
  if (line.split('=').length === 2) {
    return 'setting'
  } else if (line.split('[').length === 2) {
    return 'heading'
  } else if (line === ' ' || line === '' || line === '\n' || line === '\r') {
    return 'empty'
  } else {
    throw errors.brokenAssumptionError(`assumed any line in a cfg is either a heading or empty space or a setting line recieved: ${line}`, 'cfg.js')
  }
}
const settingToObj = (str) => {
  const [settingName, settingValue] = str.split('=')
  return { settingName, settingValue }
}
// takes a line from a cfg file thats either a heading ex. [Fun Settings] or a setting funlevel=100
// and creates a multilevel json file that also keeps track of the order of the headings and settings
const cfgParser = (lines) => {
  const jsonOutput = { headingOrders: [], settingOrders: {} }
  try {
    let currentHeading = null
    lines.forEach(line => {
      const type = detectCfgLineType(line)
      if (type === 'heading') {
        currentHeading = line.slice(1, line.length - 2)
        jsonOutput.headingOrders.push(currentHeading)
        jsonOutput.settingOrders[currentHeading] = []
        jsonOutput[currentHeading] = {}
      } else if (type === 'setting') {
        const { settingName, settingValue } = settingToObj(line)
        jsonOutput[currentHeading][settingName] = settingValue
        jsonOutput.settingOrders[currentHeading].push(settingName)
      }
    })
    return jsonOutput
  } catch (err) {
    throw errors.brokenAssumptionError('issues trying to parse cfg file:' + JSON.stringify(err), 'inside cfg Parser')
  }
}
// takes a jsonCfg and turns it into lines for writing to a file
const cfgWriter = (jsonCfg, prePaddingArray = ['\r'], lineSpacer = '\r', postPaddingArray = ['']) => {
  const lines = [].concat(prePaddingArray)
  jsonCfg.headingOrders.forEach(heading => {
    lines.push(lineSpacer)
    lines.push(`[${heading}]\r`)
    jsonCfg.settingOrders[heading].forEach(setting => {
      const value = jsonCfg[heading][setting]
      lines.push(`${setting}=${value}`)
    })
  })
  return lines.concat(postPaddingArray)
}

const getLeagueConfigJson = (path) => {
  return cfgParser(system.fileReader(path))
}
export default {
  cfgParser,
  iniParser: cfgParser,
  detectCfgLineType,
  cfgWriter,
  getLeagueConfigJson
}
