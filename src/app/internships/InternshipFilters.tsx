"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState, useCallback } from "react";

interface FiltersProps {
  fields: string[];
  locations: string[];
  durations: string[];
  currentSearch: string;
  currentField: string;
  currentLocation: string;
  currentDuration: string;
  currentSort: string;
}

export default function InternshipFilters({
  fields,
  locations,
  durations,
  currentSearch,
  currentField,
  currentLocation,
  currentDuration,
  currentSort,
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch);
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = currentField || currentLocation || currentDuration;

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/internships?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = () => {
    router.push("/internships");
    setSearch("");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-light" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search internships by title, company, or description..."
            className="w-full pl-12 pr-4 py-3.5 rounded-full border-2 border-neutral-border bg-white text-primary-dark placeholder:text-neutral-light focus:outline-none focus:border-primary-dark transition-colors text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 text-sm text-primary-dark font-medium px-5 py-3.5 rounded-full border-2 border-neutral-border hover:border-primary-dark transition-colors bg-white shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>

        <button
          type="submit"
          className="btn-black shrink-0 !py-3.5"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="bg-bg-light rounded-3xl p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-primary-dark text-lg font-[var(--font-heading)] italic">
              Filter results
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-sm text-accent-pink hover:text-accent-pink-dark flex items-center gap-1 font-medium"
              >
                <X className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
                Field / Industry
              </label>
              <select
                value={currentField}
                onChange={(e) => updateParams("field", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border bg-white text-primary-dark text-sm focus:outline-none focus:border-primary-dark"
              >
                <option value="">All fields</option>
                {fields.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
                Location
              </label>
              <select
                value={currentLocation}
                onChange={(e) => updateParams("location", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border bg-white text-primary-dark text-sm focus:outline-none focus:border-primary-dark"
              >
                <option value="">All locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
                Duration
              </label>
              <select
                value={currentDuration}
                onChange={(e) => updateParams("duration", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border bg-white text-primary-dark text-sm focus:outline-none focus:border-primary-dark"
              >
                <option value="">All durations</option>
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
                Sort By
              </label>
              <select
                value={currentSort}
                onChange={(e) => updateParams("sort", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border bg-white text-primary-dark text-sm focus:outline-none focus:border-primary-dark"
              >
                <option value="newest">Newest First</option>
                <option value="deadline">Deadline</option>
                <option value="company">Company Name</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
