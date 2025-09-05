import type { Grant } from "../store/grantSlice";

function parseVestingSchedule(schedule: string) {
  if (schedule.includes("25% annually for 4 years") || schedule.includes("25%")) {
    return {
      periods: 4,
      type: "annual",
      percentages: [25, 25, 25, 25]
    };
  }

  if (schedule.includes("3 years")) {
    return {
      periods: 3,
      type: "annual",
      percentages: [33.33, 33.33, 33.34]
    };
  }

  return {
    periods: 4,
    type: "annual",
    percentages: [25, 25, 25, 25]
  };
}

export function generateVestingEvents(grant: Grant, currentPrices?: Record<string, number>) {
  const events: { date: string; shares: number; value: number }[] = [];
  const start = new Date(grant.grantDate);
  const vestingInfo = parseVestingSchedule(grant.vestingSchedule);

  const priceToUse = currentPrices?.[grant.symbol] || grant.grantPrice;

  for (let i = 0; i < vestingInfo.periods; i++) {
    const vestDate = new Date(start);

    if (vestingInfo.type === "annual") {
      vestDate.setFullYear(start.getFullYear() + (i + 1));
    }

    const isoDate = vestDate.toISOString().split("T")[0];
    const vestingPercentage = vestingInfo.percentages[i];
    const sharesVesting = Math.floor((grant.shares * vestingPercentage) / 100);

    events.push({
      date: isoDate,
      shares: sharesVesting,
      value: sharesVesting * priceToUse
    });
  }

  return events;
}

export function getUpcomingVests(grants: Grant[], n: number, currentPrices?: Record<string, number>) {
  let allEvents: { company: string; date: string; shares: number; value: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  grants.forEach((g) => {
    const events = generateVestingEvents(g, currentPrices).map((e) => ({
      company: g.company,
      symbol: g.symbol,
      ...e,
    }));
    allEvents = [...allEvents, ...events];
  });

  return allEvents
    .filter((e) => {
      const eventDate = new Date(e.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, n);
}

export function getVestedBreakdown(grants: Grant[], currentPrices?: Record<string, number>) {
  let vestedShares = 0;
  let unvestedShares = 0;
  let vestedValue = 0;
  let unvestedValue = 0;

  grants.forEach((g) => {
    const priceToUse = currentPrices?.[g.symbol] || g.grantPrice;
    vestedShares += g.vestedShares;
    vestedValue += g.vestedShares * priceToUse;

    const remainingShares = g.shares - g.vestedShares;
    unvestedShares += remainingShares;
    unvestedValue += remainingShares * priceToUse;
  });

  return {
    vested: vestedShares,
    unvested: unvestedShares,
    vestedValue,
    unvestedValue
  };
}

export function calculateActualVestedShares(grant: Grant): number {
  const grantDate = new Date(grant.grantDate);
  const today = new Date();
  const monthsElapsed = (today.getFullYear() - grantDate.getFullYear()) * 12 +
    (today.getMonth() - grantDate.getMonth());

  const vestingInfo = parseVestingSchedule(grant.vestingSchedule);

  if (vestingInfo.type === "annual") {
    const yearsElapsed = Math.floor(monthsElapsed / 12);
    let sharesVested = 0;

    for (let i = 0; i < Math.min(yearsElapsed, vestingInfo.periods); i++) {
      sharesVested += Math.floor((grant.shares * vestingInfo.percentages[i]) / 100);
    }

    return Math.min(sharesVested, grant.shares);
  }

  return 0;
}