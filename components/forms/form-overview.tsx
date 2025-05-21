"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, CheckCircle, Clock, LineChart, Users } from "lucide-react"

interface FormOverviewProps {
  formData: any
  timeRange: string
}

export function FormOverview({ formData, timeRange }: FormOverviewProps) {
  const rangeLabel =
    timeRange === "7days"
      ? "Last 7 days"
      : timeRange === "30days"
        ? "Last 30 days"
        : timeRange === "90days"
          ? "Last 90 days"
          : timeRange === "year"
            ? "Last year"
            : "All time"

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-muted-foreground" />
              Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formData.responses}</div>
            <p className="text-sm text-muted-foreground mt-1">{rangeLabel}</p>
            <div className="mt-4 h-[120px] bg-slate-100 rounded-md flex items-center justify-center">
              <LineChart className="h-16 w-16 text-slate-300" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-muted-foreground" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formData.completionRate}%</div>
            <p className="text-sm text-muted-foreground mt-1">{rangeLabel}</p>
            <div className="mt-4 h-[120px] bg-slate-100 rounded-md flex items-center justify-center">
              <BarChart2 className="h-16 w-16 text-slate-300" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              Avg. Time to Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formData.avgTimeToComplete}</div>
            <p className="text-sm text-muted-foreground mt-1">minutes:seconds</p>
            <div className="mt-4 h-[120px] bg-slate-100 rounded-md flex items-center justify-center">
              <BarChart2 className="h-16 w-16 text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-slate-100 rounded-md flex items-center justify-center">
              <LineChart className="h-16 w-16 text-slate-300" />
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {formData.dailyResponses.map((count: number, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-sm font-medium">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </div>
                  <div className="text-2xl font-bold">{count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.questionCompletion.map((question: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium truncate max-w-[80%]">
                      {question.question}
                    </span>
                    <span className="text-sm font-medium">{question.completion}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: `${question.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device & Demographics Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Device Usage</h3>
              <div className="space-y-4">
                {formData.demographics.device.map((device: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{device.type}</span>
                      <span className="text-sm font-medium">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Age Distribution</h3>
              <div className="space-y-4">
                {formData.demographics.age.map((ageGroup: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{ageGroup.group}</span>
                      <span className="text-sm font-medium">{ageGroup.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${ageGroup.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
