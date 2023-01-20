'use client'

import { allLessons, Lesson } from 'contentlayer/generated'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Tabs } from 'components/ui/Tabs'
import { Info } from './Info'
import { Code } from './Code'

/**
 * @slug {string} for fetching challenge data
 * @expectedInput {string} answer to the challenge problem
 * @next {string} link to next part of chapter
 * @chapterInfo {string} chapter number / info
 * @challegneInfo {string} challenge number / info
 */
export default function TerminalChallengeLayout({ 
  slug, 
  expectedInput, 
  next,
	chapterInfo,
	challengeInfo
} : {
  slug : string,
  expectedInput : string,
  next : string,
	chapterInfo : string,
	challengeInfo : string
}) {
  function getLessonContent() {
		const data = allLessons.find(
			(challenge: Lesson) => challenge.slugAsParams === slug
		)
		return data
  }
  
  const genesis = getLessonContent()
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('info')
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' })
  const tabData = [
  {
		id: 'info',
		text: 'Info'
  },
  {
		id: 'code',
		text: 'Code',
  }
  ]

  useEffect(() => {
  	setHydrated(true);
  }, []);

  return (hydrated &&(
  <>
    {
    isSmallScreen ? (
      <div className="
      flex
      w-screen
      grow
      flex-col
      ">
      <Tabs
        items={tabData}
        activeId={activeTab}
        onChange={setActiveTab}
        classes="px-4 py-2 w-full"
        stretch={true}
      />
      {(activeTab == 'info') && (
        <div className='p-3.5'>
        	<Info genesis={genesis} />
        </div>
      )}
      {(activeTab == 'code') && (
        <Code expectedInput={expectedInput} next={next} isSmallScreen={isSmallScreen} chapterInfo={chapterInfo} challengeInfo={challengeInfo} />
      )}
      </div>
    ) : (
      <div className="justify-stretch grid w-screen grow grid-cols-1 md:grid-cols-2 px-0">
				<Info genesis={genesis} />
				<Code expectedInput={expectedInput} next={next} isSmallScreen={isSmallScreen} chapterInfo={chapterInfo} challengeInfo={challengeInfo} />
      </div>
    )
    }
  </>
  ))
}
