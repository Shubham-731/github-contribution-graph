// Generate graphql query
const getQuery = (username: string) => {
  return `
query {
  viewer {
    login
  }
  user(login: "${username}"){
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
  `
}

export default getQuery
