"use client";

import { useEffect, useState } from "react";
import {
  UserPlus,
  Search,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  RefreshCw,
  Loader2,
  Users,
  MessageSquare,
} from "lucide-react";
import { adminFetch, formatDate, formatDateTime } from "@/app/lib/admin-api";
import DetailModal from "@/components/admin/DetailModal";

export default function JoinRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  const fetchJoinRequests = async () => {
    setIsLoading(true);
    try {
      const res = await adminFetch("/api/join-our-club");
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load join club requests", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinRequests();
  }, []);

  const filteredRequests = requests.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      r.childName?.toLowerCase().includes(q) ||
      r.parentGuardianName?.toLowerCase().includes(q) ||
      r.email?.toLowerCase().includes(q) ||
      r.contactNumber?.includes(q) ||
      r.city?.toLowerCase().includes(q)
    );
  });

  const exportCSV = () => {
    if (filteredRequests.length === 0) return;
    let csv = "Child Name,DOB,Gender,Parent Name,Relation,Email,Phone,Secondary Contact,Secondary Relation,Address,City,Postal,Country,Message,Submitted At\n";
    filteredRequests.forEach((r) => {
      csv += `"${r.childName || ""}","${r.dateOfBirth || ""}","${r.gender || ""}","${r.parentGuardianName || ""}","${r.relationToChild || ""}","${r.email || ""}","${r.countryCode || ""}${r.contactNumber || ""}","${r.secondaryCountryCode || ""}${r.secondaryContactNumber || ""}","${r.secondaryRelationToChild || ""}","${r.address || ""}","${r.city || ""}","${r.postalCode || ""}","${r.country || ""}","${(r.message || "").replace(/"/g, '""')}","${r.createdAt || ""}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `join_requests_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applicants by child, parent, email, city..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#141414] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchJoinRequests}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh requests"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredRequests.length === 0}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Requests Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F] mb-3" />
              <p className="text-xs uppercase tracking-wider font-semibold">Loading join requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              No club membership applications found.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#0f0f0f] text-neutral-400 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-4 px-6">Child Applicant</th>
                  <th className="py-4 px-6">Parent / Guardian</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-6">Submitted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Child Name */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">
                        {r.childName}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 flex items-center gap-2">
                        {r.gender && (
                          <span className="px-1.5 py-0.5 rounded bg-white/5 uppercase text-[10px]">
                            {r.gender}
                          </span>
                        )}
                        <span>DOB: {formatDate(r.dateOfBirth)}</span>
                      </div>
                    </td>

                    {/* Parent Name */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-neutral-200">
                        {r.parentGuardianName}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {r.relationToChild || "Parent"}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6 text-neutral-300 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>{r.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                        <Phone className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>
                          {r.countryCode} {r.contactNumber}
                        </span>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>{r.city || "Abbotsford"}, {r.country || "Canada"}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 text-neutral-400">
                      {formatDate(r.createdAt)}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedRequest(r)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View File
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedRequest && (
        <DetailModal
          isOpen={!!selectedRequest}
          title="Club Membership Application"
          subtitle={`Applicant: ${selectedRequest.childName}`}
          onClose={() => setSelectedRequest(null)}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Child Profile */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Child / Player Profile
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Child Full Name</p>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedRequest.childName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Date of Birth</p>
                  <p className="text-sm text-neutral-300 mt-0.5">{formatDate(selectedRequest.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Gender</p>
                  <p className="text-sm text-neutral-300 mt-0.5 capitalize">{selectedRequest.gender || "Not specified"}</p>
                </div>
              </div>
            </div>

            {/* Parent & Contact Details */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Parent / Guardian Contact
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Guardian Name</p>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedRequest.parentGuardianName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Relation</p>
                  <p className="text-sm text-neutral-300 mt-0.5">{selectedRequest.relationToChild || "Parent"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Email Address</p>
                  <p className="text-sm text-neutral-300 mt-0.5">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Phone Number</p>
                  <p className="text-sm text-neutral-300 mt-0.5">
                    {selectedRequest.countryCode} {selectedRequest.contactNumber}
                  </p>
                </div>
                {selectedRequest.secondaryContactNumber && (
                  <>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase font-semibold">Secondary Contact</p>
                      <p className="text-sm text-neutral-300 mt-0.5">
                        {selectedRequest.secondaryCountryCode} {selectedRequest.secondaryContactNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-500 uppercase font-semibold">Secondary Relation</p>
                      <p className="text-sm text-neutral-300 mt-0.5">{selectedRequest.secondaryRelationToChild || "N/A"}</p>
                    </div>
                  </>
                )}
                <div className="sm:col-span-2">
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">Residential Address</p>
                  <p className="text-sm text-neutral-300 mt-0.5">
                    {[selectedRequest.address, selectedRequest.city, selectedRequest.postalCode, selectedRequest.country]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Notes / Message */}
            {selectedRequest.message && (
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Applicant Message / Notes
                </h4>
                <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                  {selectedRequest.message}
                </div>
              </div>
            )}

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-between">
              <span>Application ID: {selectedRequest.id}</span>
              <span>Submitted: {formatDateTime(selectedRequest.createdAt)}</span>
            </div>
          </div>
        </DetailModal>
      )}
    </div>
  );
}
