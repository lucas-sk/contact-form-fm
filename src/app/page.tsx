import { ContactForm } from '@/components/contactForm'

export default function Home() {
  return (
    <div className="mx-auto mt-28 min-w-96 max-w-2xl bg-white p-6">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Contact Us
      </h2>
      <ContactForm />
    </div>
  )
}
