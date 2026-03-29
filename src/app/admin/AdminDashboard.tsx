"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Briefcase,
  Building2,
  FileText,
  BarChart3,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  X,
  Loader2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "overview" | "internships" | "applications";

interface AdminProps {
  internships: Array<{
    id: string;
    title: string;
    field: string;
    location: string;
    duration: string;
    isPaid: boolean;
    description: string;
    requirements: string | null;
    deadline: string | null;
    companyId: string;
    company: { name: string };
    _count: { applications: number };
    createdAt: string;
  }>;
  companies: Array<{ id: string; name: string; industry: string }>;
  applications: Array<{
    id: string;
    studentName: string;
    studentEmail: string;
    status: string;
    createdAt: string;
    internship: { title: string; company: { name: string } };
  }>;
  stats: {
    totalInternships: number;
    totalApplications: number;
    totalCompanies: number;
    topFields: [string, number][];
  };
}

export default function AdminDashboard({
  internships: initialInternships,
  companies,
  applications,
  stats,
}: AdminProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [internships, setInternships] = useState(initialInternships);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "", description: "", requirements: "",
    location: "Budapest", duration: "Flexible",
    isPaid: false, field: "", deadline: "", companyId: "",
  });

  const openNew = () => {
    setEditingId(null);
    setForm({ title: "", description: "", requirements: "", location: "Budapest", duration: "Flexible", isPaid: false, field: "", deadline: "", companyId: companies[0]?.id || "" });
    setShowModal(true);
  };

  const openEdit = (internship: (typeof internships)[0]) => {
    setEditingId(internship.id);
    setForm({
      title: internship.title, description: internship.description,
      requirements: internship.requirements || "", location: internship.location,
      duration: internship.duration, isPaid: internship.isPaid, field: internship.field,
      deadline: internship.deadline ? new Date(internship.deadline).toISOString().split("T")[0] : "",
      companyId: internship.companyId,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingId ? `/api/internships/${editingId}` : "/api/internships";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setShowModal(false); window.location.reload(); }
    } catch {} finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this internship?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/internships/${id}`, { method: "DELETE" });
      if (res.ok) setInternships(internships.filter((i) => i.id !== id));
    } catch {} finally { setDeleting(null); }
  };

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: BarChart3 },
    { id: "internships" as Tab, label: "Internships", icon: Briefcase },
    { id: "applications" as Tab, label: "Applications", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-bold text-primary-dark font-[var(--font-heading)] italic">
              Admin Dashboard
            </h1>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-1.5 text-sm text-neutral-mid hover:text-accent-pink transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="flex gap-8 -mb-px">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium pb-3 border-b-2 transition-colors",
                  tab === t.id
                    ? "border-primary-dark text-primary-dark"
                    : "border-transparent text-neutral-light hover:text-primary-dark"
                )}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        {/* Overview Tab */}
        {tab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { label: "Total Internships", value: stats.totalInternships, icon: Briefcase, bg: "bg-accent-lavender-light/40" },
                { label: "Total Applications", value: stats.totalApplications, icon: FileText, bg: "bg-accent-soft-pink/20" },
                { label: "Partner Companies", value: stats.totalCompanies, icon: Building2, bg: "bg-accent-yellow/20" },
              ].map((stat) => (
                <div key={stat.label} className={`${stat.bg} rounded-3xl p-7`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-light">{stat.label}</span>
                    <stat.icon className="w-5 h-5 text-neutral-light" />
                  </div>
                  <p className="text-4xl font-bold text-primary-dark font-[var(--font-heading)] italic">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-neutral-border p-8">
              <h3 className="font-bold text-primary-dark font-[var(--font-heading)] italic text-xl mb-6">
                Most Popular Fields
              </h3>
              <div className="space-y-4">
                {stats.topFields.map(([field, count]) => (
                  <div key={field}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-neutral-dark font-medium">{field}</span>
                      <span className="text-xs text-neutral-light">{count}</span>
                    </div>
                    <div className="h-2 bg-bg-light rounded-full overflow-hidden">
                      <div className="h-full bg-primary-dark rounded-full" style={{ width: `${(count / stats.totalInternships) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-border p-8">
              <h3 className="font-bold text-primary-dark font-[var(--font-heading)] italic text-xl mb-6">
                Recent Applications
              </h3>
              {applications.length === 0 ? (
                <p className="text-neutral-light text-sm">No applications yet.</p>
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between py-3 border-b border-neutral-border last:border-0">
                      <div>
                        <p className="text-sm font-medium text-primary-dark">{app.studentName}</p>
                        <p className="text-xs text-neutral-light">{app.internship.title} at {app.internship.company.name}</p>
                      </div>
                      <span className={cn(
                        "text-xs px-3 py-1 rounded-full font-medium",
                        app.status === "pending" ? "bg-accent-yellow/30 text-yellow-700"
                          : app.status === "accepted" ? "bg-accent-green/20 text-green-700"
                          : "bg-bg-light text-neutral-mid"
                      )}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {tab === "internships" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic">
                Manage Internships
              </h2>
              <button onClick={openNew} className="btn-black">
                <Plus className="w-4 h-4" />
                Add Internship
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-border bg-bg-light">
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Title</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Company</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Field</th>
                      <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Apps</th>
                      <th className="text-right px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.map((internship) => (
                      <tr key={internship.id} className="border-b border-neutral-border last:border-0 hover:bg-bg-subtle/50">
                        <td className="px-5 py-3.5 font-medium text-primary-dark">{internship.title}</td>
                        <td className="px-5 py-3.5 text-neutral-mid">{internship.company.name}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-accent-lavender-light/40 text-primary-dark font-medium">{internship.field}</span>
                        </td>
                        <td className="px-5 py-3.5 text-neutral-mid">{internship._count.applications}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEdit(internship)} className="p-2 rounded-full hover:bg-bg-light text-neutral-mid hover:text-primary-dark transition-colors" title="Edit">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(internship.id)} disabled={deleting === internship.id} className="p-2 rounded-full hover:bg-accent-pink/10 text-neutral-mid hover:text-accent-pink transition-colors disabled:opacity-50" title="Delete">
                              {deleting === internship.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {tab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold text-primary-dark font-[var(--font-heading)] italic mb-8">
              All Applications
            </h2>
            <div className="bg-white rounded-3xl border border-neutral-border overflow-hidden">
              {applications.length === 0 ? (
                <div className="p-16 text-center">
                  <p className="text-neutral-light font-[var(--font-heading)] italic text-lg">No applications received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-border bg-bg-light">
                        <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Student</th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Email</th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Internship</th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Status</th>
                        <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-light">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id} className="border-b border-neutral-border last:border-0 hover:bg-bg-subtle/50">
                          <td className="px-5 py-3.5 font-medium text-primary-dark">{app.studentName}</td>
                          <td className="px-5 py-3.5 text-neutral-mid">{app.studentEmail}</td>
                          <td className="px-5 py-3.5">
                            <p className="text-primary-dark font-medium">{app.internship.title}</p>
                            <p className="text-xs text-neutral-light">{app.internship.company.name}</p>
                          </td>
                          <td className="px-5 py-3.5">
                            <span className={cn(
                              "text-xs px-3 py-1 rounded-full font-medium",
                              app.status === "pending" ? "bg-accent-yellow/30 text-yellow-700"
                                : app.status === "accepted" ? "bg-accent-green/20 text-green-700"
                                : "bg-bg-light text-neutral-mid"
                            )}>{app.status}</span>
                          </td>
                          <td className="px-5 py-3.5 text-neutral-light">{new Date(app.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-7 border-b border-neutral-border">
              <h2 className="text-xl font-bold text-primary-dark font-[var(--font-heading)] italic">
                {editingId ? "Edit Internship" : "Add New Internship"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-bg-light text-neutral-mid">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-7 space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Company *</label>
                <div className="relative">
                  <select value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })} className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark appearance-none">
                    {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-light pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Description *</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-2xl border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Requirements</label>
                <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-2xl border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Location</label>
                  <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Duration</label>
                  <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Field</label>
                  <input type="text" value={form.field} onChange={(e) => setForm({ ...form, field: e.target.value })} className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">Deadline</label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="w-full px-4 py-2.5 rounded-full border-2 border-neutral-border text-primary-dark text-sm focus:outline-none focus:border-primary-dark" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isPaid" checked={form.isPaid} onChange={(e) => setForm({ ...form, isPaid: e.target.checked })} className="rounded border-neutral-border" />
                <label htmlFor="isPaid" className="text-sm text-neutral-dark">Paid internship</label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-7 border-t border-neutral-border">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 text-sm text-neutral-mid hover:text-primary-dark transition-colors font-medium">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.description || !form.companyId} className="btn-black !py-2.5 !px-6 !text-sm disabled:opacity-50">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editingId ? <>Update <ArrowRight className="w-3.5 h-3.5" /></> : <>Create <ArrowRight className="w-3.5 h-3.5" /></>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
