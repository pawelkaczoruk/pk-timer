export const timeFormatterMixin = {
  methods: {
    // set proper time format - min:s.ms
    timeFormatter(value) {
      let min, s, ms,
          minFormat, sFormat, msFormat;

      if(typeof value === 'number') {
        min = Math.floor(value/60/1000);
        s = Math.floor((value - min*60*1000)/1000);
        ms = Math.floor((value % 1000)/10);
        
        minFormat = min < 1 ? '' : `${min}:`;
        sFormat = (min > 0 && s < 10) ? `0${s}.` : `${s}.`;
        msFormat = ms < 10 ? `0${ms}` : `${ms}`;
        
        return minFormat + sFormat + msFormat;        
      } else if(typeof value === 'string') {
        const endMin = value.indexOf(':'),
              endSec = value.indexOf('.');
        
        min = endMin === -1 ? 0 : Number(value.slice(0, endMin));
        s = Number(value.slice(endMin+1, endSec));
        const temp = value.slice(endSec+1, endSec+3);
        ms = temp.length > 1 ? Number(temp) : Number(temp) * 10;

        return ms*10 + s*1000 + min*60*1000;
      }


    }
  }
}