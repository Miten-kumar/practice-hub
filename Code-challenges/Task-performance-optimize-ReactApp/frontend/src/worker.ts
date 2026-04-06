

self.onmessage = (e:MessageEvent) =>{
  if(e.data == 'start'){
     let total = 0;
  for (let i = 0; i < 1e8; i++) {
    total += i;
  }
  self.postMessage(total)
  }
}