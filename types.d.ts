export type GithubUserData = {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number
      weeks: Week[]
    }
  }
}

type Week = {
  contributionDays: Day[]
}

type Day = {
  contributionCount: number
  date: string
}
