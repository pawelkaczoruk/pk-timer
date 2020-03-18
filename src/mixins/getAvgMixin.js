export const getAvgMixin = {
  methods: {
    getAvg(list, firstIndex, lastIndex, type = 'avg') {
      const times = list.slice(firstIndex, lastIndex).map(el => el.result);

      if(type === 'mean') return times.reduce((a,b) => a + b, 0) / (lastIndex - firstIndex);
      else if(type === 'avg') {
        const max = Math.max(...times),
              min = Math.min(...times),
              posMax = times.indexOf(max),
              temp = times.slice(0, posMax).concat(times.slice(posMax + 1)),
              posMin = temp.indexOf(min),
              avg = temp.slice(0, posMin).concat(temp.slice(posMin + 1)).reduce((a, b) => a + b, 0);
        
        return avg / (lastIndex - firstIndex - 2);
      }
    }
  }
}