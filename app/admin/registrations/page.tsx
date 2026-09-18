"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Sun,
  Snowflake,
  Eye,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Users,
  CreditCard,
  RefreshCw,
  Loader2,
} from "lucide-react";
import {
  adminFetch,
  formatCurrency,
  formatDate,
  formatDateTime,
} from "@/app/lib/admin-api";
import DetailModal from "@/components/admin/DetailModal";

type TabType = "summer" | "winter";

export default function CampRegistrationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("summer");
  const [summerList, setSummerList] = useState<any[]>([]);
  const [winterList, setWinterList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const [summerRes, winterRes] = await Promise.all([
        adminFetch("/api/summer-camp"),
        adminFetch("/api/winter-camp"),
      ]);

      setSummerList(Array.isArray(summerRes.data) ? summerRes.data : []);
      setWinterList(Array.isArray(winterRes.data) ? winterRes.data : []);
    } catch (error) {
      console.error("Failed to fetch registrations", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const currentList = activeTab === "summer" ? summerList : winterList;

  const filteredList = currentList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    return (
      item.registrationId?.toLowerCase().includes(q) ||
      item.parentGuardianName?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.contactNumber?.includes(q) ||
      item.city?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Module Switcher Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#141414] border border-white/10">
          <button
            onClick={() => {
              setActiveTab("summer");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "summer"
                ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-orange-950/40"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sun className="h-4 w-4" />
            Summer Camp ({summerList.length})
          </button>

          <button
            onClick={() => {
              setActiveTab("winter");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "winter"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-blue-950/40"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Snowflake className="h-4 w-4" />
            Winter Camp ({winterList.length})
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchRegistrations}
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
          placeholder={`Search ${activeTab === "summer" ? "Summer" : "Winter"} camp registrations by ID, parent name, email, city...`}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#141414] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#D32F2F] focus:ring-1 focus:ring-[#D32F2F] transition-all"
        />
      </div>

      {/* Registrations Table */}
      <div className="rounded-3xl bg-[#141414] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F] mb-3" />
              <p className="text-xs uppercase tracking-wider font-semibold">
                Loading registrations...
              </p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 text-sm">
              No {activeTab} camp registrations match your search criteria.
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#0f0f0f] text-neutral-400 uppercase tracking-wider text-[11px] font-bold">
                  <th className="py-4 px-6">Registration ID &amp; Parent</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Children</th>
                  <th className="py-4 px-6 text-right">Total Paid</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredList.map((item) => {
                  const children = Array.isArray(item.children)
                    ? item.children
                    : typeof item.children === "string"
                      ? JSON.parse(item.children || "[]")
                      : [];

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      {/* Name / ID */}
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-bold text-white text-sm">
                            {item.parentGuardianName}
                          </div>
                          <div className="text-[11px] font-mono text-neutral-400 mt-0.5">
                            {item.registrationId}
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-6 text-neutral-300 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                          <span>{item.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                          <Phone className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                          <span>
                            {item.countryCode} {item.contactNumber}
                          </span>
                        </div>
                      </td>

                      {/* Children Count */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-neutral-200">
                          <Users className="h-3.5 w-3.5 text-neutral-400" />
                          {children.length}{" "}
                          {children.length === 1 ? "Child" : "Children"}
                        </span>
                      </td>

                      {/* Total Amount */}
                      <td className="py-4 px-6 text-right font-extrabold text-emerald-400 text-sm">
                        {formatCurrency(item.totalAmount)}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-neutral-300 font-medium text-xs">
                        {formatDate(item.createdAt)}
                      </td>

                      {/* Action View */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <DetailModal
          isOpen={!!selectedItem}
          title={`${activeTab === "summer" ? "Summer" : "Winter"} Camp Registration`}
          subtitle={`Registration ID: ${selectedItem.registrationId}`}
          onClose={() => setSelectedItem(null)}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            {/* Parent & Contact Grid */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Parent / Guardian Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Parent Name
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {selectedItem.parentGuardianName}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Relation
                  </p>
                  <p className="text-sm text-neutral-300 mt-0.5">
                    {selectedItem.relationToChild || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Email
                  </p>
                  <p className="text-sm text-neutral-300 mt-0.5">
                    {selectedItem.email}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Primary Contact
                  </p>
                  <p className="text-sm text-neutral-300 mt-0.5">
                    {selectedItem.countryCode} {selectedItem.contactNumber}
                  </p>
                </div>
                {selectedItem.secondaryContactNumber && (
                  <div>
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                      Secondary Contact
                    </p>
                    <p className="text-sm text-neutral-300 mt-0.5">
                      {selectedItem.secondaryCountryCode}{" "}
                      {selectedItem.secondaryContactNumber}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                    Location
                  </p>
                  <p className="text-sm text-neutral-300 mt-0.5">
                    {[
                      selectedItem.address,
                      selectedItem.city,
                      selectedItem.postalCode,
                      selectedItem.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Children List */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Registered Children
              </h4>
              <div className="space-y-3">
                {(() => {
                  const children = Array.isArray(selectedItem.children)
                    ? selectedItem.children
                    : typeof selectedItem.children === "string"
                      ? JSON.parse(selectedItem.children || "[]")
                      : [];

                  if (children.length === 0) {
                    return (
                      <p className="text-xs text-neutral-500">
                        No child details found.
                      </p>
                    );
                  }

                  return children.map((c: any, index: number) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-bold text-white text-sm">
                            {c.name || c.childName || `Child ${index + 1}`}
                          </span>
                          {c.gender && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 uppercase">
                              {c.gender}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-neutral-400 flex flex-wrap gap-x-4 gap-y-1">
                          {c.dateOfBirth && (
                            <span>DOB: {formatDate(c.dateOfBirth)}</span>
                          )}
                          {c.age && <span>Age: {c.age} yrs</span>}
                          {c.experienceLevel && (
                            <span>Exp: {c.experienceLevel}</span>
                          )}
                        </div>
                        {c.medicalConditions && (
                          <p className="mt-1.5 text-xs text-amber-400/90 font-medium">
                            Medical notes: {c.medicalConditions}
                          </p>
                        )}
                      </div>

                      {c.fee !== undefined && (
                        <div className="text-right">
                          <p className="text-[10px] text-neutral-500 uppercase font-semibold">
                            Tier Fee
                          </p>
                          <p className="text-sm font-bold text-emerald-400">
                            {formatCurrency(c.fee)}
                          </p>
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Payment Breakdown */}
            <div>
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
                Payment &amp; Transaction Breakdown
              </h4>
              <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedItem.subtotal)}</span>
                </div>
                {parseFloat(selectedItem.siblingDiscount || 0) > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Sibling Discount</span>
                    <span>-{formatCurrency(selectedItem.siblingDiscount)}</span>
                  </div>
                )}
                {parseFloat(selectedItem.processingFee || 0) > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Processing Fee</span>
                    <span>+{formatCurrency(selectedItem.processingFee)}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-white/10 flex justify-between font-extrabold text-sm text-white">
                  <span>Total Paid</span>
                  <span className="text-emerald-400">
                    {formatCurrency(selectedItem.totalAmount)}
                  </span>
                </div>
                {selectedItem.stripeCheckoutSessionId && (
                  <div className="pt-2 border-t border-white/5 flex justify-between text-[11px] text-neutral-500 font-mono">
                    <span>Stripe Session ID</span>
                    <span className="truncate max-w-[200px]">
                      {selectedItem.stripeCheckoutSessionId}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {selectedItem.message && (
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
                  Parent Message / Notes
                </h4>
                <div className="p-4 rounded-2xl bg-[#0f0f0f] border border-white/5 text-xs text-neutral-300 leading-relaxed">
                  {selectedItem.message}
                </div>
              </div>
            )}
          </div>
        </DetailModal>
      )}
    </div>
  );
}
