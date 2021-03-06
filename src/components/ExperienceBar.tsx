import { useContext } from 'react'
import { challegesContext } from '../Contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.scss'

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } =
    useContext(challegesContext)

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }}>
          <span
            className={styles.currentExperience}
            style={{ left: `${percentToNextLevel}%` }}
          >
            {currentExperience} xp
          </span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}
