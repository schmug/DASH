"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormSettingsViewProps {
  settings: any
}

export function FormSettingsView({ settings }: FormSettingsViewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Form Name</label>
              <Input value={settings.general.formName} onChange={() => {}} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input value={settings.general.description} onChange={() => {}} />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Form Active</div>
              <div className="text-sm text-muted-foreground">
                When disabled, users cannot submit new responses
              </div>
            </div>
            <Switch checked={settings.general.isActive} onCheckedChange={() => {}} />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Collect Email Addresses</div>
              <div className="text-sm text-muted-foreground">
                Require respondents to provide their email address
              </div>
            </div>
            <Switch checked={settings.general.collectEmailAddresses} onCheckedChange={() => {}} />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Allow Anonymous Submissions</div>
              <div className="text-sm text-muted-foreground">
                Allow users to submit without identifying information
              </div>
            </div>
            <Switch checked={settings.general.allowAnonymousSubmissions} onCheckedChange={() => {}} />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Enable CAPTCHA</div>
              <div className="text-sm text-muted-foreground">Protect your form from spam and abuse</div>
            </div>
            <Switch checked={settings.general.enableCaptcha} onCheckedChange={() => {}} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Notify on Submission</div>
              <div className="text-sm text-muted-foreground">
                Receive email notifications for new submissions
              </div>
            </div>
            <Switch checked={settings.notifications.notifyOnSubmission} onCheckedChange={() => {}} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Notification Emails</label>
            <Input
              value={settings.notifications.notificationEmails}
              onChange={() => {}}
              placeholder="email@example.com, another@example.com"
            />
            <p className="text-xs text-muted-foreground">Separate multiple email addresses with commas</p>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Send Confirmation Email</div>
              <div className="text-sm text-muted-foreground">
                Send a confirmation email to respondents after submission
              </div>
            </div>
            <Switch
              checked={settings.notifications.sendConfirmationEmail}
              onCheckedChange={() => {}}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirmation Email Template</label>
            <Select value={settings.notifications.confirmationEmailTemplate} onValueChange={() => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Template</SelectItem>
                <SelectItem value="minimal">Minimal Template</SelectItem>
                <SelectItem value="branded">Branded Template</SelectItem>
                <SelectItem value="custom">Custom Template</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Access Type</label>
            <Select value={settings.access.accessType} onValueChange={() => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Select access type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (Anyone can access)</SelectItem>
                <SelectItem value="restricted">Restricted (Specific domains)</SelectItem>
                <SelectItem value="private">Private (Invitation only)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="font-medium">Require Login</div>
              <div className="text-sm text-muted-foreground">Users must be logged in to submit the form</div>
            </div>
            <Switch checked={settings.access.requireLogin} onCheckedChange={() => {}} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Allowed Domains</label>
            <Input
              value={settings.access.allowedDomains}
              onChange={() => {}}
              placeholder="example.com, another-domain.com"
              disabled={settings.access.accessType !== "restricted"}
            />
            <p className="text-xs text-muted-foreground">
              Only email addresses from these domains can submit the form
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Expiration Date</label>
            <Input type="date" value={settings.access.expirationDate} onChange={() => {}} />
            <p className="text-xs text-muted-foreground">
              Form will automatically close on this date (leave blank for no expiration)
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
