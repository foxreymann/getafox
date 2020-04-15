export default function prefillWithZeros({desiredLength, str}) {
  const tooShort = desiredLength - str.length
  if(tooShort) {
    str = '0'.repeat(tooShort) + str
  }
  return str
}
