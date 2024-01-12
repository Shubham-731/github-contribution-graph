import { z } from "zod"
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
} from "remotion"
import { CompositionProps } from "../../types/constants"
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter"
import React, { useCallback, useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { GithubUserData } from "../../types"
import Contribute from "../../components/Contribute"

loadFont()

const container: React.CSSProperties = {
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  flexDirection: "column",
  gap: 16,
}

const paragraph: React.CSSProperties = {
  fontSize: "1.5rem",
  fontFamily,
}

export const Main = ({ username }: z.infer<typeof CompositionProps>) => {
  const frame = useCurrentFrame()
  const [userData, setUserData] = useState<GithubUserData | null>(null)
  const [handle] = useState(() => delayRender())

  const fetchData = useCallback(
    async (name: string) => {
      try {
        const response: AxiosResponse<{
          data: {
            data: { user: GithubUserData | null }
          }
        }> = await axios.post(
          "https://github-contribution-graph-henna.vercel.app/api/github",
          { username: name }
        )

        setUserData(response.data.data.data.user)
        continueRender(handle)
      } catch (error) {
        console.log(error)
        alert(
          error instanceof AxiosError
            ? (error.response?.data.msg as string)
            : "Some error occured!"
        )
      }
    },
    [handle]
  )

  useEffect(() => {
    fetchData(username)
  }, [username, fetchData])

  const usernameOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  })

  const contributionsOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
  })

  return (
    <AbsoluteFill style={container}>
      <div
        style={{
          fontFamily,
          fontWeight: "bold",
          fontSize: 50,
          opacity: usernameOpacity,
        }}
      >
        {username}
      </div>
      <div
        style={{
          fontFamily,
          fontWeight: "bold",
          fontSize: 28,
          opacity: contributionsOpacity,
        }}
      >
        Total contributions:{" "}
        {
          userData?.contributionsCollection.contributionCalendar
            .totalContributions
        }
      </div>
      {userData ? (
        <Contribute userData={userData} />
      ) : (
        <p style={paragraph}>User data not found!</p>
      )}
    </AbsoluteFill>
  )
}
