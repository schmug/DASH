"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Eye, Download, Trash, MoreHorizontal } from "lucide-react"

interface FormResponsesProps {
  responses: any[]
  onViewDetails: (response: any) => void
}

export function FormResponses({ responses, onViewDetails }: FormResponsesProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const toggleDropdown = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Responses</CardTitle>
        <CardDescription>Showing {responses.length} responses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Submission Date</TableHead>
                <TableHead>Respondent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responses.map((response) => (
                <TableRow key={response.id}>
                  <TableCell>{formatDate(response.submittedAt)}</TableCell>
                  <TableCell>{response.respondent}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu
                      open={openDropdownId === response.id}
                      onOpenChange={(open) => {
                        if (!open) setOpenDropdownId(null)
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={(e) => toggleDropdown(e, response.id)}>
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault()
                            onViewDetails(response)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
