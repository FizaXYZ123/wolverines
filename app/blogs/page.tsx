import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blogsData";

export const metadata: Metadata = {
  title: "Blogs | The Wolverines Field Hockey Club",
  description:
    "Stay updated with the latest field hockey news, tips, and training resources. Join the Wolverine community today!",
};

export default function BlogsPage() {
  const featuredPost = blogPosts.find((post) => post.isFeatured) || blogPosts[0];
  const otherPosts = blogPosts.filter((post) => post.id !== featuredPost.id);

  return (
    <main className="w-full min-h-[calc(100vh-80px)] bg-white text-neutral-900 py-12 sm:py-16 lg:py-20 select-none">
      {/* Self-contained animations for Blogs Page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes blogHeaderAnim {
              0% {
                opacity: 0;
                transform: translateY(-24px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes blogFeaturedAnim {
              0% {
                opacity: 0;
                transform: translateY(30px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes blogCardAnim {
              0% {
                opacity: 0;
                transform: translateY(28px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-blog-header {
              animation: blogHeaderAnim 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            .animate-blog-featured {
              animation: blogFeaturedAnim 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
            }
            .animate-blog-card-0 {
              animation: blogCardAnim 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
            }
            .animate-blog-card-1 {
              animation: blogCardAnim 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
            }
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14 animate-blog-header">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-normal uppercase tracking-wider text-neutral-900 leading-none mb-3"
            style={{
              fontFamily: 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
            }}
          >
            BLOGS
          </h1>
          <p
            className="text-neutral-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed"
            style={{
              fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
            }}
          >
            Stay updated with the latest field hockey news, tips, and training resources. Join the Wolverine community today!
          </p>
        </div>

        {/* Featured Hero Blog Card */}
        {featuredPost && (
          <div className="mb-8 sm:mb-12 animate-blog-featured">
            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="block bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left: Featured Image */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[340px] lg:min-h-[390px] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center items-start">
                  <h2
                    className="text-xl sm:text-2xl lg:text-[26px] font-bold text-neutral-900 mb-3 leading-snug group-hover:text-[#DE2027] transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                    }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 mb-5 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#DE2027] group-hover:text-red-700 transition-colors no-underline">
                    Read More <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rsaquo;</span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Bottom Blog Cards Grid (2-columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {otherPosts.map((post, idx) => (
            <div key={post.id} className={idx === 0 ? "animate-blog-card-0" : "animate-blog-card-1"}>
              <Link
                href={`/blogs/${post.slug}`}
                className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full"
              >
                {/* Card Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3
                      className="text-base sm:text-lg font-bold text-neutral-900 mb-2.5 leading-snug group-hover:text-[#DE2027] transition-colors duration-200 line-clamp-2"
                      style={{
                        fontFamily: 'var(--font-open-sans), "Open Sans", sans-serif',
                      }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mb-5 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#DE2027] group-hover:text-red-700 transition-colors no-underline">
                    Read More <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rsaquo;</span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
