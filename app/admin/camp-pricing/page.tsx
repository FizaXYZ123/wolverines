"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  Sun,
  Snowflake,
  Check,
  X,
  Edit,
  Plus,
  RefreshCw,
  Loader2,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Percent,
  Users,
} from "lucide-react";
import { adminFetch, formatCurrency } from "@/app/lib/admin-api";

export default function CampPricingPage() {
  const [summerPricing, setSummerPricing] = useState<any | null>(null);
  const [winterPricing, setWinterPricing] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form modal state
  const [activeCampType, setActiveCampType] = useState<"summer" | "winter" | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    minAge: 6,
    maxAge: 16,
    youngerAgePrice: 250,
    olderAgePrice: 350,
    siblingDiscount: 40,
    processingFeePercent: 3,
    isEnabled: true,
  });

  const fetchPricing = async () => {
    setIsLoading(true);
    try {
      const [summerRes, winterRes] = await Promise.all([
        adminFetch("/api/summer-camp-pricing"),
        adminFetch("/api/winter-camp-pricing"),
      ]);

      const summerArr = Array.isArray(summerRes.data) ? summerRes.data : [];
      const winterArr = Array.isArray(winterRes.data) ? winterRes.data : [];

      setSummerPricing(summerArr.length > 0 ? summerArr[0] : null);
      setWinterPricing(winterArr.length > 0 ? winterArr[0] : null);
    } catch (error) {
      console.error("Failed to load camp pricing", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleOpenForm = (type: "summer" | "winter", currentData?: any) => {
    setActiveCampType(type);
    if (currentData) {
      setFormData({
        minAge: currentData.minAge || 6,
        maxAge: currentData.maxAge || 16,
        youngerAgePrice: parseFloat(currentData.youngerAgePrice || 0),
        olderAgePrice: parseFloat(currentData.olderAgePrice || 0),
        siblingDiscount: parseFloat(currentData.siblingDiscount || 0),
        processingFeePercent: parseFloat(currentData.processingFeePercent || 0),
        isEnabled: currentData.isEnabled ?? true,
      });
    } else {
      setFormData({
        minAge: 6,
        maxAge: 16,
        youngerAgePrice: 250,
        olderAgePrice: 350,
        siblingDiscount: 40,
        processingFeePercent: 3,
        isEnabled: true,
      });
    }
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleToggleStatus = async (type: "summer" | "winter", item: any) => {
    try {
      const endpoint =
        type === "summer"
          ? `/api/summer-camp-pricing/${item.id}`
          : `/api/winter-camp-pricing/${item.id}`;

      const res = await adminFetch(endpoint, {
        method: "PUT",
        body: JSON.stringify({ isEnabled: !item.isEnabled }),
      });

      if (!res.success) {
        alert(res.message || "Failed to toggle pricing status.");
        return;
      }

      showSuccess(
        `${type === "summer" ? "Summer" : "Winter"} camp pricing ${
          !item.isEnabled ? "enabled" : "disabled"
        }!`
      );
      fetchPricing();
    } catch (error: any) {
      alert(error.message || "Failed to update status.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (formData.minAge >= formData.maxAge) {
      setFormError("Max Age must be greater than Min Age.");
      return;
    }

    if (formData.youngerAgePrice < 0 || formData.olderAgePrice < 0) {
      setFormError("Prices must be non-negative.");
      return;
    }

    setIsSubmitting(true);

    try {
      const isSummer = activeCampType === "summer";
      const existing = isSummer ? summerPricing : winterPricing;
      const baseRoute = isSummer ? "/api/summer-camp-pricing" : "/api/winter-camp-pricing";

      let res;
      if (existing) {
        res = await adminFetch(`${baseRoute}/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
      } else {
        res = await adminFetch(baseRoute, {
          method: "POST",
          body: JSON.stringify(formData),
        });
      }

      if (!res.success) {
        setFormError(res.message || "Failed to save pricing.");
        setIsSubmitting(false);
        return;
      }

      showSuccess(`${isSummer ? "Summer" : "Winter"} camp pricing saved!`);
      setIsFormOpen(false);
      fetchPricing();
    } catch (error: any) {
      setFormError(error.message || "Failed to save pricing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          {successToast}
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Camp Pricing & Tier Rules
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Configure registration fees, younger vs older age tier cutoffs, sibling discounts, and registration availability.
          </p>
        </div>

        <button
          onClick={fetchPricing}
          disabled={isLoading}
          className="p-2.5 rounded-xl bg-[#141414] border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          title="Refresh pricing"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center text-neutral-400">
          <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F] mb-3" />
          <p className="text-xs uppercase tracking-wider font-semibold">Loading pricing configurations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= Summer Camp Pricing Card ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-[#141414] border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between group">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-950/40 text-white">
                    <Sun className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Summer Camp
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Summer program fee structure
                    </p>
                  </div>
                </div>

                {summerPricing && (
                  <button
                    onClick={() => handleToggleStatus("summer", summerPricing)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    {summerPricing.isEnabled ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <ToggleRight className="h-4 w-4" /> Active (Accepting)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-neutral-400 bg-neutral-900 border border-white/10 px-3 py-1 rounded-full">
                        <ToggleLeft className="h-4 w-4" /> Disabled
                      </span>
                    )}
                  </button>
                )}
              </div>

              {/* Pricing Grid */}
              {summerPricing ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Age Range</p>
                    <p className="text-base font-extrabold text-white mt-0.5">
                      {summerPricing.minAge} – {summerPricing.maxAge} yrs
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Younger Tier Fee</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-0.5">
                      {formatCurrency(summerPricing.youngerAgePrice)}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Older Tier Fee</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-0.5">
                      {formatCurrency(summerPricing.olderAgePrice)}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Sibling Discount</p>
                    <p className="text-base font-extrabold text-amber-400 mt-0.5">
                      {summerPricing.siblingDiscount}% OFF
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Processing Fee</p>
                    <p className="text-base font-extrabold text-neutral-300 mt-0.5">
                      {summerPricing.processingFeePercent}%
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Status</p>
                    <p className={`text-xs font-bold mt-1 ${summerPricing.isEnabled ? "text-emerald-400" : "text-neutral-400"}`}>
                      {summerPricing.isEnabled ? "Open for Registration" : "Paused / Closed"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-neutral-500 border border-dashed border-white/10 rounded-2xl p-6">
                  <p className="text-xs">No Summer Camp pricing tier created yet.</p>
                </div>
              )}
            </div>

            {/* Action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={() => handleOpenForm("summer", summerPricing)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-950/40 hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer"
              >
                {summerPricing ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {summerPricing ? "Edit Summer Pricing" : "Create Summer Pricing"}
              </button>
            </div>
          </div>

          {/* ================= Winter Camp Pricing Card ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-[#141414] border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between group">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-950/40 text-white">
                    <Snowflake className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Winter Camp
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Winter program fee structure
                    </p>
                  </div>
                </div>

                {winterPricing && (
                  <button
                    onClick={() => handleToggleStatus("winter", winterPricing)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    {winterPricing.isEnabled ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                        <ToggleRight className="h-4 w-4" /> Active (Accepting)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-neutral-400 bg-neutral-900 border border-white/10 px-3 py-1 rounded-full">
                        <ToggleLeft className="h-4 w-4" /> Disabled
                      </span>
                    )}
                  </button>
                )}
              </div>

              {/* Pricing Grid */}
              {winterPricing ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#0f0f0f] border border-white/5">
                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Age Range</p>
                    <p className="text-base font-extrabold text-white mt-0.5">
                      {winterPricing.minAge} – {winterPricing.maxAge} yrs
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Younger Tier Fee</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-0.5">
                      {formatCurrency(winterPricing.youngerAgePrice)}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Older Tier Fee</p>
                    <p className="text-base font-extrabold text-emerald-400 mt-0.5">
                      {formatCurrency(winterPricing.olderAgePrice)}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Sibling Discount</p>
                    <p className="text-base font-extrabold text-amber-400 mt-0.5">
                      {winterPricing.siblingDiscount}% OFF
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Processing Fee</p>
                    <p className="text-base font-extrabold text-neutral-300 mt-0.5">
                      {winterPricing.processingFeePercent}%
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02]">
                    <p className="text-[10px] text-neutral-500 uppercase font-semibold">Status</p>
                    <p className={`text-xs font-bold mt-1 ${winterPricing.isEnabled ? "text-emerald-400" : "text-neutral-400"}`}>
                      {winterPricing.isEnabled ? "Open for Registration" : "Paused / Closed"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-neutral-500 border border-dashed border-white/10 rounded-2xl p-6">
                  <p className="text-xs">No Winter Camp pricing tier created yet.</p>
                </div>
              )}
            </div>

            {/* Action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={() => handleOpenForm("winter", winterPricing)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-950/40 hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer"
              >
                {winterPricing ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {winterPricing ? "Edit Winter Pricing" : "Create Winter Pricing"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Edit / Create Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#141414] border border-white/10 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {activeCampType === "summer" ? "Summer" : "Winter"} Camp Pricing Configuration
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Adjust registration fees, age boundaries, sibling discounts, and status.
            </p>

            {formError && (
              <div className="mt-4 p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Min Age (yrs)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.minAge}
                    onChange={(e) => setFormData({ ...formData, minAge: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Max Age (yrs)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.maxAge}
                    onChange={(e) => setFormData({ ...formData, maxAge: parseInt(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Younger Tier Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.youngerAgePrice}
                    onChange={(e) => setFormData({ ...formData, youngerAgePrice: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Older Tier Fee ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.olderAgePrice}
                    onChange={(e) => setFormData({ ...formData, olderAgePrice: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Sibling Discount (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.siblingDiscount}
                    onChange={(e) => setFormData({ ...formData, siblingDiscount: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Processing Fee (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="50"
                    value={formData.processingFeePercent}
                    onChange={(e) => setFormData({ ...formData, processingFeePercent: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D32F2F]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isEnabled}
                    onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
                    className="h-4 w-4 rounded bg-neutral-900 border-white/20 text-[#D32F2F] focus:ring-[#D32F2F]"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Enable Online Registration</span>
                    <span className="text-[11px] text-neutral-400 block">Allow parents to register and pay online via Stripe</span>
                  </div>
                </label>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D32F2F] to-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/50 hover:brightness-110 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save Pricing Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
