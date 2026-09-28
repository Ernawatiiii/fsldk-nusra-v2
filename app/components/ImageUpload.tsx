'use client'

import { useState } from 'react'
import { uploadImage } from '@/lib/storage'

export default function ImageUpload({
  value,
  onChange,
  folder = 'umum',
}: {
  value: string
  onChange: (url: string) => void
  folder?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const url = await uploadImage(file, folder)
      onChange(url)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {uploading && <p style={{ color: '#666' }}>⏳ Mengupload...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {value && (
        <div>
          <img
            src={value}
            alt="Preview"
            style={{ maxWidth: 200, borderRadius: 8, border: '1px solid #ddd' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{ display: 'block', marginTop: 8, cursor: 'pointer', color: '#c00' }}
          >
            Hapus Gambar
          </button>
        </div>
      )}
    </div>
  )
}