export default function ResumeSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-pulse">
      {/* Header section */}
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>

      {/* Section titles */}
      <div className="mt-10 space-y-8">
        {/* Experience */}
        <div className="space-y-4">
          <div className="h-5 bg-gray-300 rounded w-32"></div>
          
          {[1, 2].map((_, idx) => (
            <div key={idx} className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-4">
          <div className="h-5 bg-gray-300 rounded w-32"></div>
          
          {[1].map((_, idx) => (
            <div key={idx} className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <div className="h-5 bg-gray-300 rounded w-24"></div>

          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-6 w-20 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
