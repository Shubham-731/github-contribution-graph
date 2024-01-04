import { GithubUserData } from "../types"
import Tile from "./Tile"

const container: React.CSSProperties = {
  display: "flex",
}

const row: React.CSSProperties = {}

const Contribute = ({ userData }: { userData: GithubUserData }) => {
  // Get flat contributions (all contributions in a single array)
  const flatContributions =
    userData.contributionsCollection.contributionCalendar.weeks
      .map((week) => week.contributionDays.map((day) => day.contributionCount))
      .flat(1)

  const highestContribution = Math.max(...flatContributions)

  console.log(highestContribution)

  return (
    <div style={container}>
      {userData.contributionsCollection.contributionCalendar.weeks.map(
        (week, w) => (
          <div key={week.contributionDays[0].date} style={row}>
            {week.contributionDays.map((day, i) => (
              <Tile
                key={day.date}
                amtOfGreen={day.contributionCount / highestContribution}
                delay={60 + (w * 7 + i) * 0.2}
              />
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default Contribute
