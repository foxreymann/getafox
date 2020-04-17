import prefillWithZeros from './prefillWithZeros'

export default function randomGenes() {
  let genes = ''
  for(let i = 0; i < 7; i++) {
    let gene = (Math.floor(Math.random() * 10**11)).toString()
    gene = prefillWithZeros({desiredLength: 11, str: gene})
    genes += gene
  }
  return genes
}
