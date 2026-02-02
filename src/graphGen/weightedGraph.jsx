export function weightedGraphGen(rows = 4, columns = 4){
 const nodes = [];
 const edges = [];

 let id = 0;

  for ( let r = 0; r < rows; r++){
    for(let c = 0; c < columns; c++){
      nodes.push({
        id: id.toString(),
        position: { x: c * 120, y: r * 120},
        data: {label: id.toString()},
      })
      id++
    }
  }

 //helper to add weighted edge
 const addEdge = (a, b) => {
  const weight = Math.floor(Math.random() * 9) + 1

  edges.push({
    id: `e$(a)-${b}`,
    source: a.toString(),
    target: b.toString(),
    label: weight.toString(),
    data: { weight }

  });
 }

 for(let i = 0; i < nodes.length; i++){
  const row = Math.floor(i/ columns);
  const col = i % columns;

  if(col < columns - 1)addEdge(i, i + 1);
  if (row < row - 1)addEdge(i, i + columns)
 }

 edges.forEach(e => {
  if (e.data?.weight == null) {
    console.error('Missing weight!', e);
  }
});

  return { nodes, edges }

}
