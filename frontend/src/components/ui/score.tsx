import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ScoreRingProps {
  score: number
  size: number
  strokeWidth: number
}

const ScoreRing: React.FC<ScoreRingProps> = ({ score, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <svg height={size} width={size} className="transform -rotate-90">
      <circle
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="#3b82f6"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  )
}

export default function ScientistRelevanceScore() {
  const relevanceScore = 78 

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Scientist Relevance Score</CardTitle>
        <CardDescription>Match between scientist expertise and candidate profile</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative">
          <ScoreRing score={relevanceScore} size={200} strokeWidth={15} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold">{relevanceScore}%</span>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          This score represents how closely the candidate's profile aligns with the required scientist expertise.
        </p>
      </CardContent>
    </Card>
  )
}