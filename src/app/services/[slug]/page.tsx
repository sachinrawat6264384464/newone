// app/services/[slug]/page.tsx
import { getServices } from '@/lib/services'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Clock, PhoneCall, Building2 } from 'lucide-react'

// Extended detailed information for default services
const DETAILED_SERVICES_DATA: Record<string, {
  title: string
  subtitle: string
  category: string
  overview: string
  highlights: string[]
  process: { title: string; desc: string }[]
  benefits: string[]
}> = {
  'end-to-end-construction': {
    title: 'End to End Construction',
    subtitle: 'Complete Turnkey Construction & Material Execution',
    category: 'Construction & Architecture',
    overview: 'Home Storey provides comprehensive, end-to-end construction services that handle every aspect of your building project. From initial plot phase planning and architectural blue-printing to high-grade material procurement and turnkey structural execution, we manage your dream build with total transparency, quality guarantees, and strict timelines.',
    highlights: [
      'Construction with premium grade material (A-class cement, steel, & masonry)',
      'Architectural elevation & facade design integration',
      'Phase planning & layout optimization of plot',
      'Structural engineering & mandatory quality testing',
      'Dedicated on-site site engineer & daily progress reporting',
      'Turnkey key-handover with completion warranty'
    ],
    process: [
      { title: '1. Plot Survey & Phase Planning', desc: 'Detailed soil analysis, plot boundary measurement, and phase-wise planning for construction timelines.' },
      { title: '2. Architectural & Facade Design', desc: 'Crafting 2D floor plans, 3D exterior facades, and structural engineering blueprints.' },
      { title: '3. Foundation & Material Procurement', desc: 'Sourcing high-grade certified materials and laying high-strength foundation columns.' },
      { title: '4. Structural Construction', desc: 'Brickwork, slab casting, electrical & plumbing conduit embedding under strict engineering supervision.' },
      { title: '5. Finishing & Handover', desc: 'Plastering, waterproofing, painting, tile installation, and final quality audit before key handover.' }
    ],
    benefits: [
      'Single point of contact for complete construction',
      'Transparent material specifications & zero hidden costs',
      'Timely milestone delivery guarantee'
    ]
  },
  'full-home-interiors': {
    title: 'Full Home Interiors',
    subtitle: 'Luxury Bespoke Interior Design & Turnkey Execution',
    category: 'Interior Architecture',
    overview: 'Transform your living spaces with Home Storey’s end-to-end interior design services. We craft bespoke living rooms, modular kitchens, soothing bedrooms, and custom furniture tailored to your lifestyle and functional requirements.',
    highlights: [
      'Modular kitchen design with German/Italian hardware',
      'Custom wardrobes, TV accent walls & bespoke joinery',
      'False ceiling design with layered ambient LED lighting',
      'Living area, bedroom & dining room spatial planning',
      'Premium material selection (boiling water-resistant plywood, acrylic, quartz)',
      '100% turnkey execution with post-handover warranty'
    ],
    process: [
      { title: '1. Discovery & Design Consultation', desc: 'Understanding your taste, lifestyle needs, budget, and functional preferences.' },
      { title: '2. 3D Renderings & Material Selection', desc: 'Visualizing your space in 3D and handpicking finishes, laminates, and hardware.' },
      { title: '3. Factory Precision Manufacturing', desc: 'Custom modular woodwork fabricated on state-of-the-art precision machinery.' },
      { title: '4. On-site Installation & Supervision', desc: 'Clean, dust-free installation by skilled craftsmen under expert supervision.' }
    ],
    benefits: [
      'Tailored aesthetics matching your personal lifestyle',
      'Maximised space utilization & ergonomic design',
      'High durability with factory-finished woodworks'
    ]
  },
  'architecture-facade-design': {
    title: 'Architecture & Facade Design',
    subtitle: 'Modern 3D Exterior Facades & Spatial Engineering',
    category: 'Architecture',
    overview: 'Make a powerful first impression with Home Storey’s architectural facade design service. We combine contemporary aesthetics, energy efficiency, and structural elegance to design facades that elevate property value and visual appeal.',
    highlights: [
      'Photorealistic 3D facade elevation modeling',
      'Architectural floor plan optimization & plot layouting',
      'Material specification (louvers, stone cladding, ACP, glass)',
      'Architectural lighting design & night render visualization',
      'Municipal drawing assistance & structural guidance'
    ],
    process: [
      { title: '1. Site Orientation & Concept Study', desc: 'Analyzing sun direction, ventilation, road width, and architectural style.' },
      { title: '2. 3D Facade Elevation Options', desc: 'Generating multiple modern 3D facade design options with texture mapping.' },
      { title: '3. Working Drawings & Material Chart', desc: 'Providing exact dimensioned drawings and material specifications for site contractors.' }
    ],
    benefits: [
      'High curb appeal & boosted property market value',
      'Optimized natural lighting and thermal efficiency',
      'Accurate drawings for zero site rework'
    ]
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug

  // Try to find in detailed data first, or fetch from services lib
  const detailed = DETAILED_SERVICES_DATA[slug]
  const services = await getServices()
  const foundService = services.find(s => s.id === slug)

  const title = detailed?.title || foundService?.title || 'Service Details'
  const subtitle = detailed?.subtitle || foundService?.subtitle || 'Professional Service by Home Storey'
  const category = detailed?.category || foundService?.category || 'Service'
  const overview = detailed?.overview || foundService?.description || 'Discover our comprehensive design and construction solutions tailored to your unique lifestyle.'
  const highlights = detailed?.highlights || foundService?.features || [
    'Customized design tailored to your requirements',
    'High-grade material and expert execution',
    'On-time project delivery guarantee',
    'Complete transparency & dedicated support'
  ]
  const process = detailed?.process || [
    { title: '1. Consultation & Design', desc: 'Initial discussion to capture requirements and craft preliminary design blueprints.' },
    { title: '2. Material & Execution', desc: 'Procuring certified materials and executing with skilled craftsmanship.' },
    { title: '3. Final Audit & Handover', desc: 'Thorough quality check before final project key handover.' }
  ]

  const whatsappUrl = `https://wa.me/919625769768?text=${encodeURIComponent(`Hi! I am interested in your "${title}" service. I would like to book a consultation.`)}`

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
        
        {/* Header / Hero Section */}
        <section className="bg-slate-950 text-white py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-600" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-xs font-bold text-red-400 hover:text-white uppercase tracking-wider mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <span className="text-red-500 text-xs font-semibold tracking-[0.25em] uppercase block mb-2">
              {category}
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4">
              {title}
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-light max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Overview Card */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm">
                <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-2">Overview</span>
                <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 mb-4">What This Service Offers</h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
                  {overview}
                </p>
              </div>

              {/* Key Deliverables / Highlights */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm">
                <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-2">Key Deliverables</span>
                <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 mb-6">Service Highlights & Scope</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-red-50/50 p-4 rounded-xl border border-red-100">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-sm sm:text-base font-medium leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Process */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm">
                <span className="text-red-600 font-bold text-xs tracking-widest uppercase block mb-2">Our Methodology</span>
                <h2 className="font-serif-luxury text-2xl font-bold text-slate-900 mb-6">Step-by-Step Execution Process</h2>

                <div className="space-y-6">
                  {process.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-serif-luxury text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* WhatsApp CTA Card */}
              <div className="bg-slate-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
                
                <span className="text-red-400 font-bold text-xs tracking-widest uppercase block mb-2">Ready to Start?</span>
                <h3 className="font-serif-luxury text-2xl font-bold mb-3">Book Free Consultation</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                  Speak directly with our chief designer and structural engineers to discuss your project.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center space-x-3 shadow-lg shadow-green-600/20"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Why Choose Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
                <h4 className="font-serif-luxury text-lg font-bold text-slate-900 border-b border-gray-100 pb-3">
                  Why Choose Home Storey?
                </h4>
                
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">100% Quality Assurance</p>
                    <p className="text-xs text-slate-500">Certified materials and multi-level quality audits.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">On-Time Handover</p>
                    <p className="text-xs text-slate-500">Strict timeline tracking with milestone updates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Transparent Pricing</p>
                    <p className="text-xs text-slate-500">No hidden surprises or surprise cost inflations.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>
    </Layout>
  )
}
