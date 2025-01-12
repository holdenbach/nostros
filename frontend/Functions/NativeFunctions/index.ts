export const handleInfinityScroll: (event: any) => boolean = (event) => {
  const mHeight = event.nativeEvent.layoutMeasurement.height
  const cSize = event.nativeEvent.contentSize.height
  const Y = event.nativeEvent.contentOffset.y
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  if (Math.ceil(mHeight + Y) >= cSize) return true
  return false
}

export const stringToColour: (string: string) => string = (string) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export const pickRandomItems = <T extends unknown>(arr: T[], n: number): T[] => {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random())
  return shuffled.slice(0, n)
}

export const validImageUrl: (url: string | undefined) => boolean = (url) => {
  if (url) {
    const regexp = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/
    return regexp.test(url)
  } else {
    return false
  }
}
