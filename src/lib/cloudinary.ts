/**
 * Cloudinary Direct Upload Utility
 * Uploads files directly to Cloudinary CDN returning secure CDN URLs (https://res.cloudinary.com/...)
 */
export async function uploadToCloudinary(file: File | string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'rluropic'
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'unsigned'

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      console.warn('Cloudinary API response error:', errData)
      throw new Error(errData.error?.message || `HTTP ${res.status}`)
    }

    const data = await res.json()
    return data.secure_url || data.url
  } catch (error) {
    console.warn('Cloudinary upload warning:', error)
    // Fallback: If upload fails or preset isn't enabled, return the original string/base64
    if (typeof file === 'string') return file
    return ''
  }
}
