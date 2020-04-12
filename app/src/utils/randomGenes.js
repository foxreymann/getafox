export default function randomGenes() {
  let genes = ''
  for(i = 0; i < 7; i++) {
    genes += Math.floor(Math.random() * 10**11)
  }
  return genes
}
