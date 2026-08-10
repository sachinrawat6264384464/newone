import { db } from './firebase'
import { collection, doc, getDocs, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore'
import { ProjectItem } from '@/types/project'

const COLLECTION_NAME = 'projects'

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'noida-luxury-villa',
    title: 'The Crest Luxury Residence',
    category: 'Facade & Interior',
    location: 'Noida Sector 44',
    clientName: 'Verma Family',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298162/Homestorey-media/What%20we%20create/vt9avmrazh3jvii5ytl9.jpg',
    galleryImages: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg',
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298164/Homestorey-media/What%20we%20create/t6w21ualgsjkz6ifc8bo.jpg'
    ],
    description: 'A 5000 sq ft luxury villa exterior elevation redesign and complete turnkey interior transformation with warm teakwood paneling and ambient lighting.',
    featured: true,
    published: true,
    year: '2024',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'delhi-modern-penthouse',
    title: 'Greater Kailash Penthouse',
    category: 'Living Area & Kitchen',
    location: 'GK II, New Delhi',
    clientName: 'Kapoor Family',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298165/Homestorey-media/What%20we%20create/jjhie0tfazmie9laeimu.jpg',
    galleryImages: [
      'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298161/Homestorey-media/What%20we%20create/edh6sfa6zt7byruupb2b.jpg'
    ],
    description: 'Ultra-modern open plan penthouse with Italian marble flooring, bespoke ceiling cove lighting, and an island modular kitchen.',
    featured: true,
    published: true,
    year: '2024',
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'gurugram-corporate-office',
    title: 'Zenith Corporate Studio',
    category: 'Commercial / WFH',
    location: 'Golf Course Road, Gurugram',
    clientName: 'Manish Agarwal',
    coverImage: 'https://res.cloudinary.com/dfjecbhki/image/upload/v1762298163/Homestorey-media/What%20we%20create/hqflyynqrv1uccqarkmf.jpg',
    galleryImages: [],
    description: 'Minimalist corporate headquarters design focusing on ergonomic workstations, acoustic soundproofing, and seamless video conference suites.',
    featured: false,
    published: true,
    year: '2023',
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
]

export async function getProjects(publishedOnly = false): Promise<ProjectItem[]> {
  try {
    const projectsRef = collection(db, COLLECTION_NAME)
    const q = query(projectsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    let items: ProjectItem[] = []
    if (!snapshot.empty) {
      items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectItem))
    }

    const existingIds = new Set(items.map(i => i.id))
    const missingDefaults = INITIAL_PROJECTS.filter(p => !existingIds.has(p.id))
    const mergedItems = [...items, ...missingDefaults]

    return publishedOnly ? mergedItems.filter(p => p.published) : mergedItems
  } catch (error: unknown) {
    if ((error as { code?: string })?.code !== 'permission-denied') {
      console.warn('Error fetching projects from Firestore, using fallback:', error)
    }
    return publishedOnly ? INITIAL_PROJECTS.filter(p => p.published) : INITIAL_PROJECTS
  }
}

export async function saveProject(project: Partial<ProjectItem> & { title: string }): Promise<void> {
  const projectId = project.id || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `project-${Date.now()}`
  const now = Date.now()
  
  const payload: ProjectItem = {
    id: projectId,
    title: project.title,
    category: project.category || 'Residential',
    location: project.location || '',
    clientName: project.clientName || '',
    coverImage: project.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: project.galleryImages || [],
    description: project.description || '',
    featured: project.featured !== undefined ? project.featured : false,
    published: project.published !== undefined ? project.published : true,
    year: project.year || new Date().getFullYear().toString(),
    createdAt: project.createdAt || now,
    updatedAt: now
  }

  try {
    await setDoc(doc(db, COLLECTION_NAME, projectId), payload, { merge: true })
  } catch (error) {
    console.error('Error saving project to Firestore:', error)
    throw error
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
  } catch (error) {
    console.error('Error deleting project from Firestore:', error)
    throw error
  }
}
