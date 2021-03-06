import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { CompletedChalleges } from '../components/CompletedChalleges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/components/Home.module.scss'
import { CountdownProvider } from '../Contexts/CountdownContext'
import { ChallengesProvider } from '../Contexts/ChallengesContext'
import SideBar from '../components/SideBar/Index'

interface userGithub {
  name: string
  avatar_url: string
  login: string
}

interface HomeProps {
  level: number
  currentExperience: number
  challengesCompleted: number
  user: userGithub[]
}

export default function Home(props: HomeProps): JSX.Element {
  const { user } = props

  return (
    <div className={styles.indexPage}>
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <SideBar />
        <div className={styles.container}>
          <Head>
            <title>Início | Move.It</title>
          </Head>

          <ExperienceBar />
          <CountdownProvider>
            <section>
              <div>
                <Profile userGithub={user} />
                <CompletedChalleges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { gitUser } = ctx.params
  const data = await fetch(`https://api.github.com/users/${gitUser}`)
  const user = await data.json()

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      user: user,
    },
  }
}
