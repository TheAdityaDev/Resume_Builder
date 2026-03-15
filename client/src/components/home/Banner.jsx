const Banner = () => {
  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4  md:px-14 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 to-purple-100 rounded-2xl">
      <p>Build Faster with Responsive Tailwind CSS Templates</p>

      <a
        href="https://prebuiltui.com"
        className="flex items-center gap-1 px-3 py-1 rounded-lg text-violet-600 bg-violet-50 hover:bg-slate-100 transition active:scale-95 ml-3"
      >
        Explore now
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.91797 7H11.0846"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 2.9165L11.0833 6.99984L7 11.0832"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
};

// 🦴 Skeleton Loader (same file)
export const BannerSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 md:px-14 py-2 text-center bg-gradient-to-r from-violet-300 to-purple-200 animate-pulse">
      {/* Text placeholder */}
      <div className="h-4 w-60 bg-white/40 rounded"></div>

      {/* Button placeholder */}
      <div className="ml-3 h-7 w-24 bg-white/50 rounded-lg"></div>
    </div>
  );
};

export default Banner;
