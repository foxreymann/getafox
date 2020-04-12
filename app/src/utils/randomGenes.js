export default function randomGenes() {
  let genes = ''
  let zero = '0'
  for(let i = 0; i < 7; i++) {
    let gene = (Math.floor(Math.random() * 10**11)).toString()
    let tooShort = 11 - gene.length
    if(tooShort) {
      gene = zero.repeat(tooShort) + gene
    }
    genes += gene
  }
  return genes
}
