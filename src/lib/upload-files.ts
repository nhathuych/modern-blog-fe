import { createClient } from '@supabase/supabase-js'

export const uploadThumbnail = async (image: File) => {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL!
  const supabaseKey = process.env.SUPABASE_API_KEY!
  const bucketName = process.env.SUPABASE_BUCKET_NAME!

  const supabase = createClient(supabaseUrl, supabaseKey)

  const [baseName, extension] = image.name.split(/\.(?=[^\.]+$)/)
  const fileName = `${baseName}-${Date.now()}.${extension}`

  const data = await supabase.storage.from(bucketName).upload(fileName, image)
  if (!data.data?.path) {
    console.error('Error uploading image:', data.error)
    throw new Error('Failed to upload image')
  }

  const result = await supabase.storage.from(bucketName).getPublicUrl(data.data.path)

  return result.data.publicUrl
}

export const deleteThumbnail = async (fileName: string) => {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL!
  const supabaseKey = process.env.SUPABASE_API_KEY!
  const bucketName = process.env.SUPABASE_BUCKET_NAME!

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { error } = await supabase.storage.from(bucketName).remove([fileName])

  return !error
}
