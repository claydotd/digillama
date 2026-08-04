const modules = import.meta.glob('../artwork/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
  import: 'default',
})

/** @type {Record<string, string>} */
export const artworkImages = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const filename = path.split('/').pop()
    return [filename, url]
  }),
)
