import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, Timestamp, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore'

export async function GET() {
  try {
    const q = query(collection(db, 'webinar_applications'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    const list = snap.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }))
    return NextResponse.json({ success: true, applications: list })
  } catch (err) {
    try {
      const snap = await getDocs(collection(db, 'webinar_applications'))
      const list = snap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }))
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      return NextResponse.json({ success: true, applications: list })
    } catch (e) {
      console.error('Error fetching applications:', e)
      return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body || !body.name || !body.phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 })
    }

    const now = new Date()
    const payload = {
      name: body.name.trim(),
      email: (body.email || '').trim(),
      phone: (body.phone || '').trim(),
      identity: body.identity || 'Not Specified',
      coachingGoal: body.coachingGoal || 'Not Specified',
      confidentialAck: body.confidentialAck || 'Not Specified',
      liveCommitment: body.liveCommitment || 'Not Specified',
      status: body.status || 'new',
      createdAt: Date.now(),
      submittedAtFormatted: now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      timestamp: Timestamp.now(),
      source: body.source || 'webinar_popup_form'
    }

    const docRef = await addDoc(collection(db, 'webinar_applications'), payload)
    return NextResponse.json({ success: true, id: docRef.id })
  } catch (err) {
    console.error('Error saving application:', err)
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, status } = body
    if (!id || !status) {
      return NextResponse.json({ error: 'ID and Status are required' }, { status: 400 })
    }

    const docRef = doc(db, 'webinar_applications', id)
    await updateDoc(docRef, { status })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error updating application status:', err)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const docRef = doc(db, 'webinar_applications', id)
    await deleteDoc(docRef)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting application:', err)
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 })
  }
}
