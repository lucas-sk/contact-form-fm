'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

const contactFormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  firstName: z.string().min(2, {
    message: 'This field is required',
  }),
  lastName: z.string().min(2, {
    message: 'This field is required',
  }),
  message: z.string().min(2, {
    message: 'This field is required',
  }),
  queryType: z.enum(['general enquiry', 'support request'], {
    required_error: 'Please select a query type',
  }),
  consent: z
    .boolean({
      required_error: 'To submit this form, please consent to being contacted',
    })
    .refine((value) => value === true, {
      message: 'To submit this form, please consent to being contacted',
    }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const { toast } = useToast()

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      queryType: 'general enquiry',
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      consent: false,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSubmitContactForm(data: ContactFormValues) {
    toast({
      title: `Message Sent`,
      description: 'Thanks for completing the form. We will be in touch soon!',
      children: <CheckCircle2 />,
      variant: 'success',
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmitContactForm)}
      >
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="queryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Query Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex flex-col gap-4 min-[480px]:flex-row">
                    <FormItem className="flex flex-1 items-center gap-4 space-y-0 rounded-md p-6 py-4 ring-offset-background has-[:checked]:border-green-200/50 has-[:checked]:bg-green-200/50 has-[:checked]:ring-2 has-[:checked]:ring-ring has-[:checked]:ring-offset-2">
                      <FormControl>
                        <RadioGroupItem
                          aria-label="general enquiry"
                          value="general enquiry"
                        />
                      </FormControl>
                      <FormLabel>General Enquiry</FormLabel>
                    </FormItem>

                    <FormItem className="flex flex-1 items-center gap-4 space-y-0 rounded-md p-6 py-4 ring-offset-background has-[:checked]:border-green-200/50 has-[:checked]:bg-green-200/50 has-[:checked]:ring-2 has-[:checked]:ring-ring has-[:checked]:ring-offset-2">
                      <FormControl>
                        <RadioGroupItem
                          aria-label="support request"
                          value="support request"
                        />
                      </FormControl>
                      <FormLabel>Support Request</FormLabel>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormControl>
                  <Checkbox
                    aria-label="consent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>I consent to being contacted by the team</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-green-950/90" size={'lg'}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
