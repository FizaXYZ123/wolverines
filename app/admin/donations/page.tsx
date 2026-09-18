"use client";

import { useEffect, useState } from "react";
import {
  HeartHandshake,
  Search,
  Download,
  Eye,
  DollarSign,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  ShieldAlert,
  RefreshCw,
  Loader2,
  CreditCard,
  UserCheck,
} from "lucide-react";
import { adminFetch, formatCurrency, formatDate, formatDateTime } from "@/app/lib/admin-api";
import DetailModal from "@/components/admin/DetailModal";

export default function DonationsPage() {
  const [donations, setDonations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

  const fetchDonations = async () => {
    setIsLoading(true);
    try {
      const res = await adminFetch("/api/donation");
      setDonations(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch donations", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const totalAmount = donations.reduce(
    (acc, d) => acc + parseFloat(d.amount || 0),
    0
  );
  const averageDonation =
    donations.length > 0 ? totalAmount / donations.length : 0;
  const acknowledgedCount = donations.filter(
    (d) => d.acknowledgement === "ACKNOWLEDGE"
  ).length;

  const filteredDonations = donations.filter((d) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      d.donorName?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q) ||
      d.contactNumber?.includes(q) ||
      d.acknowledgement?.toLowerCase().includes(q) ||
      d.paymentStatus?.toLowerCase().includes(q)
    );
  });

  const exportCSV = () => {
    if (filteredDonations.length === 0) return;
    let csv = "Donor Name,Email,Country Code,Contact Number,Amount,Currency,Acknowledgement,Status,Stripe Session ID,Date\n";
    filteredDonations.forEach((d) => {
      csv += `"${d.donorName || ""}","${d.email || ""}","${d.countryCode || ""}","${d.contactNumber || ""}","${d.amount || 0}","${d.currency || "CAD"}","${d.acknowledgement || ""}","${d.paymentStatus || ""}","${d.stripeCheckoutSessionId || ""}","${d.createdAt || ""}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `donations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#141414] border border-white/10 shadow-xl">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total Raised</p>
          <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">
            {formatCurrency(totalAmount)}
          </h3>
          <p className="text-[11px] text-neutral-500 mt-1">From all donor payments</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#141414] border border-white/10 shadow-xl">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total Donors</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {donations.length}
          </h3>
          <p className="text-[11px] text-neutral-500 mt-1">Successful contributions</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#141414] border border-white/10 shadow-xl">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Average Donation</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {formatCurrency(averageDonation)}
          </h3>
          <p className="text-[11px] text-neutral-500 mt-1">Per contributor</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#141414] border border-white/10 shadow-xl">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Public Recognition</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {acknowledgedCount} <span className="text-xs font-normal text-neutral-400">/ {donations.length}</span>
          </h3>
          <p className="text-[11px] text-neutral-500 mt-1">Opted for recognition</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donors by name, email, phone..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#141414] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDonations}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh donations"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredDonations.length === 0}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Donations Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F] mb-3" />
              <p className="text-xs uppercase tracking-wider font-semibold">Loading donations...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              No donation records found.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#0f0f0f] text-neutral-400 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-4 px-6">Donor</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6 text-right">Amount</th>
                  <th className="py-4 px-6">Acknowledgement</th>
                  <th className="py-4 px-6">Status / Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white text-sm">
                        {d.donorName}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-300 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>{d.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                        <Phone className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span>
                          {d.countryCode} {d.contactNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-extrabold text-emerald-400 text-sm">
                      {formatCurrency(d.amount)}
                      <span className="text-[10px] text-neutral-500 ml-1 uppercase">{d.currency || "CAD"}</span>
                    </td>
                    <td className="py-4 px-6">
                      {d.acknowledgement === "ACKNOWLEDGE" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950/60 text-blue-400 border border-blue-500/30">
                          <UserCheck className="h-3 w-3" />
                          Public Recognition
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-neutral-400 border border-white/10">
                          Anonymous
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="h-3 w-3" />
                        {d.paymentStatus || "PAID"}
                      </span>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        {formatDate(d.createdAt)}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <DetailModal
          isOpen={!!selectedDonation}
          title="Donation Contribution Record"
          subtitle={`Donor: ${selectedDonation.donorName}`}
          badge={
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              {selectedDonation.paymentStatus || "PAID"}
            </span>
          }
          onClose={() => setSelectedDonation(null)}
          maxWidth="max-w-xl"
        >
          <div className="space-y-5">
            {/* Amount Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#141414] to-[#0f0f0f] border border-emerald-500/30 text-center">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
                Contribution Amount
              </p>
              <h2 className="text-4xl font-extrabold text-white mt-1">
                {formatCurrency(selectedDonation.amount)}
              </h2>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Currency: {selectedDonation.currency || "CAD"}
              </p>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Donor Name</p>
                <p className="text-sm font-bold text-white mt-0.5">{selectedDonation.donorName}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Email Address</p>
                <p className="text-sm text-neutral-300 mt-0.5">{selectedDonation.email}</p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Contact Number</p>
                <p className="text-sm text-neutral-300 mt-0.5">
                  {selectedDonation.countryCode} {selectedDonation.contactNumber}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Date & Time</p>
                <p className="text-sm text-neutral-300 mt-0.5">{formatDateTime(selectedDonation.createdAt)}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Recognition Status</p>
                <p className="text-sm font-semibold text-white mt-0.5">
                  {selectedDonation.acknowledgement === "ACKNOWLEDGE"
                    ? "Public Recognition Accepted"
                    : "Anonymous Donor"}
                </p>
              </div>
            </div>

            {/* Transaction Metadata */}
            {selectedDonation.stripeCheckoutSessionId && (
              <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 space-y-1">
                <p className="text-[10px] text-neutral-500 uppercase font-semibold">Stripe Checkout Session</p>
                <p className="text-xs font-mono text-neutral-300 break-all">
                  {selectedDonation.stripeCheckoutSessionId}
                </p>
              </div>
            )}
          </div>
        </DetailModal>
      )}
    </div>
  );
}
