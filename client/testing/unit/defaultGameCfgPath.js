import cfg from '../../src/renderer/util/cfg'
import system from '../../src/renderer/util/system'
import constants from '../../src/enum/game'

const lines = system.fileReader(constants.defaultGameCfg, 'testing the game cfg file loading')
const inputLines = system.fileReader(constants.defaultInputIni, 'testing the input ini file loading')

export default {
  config: 'disabled basic reading of a cfg file test' || cfg.cfgParser(lines),
  safeWriteTest: 'disabled safe write test' || (() => {
    const old = cfg.cfgParser(lines)
    old.FloatingText.EnemyDamage_Enabled = 0
    const newLines = cfg.cfgWriter(old)
    system.safeGameCfgWriter(constants.defaultGameCfg, newLines, 'trying to test game cfg writer')
  }),
  input: cfg.cfgParser(inputLines)
}
