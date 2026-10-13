"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [content, setContent] = useState(null);
  const [activeTab, setActiveTab] = useState("hero"); // hero | session | host | finalCta | sticky | links
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);

  // Fetch content on mount
  useEffect(() => {
    fetch("/api/content")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setContent(data);
      })
      .catch((err) => showToast("Error loading content", true));
  }, []);

  const showToast = (message, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => setToast(null), 4000);
  };

  // Generic updater
  const updateField = (section, field, value) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // File upload handler
  const handleFileUpload = async (e, section, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(`${section}.${field}`);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        updateField(section, field, data.url);
        showToast("Image uploaded successfully!");
      } else {
        showToast(data.error || "Upload failed", true);
      }
    } catch (err) {
      console.error(err);
      showToast("Error uploading file", true);
    } finally {
      setUploadingField(null);
    }
  };

  // Card CRUD
  const updateCard = (index, field, value) => {
    setContent((prev) => {
      const cards = [...(prev.session?.cards || [])];
      cards[index] = { ...cards[index], [field]: value };
      return {
        ...prev,
        session: { ...prev.session, cards },
      };
    });
  };

  const addCard = () => {
    setContent((prev) => {
      const cards = [
        ...(prev.session?.cards || []),
        {
          id: String(Date.now()),
          icon: "⭐",
          highlight: "Worth ₹20,000",
          title: "New Strategy",
          description: "Description of the new session takeaway",
        },
      ];
      return {
        ...prev,
        session: { ...prev.session, cards },
      };
    });
  };

  const deleteCard = (index) => {
    setContent((prev) => {
      const cards = prev.session?.cards?.filter((_, i) => i !== index);
      return {
        ...prev,
        session: { ...prev.session, cards },
      };
    });
  };

  // Stat CRUD
  const updateStat = (index, field, value) => {
    setContent((prev) => {
      const stats = [...(prev.host?.stats || [])];
      stats[index] = { ...stats[index], [field]: value };
      return {
        ...prev,
        host: { ...prev.host, stats },
      };
    });
  };

  const addStat = () => {
    setContent((prev) => {
      const stats = [
        ...(prev.host?.stats || []),
        { id: String(Date.now()), value: "100+", label: "New Milestone" },
      ];
      return {
        ...prev,
        host: { ...prev.host, stats },
      };
    });
  };

  const deleteStat = (index) => {
    setContent((prev) => {
      const stats = prev.host?.stats?.filter((_, i) => i !== index);
      return {
        ...prev,
        host: { ...prev.host, stats },
      };
    });
  };

  // Save to disk
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.success) {
        showToast("✅ All changes saved successfully!");
      } else {
        showToast(data.error || "Save failed", true);
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving content", true);
    } finally {
      setIsSaving(false);
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground font-display text-base md:text-xl p-4 text-center">
        Loading Admin CMS...
      </div>
    );
  }

  return (
    <div className="admin-cms min-h-screen bg-[#0c0b09] text-[#f4f4f5] pb-24 overflow-x-hidden w-full max-w-full">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[100] p-3 sm:p-4 rounded-xl shadow-2xl flex items-center gap-3 border transition-all animate-fade-in max-w-[90vw] text-xs sm:text-sm ${
            toast.isError
              ? "bg-destructive text-white border-destructive"
              : "bg-card text-foreground border-primary"
          }`}
        >
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#161412] border-b border-border px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
        <div>
          <h1 className="font-display text-lg sm:text-2xl font-bold text-gradient-gold">
            2026 PLAN — Admin CMS
          </h1>
          <p className="text-muted-foreground text-[11px] sm:text-xs font-sans">
            Edit text, headings, cards, and upload images
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={typeof window !== 'undefined' && window.location.pathname.startsWith('/web') ? '/web' : '/'}
            target="_blank"
            className="flex-1 sm:flex-initial text-center px-3 sm:px-4 py-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-colors font-display text-xs sm:text-sm flex items-center justify-center gap-1.5"
          >
            <span>👁️</span> Live Site
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 sm:flex-initial text-center mirror-button px-4 sm:px-6 py-2 rounded-lg text-primary-foreground font-display font-semibold text-xs sm:text-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isSaving ? "Saving..." : "💾 Save Changes"}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 mt-4 sm:mt-8">
        {/* Horizontally Scrollable Tab Bar (Mobile Friendly) */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar border-b border-border gap-1.5 sm:gap-2 mb-6 pb-2 w-full">
          {[
            { id: "hero", label: "🌟 Hero Section" },
            { id: "session", label: "📋 2-Hour Session" },
            { id: "host", label: "👤 Host & Stats" },
            { id: "finalCta", label: "🚀 Final CTA" },
            { id: "sticky", label: "⏱️ Sticky Bar" },
            { id: "links", label: "🔗 Links & Webhook" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 font-display text-xs sm:text-sm border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary font-bold bg-primary/10 rounded-t-lg"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= TAB 1: HERO ================= */}
        {activeTab === "hero" && (
          <div className="bg-card border-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <h2 className="font-display text-lg sm:text-xl text-primary font-bold">Hero Section Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Top Pill Badge</label>
                <input
                  type="text"
                  value={content.hero.badge || ""}
                  onChange={(e) => updateField("hero", "badge", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Pre-heading Question</label>
                <input
                  type="text"
                  value={content.hero.preheading || ""}
                  onChange={(e) => updateField("hero", "preheading", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Headline Part 1 (Gold)</label>
                <input
                  type="text"
                  value={content.hero.headlineLive || ""}
                  onChange={(e) => updateField("hero", "headlineLive", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Headline Text 1</label>
                <input
                  type="text"
                  value={content.hero.headlineMain1 || ""}
                  onChange={(e) => updateField("hero", "headlineMain1", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Headline Accent (Gold)</label>
                <input
                  type="text"
                  value={content.hero.headlineGold || ""}
                  onChange={(e) => updateField("hero", "headlineGold", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Headline Text 2</label>
                <input
                  type="text"
                  value={content.hero.headlineMain2 || ""}
                  onChange={(e) => updateField("hero", "headlineMain2", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1">Hero Description Paragraph</label>
              <textarea
                rows={3}
                value={content.hero.description || ""}
                onChange={(e) => updateField("hero", "description", e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={content.hero.ctaText || ""}
                  onChange={(e) => updateField("hero", "ctaText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Date Badge Text</label>
                <input
                  type="text"
                  value={content.hero.dateText || ""}
                  onChange={(e) => updateField("hero", "dateText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Registration Notice Text</label>
                <input
                  type="text"
                  value={content.hero.noticeText || ""}
                  onChange={(e) => updateField("hero", "noticeText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Host info preview (FIXED CIRCULAR PHOTO OVERFLOW) */}
            <div className="border-t border-border pt-5 sm:pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Host Name</label>
                <input
                  type="text"
                  value={content.hero.hostName || ""}
                  onChange={(e) => updateField("hero", "hostName", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm mb-3"
                />

                <label className="block text-xs sm:text-sm font-semibold mb-1">Host Tagline</label>
                <input
                  type="text"
                  value={content.hero.hostTagline || ""}
                  onChange={(e) => updateField("hero", "hostTagline", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Host Circular Photo</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  {/* Strict Avatar Bounds Class with inline fallback */}
                  <div
                    className="avatar-circular border-2 border-primary glow-gold shadow-md shrink-0"
                    style={{
                      width: "72px",
                      height: "72px",
                      minWidth: "72px",
                      maxWidth: "72px",
                      minHeight: "72px",
                      maxHeight: "72px",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={content.hero.hostImage}
                      alt="Host"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={content.hero.hostImage || ""}
                      onChange={(e) => updateField("hero", "hostImage", e.target.value)}
                      className="w-full px-3 py-1.5 bg-secondary rounded border border-border text-xs"
                      placeholder="Image URL"
                    />
                    <label className="inline-block px-3 py-1.5 bg-primary/20 text-primary border border-primary/40 rounded text-xs cursor-pointer hover:bg-primary/30">
                      {uploadingField === "hero.hostImage" ? "Uploading..." : "Upload New Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "hero", "hostImage")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Settings */}
            <div className="border-t border-border pt-5 sm:pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Background Video Path / URL</label>
                <input
                  type="text"
                  value={content.hero.bgVideo || ""}
                  onChange={(e) => updateField("hero", "bgVideo", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border focus:border-primary text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">
                  Video Clarity / Opacity ({content.hero.videoOpacity || 70}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={content.hero.videoOpacity || 70}
                  onChange={(e) => updateField("hero", "videoOpacity", e.target.value)}
                  className="w-full accent-primary"
                />
                <span className="text-[11px] text-muted-foreground block mt-1">
                  Higher = sharper and more visible Roman background video
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SESSION CARDS ================= */}
        {activeTab === "session" && (
          <div className="bg-card border-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg sm:text-xl text-primary font-bold">
                  In This 2-Hour Session Section
                </h2>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  Add, edit, and delete value cards and pricing
                </p>
              </div>
              <button
                type="button"
                onClick={addCard}
                className="w-full sm:w-auto px-4 py-2 bg-primary/20 text-primary border border-primary/50 rounded-lg text-xs sm:text-sm font-display hover:bg-primary/30 flex items-center justify-center gap-1.5"
              >
                <span>➕</span> Add New Card
              </button>
            </div>

            {/* Section Headings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={content.session.eyebrow || ""}
                  onChange={(e) => updateField("session", "eyebrow", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Title Prefix</label>
                <input
                  type="text"
                  value={content.session.title || ""}
                  onChange={(e) => updateField("session", "title", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Title Accent (Gold)</label>
                <input
                  type="text"
                  value={content.session.titleGold || ""}
                  onChange={(e) => updateField("session", "titleGold", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1">Section Subheading</label>
              <textarea
                rows={2}
                value={content.session.description || ""}
                onChange={(e) => updateField("session", "description", e.target.value)}
                className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
              />
            </div>

            {/* Editable Cards List */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-display text-sm sm:text-base text-primary font-bold">
                Cards ({content.session.cards?.length || 0})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {(content.session.cards || []).map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="p-4 sm:p-5 rounded-xl border border-border/80 bg-[#191614] relative shadow-md space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() => deleteCard(idx)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 text-xs"
                      title="Delete this card"
                    >
                      🗑️ Delete
                    </button>

                    <div className="flex gap-2 sm:gap-3">
                      <div className="w-14 sm:w-16">
                        <label className="block text-[11px] font-semibold mb-1">Icon</label>
                        <input
                          type="text"
                          value={card.icon || ""}
                          onChange={(e) => updateCard(idx, "icon", e.target.value)}
                          className="w-full px-2 py-1.5 bg-secondary rounded border border-border text-center text-base sm:text-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold mb-1">Highlight Badge</label>
                        <input
                          type="text"
                          value={card.highlight || ""}
                          onChange={(e) => updateCard(idx, "highlight", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-secondary rounded border border-border text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold mb-1">Card Title</label>
                      <input
                        type="text"
                        value={card.title || ""}
                        onChange={(e) => updateCard(idx, "title", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-secondary rounded border border-border text-xs sm:text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={card.description || ""}
                        onChange={(e) => updateCard(idx, "description", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-secondary rounded border border-border text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Details */}
            <div className="border-t border-border pt-5 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Total Value Text</label>
                <input
                  type="text"
                  value={content.session.totalValue || ""}
                  onChange={(e) => updateField("session", "totalValue", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Your Investment</label>
                <input
                  type="text"
                  value={content.session.investment || ""}
                  onChange={(e) => updateField("session", "investment", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={content.session.ctaText || ""}
                  onChange={(e) => updateField("session", "ctaText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Date Text</label>
                <input
                  type="text"
                  value={content.session.dateText || ""}
                  onChange={(e) => updateField("session", "dateText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HOST & STATS ================= */}
        {activeTab === "host" && (
          <div className="bg-card border-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <h2 className="font-display text-lg sm:text-xl text-primary font-bold">Host &amp; Stats Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">Section Title Accent (Name)</label>
                  <input
                    type="text"
                    value={content.host.titleGold || ""}
                    onChange={(e) => updateField("host", "titleGold", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">Host Tagline</label>
                  <input
                    type="text"
                    value={content.host.tagline || ""}
                    onChange={(e) => updateField("host", "tagline", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm italic"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">Biography Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={content.host.bio1 || ""}
                    onChange={(e) => updateField("host", "bio1", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">Biography Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={content.host.bio2 || ""}
                    onChange={(e) => updateField("host", "bio2", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Host Main Photo (FIXED OVERFLOW) */}
              <div className="space-y-3 sm:space-y-4">
                <label className="block text-xs sm:text-sm font-semibold mb-1">Host Feature Image</label>
                <div
                  className="host-preview-box border-2 border-primary glow-gold shadow-2xl"
                  style={{
                    width: "180px",
                    height: "180px",
                    maxWidth: "100%",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  <img
                    src={content.host.hostImage}
                    alt="Host"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={content.host.hostImage || ""}
                    onChange={(e) => updateField("host", "hostImage", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded border border-border text-xs"
                    placeholder="Image URL"
                  />
                  <div className="text-center">
                    <label className="inline-block px-4 py-2 bg-primary/20 text-primary border border-primary/40 rounded-lg text-xs sm:text-sm cursor-pointer hover:bg-primary/30">
                      {uploadingField === "host.hostImage" ? "Uploading..." : "Upload New Host Image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, "host", "hostImage")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Stats */}
            <div className="border-t border-border pt-5 sm:pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm sm:text-base text-primary font-bold">
                  Stat Counters ({content.host.stats?.length || 0})
                </h3>
                <button
                  type="button"
                  onClick={addStat}
                  className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/50 rounded-lg text-xs font-display hover:bg-primary/30"
                >
                  ➕ Add Stat
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(content.host.stats || []).map((stat, idx) => (
                  <div
                    key={stat.id || idx}
                    className="p-3 sm:p-4 rounded-xl border border-border bg-[#191614] relative shadow space-y-2"
                  >
                    <button
                      type="button"
                      onClick={() => deleteStat(idx)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-300 text-xs p-1"
                    >
                      ✕
                    </button>
                    <div>
                      <label className="block text-[11px] font-semibold mb-1">Number / Stat Value</label>
                      <input
                        type="text"
                        value={stat.value || ""}
                        onChange={(e) => updateStat(idx, "value", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-secondary rounded border border-border text-sm sm:text-base font-bold text-primary font-display"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label || ""}
                        onChange={(e) => updateStat(idx, "label", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-secondary rounded border border-border text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FINAL CTA ================= */}
        {activeTab === "finalCta" && (
          <div className="bg-card border-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <h2 className="font-display text-lg sm:text-xl text-primary font-bold">Urgency &amp; Final Call to Action</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Scarcity Warning Badge</label>
                <input
                  type="text"
                  value={content.finalCta.scarcityBadge || ""}
                  onChange={(e) => updateField("finalCta", "scarcityBadge", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Quote Attribution</label>
                <input
                  type="text"
                  value={content.finalCta.attribution || ""}
                  onChange={(e) => updateField("finalCta", "attribution", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1">Quote Text</label>
              <textarea
                rows={2}
                value={content.finalCta.quote || ""}
                onChange={(e) => updateField("finalCta", "quote", e.target.value)}
                className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm italic"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1">Heading</label>
              <input
                type="text"
                value={content.finalCta.heading || ""}
                onChange={(e) => updateField("finalCta", "heading", e.target.value)}
                className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-base font-bold"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1">Description</label>
              <textarea
                rows={3}
                value={content.finalCta.description || ""}
                onChange={(e) => updateField("finalCta", "description", e.target.value)}
                className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Button Text</label>
                <input
                  type="text"
                  value={content.finalCta.ctaText || ""}
                  onChange={(e) => updateField("finalCta", "ctaText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Date Text</label>
                <input
                  type="text"
                  value={content.finalCta.dateText || ""}
                  onChange={(e) => updateField("finalCta", "dateText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Footer Copyright</label>
                <input
                  type="text"
                  value={content.finalCta.copyright || ""}
                  onChange={(e) => updateField("finalCta", "copyright", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: STICKY BAR & TIMER ================= */}
        {activeTab === "sticky" && (
          <div className="bg-card border-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <h2 className="font-display text-lg sm:text-xl text-primary font-bold">Sticky Bottom Bar &amp; Countdown Timer</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Promotional Price</label>
                <input
                  type="text"
                  value={content.stickyBar.price || ""}
                  onChange={(e) => updateField("stickyBar", "price", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm font-bold text-primary"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Original Price (Strikethrough)</label>
                <input
                  type="text"
                  value={content.stickyBar.originalPrice || ""}
                  onChange={(e) => updateField("stickyBar", "originalPrice", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Countdown Duration (Minutes)</label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={content.stickyBar.countdownMinutes || 4}
                  onChange={(e) => updateField("stickyBar", "countdownMinutes", Number(e.target.value))}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Seats Left Badge Text</label>
                <input
                  type="text"
                  value={content.stickyBar.seatsLeft || ""}
                  onChange={(e) => updateField("stickyBar", "seatsLeft", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">Enroll Button Text</label>
                <input
                  type="text"
                  value={content.stickyBar.ctaText || ""}
                  onChange={(e) => updateField("stickyBar", "ctaText", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: LINKS & WEBHOOK ================= */}
        {activeTab === "links" && (
          <div className="bg-card border-gradient-gold rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            <h2 className="font-display text-lg sm:text-xl text-primary font-bold">Integration Links &amp; Webhooks</h2>

            <div>
              <label className="block text-xs sm:text-sm font-semibold mb-1">Pabbly Webhook Endpoint (Lead Capture)</label>
              <input
                type="url"
                value={content.webhookUrl || ""}
                onChange={(e) => setContent((prev) => ({ ...prev, webhookUrl: e.target.value }))}
                className="w-full px-3 py-2 bg-secondary rounded-lg border border-border font-mono text-xs focus:border-primary"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                All modal registrations will be sent to this webhook URL via POST request.
              </p>
            </div>

            <div className="border-t border-border pt-5 sm:pt-6 space-y-4">
              <h3 className="font-display text-sm sm:text-base text-primary font-bold">Thank You Page Settings</h3>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">WhatsApp Community Link</label>
                <input
                  type="url"
                  value={content.thankYou?.whatsappUrl || ""}
                  onChange={(e) => updateField("thankYou", "whatsappUrl", e.target.value)}
                  className="w-full px-3 py-2 bg-secondary rounded-lg border border-border font-mono text-xs focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">Workshop Date</label>
                  <input
                    type="text"
                    value={content.thankYou?.workshopDate || ""}
                    onChange={(e) => updateField("thankYou", "workshopDate", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">Workshop Time</label>
                  <input
                    type="text"
                    value={content.thankYou?.workshopTime || ""}
                    onChange={(e) => updateField("thankYou", "workshopTime", e.target.value)}
                    className="w-full px-3 py-2 bg-secondary rounded-lg border border-border text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="mt-6 sm:mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto mirror-button px-6 sm:px-8 py-3 rounded-xl text-primary-foreground font-display font-semibold text-sm sm:text-base cursor-pointer disabled:opacity-50 shadow-xl"
          >
            {isSaving ? "Saving..." : "💾 Save All Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
