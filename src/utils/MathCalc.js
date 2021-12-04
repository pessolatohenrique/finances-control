calculateValueByPercentage = (value, percentage) => {
  return value * (percentage / 100);
};

calculatePercentage = (value, total) => {
  const percentage = (value * 100) / total;
  return Number(percentage.toFixed(2));
};

module.exports = { calculateValueByPercentage, calculatePercentage };
