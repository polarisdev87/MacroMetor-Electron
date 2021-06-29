const addDebugMessageSideEffect = (err) => {
  console.error(err.message, '|||', err.locus || 'missing locus')
  return new Error(JSON.stringify(err))
}

export default {
  filePathError:
    (filePath, locus) => {
      return addDebugMessageSideEffect({ errorCode: 0, message: `${filePath} did not exist`, locus })
    },
  implementReminder:
    (reminderText, locus) => {
      return addDebugMessageSideEffect({ errorCode: 1, message: reminderText, locus })
    },
  brokenAssumptionError:
    (assumptionRisk, locus) => {
      return addDebugMessageSideEffect({ errorCode: 2, message: assumptionRisk, locus })
    }
}
