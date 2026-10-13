import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif-luxury text-6xl sm:text-8xl font-bold text-slate-900 mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p className="text-slate-600 text-sm max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        prefetch={false}
        className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
      >
        Return to Home Page
      </Link>
    </div>
  )
}
