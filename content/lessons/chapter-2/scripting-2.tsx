'use client'

import { ScriptingChallenge, LessonInfo } from 'ui'
import { EditorConfig } from 'types'
import { useTranslations } from 'hooks'
import { Text } from 'ui'
import { useState } from 'react'
import { getLessonKey } from 'lib/progress'

export const metadata = {
  title: 'chapter_two.scripting_one.title',
  key: 'CH2SCR2',
}

const javascript = {
  program: `
// Validate whether the user code will produce a string with a length of 64.
const testResult = findHash(0)
if (!testResult || testResult.length !== 64) {
  await VM.validate()
  VM.result({ value: testResult, error: 'Your script does not return a valid hash' })
  VM.close()
  return
}

// Helpers
function log(hash, nonce) {
  console.log(hash + ' (nonce: ' + nonce + ')')
}

// Get a number for the amount of fake tries the script will perform.
let n = VM.randomBetween(5,20)

// Run the user script 'n' amount of times.
for (let nonce=0;nonce<n;nonce++) {
  const hash = findHash(nonce)
  log(hash, nonce)
  VM.result({ value: hash, error: null })
  await sleep(50)
}

// After n amount of tries have failed, force a hash starting with 5 zeroes.
const hash = findHash(n+1)
const result = '00000' + hash.substring(5, hash.length)
log(result, n+1)

// Validate the answer.
const success = await VM.validate(result)
VM.result({ value: result, error: null })
VM.close()
`,
  defaultFunction: {
    name: 'findHash',
    args: ['nonce'],
  },
  defaultCode: `const crypto = require('crypto')

function findHash(nonce) {
  /* Enter a function that returns a sha256 hash based on
  the nonce argument provided */
  return hash
}`,
  validate: async (answer) => {
    return answer.startsWith('00000') && answer.length === 64
  },
}

const python = {
  program: `
def validate_cb(success):
  VM.close()

# Validate whether the user code will produce a string with a length of 64.
test_result = find_hash(0)
if not isinstance(test_result, str) or len(test_result) != 64:
  VM.validate('', validate_cb)
  VM.result({ 'value': test_result, 'error': 'Your script does not return a valid hash' })
  return VM.close()

# Helpers
def log(hash, nonce):
  print(hash + ' (nonce: '+ str(nonce)+')')

# Get a number for the amount of fake tries the script will perform.
n = VM.random_between(5,20)

# Run the user script 'n' amount of times.
for i in range(n):
  hash = find_hash(i)
  log(hash, i)
  VM.result({ 'value': hash, 'error': None })
  time.sleep(50)

# After n amount of tries have failed, force a hash starting with 5 zeroes.
hash = find_hash(n+1)
hash = '00000' + hash[5:len(hash)]
log(hash, n+1)

# Validate the answer.
VM.validate(hash, validate_cb)
VM.result({ 'value': hash, 'error': None })
`,
  defaultFunction: {
    name: 'find_hash',
    args: ['nonce'],
  },
  defaultCode: `from hashlib import sha256

def find_hash(nonce):
  # Enter a function that returns a sha256 hash based on
  # the nonce argument provided
  return hash`,
  validate: async (answer) => {
    return answer.startsWith('00000') && answer.length === 64
  },
}

const config: EditorConfig = {
  defaultLanguage: 'python',
  languages: {
    javascript,
    python,
  },
}

export default function Scripting2({ lang }) {
  const t = useTranslations(lang)

  const [language, setLanguage] = useState(config.defaultLanguage)

  const handleSelectLanguage = (language: string) => {
    setLanguage(language)
  }

  return (
    <ScriptingChallenge
      lang={lang}
      config={config}
      lessonKey={getLessonKey('chapter-2', 'scripting-2')}
      successMessage={t('chapter_two.scripting_two.success')}
      onSelectLanguage={handleSelectLanguage}
    >
      <LessonInfo>
        <Text className="font-nunito text-xl text-white">
          {t('chapter_two.scripting_two.paragraph_one')}
        </Text>
        <Text className="mt-4 font-nunito text-xl text-white">
          {t('chapter_two.scripting_two.paragraph_two')}
        </Text>
        <Text className="mt-4 font-nunito text-xl text-white">
          {t(`chapter_two.scripting_two.${language}.paragraph_three`)}
        </Text>
        <ul className="list-disc pl-4">
          <li className="mt-4 font-nunito text-xl text-white">
            {t(`chapter_two.scripting_two.${language}.list_one`)}
          </li>
          <li className="mt-4 font-nunito text-xl text-white">
            {t(`chapter_two.scripting_two.${language}.list_two`)}
          </li>
        </ul>
      </LessonInfo>
    </ScriptingChallenge>
  )
}
