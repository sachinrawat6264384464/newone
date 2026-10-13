"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  getWebinarApplications,
  deleteWebinarApplication,
  updateApplicationStatus,
} from "@/lib/webinarApplications";

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [identityFilter, setIdentityFilter] = useState("ALL");
  const [goalFilter, setGoalFilter] = useState("ALL");
  const [commitmentFilter, setCommitmentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedApp, setSelectedApp] = useState(null);
  const [toast, setToast] = useState(null);

  // Load applications
  const fetchApplications = async (showToastOnDone = false) => {
    try {
      setRefreshing(true);
      let list = [];
      try {
        list = await getWebinarApplications();
      } catch (clientErr) {
        console.warn("Client getWebinarApplications failed, trying API route:", clientErr);
        const res = await fetch("/api/webinar-applications");
        const json = await res.json();
        list = json.applications || [];
      }

      setApplications(list);
      if (showToastOnDone) {
        showToast(`✅ Synced ${list.length} applications from database`);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      showToast("Failed to load applications", true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 3500);
  };

  // Status update handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistic update
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp((prev) => ({ ...prev, status: newStatus }));
      }

      try {
        await updateApplicationStatus(id, newStatus);
      } catch (err) {
        await fetch("/api/webinar-applications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        });
      }
      showToast("Status updated");
    } catch (err) {
      console.error(err);
      showToast("Failed to update status", true);
      fetchApplications();
    }
  };

  // Delete handler
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete application for "${name}"?`)) {
      return;
    }

    try {
      setApplications((prev) => prev.filter((app) => app.id !== id));
      if (selectedApp && selectedApp.id === id) setSelectedApp(null);

      try {
        await deleteWebinarApplication(id);
      } catch (err) {
        await fetch(`/api/webinar-applications?id=${id}`, { method: "DELETE" });
      }
      showToast("Application deleted");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete application", true);
      fetchApplications();
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (filteredApplications.length === 0) {
      showToast("No data to export", true);
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Email Address",
      "Phone Number",
      "Step 1: Identity / Background",
      "Step 2: 1 Cr Coaching Goal",
      "Step 3: Confidential Agreement",
      "Step 4: 17th Jan Commitment",
      "Status",
      "Submitted At",
      "Timestamp",
    ];

    const rows = filteredApplications.map((app) => [
      `"${app.id || ""}"`,
      `"${(app.name || "").replace(/"/g, '""')}"`,
      `"${(app.email || "").replace(/"/g, '""')}"`,
      `"${(app.phone || "").replace(/"/g, '""')}"`,
      `"${(app.identity || "").replace(/"/g, '""')}"`,
      `"${(app.coachingGoal || "").replace(/"/g, '""')}"`,
      `"${(app.confidentialAck || "").replace(/"/g, '""')}"`,
      `"${(app.liveCommitment || "").replace(/"/g, '""')}"`,
      `"${app.status || "new"}"`,
      `"${app.submittedAtFormatted || new Date(app.createdAt || Date.now()).toLocaleString()}"`,
      `"${app.createdAt || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `webinar_applications_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`📥 Exported ${filteredApplications.length} records to CSV`);
  };

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Search
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        (app.name && app.name.toLowerCase().includes(search)) ||
        (app.email && app.email.toLowerCase().includes(search)) ||
        (app.phone && app.phone.toLowerCase().includes(search));

      // Identity
      const matchesIdentity =
        identityFilter === "ALL" || app.identity === identityFilter;

      // Goal
      const matchesGoal =
        goalFilter === "ALL" ||
        (goalFilter === "YES" && app.coachingGoal?.includes("YES")) ||
        (goalFilter === "MAYBE" && app.coachingGoal?.includes("MAYBE")) ||
        (goalFilter === "NO" && app.coachingGoal?.includes("NO"));

      // Commitment
      const matchesCommitment =
        commitmentFilter === "ALL" ||
        (commitmentFilter === "YES" && app.liveCommitment === "YES") ||
        (commitmentFilter === "NO" && app.liveCommitment === "NO");

      // Status
      const matchesStatus =
        statusFilter === "ALL" || (app.status || "new") === statusFilter;

      return (
        matchesSearch &&
        matchesIdentity &&
        matchesGoal &&
        matchesCommitment &&
        matchesStatus
      );
    });
  }, [
    applications,
    searchTerm,
    identityFilter,
    goalFilter,
    commitmentFilter,
    statusFilter,
  ]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const total = applications.length;
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayCount = applications.filter(
      (a) => a.createdAt && a.createdAt >= todayStart.getTime()
    ).length;

    const committedCount = applications.filter(
      (a) => a.liveCommitment === "YES"
    ).length;

    const goalReadyCount = applications.filter((a) =>
      a.coachingGoal?.includes("YES")
    ).length;

    return { total, todayCount, committedCount, goalReadyCount };
  }, [applications]);

  // Clean phone digits for WhatsApp
  const cleanPhone = (phone = "") => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  return (
    <div className="admin-cms min-h-screen bg-[#0c0b09] text-[#f4f4f5] pb-24 overflow-x-hidden w-full">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[100] p-3 sm:p-4 rounded-xl shadow-2xl flex items-center gap-3 border transition-all animate-fade-in max-w-[90vw] text-xs sm:text-sm ${
            toast.isError
              ? "bg-destructive text-white border-destructive"
              : "bg-[#191614] text-foreground border-primary"
          }`}
        >
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#161412] border-b border-border px-3 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/40">
              Live DB
            </span>
            <h1 className="font-display text-lg sm:text-2xl font-bold text-gradient-gold">
              Webinar Applications & Questionnaire Leads
            </h1>
          </div>
          <p className="text-muted-foreground text-[11px] sm:text-xs font-sans mt-0.5">
            Full step-by-step selections captured from the 2026 Plan registration modal
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <Link
            href="/web/admin"
            className="flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors font-display text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>⚙️</span> CMS Settings
          </Link>
          <Link
            href="/web"
            target="_blank"
            className="flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors font-display text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>👁️</span> Live Site
          </Link>
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors font-display text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
          >
            <span>📥</span> Export CSV
          </button>
          <button
            onClick={() => fetchApplications(true)}
            disabled={refreshing}
            className="flex-1 sm:flex-initial text-center mirror-button px-4 sm:px-5 py-2 rounded-lg text-primary-foreground font-display font-semibold text-xs sm:text-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <span className={refreshing ? "animate-spin" : ""}>🔄</span>{" "}
            {refreshing ? "Syncing..." : "Sync DB"}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 mt-4 sm:mt-6 space-y-6">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#161412] border border-border/80 rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Total Applicants
              </span>
              <span className="text-xl">📋</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-gradient-gold">
              {stats.total}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Saved in Firestore</p>
          </div>

          <div className="bg-[#161412] border border-border/80 rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                Today&apos;s Signups
              </span>
              <span className="text-xl">⚡</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-emerald-400">
              {stats.todayCount}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Registered today</p>
          </div>

          <div className="bg-[#161412] border border-border/80 rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                17th Jan Committed
              </span>
              <span className="text-xl">🎯</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-primary">
              {stats.committedCount}
              <span className="text-xs text-muted-foreground font-normal ml-2">
                ({stats.total > 0 ? Math.round((stats.committedCount / stats.total) * 100) : 0}%)
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Answered YES for live session</p>
          </div>

          <div className="bg-[#161412] border border-border/80 rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                1 Cr Goal Ready
              </span>
              <span className="text-xl">🏆</span>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-display font-bold text-amber-300">
              {stats.goalReadyCount}
              <span className="text-xs text-muted-foreground font-normal ml-2">
                ({stats.total > 0 ? Math.round((stats.goalReadyCount / stats.total) * 100) : 0}%)
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">Answered YES to build coaching</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#161412] border border-border/80 rounded-xl p-4 shadow-lg space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0e0d0b] border border-border text-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors"
              />
              <span className="absolute left-3 top-3 text-muted-foreground text-xs">🔍</span>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Identity Filter */}
            <div>
              <select
                value={identityFilter}
                onChange={(e) => setIdentityFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0e0d0b] border border-border text-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors cursor-pointer"
              >
                <option value="ALL">All Identities</option>
                <option value="Already A Coach">Already A Coach</option>
                <option value="Want to become a coach">Want to become a coach</option>
                <option value="Working professional">Working professional</option>
                <option value="Agency owner / Freelancer">Agency owner / Freelancer</option>
                <option value="Business owner">Business owner</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* Commitment Filter */}
            <div>
              <select
                value={commitmentFilter}
                onChange={(e) => setCommitmentFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0e0d0b] border border-border text-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors cursor-pointer"
              >
                <option value="ALL">17th Jan: All</option>
                <option value="YES">17th Jan: Committed (YES)</option>
                <option value="NO">17th Jan: Not Committed (NO)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0e0d0b] border border-border text-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="registered">Registered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/40">
            <span>
              Showing <strong className="text-foreground">{filteredApplications.length}</strong> of{" "}
              {applications.length} applications
            </span>
            {(searchTerm || identityFilter !== "ALL" || commitmentFilter !== "ALL" || statusFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setIdentityFilter("ALL");
                  setGoalFilter("ALL");
                  setCommitmentFilter("ALL");
                  setStatusFilter("ALL");
                }}
                className="text-primary hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="bg-[#161412] border border-border/80 rounded-xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-muted-foreground">
              <div className="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="font-display text-sm text-foreground">Fetching applications from Firestore...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-display text-base text-foreground">No applications found</p>
              <p className="text-xs text-muted-foreground mt-1">
                {applications.length === 0
                  ? "When users submit the registration form on the live site, they will appear here instantly."
                  : "Try clearing your search or filter options to see all records."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1c1916] border-b border-border text-muted-foreground uppercase text-[11px] tracking-wider font-semibold">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4 min-w-[200px]">Applicant</th>
                    <th className="py-3.5 px-4 min-w-[170px]">Step 1: Background</th>
                    <th className="py-3.5 px-4 min-w-[160px]">Step 2: 1 Cr Goal</th>
                    <th className="py-3.5 px-4 min-w-[130px]">Step 3: Confid.</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Step 4: 17 Jan Live</th>
                    <th className="py-3.5 px-4 min-w-[140px]">Submitted At</th>
                    <th className="py-3.5 px-4 min-w-[120px]">Status</th>
                    <th className="py-3.5 px-4 text-right min-w-[130px]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredApplications.map((app, index) => {
                    const isCommitted = app.liveCommitment === "YES";
                    const isGoalYes = app.coachingGoal?.includes("YES");

                    return (
                      <tr
                        key={app.id || index}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Index */}
                        <td className="py-3.5 px-4 text-muted-foreground font-mono text-xs">
                          {index + 1}
                        </td>

                        {/* Applicant Contact */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-foreground text-sm flex items-center gap-1.5">
                            <span>{app.name || "Anonymous"}</span>
                          </div>
                          <div className="text-muted-foreground text-xs mt-0.5 space-y-0.5">
                            {app.email && (
                              <div className="truncate max-w-[220px]">
                                <a
                                  href={`mailto:${app.email}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  ✉️ {app.email}
                                </a>
                              </div>
                            )}
                            {app.phone && (
                              <div>
                                <a
                                  href={`tel:${app.phone}`}
                                  className="hover:text-primary font-mono transition-colors"
                                >
                                  📞 {app.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Step 1: Background Identity */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {app.identity || "Not Specified"}
                          </span>
                        </td>

                        {/* Step 2: 1 Cr Coaching Goal */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              isGoalYes
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : app.coachingGoal?.includes("MAYBE")
                                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                : "bg-red-500/15 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {app.coachingGoal || "Not Specified"}
                          </span>
                        </td>

                        {/* Step 3: Confidential Agreement */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                              app.confidentialAck === "YES"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {app.confidentialAck || "YES"}
                          </span>
                        </td>

                        {/* Step 4: 17th Jan Commitment */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${
                              isCommitted
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                : "bg-red-500/20 text-red-300 border border-red-500/40"
                            }`}
                          >
                            {isCommitted ? "✓ YES, LIVE" : "✕ NO"}
                          </span>
                        </td>

                        {/* Submitted At */}
                        <td className="py-3.5 px-4 text-muted-foreground text-xs whitespace-nowrap">
                          {app.submittedAtFormatted ||
                            (app.createdAt
                              ? new Date(app.createdAt).toLocaleString("en-IN", {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                })
                              : "—")}
                        </td>

                        {/* Status Select */}
                        <td className="py-3.5 px-4">
                          <select
                            value={app.status || "new"}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`text-xs px-2.5 py-1 rounded border focus:outline-none cursor-pointer ${
                              app.status === "registered"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : app.status === "contacted"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                                : app.status === "rejected"
                                ? "bg-red-500/20 text-red-300 border-red-500/40"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            }`}
                          >
                            <option value="new" className="bg-[#191614] text-foreground">
                              New
                            </option>
                            <option value="contacted" className="bg-[#191614] text-foreground">
                              Contacted
                            </option>
                            <option value="registered" className="bg-[#191614] text-foreground">
                              Registered
                            </option>
                            <option value="rejected" className="bg-[#191614] text-foreground">
                              Rejected
                            </option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              title="View Full Questionnaire Dossier"
                              className="px-2.5 py-1.5 rounded bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 text-xs font-semibold cursor-pointer transition-colors"
                            >
                              Dossier
                            </button>
                            {app.phone && (
                              <a
                                href={`https://wa.me/${cleanPhone(app.phone)}?text=${encodeURIComponent(
                                  `Hi ${app.name}, this is regarding your registration for the 2026 Plan Live Webinar on 17th Jan!`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                title="Chat on WhatsApp"
                                className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs cursor-pointer transition-colors"
                              >
                                💬
                              </a>
                            )}
                            <button
                              onClick={() => handleDelete(app.id, app.name)}
                              title="Delete Record"
                              className="p-1.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs cursor-pointer transition-colors"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Full Dossier Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedApp(null);
          }}
        >
          <div className="bg-[#161412] border-gradient-gold rounded-2xl max-w-lg w-full p-5 sm:p-7 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-white/10 cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-start gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary flex items-center justify-center text-primary font-display font-bold text-xl">
                {(selectedApp.name || "A").charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-gradient-gold">
                  {selectedApp.name || "Anonymous Applicant"}
                </h3>
                <p className="text-muted-foreground text-xs font-mono mt-0.5">
                  ID: {selectedApp.id || "N/A"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                      selectedApp.status === "registered"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : selectedApp.status === "contacted"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {selectedApp.status || "new"}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {selectedApp.submittedAtFormatted || "Date not recorded"}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {selectedApp.phone && (
                <a
                  href={`https://wa.me/${cleanPhone(selectedApp.phone)}?text=${encodeURIComponent(
                    `Hi ${selectedApp.name}, this is regarding your registration for the 2026 Plan Live Webinar on 17th January!`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 transition-colors text-center text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>💬</span> WhatsApp
                </a>
              )}
              {selectedApp.phone && (
                <a
                  href={`tel:${selectedApp.phone}`}
                  className="py-2.5 px-3 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 transition-colors text-center text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>📞</span> Call
                </a>
              )}
              {selectedApp.email && (
                <a
                  href={`mailto:${selectedApp.email}`}
                  className="py-2.5 px-3 rounded-lg bg-amber-600/20 border border-amber-500/40 text-amber-300 hover:bg-amber-600/30 transition-colors text-center text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>✉️</span> Email
                </a>
              )}
            </div>

            {/* Questionnaire Responses Box */}
            <div className="space-y-3.5 bg-[#0e0d0b] border border-border/80 rounded-xl p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary border-b border-border/60 pb-2">
                📋 Step-by-Step Selections
              </h4>

              <div>
                <p className="text-[11px] text-muted-foreground">
                  Step 1: What Represents You The Best?
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  ⭐ {selectedApp.identity || "Not Specified"}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">
                  Step 2: Do You Want to Build a 1 Crore Profitable Coaching Business in 2026?
                </p>
                <p className="text-sm font-semibold text-amber-300 mt-0.5">
                  💼 {selectedApp.coachingGoal || "Not Specified"}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">
                  Step 3: Understand this is LIVE & Confidential (No Replays)?
                </p>
                <p className="text-sm font-semibold text-foreground mt-0.5">
                  🔒 {selectedApp.confidentialAck || "YES"}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">
                  Step 4: Will you show up live on 17th January?
                </p>
                <p
                  className={`text-sm font-bold mt-0.5 ${
                    selectedApp.liveCommitment === "YES"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedApp.liveCommitment === "YES" ? "✅ YES (Committed)" : "❌ NO"}
                </p>
              </div>

              <div className="pt-2 border-t border-border/50">
                <p className="text-[11px] text-muted-foreground">Contact Information:</p>
                <p className="text-xs text-foreground font-mono mt-0.5">
                  📧 {selectedApp.email || "No email"} | 📱 {selectedApp.phone || "No phone"}
                </p>
              </div>
            </div>

            {/* Status Change in Modal */}
            <div className="mt-5 flex items-center justify-between pt-4 border-t border-border/60">
              <label className="text-xs text-muted-foreground font-semibold">
                Update Status:
              </label>
              <select
                value={selectedApp.status || "new"}
                onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-[#0e0d0b] border border-border text-foreground text-xs focus:border-primary focus:outline-none cursor-pointer"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="registered">Registered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
