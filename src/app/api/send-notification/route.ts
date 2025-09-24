// app/api/send-notification/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendContactNotification } from '../../../lib/emailService'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email notification
    const emailResult = await sendContactNotification(formData)
    
    if (emailResult.success) {
      return NextResponse.json(
        { 
          message: 'Notification sent successfully',
          messageId: emailResult.messageId 
        },
        { status: 200 }
      )
    } else {
      console.error('Email sending failed:', emailResult.error)
      return NextResponse.json(
        { 
          error: 'Failed to send notification email',
          details: emailResult.error 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}