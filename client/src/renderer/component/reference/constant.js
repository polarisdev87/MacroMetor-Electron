/* eslint-disable */
import leagueKey from '../../util/leagueKey'
import playerConfig from '../../util/playerConfig'
export const GET_GAME_DATA = 'get_game_data'

const isHotkeySet = (key) => {
  const playerSetting = playerConfig.getPlayerConfig().input.GameEvents[key]
  const evtKeys = leagueKey.leagueGameSettingsToEventsMapper(playerSetting).filter(x => !!x)
  return evtKeys.length > 0
}

export const SettingsDeepDiveStatic = {
  PI: {
    code: 'PI',
    idx: 1,
    uuid: '8f8416cf-cbc9-4780-81d7-24b895d831fb',
    trackerId: 'PI',
    title: 'Ping Intent',
    coverData: {
      imgSrc: 'https://storage.googleapis.com/temporary-mm/ping_intent_cover.png'
    },
    start: {
      videoUrl: 'https://www.youtube.com/watch?v=deGo2udtGfs',
      title: 'I: Welcome to the Ping Intention Deep Dive!',
      description: 'Watch the video to learn all about using ping to let your team know your intentions and win many more games. If you play without using ping intent its like driving a car without indicator lights...'
    },
    check: {
      title: 'II : Check that your settings are optimal for Ping Intention practice',
      description: 'You can go back to the video if you missed how to setup for this deep dive',
      verifyHandler: () => {
        return baseKeyVerify('evtPlayerPingAreaIsWarded', 47, [])
      },
      success: {
        msgTitle: 'Enemy vision ping was set',
        subtitle: 'Vision alert key was to V'
      }
    },
    setup: {
      title: 'III: Turn on tracking to start earning experience',
    },
    practice: {
      title: 'IV: How is practice going?',
      description: 'Watch the video once you practice a bit. You can always check your current level for this skill here.',
      getLevel: (progress) => {
        if (!progress) {
          return { level: 0, exp: 0 }
        }
        const counts = Math.floor(progress.length / 3)
        return { level: countsToLevel(counts), exp: counts * 100 }
      },
      videoUrl: 'https://www.youtube.com/watch?v=_k47UkN_FIk'
    },
    reflect: {
      title: 'V: Lets see how its going!',
      description: 'Check off the use cases you have mastered',
      questions: [
        'I use enemy vision ping alert many times in every game',
        'I ping in sequences of three',
        'I use the keyboard shortcut to ping',
        'I use pings during objective takes if the enemy has vision',
        'I use pings to alert my jungler of wards in my lane'
      ]
    },
    complete: {
      title: 'VI: Please submit some feedback on this section!'
    },
    tags: ['Ping Intent', 'Communication'],
    trackerData: {
      startTriggers: ['GAME_START'],
      stopTriggers: ['GAME_END', 'GAME_ERROR'],
      buttonsConfigs: ['evtPlayerPingAreaIsWarded']
    }

  },
  FF: {
    code: 'FF',
    idx: 2,
    uuid: '5b6196ca-05cf-40b7-9518-87d79d80363d',
    trackerId: 'FF',
    title: 'Farming Fundamental',
    coverData: {
      imgSrc: 'https://storage.googleapis.com/temporary-mm/farming_fundamentals_cover.png'
    },
    start: {
      videoUrl: 'https://www.youtube.com/watch?v=sF1lDWeY5ug',
      title: 'I: Welcome to the Farming Fundamentals!',
      description: 'Watch the video to learn all about basics of distance management, and movement control with stop command.'
    },
    check: {
      title: 'II: Check that you are setup!',
      description: 'Check that your settings are optimal for farming. If you don\'t see a green check mark double check the video!',
      verifyHandler: () => {
        return baseButtonVerify('evtPlayerStopPosition', 4) + baseKeyVerify('evtPlayerAttackMove', 30)
      },
      success: {
        msgTitle: 'Successfully detected that enemy vision ping is optimally set',
        subtitle: 'Vision alert key was to V'
      }
    },
    setup: {
      title: 'III: Turn on tracking to gain experience in using this skill'
    },
    practice: {
      title: 'IV: How is practice going?',
      description: 'Watch the video once you practice a bit. You can always check your current level for this skill here.',
      getLevel: (progress) => {
        if (!progress) {
          return { level: 0, exp: 0 }
        }
        const counts = Math.floor(progress.length / 4)
        return { level: countsToLevel(counts), exp: counts * 100 }
      },
      videoUrl: 'https://www.youtube.com/watch?v=0sVJqYSdDpI'
    },
    reflect: {
      title: 'V: Ready for self assessment?',
      description: 'Check off the things you have mastered!',
      questions: [
        'I am constantly using stop command to control my positioning',
        'I farm comfortably at maximium distance when needed',
        'I no longer need to click on every minion in order to last hit',
        'I take less harrasment in lane as a result of my improved positioning',
        'Every auto attack is a deliberate action on my part'
      ]
    },
    complete: {

    },
    tags: ['Farming', 'Efficiency'],
    trackerData: {
      startTriggers: ['GAME_START'],
      stopTriggers: ['GAME_END', 'GAME_ERROR'],
      buttonsConfigs: ['evtPlayerStopPosition', 'evtPlayerAttackMove']
    }
  },
  ASC: {
    code: 'ASC',
    idx: 3,
    uuid: 'b67d9ad5-16b3-41dd-a10a-13346e5a21a6',
    trackerId: 'ASC',
    title: 'Abilities and Skill Shots Casting',
    coverData: {
      imgSrc: 'https://storage.googleapis.com/temporary-mm/ability_skill_shot_casting_cover.png'
    },
    start: {
      videoUrl: 'https://www.youtube.com/watch?v=CgJ7B1qJKcc',
      title: 'I: Welcome to the Skill Shots Casting!',
      description: 'Watch the video to learn a great setup for your ability and spell casts so that you can land skill shots both quickly and precisely. Its not just about quick casting all the time.'
    },
    check: {
      title: 'II: Check settings for spell and ability casting',
      description: 'Checks your config to double check that you have the right settings',
      verifyHandler: () => {
        // check quick casting is on
        const { Quickbinds } = playerConfig.getPlayerConfig().input
        const quickCast1 = Quickbinds.evtCastSpell1smart
        const quickCast2 = Quickbinds.evtCastSpell2smart
        const quickCast3 = Quickbinds.evtCastSpell3smart
        const quickCast4 = Quickbinds.evtCastSpell4smart
        const quickCastPredicate = (
          quickCast1 && quickCast2 && quickCast3 && quickCast4
        )
        if (!quickCastPredicate) {
          return { quickCast1, quickCast2, quickCast3, quickCast4 }
        }
        const normalCast1 = baseKeyVerify('evtNormalCastSpell1', 16, ['shiftKey'])
        const normalCast2 = baseKeyVerify('evtNormalCastSpell2', 17, ['shiftKey'])
        const normalCast3 = baseKeyVerify('evtNormalCastSpell3', 18, ['shiftKey'])
        const normalCast4 = baseKeyVerify('evtNormalCastSpell4', 19, ['shiftKey'])
        if (normalCast1 + normalCast2 + normalCast3 + normalCast4 !== 0) {
          return { normalCast1, normalCast2, normalCast3, normalCast4 }
        }
        return 0
      },
      success: {
        msgTitle: 'Ability and spell cast keys are set',
        subtitle: ''
      }
    },
    setup: {
      title: 'III: Turn on tracking to gain experience in using this skill'
    },
    practice: {
      title: 'IV: How is practice going?',
      description: 'Watch the video once you practice a bit. You can always check your current level for this skill here.',
      getLevel: (progress) => {
        if (!progress) {
          return { level: 0, exp: 0 }
        }
        const counts = Math.floor(progress.length)
        return { level: countsToLevel(counts), exp: counts * 100 }
      },
      videoUrl: 'https://www.youtube.com/watch?v=Yklhyf5eIDs'
    },
    reflect: {
      title: 'V: Check out the self assesment!',
      description: 'Keep track of what you have left using this section',
      questions: [
        'I am now primarily using quick casting without an indicator',
        'I can easily switch to a manual cast with an indicator to ensure proper ability placement',
        'I can use manual cast to farm at max range when needed',
        'I remember to use indicators to refresh my memory on ability ranges when needed'
      ],
      videoUrl: 'https://www.youtube.com/watch?v=Yklhyf5eIDs'
    },
    complete: {

    },
    tags: ['Ability Usage'],
    trackerData: {
      startTriggers: ['GAME_START'],
      stopTriggers: ['GAME_END', 'GAME_ERROR'],
      buttonsConfigs: ['evtNormalCastSpell1', 'evtNormalCastSpell2', 'evtNormalCastSpell3', 'evtNormalCastSpell4'],
      // don't need tracking just need to check the settings
      extraSettings: ['evtCastSpell1smart', 'evtCastSpell2smart', 'evtCastSpell3smart', 'evtCastSpell4smart']
    }

  }

}
export const byId = (id) => {
  return Object.keys(SettingsDeepDiveStatic).filter(dd => SettingsDeepDiveStatic[dd].uuid === id).map(key => SettingsDeepDiveStatic[key])[0]
}
