function generateSlug(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, '') // Remove non-alphanumeric characters except hyphens
    .replace(/^-+|-+$/g, '') // Trim hyphens from start and end
}

export default generateSlug
