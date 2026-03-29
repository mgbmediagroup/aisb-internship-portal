import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { daysUntil } from "@/lib/utils";

interface InternshipCardProps {
  id: string;
  title: string;
  company: { name: string; logo: string | null };
  location: string;
  duration: string;
  field: string;
  isPaid: boolean;
  deadline: Date | string | null;
}

export default function InternshipCard({
  id,
  title,
  company,
  location,
  duration,
  field,
  isPaid,
  deadline,
}: InternshipCardProps) {
  const days = deadline ? daysUntil(deadline) : null;

  return (
    <Link href={`/internships/${id}`} className="group block h-full">
      <div className="bg-accent-lavender-light/40 rounded-3xl p-7 h-full transition-all duration-300 hover:bg-accent-lavender-light/70 hover:-translate-y-1 flex flex-col">
        {/* Company logo + field */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block text-xs font-semibold text-neutral-mid uppercase tracking-wider">
            {field}
          </span>
          {company.logo && (
            <Image
              src={company.logo}
              alt={company.name}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
            />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic leading-tight mb-3 group-hover:text-accent-pink transition-colors">
          {title}
        </h3>

        {/* Divider */}
        <div className="w-10 h-[3px] bg-primary-dark/20 rounded-full mb-4" />

        {/* Company */}
        <p className="text-sm text-neutral-dark font-medium mb-4">
          {company.name}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-mid mt-auto mb-4">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {duration}
          </span>
          {isPaid && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-green/20 text-green-700 font-medium">
              Paid
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {deadline && days !== null && days > 0 ? (
            <span className="text-xs text-neutral-light">
              {days} days left
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark group-hover:text-accent-pink group-hover:gap-2.5 transition-all">
            Learn More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
