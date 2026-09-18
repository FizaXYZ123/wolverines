"use client";

import { useEffect, useState } from "react";
import {
  Search,
  MessageSquare,
  Eye,
  Mail,
  Phone,
  RefreshCw,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { adminFetch, formatDate } from "@/app/lib/admin-api";
import DetailModal from "@/components/admin/DetailModal";

export default function GeneralEnquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await adminFetch("/api/contact-us");
      setInquiries(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch general enquiries", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const filteredList = inquiries.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.fullName?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.contactNumber?.includes(q) ||
      item.message?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2.5">
            <MessageSquare className="h-5 w-5 text-[#D32F2F]" />
            General Enquiries ({inquiries.length})
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Incoming contact messages, website inquiries, and player questions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search enquiries by name, email, phone number, or message text..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#141414] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all"
        />
      </div>

      {/* Enquiries Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F] mb-3" />
              <p className="text-xs uppercase tracking-wider font-semibold">
                Loading enquiries...
              </p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              No enquiries match your search criteria.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#0f0f0f] text-neutral-400 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-4 px-6">Sender Details</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Message Preview</th>
                  <th className="py-4 px-6">Date Received</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Full Name */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">
                        {item.fullName}
                      </div>
                      <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                        Ref: {item.id.slice(0, 10)}...
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6 text-neutral-300 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <a
                          href={`mailto:${item.email}`}
                          className="hover:text-white transition-colors"
                        >
                          {item.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                        <Phone className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>
                          {item.countryCode} {item.contactNumber}
                        </span>
                      </div>
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-6 max-w-xs">
                      <p className="text-neutral-300 text-xs line-clamp-2 leading-relaxed">
                        {item.message || "No message provided."}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-neutral-300 font-medium">
                        {formatDate(item.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedInquiry(item)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* View Detail Modal */}
      {selectedInquiry && (
        <DetailModal
          isOpen={!!selectedInquiry}
          title="General Enquiry Details"
          subtitle={selectedInquiry.fullName}
          badge={
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-400 border border-red-500/30">
              Inquiry
            </span>
          }
          onClose={() => setSelectedInquiry(null)}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
              <div>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Sender Name
                </p>
                <p className="text-sm font-bold text-white mt-1">
                  {selectedInquiry.fullName}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Date Received
                </p>
                <p className="text-sm text-neutral-300 mt-1">
                  {formatDate(selectedInquiry.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Email Address
                </p>
                <p className="text-sm text-neutral-300 mt-1">
                  {selectedInquiry.email}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">
                  Contact Number
                </p>
                <p className="text-sm text-neutral-300 mt-1">
                  <a
                    href={`tel:${selectedInquiry.countryCode}${selectedInquiry.contactNumber}`}
                    className="hover:text-white transition-colors"
                  >
                    {selectedInquiry.countryCode}{" "}
                    {selectedInquiry.contactNumber}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Inquiry Message
              </p>
              <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message || "No message provided."}
              </div>
            </div>
          </div>
        </DetailModal>
      )}
    </div>
  );
}
