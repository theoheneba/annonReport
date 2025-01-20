"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const monthlyReports = [
  { name: "Jan", reports: 65 },
  { name: "Feb", reports: 59 },
  { name: "Mar", reports: 80 },
  { name: "Apr", reports: 81 },
  { name: "May", reports: 56 },
  { name: "Jun", reports: 55 },
  { name: "Jul", reports: 40 },
]

const reportsByCategory = [
  { name: "Corruption", value: 400 },
  { name: "Fraud", value: 300 },
  { name: "Misconduct", value: 200 },
  { name: "Harassment", value: 150 },
  { name: "Discrimination", value: 100 },
  { name: "Environmental", value: 50 },
]

export default function AdminAnalytics() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyReports}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="reports" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reports by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reportsByCategory}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

