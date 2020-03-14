export const timeFormatterMixin = {
  methods: {
    // set proper time format - min:s.ms
    timeFormatter(millis) {
      let min, s, ms,
          minFormat, sFormat, msFormat;

      min = Math.floor(millis/60/1000);
      s = Math.floor((millis - min*60*1000)/1000);
      ms = Math.floor((millis % 1000)/10);
      
      minFormat = min < 1 ? '' : `${min}:`;
      sFormat = (min > 0 && s < 10) ? `0${s}.` : `${s}.`;
      msFormat = ms < 10 ? `0${ms}` : `${ms}`;
      
      return minFormat + sFormat + msFormat;
    }
  }

}