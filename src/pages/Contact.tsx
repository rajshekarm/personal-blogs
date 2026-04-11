import { useState } from "react"
import { Mail, Phone, Send } from "lucide-react"

export default function Contact() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const buildMailto = () => {
    const subject = encodeURIComponent(`Contact from ${name || "your website"}`)
    const body = encodeURIComponent(message || "Hi Rajashekar, I'd like to get in touch.")

    return `mailto:rashekarmudigonda@gmail.com?cc=rmudigonda@hawk.illinoistech.edu&subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pb-20">
      <h2 className="mb-3 text-3xl font-bold">Contact</h2>
      <p className="mb-8 max-w-2xl text-gray-600">
        Reach out for collaboration, opportunities, or a quick conversation.
      </p>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
            Contact Details
          </h3>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Primary Email</p>
                <a
                  href="mailto:rashekarmudigonda@gmail.com"
                  className="text-gray-600 transition hover:text-gray-900"
                >
                  rashekarmudigonda@gmail.com
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">University Email</p>
                <a
                  href="mailto:rmudigonda@hawk.illinoistech.edu"
                  className="text-gray-600 transition hover:text-gray-900"
                >
                  rmudigonda@hawk.illinoistech.edu
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gray-700" />
              <div>
                <p className="text-sm font-medium text-gray-900">Mobile</p>
                <a href="tel:+13126103352" className="text-gray-600 transition hover:text-gray-900">
                  3126103352
                </a>
              </div>
            </li>
          </ul>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            window.location.href = buildMailto()
          }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500">
            Send a Message
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-900">Your Name</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                placeholder="John Doe"
              />
            </label>

            <label className="grid gap-2 sm:col-span-2">
              <span className="text-sm font-medium text-gray-900">Message</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="min-h-40 rounded-md border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
                placeholder="Tell me what you'd like to discuss."
              />
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
          >
            <Send className="h-4 w-4" />
            Send Email
          </button>
        </form>
      </div>
    </section>
  )
}
