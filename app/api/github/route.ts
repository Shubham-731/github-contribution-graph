import { NextRequest, NextResponse } from "next/server"
import getQuery from "../../../utils/getQuery"
import axios, { AxiosError } from "axios"

export async function POST(req: NextRequest) {
  try {
    const { username }: { username: string } = await req.json()

    if (!username) {
      return NextResponse.json({ msg: "Invalid username!" }, { status: 400 })
    }

    const query = getQuery(username)

    const response = await axios.post(
      "https://api.github.com/graphql",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }
    )

    return NextResponse.json(
      {
        msg: "Success!",
        data: response.data || null,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        msg:
          error instanceof AxiosError ? error.message : "Some error occured!",
        error,
      },
      { status: 500 }
    )
  }
}
