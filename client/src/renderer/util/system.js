// file loaders
import fs from 'fs'
import errors from './errors'
import cfg from './cfg'
// gives back an array of the lines of any file type
const fileReader = (filePath, usageString) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8').split('\n')
      return data
    }
    throw errors.filePathError(filePath, usageString)
  } catch (err) {
    throw errors.implementReminder('need to have user set their path to league dynamically if default path is wrong', 'system.js fileLoader')
  }
}
const isCompatibleRewrite = (oldLine, newLine, idx) => {
  if (oldLine === newLine) {
    return true
  }
  if (cfg.detectCfgLineType(oldLine) === cfg.detectCfgLineType(newLine)) {
    if (cfg.detectCfgLineType(oldLine) === 'setting') {
      return oldLine.split('=')[0] === newLine.split('=')[0]
    }
  }
  return false
}
const isSameVersion = (onDiskData, oldLines) => {
  if (onDiskData.length !== oldLines.length) {
    throw errors.brokenAssumptionError('line length should not be different for new cfg and old cfg', 'inside isSameVersion')
  }
  for (let index = 0; index < oldLines.length; index++) {
    if (isCompatibleRewrite(onDiskData[index], oldLines[index], index)) {
      continue
    } else {
      console.error(onDiskData[index], oldLines[index])
      return false
    }
  }
  return true
}
const safeGameCfgWriter = (filePath, lines, usageString) => {
  try {
    if (fs.existsSync(filePath)) {
      const currentLines = fileReader(filePath, 'doing a read before writing game cfg')
      // check if its all the same file content that was about to be written
      if (isSameVersion(currentLines, lines)) {
        // go ahead and write
        fs.writeFileSync(filePath, lines.join('\n'))
      } else {
        throw errors.brokenAssumptionError('error in safe writing game cfg version may have changed since read', 'safeGameCfgWriter inside system.js')
      }
    }
  } catch (err) {
    throw errors.filePathError('filePath might have changed since reading config information', 'safeGameCfgWriter inside system.js')
  }
}

const fileWriter = (filePath, lines, usageString) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.writeFileSync()
      return data
    }
    throw errors.filePathError(filePath, usageString)
  } catch (err) {
    throw errors.implementReminder('need to have user set their path to league dynamically if default path is wrong', 'system.js fileLoader')
  }
}

export default {
  fileReader,
  fileWriter,
  safeGameCfgWriter
}
