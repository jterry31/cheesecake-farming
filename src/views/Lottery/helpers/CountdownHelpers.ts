import getTimePeriods from 'utils/getTimePeriods'

const getNextLotteryDrawTime = (currentMillis) => {
  const date = new Date(currentMillis)
  console.log(date);
  
  const interval = 259200000; // 3 days in miliseconds
  const beginning = 1620064800000; // April 9, 2021 18:00:00 UTC Time

  // const date1 = new Date('April 9, 2021 18:00:00').toUTCString();
  const date1 = new Date(beginning);
  
  const date2 = new Date(beginning + interval);
  const date3 = new Date(beginning + 2*interval);
  const date4 = new Date(beginning + 3*interval);
  const date5 = new Date(beginning + 4*interval);
  const date6 = new Date(beginning + 5*interval);
  const date7 = new Date(beginning + 6*interval);
  const date8 = new Date(beginning + 7*interval);
  

  let millisTimeOfNextDraw          

  if (date < date1)
    millisTimeOfNextDraw = date1;
  else if (date < date2)
    millisTimeOfNextDraw = date2;
  else if (date < date3)
    millisTimeOfNextDraw = date3;
  else if (date < date4)
    millisTimeOfNextDraw = date4;
  else if (date < date5)
    millisTimeOfNextDraw = date5;
  else if (date < date6)
    millisTimeOfNextDraw = date6;
  else if (date < date7)
    millisTimeOfNextDraw = date7;
  else
    millisTimeOfNextDraw = date8;

  return millisTimeOfNextDraw
}

// @ts-ignore
const getNextTicketSaleTime = (currentMillis) => (parseInt(currentMillis / 3600000) + 1) * 3600000
const dayshoursAndMinutesString = (days, hours, minutes) => `${parseInt(days)} days, ${parseInt(hours)} hours, ${parseInt(minutes)} minutes`

export const getTicketSaleTime = (currentMillis): string => {
  const nextTicketSaleTime = getNextTicketSaleTime(currentMillis)
  const msUntilNextTicketSale = nextTicketSaleTime - currentMillis
  const { minutes } = getTimePeriods(msUntilNextTicketSale / 1000)
  const { hours } = getTimePeriods(msUntilNextTicketSale / 1000)
  const { days } = getTimePeriods(msUntilNextTicketSale / 1000)
  return dayshoursAndMinutesString(days, hours, minutes)
}

export const getLotteryDrawTime = (currentMillis): string => {
  const nextLotteryDrawTime = getNextLotteryDrawTime(currentMillis)
  const msUntilLotteryDraw = nextLotteryDrawTime - currentMillis
  // console.log(msUntilLotteryDraw);
  const { minutes } = getTimePeriods(msUntilLotteryDraw / 1000)
  const { hours } = getTimePeriods(msUntilLotteryDraw / 1000)
  const { days } = getTimePeriods(msUntilLotteryDraw / 1000)
  return dayshoursAndMinutesString(days, hours, minutes)
}

export const getTicketSaleStep = () => (1 / 72) * 100

export const getLotteryDrawStep = (currentMillis) => {
  const msBetweenLotteries = 259200000
  const endTime = getNextLotteryDrawTime(currentMillis)
  const msUntilLotteryDraw = endTime - currentMillis
  const percentageRemaining = (msUntilLotteryDraw / msBetweenLotteries) * 100
  return 100 - percentageRemaining
}
