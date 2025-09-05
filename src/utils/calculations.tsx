export function calculatePortfolioValue(grants: any[], prices: Record<string, number>): number {
  console.log("grants", grants);
  console.log("prices", prices);
  
  if (!grants || grants.length === 0) {
    return 0;
  }
  
  const total = grants.reduce((sum, grant) => {
    const price = prices[grant.symbol] || grant.grantPrice || 0;
    const value = grant.shares * price;
    return sum + value;
  }, 0);
  
  console.log("tota value", total);
  return total;
}

export function calculateTotalGainLoss(grants: any[], prices: Record<string, number>) {
  
  if (!grants || grants.length === 0) {
    return {
      grantValue: 0,
      currentValue: 0,
      gainLoss: 0,
      gainLossPercent: 0
    };
  }
  
  let grantValue = 0;
  let currentValue = 0;
  
  grants.forEach(grant => {
    const originalValue = grant.shares * grant.grantPrice;
    const currentPrice = prices[grant.symbol] || grant.grantPrice || 0;
    const currentVal = grant.shares * currentPrice;
    
    grantValue += originalValue;
    currentValue += currentVal;
    
  });
  
  const gainLoss = currentValue - grantValue;
  const gainLossPercent = grantValue > 0 ? (gainLoss / grantValue) * 100 : 0;
  
  
  return {
    grantValue,
    currentValue,
    gainLoss,
    gainLossPercent
  };
}

export function calculateCompanyBreakdown(grants: any[], prices: Record<string, number>): Record<string, number> {
  
  if (!grants || grants.length === 0) {
    return {};
  }
  
  const breakdown: Record<string, number> = {};
  
  grants.forEach(grant => {
    const price = prices[grant.symbol] || grant.grantPrice || 0;
    const value = grant.shares * price;
    
    if (breakdown[grant.company]) {
      breakdown[grant.company] += value;
    } else {
      breakdown[grant.company] = value;
    }
    
    console.log(`${grant.company} (${grant.symbol}): +$${value} = $${breakdown[grant.company]} total`);
  });
  
  return breakdown;
}


export const calculateMetrics = (grants: any[], currentPrices: Record<string, number>) => {
    console.log('grant', grants);
    console.log('currentPrices', currentPrices);
    
    let totalGrantValue = 0;
    let totalCurrentValue = 0;
    let totalVestedValue = 0;
    let totalUnvestedShares = 0;

    grants.forEach(grant => {
      const grantValue = grant.shares * grant.grantPrice;
      const currentPrice = currentPrices[grant.symbol] || grant.grantPrice;
      const currentValue = grant.shares * currentPrice;
      const vestedValue = grant.vestedShares * currentPrice;
      const unvestedShares = grant.shares - grant.vestedShares;

  

      totalGrantValue += grantValue;
      totalCurrentValue += currentValue;
      totalVestedValue += vestedValue;
      totalUnvestedShares += unvestedShares;
    });

    const totalGainLoss = totalCurrentValue - totalGrantValue;
    const totalGainLossPercentage = totalGrantValue > 0 ? (totalGainLoss / totalGrantValue) * 100 : 0;


    return {
      totalGrantValue,
      totalCurrentValue,
      totalVestedValue,
      totalUnvestedShares,
      totalGainLoss,
      totalGainLossPercentage,
    };
  };