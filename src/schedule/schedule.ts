import schedule from 'node-schedule';

schedule.scheduleJob('1 minute task', '* * * * *', () => {
  // Do something
});
