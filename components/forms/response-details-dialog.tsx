"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, Download } from "lucide-react"

interface ResponseDetailsDialogProps {
  open: boolean
  response: any | null
  onClose: () => void
}

export function ResponseDetailsDialog({ open, response, onClose }: ResponseDetailsDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      {response && (
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2 shrink-0">
            <DialogTitle>Response Details</DialogTitle>
            <DialogDescription>
              Submitted by {response.respondent} on {formatDate(response.submittedAt)}
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-3 flex items-center justify-between text-sm text-muted-foreground border-b shrink-0">
            <div>
              <span className="font-medium">{response.answers.length}</span> questions
            </div>
            <div className="flex items-center">
              <ChevronDown className="h-4 w-4 mr-1" />
              <span>Scroll to view all responses</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="p-6 space-y-6">
              {response.answers.map((answer: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2 shrink-0">
                      Q{index + 1}
                    </Badge>
                    <h3 className="font-medium">{answer.question}</h3>
                  </div>

                  {answer.answer ? (
                    <div className={`p-4 rounded-md ${answer.type === "textarea" ? "bg-slate-50 border" : "bg-slate-50"}`}> 
                      <p className={answer.type === "textarea" ? "whitespace-pre-wrap" : ""}>{answer.answer}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-md bg-slate-50 border border-dashed text-muted-foreground italic">
                      No answer provided
                    </div>
                  )}

                  {index < response.answers.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between border-t p-6 shrink-0">
            <div className="text-sm text-muted-foreground">Response ID: {response.id}</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} type="button">
                Close
              </Button>
              <Button type="button">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
