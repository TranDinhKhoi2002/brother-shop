export function isValidPromotion(totalProductsPrice, promotion) {
  const isValid =
    totalProductsPrice >= promotion.minPrice &&
    promotion.amount > 0 &&
    new Date().getTime() <= new Date(promotion.endDate).getTime();
  return isValid;
}

export function getPromotionsByPercentage(promotions, percentage, greaterThan = false) {
  let filteredPromotions = [];
  if (greaterThan) {
    filteredPromotions = promotions.filter((promotion) => promotion.percentage > percentage);
  } else {
    filteredPromotions = promotions.filter((promotion) => promotion.percentage <= percentage);
  }

  return filteredPromotions;
}
