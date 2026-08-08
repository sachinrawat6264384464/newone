// lib/emailService.ts - Production-Ready TypeScript Version
import nodemailer from 'nodemailer'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  projectType: string
  budget?: string
  message: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  provider?: string
  error?: string
  suggestions?: string[]
  details?: {
    code?: string
    response?: string
    command?: string
  }
}

interface SMTPError extends Error {
  code?: string
  response?: string
  responseCode?: number
  command?: string
}

// Create transporter for Brevo
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // false for 587, true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: false, // Set to true for verbose logs
    logger: false,
    // Additional Brevo-specific settings
    pool: true,
    maxConnections: 1,
  }

  console.log('🔧 Brevo SMTP Configuration:', {
    host: config.host,
    port: config.port,
    user: config.auth.user,
    keyLength: config.auth.pass?.length || 0,
    keyPrefix: config.auth.pass?.substring(0, 8) + '...',
  })

  return nodemailer.createTransport(config)
}

// Enhanced validation for Brevo
const validateBrevoConfig = (): void => {
  const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'NOTIFICATION_EMAIL']
  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    throw new Error(`❌ Missing environment variables: ${missing.join(', ')}`)
  }

  // Validate SMTP host
  if (process.env.SMTP_HOST !== 'smtp-relay.brevo.com') {
    console.warn(`⚠️  SMTP_HOST should be 'smtp-relay.brevo.com', got '${process.env.SMTP_HOST}'`)
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(process.env.SMTP_USER!)) {
    throw new Error('❌ Invalid SMTP_USER email format')
  }

  // Check SMTP key format
  const smtpKey = process.env.SMTP_PASS!
  
  console.log('🔍 Analyzing SMTP Key:')
  console.log(`   Length: ${smtpKey.length}`)
  console.log(`   First 10 chars: ${smtpKey.substring(0, 10)}...`)
  
  // Check if it's likely an SMTP key vs API key
  if (smtpKey.startsWith('xkeysib-')) {
    console.log('✅ Key format looks like a valid Brevo API key')
    console.warn('⚠️  WARNING: You might be using an API key instead of SMTP key!')
    console.warn('   For SMTP, you need an SMTP key from the SMTP tab, not API tab')
  } else if (smtpKey.length === 90) {
    console.log('✅ Key length suggests this might be a valid SMTP key')
  } else {
    console.warn('⚠️  Key format doesn\'t match typical Brevo patterns')
  }

  // Check notification email
  if (!emailRegex.test(process.env.NOTIFICATION_EMAIL!)) {
    throw new Error('❌ Invalid NOTIFICATION_EMAIL format')
  }
}

// Generate simplified email template for testing
const generateEmailTemplate = (data: ContactFormData): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #dc2626;">🏠 Home Storey - New Contact</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Contact Information:</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      </div>

      <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Project Details:</h3>
        <p><strong>Type:</strong> ${data.projectType?.replace('-', ' ') || 'Not specified'}</p>
        <p><strong>Budget:</strong> ${data.budget?.replace('-', ' - ') || 'Not specified'}</p>
      </div>

      <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>

      <hr style="margin: 30px 0;">
      <p style="color: #666; font-size: 14px;">
        Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
        Via: Home Storey Website Contact Form
      </p>
    </div>
  `
}

// Send notification email via Brevo with enhanced debugging
export const sendContactNotification = async (formData: ContactFormData): Promise<EmailResult> => {
  try {
    console.log('🚀 Starting Brevo email notification...')
    
    // Validate configuration with enhanced checks
    validateBrevoConfig()
    console.log('✅ Brevo configuration validated')

    // Create transporter
    const transporter = createTransporter()
    console.log('✅ Brevo transporter created')

    // Test connection with detailed logging
    console.log('🔍 Testing Brevo SMTP connection...')
    try {
      await transporter.verify()
      console.log('✅ Brevo SMTP connection successful!')
    } catch (verifyError) {
      const smtpError = verifyError as SMTPError
      console.error('❌ SMTP verification failed:', {
        error: smtpError.message,
        code: smtpError.code,
        response: smtpError.response
      })
      
      // Provide specific guidance based on error
      if (smtpError.code === 'EAUTH') {
        console.error('🔑 Authentication Error - Possible causes:')
        console.error('   1. Using API key instead of SMTP key')
        console.error('   2. Incorrect SMTP username (should be your Brevo login email)')
        console.error('   3. SMTP key is deactivated or deleted')
        console.error('   4. Account issues with Brevo')
        
        console.error('🔧 To fix:')
        console.error('   1. Go to Brevo Dashboard → SMTP & API → SMTP tab')
        console.error('   2. Generate a NEW SMTP key (not API key)')
        console.error('   3. Copy the SMTP key to SMTP_PASS in .env.local')
        console.error('   4. Make sure SMTP_USER is your Brevo login email')
      }
      
      throw verifyError
    }

    // Prepare email
    const mailOptions = {
      from: {
        name: 'Home Storey Website',
        address: process.env.SMTP_USER!
      },
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🏠 New Contact: ${formData.firstName} ${formData.lastName}`,
      html: generateEmailTemplate(formData),
      text: `
Home Storey - New Contact Form Submission

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Project: ${formData.projectType?.replace('-', ' ') || 'Not specified'}
Budget: ${formData.budget?.replace('-', ' - ') || 'Not specified'}

Message:
${formData.message}

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `
    }

    console.log('📧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    // Send email
    const result = await transporter.sendMail(mailOptions)
    
    console.log('✅ Email sent successfully via Brevo!')
    console.log('📬 Result:', {
      messageId: result.messageId,
      response: result.response,
      envelope: result.envelope
    })

    return { 
      success: true, 
      messageId: result.messageId,
      provider: 'Brevo'
    }

  } catch (error) {
    const smtpError = error as SMTPError
    console.error('❌ Brevo email sending failed:')
    console.error('   Error:', smtpError.message)
    console.error('   Code:', smtpError.code)
    console.error('   Response:', smtpError.response)
    console.error('   Command:', smtpError.command)

    // Enhanced error messages with proper typing
    let errorMessage = 'Unknown error'
    const suggestions: string[] = []
    
    if (smtpError.code === 'EAUTH') {
      errorMessage = 'Brevo authentication failed'
      suggestions.push(
        'Check you\'re using SMTP key (not API key)',
        'Verify SMTP_USER is your Brevo login email',
        'Generate a new SMTP key from Brevo dashboard',
        'Ensure SMTP key is active and not expired'
      )
    } else if (smtpError.code === 'ESOCKET') {
      errorMessage = 'Network connection failed'
      suggestions.push('Check internet connection', 'Try again in a moment')
    } else if (smtpError.responseCode === 550) {
      errorMessage = 'Email rejected by Brevo'
      suggestions.push(
        'Verify sender email is authorized',
        'Check if account is in good standing'
      )
    } else {
      errorMessage = smtpError.message || 'Unknown error occurred'
    }

    if (suggestions.length > 0) {
      console.error('💡 Suggestions:')
      suggestions.forEach((suggestion, index) => {
        console.error(`   ${index + 1}. ${suggestion}`)
      })
    }

    return { 
      success: false, 
      error: errorMessage,
      provider: 'Brevo',
      suggestions,
      details: {
        code: smtpError.code,
        response: smtpError.response,
        command: smtpError.command
      }
    }
  }
}