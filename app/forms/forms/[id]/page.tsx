"use client"

import { useState, useEffect, useRef } from "react"
import { ModuleLayout } from "@/components/layouts/module-layout"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabContent } from "@/components/layouts/tab-content"
import type { TabItem } from "@/components/layouts/module-tabs"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { FormOverview } from "@/components/forms/form-overview"
import { FormResponses } from "@/components/forms/form-responses"
import { FormSettingsView } from "@/components/forms/form-settings-view"
import { ResponseDetailsDialog } from "@/components/forms/response-details-dialog"
import { FormVersions } from "@/components/forms/form-versions"

const formsTabs: TabItem[] = [
  { href: "/forms/forms", label: "FORMS", exact: true },
  { href: "/forms/field-sets", label: "FIELD SETS" },
]

const sampleForms = [
  {
    id: "1",
    name: "Customer Feedback Form",
    responses: 245,
    completionRate: 78,
    avgTimeToComplete: "3:24",
    dailyResponses: [12, 15, 8, 21, 18, 25, 19],
    questionCompletion: [
      { question: "How satisfied are you with our service?", completion: 98 },
      { question: "Would you recommend us to others?", completion: 95 },
      { question: "What improvements would you suggest?", completion: 72 },
      { question: "How long have you been our customer?", completion: 89 },
      { question: "Any additional comments?", completion: 45 },
    ],
    demographics: {
      age: [
        { group: "18-24", percentage: 15 },
        { group: "25-34", percentage: 32 },
        { group: "35-44", percentage: 28 },
        { group: "45-54", percentage: 18 },
        { group: "55+", percentage: 7 },
      ],
      device: [
        { type: "Mobile", percentage: 64 },
        { type: "Desktop", percentage: 31 },
        { type: "Tablet", percentage: 5 },
      ],
    },
    versions: [
      {
        id: "v3",
        name: "Version 3",
        date: "2025-05-01",
        status: "active",
        changes: "Added new question about customer service",
      },
      {
        id: "v2",
        name: "Version 2",
        date: "2025-04-15",
        status: "archived",
        changes: "Updated rating scale and fixed typos",
      },
      { id: "v1", name: "Version 1", date: "2025-04-01", status: "archived", changes: "Initial release" },
    ],
    formResponses: [
      {
        id: "r1",
        submittedAt: "2025-05-15T14:30:00",
        status: "complete",
        respondent: "john.doe@example.com",
        duration: "2:45",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Very satisfied", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Yes, definitely", type: "radio" },
          {
            question: "What improvements would you suggest?",
            answer:
              "I would like to see more customization options for the dashboard. The current interface is good but could be more flexible for power users. It would also be helpful to have more export options for reports and data analysis.",
            type: "textarea",
          },
          { question: "How long have you been our customer?", answer: "1-3 years", type: "select" },
          {
            question: "Any additional comments?",
            answer:
              "Great service overall, keep up the good work! I've been impressed with the customer support team's responsiveness and knowledge. They've helped me solve several complex issues quickly.",
            type: "textarea",
          },
          {
            question: "Which features do you use most frequently?",
            answer: "Reporting, User Management, Analytics",
            type: "checkbox",
          },
          { question: "How often do you use our platform?", answer: "Daily", type: "radio" },
          { question: "What is your role in your organization?", answer: "Manager", type: "select" },
          { question: "Would you be interested in beta testing new features?", answer: "Yes", type: "radio" },
          { question: "How did you hear about our service?", answer: "Colleague recommendation", type: "select" },
          { question: "What industry are you in?", answer: "Technology", type: "select" },
          { question: "What is your company size?", answer: "50-200 employees", type: "select" },
        ],
      },
      {
        id: "r2",
        submittedAt: "2025-05-15T12:15:00",
        status: "complete",
        respondent: "sarah.smith@example.com",
        duration: "3:12",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Satisfied", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Probably", type: "radio" },
          {
            question: "What improvements would you suggest?",
            answer: "The mobile app could use some improvements. Sometimes it's slow to load.",
            type: "textarea",
          },
          { question: "How long have you been our customer?", answer: "Less than a year", type: "select" },
          { question: "Any additional comments?", answer: "", type: "textarea" },
        ],
      },
      {
        id: "r3",
        submittedAt: "2025-05-14T18:45:00",
        status: "partial",
        respondent: "mike.johnson@example.com",
        duration: "1:30",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Neutral", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Maybe", type: "radio" },
          { question: "What improvements would you suggest?", answer: "", type: "textarea" },
          { question: "How long have you been our customer?", answer: "3-5 years", type: "select" },
          { question: "Any additional comments?", answer: "", type: "textarea" },
        ],
      },
      {
        id: "r4",
        submittedAt: "2025-05-14T10:20:00",
        status: "complete",
        respondent: "lisa.brown@example.com",
        duration: "4:05",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Very satisfied", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Yes, definitely", type: "radio" },
          {
            question: "What improvements would you suggest?",
            answer: "I think the pricing could be more transparent. Otherwise, everything is great.",
            type: "textarea",
          },
          { question: "How long have you been our customer?", answer: "More than 5 years", type: "select" },
          {
            question: "Any additional comments?",
            answer: "I've been with your company for years and have always appreciated the customer service.",
            type: "textarea",
          },
        ],
      },
      {
        id: "r5",
        submittedAt: "2025-05-13T16:55:00",
        status: "complete",
        respondent: "david.wilson@example.com",
        duration: "2:50",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Dissatisfied", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Probably not", type: "radio" },
          {
            question: "What improvements would you suggest?",
            answer: "Customer support response times need to be improved. I waited 2 days for a response to my ticket.",
            type: "textarea",
          },
          { question: "How long have you been our customer?", answer: "1-3 years", type: "select" },
          {
            question: "Any additional comments?",
            answer: "I'm considering switching to a competitor due to the support issues.",
            type: "textarea",
          },
        ],
      },
      {
        id: "r6",
        submittedAt: "2025-05-13T09:10:00",
        status: "error",
        respondent: "emma.taylor@example.com",
        duration: "0:45",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Satisfied", type: "radio" },
          { question: "Would you recommend us to others?", answer: "", type: "radio" },
          { question: "What improvements would you suggest?", answer: "", type: "textarea" },
          { question: "How long have you been our customer?", answer: "", type: "select" },
          { question: "Any additional comments?", answer: "", type: "textarea" },
        ],
      },
      {
        id: "r7",
        submittedAt: "2025-05-12T15:30:00",
        status: "complete",
        respondent: "james.anderson@example.com",
        duration: "3:20",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Very satisfied", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Yes, definitely", type: "radio" },
          {
            question: "What improvements would you suggest?",
            answer: "More integration options with other software would be helpful.",
            type: "textarea",
          },
          { question: "How long have you been our customer?", answer: "Less than a year", type: "select" },
          {
            question: "Any additional comments?",
            answer: "So far so good! Looking forward to seeing how the product evolves.",
            type: "textarea",
          },
        ],
      },
      {
        id: "r8",
        submittedAt: "2025-05-12T11:25:00",
        status: "partial",
        respondent: "olivia.martin@example.com",
        duration: "1:15",
        answers: [
          { question: "How satisfied are you with our service?", answer: "Neutral", type: "radio" },
          { question: "Would you recommend us to others?", answer: "Maybe", type: "radio" },
          {
            question: "What improvements would you suggest?",
            answer: "The UI could be more intuitive.",
            type: "textarea",
          },
          { question: "How long have you been our customer?", answer: "", type: "select" },
          { question: "Any additional comments?", answer: "", type: "textarea" },
        ],
      },
    ],
    settings: {
      general: {
        formName: "Customer Feedback Form",
        description: "Help us improve our service by providing your feedback",
        isActive: true,
        collectEmailAddresses: true,
        allowAnonymousSubmissions: false,
        enableCaptcha: true,
        submissionLimit: "unlimited",
      },
      notifications: {
        notifyOnSubmission: true,
        notificationEmails: "admin@example.com, support@example.com",
        sendConfirmationEmail: true,
        confirmationEmailTemplate: "default",
      },
      access: {
        accessType: "public",
        requireLogin: false,
        allowedDomains: "",
        expirationDate: "",
      },
    },
  },
  // Other sample forms...
]


export default function FormDetailsPage() {
  const params = useParams()
  const formId = params.id as string
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoaded, setIsLoaded] = useState(false)
  const [responseFilter, setResponseFilter] = useState("all")
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null)
  const [responseDetailsOpen, setResponseDetailsOpen] = useState(false)

  const isMounted = useRef(true)

  const formData = sampleForms.find((form) => form.id === formId) || sampleForms[0]

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsLoaded(true)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const filteredResponses = formData.formResponses.filter((response) => {
    if (responseFilter === "all") return true
    if (responseFilter === "recent") {
      const responseDate = new Date(response.submittedAt)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return responseDate >= sevenDaysAgo
    }
    if (responseFilter === "older") {
      const responseDate = new Date(response.submittedAt)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      return responseDate < sevenDaysAgo
    }
    return true
  })

  const handleDialogClose = () => {
    setResponseDetailsOpen(false)
    setTimeout(() => {
      if (isMounted.current) {
        setSelectedResponse(null)
      }
    }, 300)
  }

  return (
    <ModuleLayout moduleName="Forms" tabs={formsTabs} basePath="/forms">
      <TabContent id="form-details">
        <div className={`space-y-6 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col space-y-2">
            <Link href="/forms/forms" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to forms
            </Link>
            <h1 className="text-2xl font-bold">{formData.name}</h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">Form ID: {formId}</div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {activeTab === "overview" && (
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {activeTab === "responses" && (
                <Select value={responseFilter} onValueChange={setResponseFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter responses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All responses</SelectItem>
                    <SelectItem value="recent">Recent (7 days)</SelectItem>
                    <SelectItem value="older">Older</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="responses">Responses</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>

          {activeTab === "overview" && <FormOverview formData={formData} timeRange={timeRange} />}
          {activeTab === "responses" && (
            <FormResponses
              responses={filteredResponses}
              onViewDetails={(response) => {
                setSelectedResponse(response)
                setResponseDetailsOpen(true)
              }}
            />
          )}
          {activeTab === "versions" && <FormVersions formId={formId} />}
          {activeTab === "settings" && <FormSettingsView settings={formData.settings} />}

          <ResponseDetailsDialog
            open={responseDetailsOpen}
            response={selectedResponse}
            onClose={handleDialogClose}
          />
        </div>
      </TabContent>
    </ModuleLayout>
  )
}
