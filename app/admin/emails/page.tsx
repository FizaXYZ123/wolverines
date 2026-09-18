"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Send,
  Users,
  FileSpreadsheet,
  AtSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  Loader2,
  FileText,
  Code,
  Sparkles,
  Search,
} from "lucide-react";
import { adminFetch, formatDate, formatDateTime } from "@/app/lib/admin-api";
import DetailModal from "@/components/admin/DetailModal";

type RecipientMode = "database" | "csv" | "direct";

export default function EmailMarketingPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [contactsCount, setContactsCount] = useState<number>(0);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);

  // Compose State
  const [mode, setMode] = useState<RecipientMode>("database");
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [directEmail, setDirectEmail] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvFileName, setCsvFileName] = useState<string>("");
  const [previewTab, setPreviewTab] = useState<"write" | "preview">("write");

  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const fetchEmailData = async () => {
    setIsLoadingHistory(true);
    try {
      const [historyRes, contactsRes] = await Promise.all([
        adminFetch("/api/email-history"),
        adminFetch("/api/email-contact"),
      ]);

      setHistory(Array.isArray(historyRes.data) ? historyRes.data : []);
      const contacts = Array.isArray(contactsRes.data) ? contactsRes.data : [];
      setContactsCount(contacts.length);
    } catch (error) {
      console.error("Failed to load email history", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    fetchEmailData();
  }, []);

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      setCsvFileName(file.name);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSendSuccess(null);

    if (!subject.trim()) {
      setSendError("Email subject is required.");
      return;
    }

    if (!htmlContent.trim()) {
      setSendError("Email content is required.");
      return;
    }

    if (mode === "direct" && !directEmail.trim()) {
      setSendError("Recipient email address is required.");
      return;
    }

    if (mode === "csv" && !csvFile) {
      setSendError("Please select a valid CSV file containing email addresses.");
      return;
    }

    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append("subject", subject.trim());
      formData.append("htmlContent", htmlContent.trim());

      if (mode === "database") {
        formData.append("sendToAll", "true");
      } else if (mode === "direct") {
        formData.append("email", directEmail.trim());
      } else if (mode === "csv" && csvFile) {
        formData.append("file", csvFile);
      }

      const res = await adminFetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (!res.success) {
        setSendError(res.message || "Failed to dispatch email campaign.");
        setIsSending(false);
        return;
      }

      setSendSuccess(
        `Campaign dispatched successfully! ${
          res.data?.sentCount !== undefined ? `Sent to ${res.data.sentCount} recipient(s).` : ""
        }`
      );

      // Reset form
      setSubject("");
      setHtmlContent("");
      setDirectEmail("");
      setCsvFile(null);
      setCsvFileName("");

      fetchEmailData();
    } catch (error: any) {
      setSendError(error.message || "An unexpected error occurred while sending.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ================= SECTION 1: COMPOSE & SEND ================= */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#D32F2F] to-[#991b1b] flex items-center justify-center text-white shadow-lg shadow-red-950/40">
            <Send className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Broadcast Email Campaign
            </h2>
            <p className="text-xs text-neutral-400">
              Send notifications, camp newsletters, match schedules, and donor thank yous via Brevo.
            </p>
          </div>
        </div>

        {sendSuccess && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            {sendSuccess}
          </div>
        )}

        {sendError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            {sendError}
          </div>
        )}

        <form onSubmit={handleSendEmail} className="space-y-6">
          {/* Recipient Source Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
              1. Select Recipient Audience
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: All Database Contacts */}
              <button
                type="button"
                onClick={() => setMode("database")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "database"
                    ? "bg-red-950/40 border-[#D32F2F] text-white shadow-lg shadow-red-950/40"
                    : "bg-[#0f0f0f] border-white/5 text-neutral-400 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Users className={`h-5 w-5 ${mode === "database" ? "text-[#D32F2F]" : "text-neutral-500"}`} />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 font-mono text-neutral-300">
                    {contactsCount} saved
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mt-3">All Club Contacts</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Broadcast to all saved emails in database
                </p>
              </button>

              {/* Option 2: Upload CSV */}
              <button
                type="button"
                onClick={() => setMode("csv")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "csv"
                    ? "bg-red-950/40 border-[#D32F2F] text-white shadow-lg shadow-red-950/40"
                    : "bg-[#0f0f0f] border-white/5 text-neutral-400 hover:border-white/15"
                }`}
              >
                <FileSpreadsheet className={`h-5 w-5 ${mode === "csv" ? "text-[#D32F2F]" : "text-neutral-500"}`} />
                <h4 className="font-bold text-sm text-white mt-3">Upload CSV File</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Import a CSV containing email addresses
                </p>
              </button>

              {/* Option 3: Direct Email */}
              <button
                type="button"
                onClick={() => setMode("direct")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "direct"
                    ? "bg-red-950/40 border-[#D32F2F] text-white shadow-lg shadow-red-950/40"
                    : "bg-[#0f0f0f] border-white/5 text-neutral-400 hover:border-white/15"
                }`}
              >
                <AtSign className={`h-5 w-5 ${mode === "direct" ? "text-[#D32F2F]" : "text-neutral-500"}`} />
                <h4 className="font-bold text-sm text-white mt-3">Single Recipient</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Send a test or direct targeted email
                </p>
              </button>
            </div>
          </div>

          {/* Conditional Recipient Inputs */}
          {mode === "direct" && (
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 animate-in fade-in">
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Recipient Email Address *
              </label>
              <input
                type="email"
                value={directEmail}
                onChange={(e) => setDirectEmail(e.target.value)}
                placeholder="parent@example.com"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
              />
            </div>
          )}

          {mode === "csv" && (
            <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 animate-in fade-in">
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Select CSV Spreadsheet *
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  id="csvFileInput"
                  accept=".csv"
                  onChange={handleCsvChange}
                  className="hidden"
                />
                <label
                  htmlFor="csvFileInput"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  Choose CSV File
                </label>
                <span className="text-xs text-neutral-400">
                  {csvFileName || "No file selected (must contain an email column)"}
                </span>
              </div>
            </div>
          )}

          {/* Subject Line */}
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              2. Email Subject Line *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Wolverines Field Hockey Club - Summer Camp Schedule"
              required
              className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D32F2F] transition-all"
            />
          </div>

          {/* Content Composer & Preview Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                3. Email HTML Content *
              </label>
              <div className="inline-flex p-1 rounded-xl bg-[#0f0f0f] border border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewTab("write")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    previewTab === "write"
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Code className="h-3.5 w-3.5 inline mr-1" />
                  Code / HTML
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab("preview")}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    previewTab === "preview"
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 inline mr-1" />
                  Live Preview
                </button>
              </div>
            </div>

            {previewTab === "write" ? (
              <textarea
                rows={10}
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="<h2>Dear Wolverines Parents & Athletes,</h2><p>We are excited to announce our upcoming schedule...</p>"
                required
                className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-white font-mono text-xs placeholder-neutral-500 focus:outline-none focus:border-[#D32F2F] leading-relaxed transition-all"
              />
            ) : (
              <div className="min-h-[220px] p-6 rounded-2xl bg-white text-neutral-900 border border-white/10 overflow-auto shadow-inner">
                {htmlContent ? (
                  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                ) : (
                  <p className="text-neutral-400 text-xs italic">
                    Type HTML content in the editor to see the live rendering here.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Dispatch Button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              Emails are sent with sender identity: <span className="text-neutral-300 font-semibold">The Wolverines</span>
            </span>

            <button
              type="submit"
              disabled={isSending}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D32F2F] to-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-red-950/50 hover:brightness-110 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Dispatching Campaign...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Broadcast
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ================= SECTION 2: SENT CAMPAIGNS HISTORY ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="h-5 w-5 text-neutral-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Campaign Delivery History
            </h3>
          </div>

          <button
            onClick={fetchEmailData}
            disabled={isLoadingHistory}
            className="p-2.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh history"
          >
            <RefreshCw className={`h-4 w-4 ${isLoadingHistory ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            {isLoadingHistory ? (
              <div className="py-16 flex flex-col items-center justify-center text-neutral-400">
                <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F] mb-3" />
                <p className="text-xs uppercase tracking-wider font-semibold">Loading campaign logs...</p>
              </div>
            ) : history.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 text-sm">
                No email broadcasts sent yet.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#0f0f0f] text-neutral-400 uppercase tracking-wider text-[11px] font-bold">
                    <th className="py-4 px-6">Subject</th>
                    <th className="py-4 px-6">Source</th>
                    <th className="py-4 px-6 text-center">Recipients</th>
                    <th className="py-4 px-6 text-center">Sent / Failed</th>
                    <th className="py-4 px-6">Status / Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm max-w-xs truncate">
                          {item.subject}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-neutral-300 uppercase">
                          {item.source}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-white">
                        {item.totalRecipients}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-emerald-400 font-bold">{item.sentCount}</span>
                        {item.failedCount > 0 && (
                          <span className="text-red-400 font-bold ml-1">/ {item.failedCount} failed</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === "SENT"
                              ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                              : item.status === "PARTIAL"
                              ? "bg-amber-950/60 text-amber-400 border border-amber-500/30"
                              : "bg-red-950/60 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {item.status}
                        </span>
                        <p className="text-[11px] text-neutral-500 mt-1">
                          {formatDate(item.sentAt || item.createdAt)}
                        </p>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedEmail(item)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Details Modal */}
      {selectedEmail && (
        <DetailModal
          isOpen={!!selectedEmail}
          title="Campaign Delivery Details"
          subtitle={selectedEmail.subject}
          badge={
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                selectedEmail.status === "SENT"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                  : "bg-amber-950 text-amber-400 border border-amber-500/30"
              }`}
            >
              {selectedEmail.status}
            </span>
          }
          onClose={() => setSelectedEmail(null)}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Delivery Stats Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 text-center">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Total Target</p>
                <p className="text-lg font-bold text-white mt-0.5">{selectedEmail.totalRecipients}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Delivered</p>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">{selectedEmail.sentCount}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Failed</p>
                <p className="text-lg font-bold text-red-400 mt-0.5">{selectedEmail.failedCount}</p>
              </div>
            </div>

            {/* Rendered HTML Preview */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Rendered HTML Message
              </h4>
              <div className="p-6 rounded-2xl bg-white text-neutral-900 border border-white/10 max-h-72 overflow-y-auto custom-scrollbar">
                <div dangerouslySetInnerHTML={{ __html: selectedEmail.htmlContent }} />
              </div>
            </div>

            {/* Error Message if present */}
            {selectedEmail.errorMessage && (
              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                <p className="font-bold uppercase tracking-wider text-[10px] mb-1">Failure Log</p>
                <p>{selectedEmail.errorMessage}</p>
              </div>
            )}

            <div className="text-[11px] text-neutral-500 flex items-center justify-between">
              <span>Source: {selectedEmail.source}</span>
              <span>Dispatched: {formatDateTime(selectedEmail.sentAt || selectedEmail.createdAt)}</span>
            </div>
          </div>
        </DetailModal>
      )}
    </div>
  );
}
