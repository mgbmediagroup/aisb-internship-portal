"use client";

import { useState } from "react";
import { User, FileText, PenLine, Mail, ChevronRight, ChevronLeft, ArrowRight, Copy, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Upload CV", icon: FileText },
  { id: 3, title: "Cover Letter", icon: PenLine },
  { id: 4, title: "Review & Send", icon: Mail },
];

export default function ApplicationForm({
  internshipId,
  internshipTitle,
  companyName,
  contactEmail,
}: {
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  contactEmail: string;
}) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    cvFile: null as File | null,
    coverLetter: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = "Name is required";
      if (!formData.studentEmail.trim()) newErrors.studentEmail = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail))
        newErrors.studentEmail = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => { if (validate()) setStep(step + 1); };
  const prev = () => setStep(step - 1);

  // Build the email body from collected info
  const emailSubject = `Internship Application: ${internshipTitle} — ${formData.studentName}`;
  const emailBody = `Dear ${companyName} Team,

I am writing to express my interest in the ${internshipTitle} internship position.

--- APPLICANT DETAILS ---
Name: ${formData.studentName}
Email: ${formData.studentEmail}
CV: ${formData.cvFile ? `Attached (${formData.cvFile.name})` : "Not attached — will send separately"}

--- COVER LETTER ---
${formData.coverLetter || "No cover letter provided."}

Thank you for considering my application. I look forward to hearing from you.

Best regards,
${formData.studentName}`;

  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Progress Steps */}
      <div className="bg-bg-light rounded-3xl p-6 mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step >= s.id
                      ? "bg-primary-dark text-white"
                      : "bg-white text-neutral-light border-2 border-neutral-border"
                  )}
                >
                  {step > s.id ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] mt-1.5 hidden sm:block uppercase tracking-wider font-bold",
                    step >= s.id ? "text-primary-dark" : "text-neutral-light"
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-[2px] mx-3 rounded-full",
                    step > s.id ? "bg-primary-dark" : "bg-neutral-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-bg-light rounded-3xl p-8 md:p-10">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic">
              Personal Information
            </h2>
            <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full" />
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className={cn(
                  "w-full px-5 py-3 rounded-full border-2 text-primary-dark placeholder:text-neutral-light focus:outline-none transition-colors bg-white",
                  errors.studentName ? "border-accent-pink" : "border-neutral-border focus:border-primary-dark"
                )}
                placeholder="Enter your full name"
              />
              {errors.studentName && <p className="text-sm text-accent-pink mt-1 ml-4">{errors.studentName}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.studentEmail}
                onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                className={cn(
                  "w-full px-5 py-3 rounded-full border-2 text-primary-dark placeholder:text-neutral-light focus:outline-none transition-colors bg-white",
                  errors.studentEmail ? "border-accent-pink" : "border-neutral-border focus:border-primary-dark"
                )}
                placeholder="your.email@aisb.hu"
              />
              {errors.studentEmail && <p className="text-sm text-accent-pink mt-1 ml-4">{errors.studentEmail}</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic">
              Upload Your CV
            </h2>
            <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full" />
            <div className="border-2 border-dashed border-neutral-border rounded-3xl p-12 text-center hover:border-primary-dark/30 transition-colors bg-white">
              <FileText className="w-12 h-12 text-neutral-light mx-auto mb-4" />
              <p className="text-neutral-dark mb-2 font-medium">
                {formData.cvFile ? formData.cvFile.name : "Drop your CV here, or click to browse"}
              </p>
              <p className="text-neutral-light text-sm mb-4">PDF format preferred (max 5MB)</p>
              <label className="btn-outline cursor-pointer !py-2.5 !px-5 !text-sm">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFormData({ ...formData, cvFile: e.target.files?.[0] || null })}
                />
              </label>
            </div>
            <p className="text-xs text-neutral-light ml-2">* You can attach your CV to the email in the next step</p>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic">
              Cover Letter
            </h2>
            <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full" />
            <p className="text-neutral-mid text-sm">
              Tell us why you&apos;re interested in this internship and what makes you a great candidate.
            </p>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              rows={8}
              className="w-full px-5 py-4 rounded-2xl border-2 border-neutral-border text-primary-dark placeholder:text-neutral-light focus:outline-none focus:border-primary-dark transition-colors resize-none bg-white"
              placeholder="Write your cover letter here..."
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic">
              Review & Send
            </h2>
            <div className="w-10 h-[3px] bg-primary-dark/15 rounded-full" />

            <p className="text-neutral-mid text-sm leading-relaxed">
              We&apos;ve compiled your application below. Click the button to open your email client
              with everything pre-filled, or copy the text and send it manually.
              {formData.cvFile && " Don't forget to attach your CV to the email!"}
            </p>

            {/* Email preview */}
            <div className="bg-white rounded-2xl border-2 border-neutral-border overflow-hidden">
              {/* Email header */}
              <div className="px-6 py-4 border-b border-neutral-border bg-bg-subtle/50">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-light w-12">To</span>
                    <span className="text-sm text-primary-dark font-medium">{contactEmail}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-light w-12">From</span>
                    <span className="text-sm text-neutral-mid">{formData.studentEmail || "your email"}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-light w-12">Subject</span>
                    <span className="text-sm text-primary-dark font-medium">{emailSubject}</span>
                  </div>
                  {formData.cvFile && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-light w-12">Attach</span>
                      <span className="text-sm text-accent-pink font-medium">{formData.cvFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email body */}
              <div className="px-6 py-5">
                <pre className="text-sm text-neutral-dark whitespace-pre-wrap font-[var(--font-body)] leading-relaxed">
                  {emailBody}
                </pre>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mailtoLink}
                className="btn-pink !text-lg flex-1 justify-center"
              >
                <Mail className="w-5 h-5" />
                Open Email & Send
              </a>
              <button
                onClick={handleCopy}
                className="btn-outline justify-center"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </>
                )}
              </button>
            </div>

            {formData.cvFile && (
              <div className="bg-accent-yellow/15 rounded-2xl px-5 py-4">
                <p className="text-sm text-neutral-dark">
                  <strong>Reminder:</strong> Don&apos;t forget to attach <strong>{formData.cvFile.name}</strong> to your email before sending.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/50">
          {step > 1 ? (
            <button
              onClick={prev}
              className="inline-flex items-center gap-1.5 text-neutral-mid hover:text-primary-dark font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 4 && (
            <button onClick={next} className="btn-black">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
