"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  HeartHandshake,
  Calendar,
  FileText,
  DollarSign,
  UserPlus,
  Mail,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Clock,
  Sparkles,
  Plus,
  Sun,
  Snowflake,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { adminFetch, formatCurrency, formatDate } from "@/app/lib/admin-api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    summerCampCount: 0,
    summerRevenue: 0,
    winterCampCount: 0,
    winterRevenue: 0,
    donationCount: 0,
    donationTotal: 0,
    inquiryCount: 0,
    eventsCount: 0,
    blogsCount: 0,
    joinRequestsCount: 0,
  });

  const [recentSummer, setRecentSummer] = useState<any[]>([]);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [recentJoinRequests, setRecentJoinRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [
        summerRes,
        winterRes,
        donationsRes,
        inquiriesRes,
        eventsRes,
        blogsRes,
        joinRes,
      ] = await Promise.all([
        adminFetch("/api/summer-camp"),
        adminFetch("/api/winter-camp"),
        adminFetch("/api/donation"),
        adminFetch("/api/contact-us"),
        adminFetch("/api/event"),
        adminFetch("/api/blog"),
        adminFetch("/api/join-our-club"),
      ]);

      const summerData = Array.isArray(summerRes.data) ? summerRes.data : [];
      const winterData = Array.isArray(winterRes.data) ? winterRes.data : [];
      const donationData = Array.isArray(donationsRes.data) ? donationsRes.data : [];
      const inquiryData = Array.isArray(inquiriesRes.data) ? inquiriesRes.data : [];
      const eventsData = Array.isArray(eventsRes.data) ? eventsRes.data : [];
      const blogsData = Array.isArray(blogsRes.data) ? blogsRes.data : [];
      const joinData = Array.isArray(joinRes.data) ? joinRes.data : [];

      const summerTotal = summerData.reduce(
        (sum: number, item: any) => sum + parseFloat(item.totalAmount || 0),
        0
      );
      const winterTotal = winterData.reduce(
        (sum: number, item: any) => sum + parseFloat(item.totalAmount || 0),
        0
      );
      const donationTotal = donationData.reduce(
        (sum: number, item: any) => sum + parseFloat(item.amount || 0),
        0
      );

      setStats({
        summerCampCount: summerData.length,
        summerRevenue: summerTotal,
        winterCampCount: winterData.length,
        winterRevenue: winterTotal,
        donationCount: donationData.length,
        donationTotal: donationTotal,
        inquiryCount: inquiryData.length,
        eventsCount: eventsData.length,
        blogsCount: blogsData.length,
        joinRequestsCount: joinData.length,
      });

      setRecentSummer(summerData.slice(0, 5));
      setRecentDonations(donationData.slice(0, 5));
      setRecentJoinRequests(joinData.slice(0, 5));
    } catch (error) {
      console.error("Failed to load dashboard statistics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner & Quick Actions */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950/60 via-[#181818] to-[#121212] border border-red-900/30 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Live Operations Control
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Wolverines Overview
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-xl">
              Monitor camp registrations, revenue, donor contributions, schedule events, publish blogs, and review enquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
            <Link
              href="/admin/events"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D32F2F] to-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-950/50 hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New Event
            </Link>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Summer Camp"
          value={stats.summerCampCount}
          subtitle={`Revenue: ${formatCurrency(stats.summerRevenue)}`}
          icon={Sun}
          gradient="from-amber-600 to-orange-700"
          trend="Paid registrations"
          trendUp={true}
          isLoading={isLoading}
        />

        <StatCard
          title="Winter Camp"
          value={stats.winterCampCount}
          subtitle={`Revenue: ${formatCurrency(stats.winterRevenue)}`}
          icon={Snowflake}
          gradient="from-cyan-600 to-blue-700"
          trend="Paid registrations"
          trendUp={true}
          isLoading={isLoading}
        />

        <StatCard
          title="Donations"
          value={formatCurrency(stats.donationTotal)}
          subtitle={`${stats.donationCount} total donors`}
          icon={HeartHandshake}
          gradient="from-emerald-600 to-teal-800"
          trend="Total funds raised"
          trendUp={true}
          isLoading={isLoading}
        />

        <StatCard
          title="Club Join Requests"
          value={stats.joinRequestsCount}
          subtitle={`${stats.inquiryCount} general inquiries`}
          icon={UserPlus}
          gradient="from-purple-600 to-indigo-800"
          trend="New membership leads"
          trendUp={true}
          isLoading={isLoading}
        />
      </div>

      {/* Secondary Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#141414] border border-white/5 flex items-center gap-3 animate-pulse"
              >
                <div className="h-10 w-10 rounded-xl bg-white/10 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-16 bg-white/10 rounded" />
                  <div className="h-5 w-12 bg-white/15 rounded" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Link
              href="/admin/inquiries"
              className="p-4 rounded-2xl bg-[#141414] hover:bg-[#181818] border border-white/5 hover:border-white/10 flex items-center gap-3 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-red-950/40 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">Enquiries</p>
                <p className="text-lg font-bold text-white">{stats.inquiryCount}</p>
              </div>
            </Link>

            <Link
              href="/admin/events"
              className="p-4 rounded-2xl bg-[#141414] hover:bg-[#181818] border border-white/5 hover:border-white/10 flex items-center gap-3 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-orange-950/40 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">Events</p>
                <p className="text-lg font-bold text-white">{stats.eventsCount}</p>
              </div>
            </Link>

            <Link
              href="/admin/blogs"
              className="p-4 rounded-2xl bg-[#141414] hover:bg-[#181818] border border-white/5 hover:border-white/10 flex items-center gap-3 transition-all group"
            >
              <div className="h-10 w-10 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">Blogs</p>
                <p className="text-lg font-bold text-white">{stats.blogsCount}</p>
              </div>
            </Link>

            <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">Total Revenue</p>
                <p className="text-sm sm:text-base font-bold text-emerald-400 truncate">
                  {formatCurrency(stats.summerRevenue + stats.winterRevenue + stats.donationTotal)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Summer Camp Registrations */}
        <div className="rounded-3xl bg-[#141414] border border-white/10 p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Sun className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-base text-white">
                Recent Summer Camp Registrations
              </h3>
            </div>
            <Link
              href="/admin/registrations"
              className="text-xs font-semibold text-[#D32F2F] hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {isLoading ? (
              <div className="space-y-3 py-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 animate-pulse">
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="h-3.5 w-32 bg-white/10 rounded" />
                      <div className="h-2.5 w-20 bg-white/5 rounded" />
                    </div>
                    <div className="h-3 w-36 bg-white/5 rounded hidden sm:block mr-4" />
                    <div className="h-3.5 w-16 bg-white/10 rounded mr-4" />
                    <div className="h-3 w-16 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            ) : recentSummer.length === 0 ? (
              <p className="py-8 text-center text-xs text-neutral-500">
                No summer camp registrations recorded yet.
              </p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 font-semibold">
                    <th className="pb-3">ID / Parent</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentSummer.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 font-medium text-white">
                        <div>{item.parentGuardianName}</div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {item.registrationId}
                        </div>
                      </td>
                      <td className="py-3 text-neutral-300">{item.email}</td>
                      <td className="py-3 text-right font-semibold text-emerald-400">
                        {formatCurrency(item.totalAmount)}
                      </td>
                      <td className="py-3 text-right text-neutral-400">
                        {formatDate(item.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="rounded-3xl bg-[#141414] border border-white/10 p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <HeartHandshake className="h-5 w-5 text-emerald-500" />
              <h3 className="font-bold text-base text-white">
                Recent Contributions
              </h3>
            </div>
            <Link
              href="/admin/donations"
              className="text-xs font-semibold text-[#D32F2F] hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {isLoading ? (
              <div className="space-y-3 py-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 animate-pulse">
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="h-3.5 w-28 bg-white/10 rounded" />
                      <div className="h-2.5 w-16 bg-white/5 rounded" />
                    </div>
                    <div className="h-3 w-36 bg-white/5 rounded hidden sm:block mr-4" />
                    <div className="h-3.5 w-16 bg-white/10 rounded mr-4" />
                    <div className="h-5 w-14 bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>
            ) : recentDonations.length === 0 ? (
              <p className="py-8 text-center text-xs text-neutral-500">
                No donations recorded yet.
              </p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 font-semibold">
                    <th className="pb-3">Donor</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentDonations.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 font-medium text-white">
                        {item.donorName}
                      </td>
                      <td className="py-3 text-neutral-300">{item.email}</td>
                      <td className="py-3 text-right font-semibold text-emerald-400">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                          {item.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
