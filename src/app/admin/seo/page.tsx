'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminShell from '@/components/admin/AdminShell';
import {
  SerpItem,
  PageSeoAnalysis,
  SeoGapAnalysis,
  SeoRecommendation,
  SeoAuditLog,
  ApprovalStatus
} from '@/types/seoAgent';
import { getSavedAuditLogs, saveAuditLog } from '@/lib/seoRecommendations';
import {
  Search,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Check,
  X,
  Edit,
  RotateCcw,
  Globe,
  ExternalLink,
  Layers,
  AlertTriangle,
  Award,
  HelpCircle,
  FileCode,
  Tag,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSeoPage() {
  const [targetUrl, setTargetUrl] = useState('https://homestorey.in');
  const [targetKeyword, setTargetKeyword] = useState('interior designer in noida');
  const [location, setLocation] = useState('India');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'serp' | 'audit'>('overview');

  // Results State
  const [serpResults, setSerpResults] = useState<SerpItem[]>([]);
  const [targetAnalysis, setTargetAnalysis] = useState<PageSeoAnalysis | null>(null);
  const [gapAnalysis, setGapAnalysis] = useState<SeoGapAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<SeoRecommendation[]>([]);
  const [auditLogs, setAuditLogs] = useState<SeoAuditLog[]>([]);

  // Edit Modal State
  const [editModalRec, setEditModalRec] = useState<SeoRecommendation | null>(null);
  const [editedStateText, setEditedStateText] = useState('');

  const loadLocalLogs = useCallback(() => {
    setAuditLogs(getSavedAuditLogs());
  }, []);

  useEffect(() => {
    loadLocalLogs();
  }, [loadLocalLogs]);

  // Run SEO Intelligence Agent Analysis
  const handleRunAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!targetKeyword.trim()) {
      toast.error('Please enter a target keyword');
      return;
    }

    setLoading(true);
    toast.loading('Analyzing Google SERPs & Competitor SEO signals...', { id: 'seo-toast' });

    try {
      const res = await fetch('/api/seo/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl,
          targetKeyword,
          location,
          device
        })
      });

      const json = await res.json();
      if (!res.ok || !json.data) {
        throw new Error(json.error || 'Failed to run analysis');
      }

      const data = json.data;
      setSerpResults(data.serpResults || []);
      setTargetAnalysis(data.targetAnalysis || null);
      setGapAnalysis(data.gapAnalysis || null);
      setRecommendations(data.recommendations || []);
      setActiveTab('overview');

      toast.success('SEO Competitor Analysis complete!', { id: 'seo-toast' });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to execute SEO analysis', { id: 'seo-toast' });
    } finally {
      setLoading(false);
    }
  };

  // Process Recommendation Status Action (Approve / Reject / Edit)
  const handleRecommendationAction = async (
    rec: SeoRecommendation,
    newStatus: ApprovalStatus,
    modifiedText?: string
  ) => {
    const finalVal = modifiedText !== undefined ? modifiedText : rec.recommendedState;

    try {
      const res = await fetch('/api/seo/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendationId: rec.id,
          action: newStatus === 'approved' ? 'approved' : newStatus === 'rejected' ? 'rejected' : 'modified',
          category: rec.category,
          oldValue: rec.currentState,
          newValue: finalVal,
          approver: 'Home Storey Admin'
        })
      });

      const json = await res.json();
      if (json.auditEntry) {
        const updatedLogs = saveAuditLog(json.auditEntry);
        setAuditLogs(updatedLogs);
      }

      setRecommendations(prev =>
        prev.map(r =>
          r.id === rec.id
            ? {
                ...r,
                status: newStatus,
                userModifiedState: modifiedText !== undefined ? modifiedText : r.userModifiedState
              }
            : r
        )
      );

      if (newStatus === 'approved') toast.success(`Approved: ${rec.title}`);
      else if (newStatus === 'rejected') toast.error(`Rejected recommendation`);
      else if (newStatus === 'modified') toast.success(`Updated and approved recommendation`);

      if (editModalRec?.id === rec.id) {
        setEditModalRec(null);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to log approval action');
    }
  };

  // Rollback Action
  const handleRollback = async (log: SeoAuditLog) => {
    if (!confirm(`Are you sure you want to rollback this change to "${log.oldValue}"?`)) return;

    try {
      const res = await fetch('/api/seo/approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendationId: log.recommendationId,
          action: 'rolled_back',
          category: log.category,
          oldValue: log.newValue,
          newValue: log.oldValue,
          approver: 'Home Storey Admin'
        })
      });

      const json = await res.json();
      if (json.auditEntry) {
        const updatedLogs = saveAuditLog(json.auditEntry);
        setAuditLogs(updatedLogs);
      }

      toast.success('Change rolled back successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to rollback change');
    }
  };

  return (
    <AdminShell
      title="SEO Competitor Intelligence Agent"
      subtitle="Analyze Google SERP rankings, identify competitor gaps, and review AI recommendations with 1-click approval."
    >
      {/* Search Input Bar */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 mb-8 shadow-sm font-sans">
        <form onSubmit={handleRunAnalysis} className="space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Target URL */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Target Website URL
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://homestorey.in"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
                />
              </div>
            </div>

            {/* Target Keyword */}
            <div className="flex-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Target Search Keyword *
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g. interior designer in noida"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs font-medium"
                />
              </div>
            </div>

            {/* Location & Device */}
            <div className="w-full lg:w-48">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Search Device
              </label>
              <select
                value={device}
                onChange={(e: any) => setDevice(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-sans shadow-xs"
              >
                <option value="desktop">💻 Desktop Search</option>
                <option value="mobile">📱 Mobile Search</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2 lg:pt-5">
              <button
                type="submit"
                disabled={loading}
                className="w-full lg:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing SERP...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run SEO Agent</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tabs Header Navigation */}
      {gapAnalysis && (
        <div className="flex items-center space-x-2 border-b border-gray-200 mb-6 font-sans overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Opportunity Score & Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer relative ${
              activeTab === 'recommendations'
                ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>AI Recommendations ({recommendations.length})</span>
            {recommendations.filter(r => r.status === 'pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('serp')}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer ${
              activeTab === 'serp'
                ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>SERP Competitors ({serpResults.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 flex items-center space-x-2 cursor-pointer ${
              activeTab === 'audit'
                ? 'border-red-600 text-red-600 bg-red-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Audit Trail & Rollbacks ({auditLogs.length})</span>
          </button>
        </div>
      )}

      {/* Main Content Area based on Active Tab */}
      {!gapAnalysis && !loading ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-12 text-center shadow-sm font-sans">
          <div className="w-16 h-16 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif-luxury">
            SEO Competitor Intelligence Agent
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto mb-6 font-light leading-relaxed">
            Enter a target keyword and website URL above to run real-time Google SERP competitor analysis, calculate internal SEO opportunity scores, and generate human-approved optimization recommendations.
          </p>
          <button
            onClick={() => handleRunAnalysis()}
            className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md shadow-red-600/20 hover:bg-red-700 transition-colors"
          >
            Run Demo Analysis
          </button>
        </div>
      ) : loading ? (
        <div className="bg-white border border-gray-200/80 rounded-2xl p-16 text-center shadow-sm font-sans">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h4 className="text-base font-bold text-slate-900 font-serif-luxury mb-1">
            Analyzing Google SERPs & Competitor Signals
          </h4>
          <p className="text-xs text-slate-500 font-light">
            Querying SerpApi, scraping public page metadata, and computing SEO gap opportunity score...
          </p>
        </div>
      ) : (
        <div>
          {/* TAB 1: OVERVIEW & OPPORTUNITY SCORE */}
          {activeTab === 'overview' && gapAnalysis && (
            <div className="space-y-8 font-sans">
              {/* Score Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Score Card (4 Cols) */}
                <div className="md:col-span-4 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between items-center text-center relative overflow-hidden">
                  <div className="w-full flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Internal Metric</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">SEO Health</span>
                  </div>

                  <div className="relative w-32 h-32 flex items-center justify-center mb-3">
                    <div className="text-4xl font-extrabold text-slate-900 font-mono">
                      {gapAnalysis.opportunityScore}
                      <span className="text-xs text-slate-400 font-sans">/100</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">SEO Opportunity Score</h4>
                    <p className="text-[11px] text-slate-500 font-light max-w-xs">
                      Internal calculated score evaluating title relevance, meta tags, schema structure, and competitor topic coverage.
                    </p>
                  </div>
                </div>

                {/* Metrics Breakdown (8 Cols) */}
                <div className="md:col-span-8 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 font-serif-luxury">Search Intent & Market Signals</h4>
                    <span className="text-xs text-slate-500 font-mono">Keyword: {targetKeyword}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 border border-gray-200 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider block mb-1">Detected Intent</span>
                      <p className="text-xs text-slate-800 font-medium">{gapAnalysis.searchIntent}</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Word Count</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">{targetAnalysis?.wordCount || 0}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">H2 Headings</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">{targetAnalysis?.h2Headings.length || 0}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">FAQs Found</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">{targetAnalysis?.faqs.length || 0}</span>
                      </div>
                      <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Schemas</span>
                        <span className="text-sm font-bold text-slate-900 font-mono">{targetAnalysis?.schemaTypes.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identified SEO Gaps Breakdown */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h4 className="text-base font-bold text-slate-900 font-serif-luxury">SEO Content & Topic Gaps Identified</h4>
                  <p className="text-xs text-slate-500">Key topics and structured data present in top competitor sites but missing from your page.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Heading Gaps */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center space-x-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Missing H2 Subtopics ({gapAnalysis.headingGaps.length})</span>
                    </span>
                    <div className="space-y-2">
                      {gapAnalysis.headingGaps.map((gap, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-gray-200">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                          <span className="truncate">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Gaps */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center space-x-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Missing FAQ Questions ({gapAnalysis.faqGaps.length})</span>
                    </span>
                    <div className="space-y-2">
                      {gapAnalysis.faqGaps.map((faq, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-gray-200">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{faq}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schema Gaps */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center space-x-1.5">
                      <FileCode className="w-3.5 h-3.5" />
                      <span>Missing Schema Types ({gapAnalysis.missingSchemas.length})</span>
                    </span>
                    <div className="space-y-2">
                      {gapAnalysis.missingSchemas.length === 0 ? (
                        <div className="text-xs text-slate-500 p-2">All essential schemas detected!</div>
                      ) : (
                        gapAnalysis.missingSchemas.map((sch, i) => (
                          <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 bg-white p-2 rounded-lg border border-gray-200">
                            <FileCode className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                            <span>{sch} Schema</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI RECOMMENDATIONS & HUMAN APPROVAL */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6 font-sans">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif-luxury">Human Approval Workflow</h4>
                  <p className="text-xs text-slate-500">Review AI recommendations. Approve, Edit, or Reject suggestions before publishing.</p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
                    {recommendations.filter(r => r.status === 'approved' || r.status === 'modified').length} Approved
                  </span>
                  <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md">
                    {recommendations.filter(r => r.status === 'pending').length} Pending
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white border rounded-2xl p-6 shadow-sm transition-all space-y-4 ${
                      rec.status === 'approved' || rec.status === 'modified'
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : rec.status === 'rejected'
                        ? 'border-slate-300 bg-slate-50 opacity-60'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          rec.priority === 'high'
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : rec.priority === 'medium'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-slate-100 text-slate-600 border-gray-200'
                        }`}>
                          {rec.priority} Priority
                        </span>

                        <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {rec.category.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-slate-500">Confidence: {rec.confidence}%</span>
                        {rec.status !== 'pending' && (
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                            rec.status === 'approved' || rec.status === 'modified'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-300 text-slate-700'
                          }`}>
                            {rec.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1 font-serif-luxury">{rec.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-light mb-3">{rec.reason}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-gray-200">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Current State</span>
                          <p className="text-slate-800 font-mono bg-white p-2 rounded border border-gray-200 line-clamp-3">
                            {rec.currentState}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-1">Recommended State</span>
                          <p className="text-slate-900 font-mono bg-white p-2 rounded border border-emerald-200 font-medium line-clamp-3">
                            {rec.userModifiedState || rec.recommendedState}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Evidence & Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100">
                      <span className="text-[11px] text-slate-500 font-light flex items-center space-x-1">
                        <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>Evidence: {rec.evidence}</span>
                      </span>

                      <div className="flex items-center space-x-2">
                        {rec.status !== 'approved' && rec.status !== 'modified' && (
                          <button
                            onClick={() => handleRecommendationAction(rec, 'approved')}
                            className="inline-flex items-center space-x-1 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setEditModalRec(rec);
                            setEditedStateText(rec.userModifiedState || rec.recommendedState);
                          }}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-gray-200 rounded-lg text-xs font-semibold transition-all shadow-xs cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5 text-red-600" />
                          <span>Edit & Approve</span>
                        </button>

                        {rec.status !== 'rejected' && (
                          <button
                            onClick={() => handleRecommendationAction(rec, 'rejected')}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERP COMPETITORS TABLE */}
          {activeTab === 'serp' && (
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm font-sans">
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-base font-bold text-slate-900 font-serif-luxury">Google SERP Ranking Competitors</h4>
                <p className="text-xs text-slate-500">Live search results fetched via SerpApi for keyword: &quot;{targetKeyword}&quot;</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs font-mono uppercase tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">Competitor & Domain</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">SERP Title & Snippet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {serpResults.map((item) => (
                      <tr key={item.position} className={item.isTargetSite ? 'bg-red-50/50 font-medium' : 'hover:bg-slate-50/60'}>
                        <td className="px-6 py-4 font-mono font-bold text-slate-900">
                          #{item.position}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 flex items-center space-x-1">
                            <span>{item.domain}</span>
                            {item.isTargetSite && (
                              <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">YOUR SITE</span>
                            )}
                          </p>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-red-600 hover:underline flex items-center space-x-1 truncate max-w-xs"
                          >
                            <span className="truncate">{item.url}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-bold">
                            {item.resultType.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <p className="text-xs font-bold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-2 font-light">{item.snippet}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT TRAIL & ROLLBACK LOGS */}
          {activeTab === 'audit' && (
            <div className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-sm font-sans">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-serif-luxury">Audit Trail & Rollback Log</h4>
                  <p className="text-xs text-slate-500">Chronological history of human approval actions with 1-click rollback capability.</p>
                </div>
                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                  {auditLogs.length} Logged Actions
                </span>
              </div>

              <div className="divide-y divide-gray-100">
                {auditLogs.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 text-xs font-light">
                    No approved recommendations recorded yet. Actions taken on AI recommendations will appear here.
                  </div>
                ) : (
                  auditLogs.map((log) => (
                    <div key={log.id} className="p-6 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            log.action === 'approved' || log.action === 'modified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : log.action === 'rolled_back'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {log.action.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-bold text-slate-900 uppercase font-mono">{log.category}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500 font-mono">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-xs text-slate-800 font-mono bg-slate-50 p-2 rounded border border-gray-200">
                          <span className="text-slate-400">Value:</span> {log.newValue}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRollback(log)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-gray-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Rollback</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Recommendation Modal */}
      <AnimatePresence>
        {editModalRec && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditModalRec(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-10 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-serif-luxury">Edit Recommendation Text</h3>
                <button onClick={() => setEditModalRec(null)} className="p-1 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Custom State Value
                </label>
                <textarea
                  rows={4}
                  value={editedStateText}
                  onChange={(e) => setEditedStateText(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-red-500 font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditModalRec(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleRecommendationAction(editModalRec, 'modified', editedStateText)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Save & Approve
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AdminShell>
  );
}
