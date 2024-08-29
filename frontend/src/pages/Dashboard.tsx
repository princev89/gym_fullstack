import React from "react"
import { Posts } from "../components/Posts"

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Welcome {JSON.parse(localStorage.getItem('user') || '').name}</h1>
      <Posts />
    </div>
  )
}
