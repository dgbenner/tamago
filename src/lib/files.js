// Saving a file to the device and reading one back: backups, the native-speaker check, flag exports.
export function download(name, data) {
  const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}
export const readJson = (file) => file.text().then((t) => JSON.parse(t))
export const stamp = () => new Date().toLocaleDateString('en-CA')
