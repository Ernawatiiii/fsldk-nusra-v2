'use client'

import { HiCheckCircle, HiXCircle } from 'react-icons/hi'

export default function StatusMessage({ message }: { message: string }) {
  if (!message) return null

  const lower = message.toLowerCase()
  const isError =
    message.startsWith('❌') ||
    lower.includes('error') ||
    lower.includes('invalid') ||
    lower.includes('gagal') ||
    lower.includes('salah') ||
    lower.includes('tidak') ||
    lower.includes('wrong') ||
    lower.includes('failed')

  const cleanMessage = message.replace(/^[✅❌]\s*/, '')

  return (
    <div
      className={`flex items-center gap-2 p-4 rounded-xl text-sm font-semibold ${
        isError
          ? 'bg-red-50 text-red-700 border border-red-200'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
      }`}
    >
      {isError ? (
        <HiXCircle className="w-5 h-5 flex-shrink-0" />
      ) : (
        <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
      )}
      {cleanMessage}
    </div>
  )
}