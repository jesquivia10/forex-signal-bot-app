import { format, formatDistance, formatRelative } from 'date-fns';

export const formatPrice = (price: number, decimals: number = 5): string => {
  return price.toFixed(decimals);
};

export const formatPips = (pips: number): string => {
  const sign = pips >= 0 ? '+' : '';
  return `${sign}${pips.toFixed(1)} pips`;
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDateTime = (date: Date): string => {
  return format(date, 'MMM dd, yyyy HH:mm');
};

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm:ss');
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy');
};

export const formatRelativeTime = (date: Date): string => {
  return formatDistance(date, new Date(), { addSuffix: true });
};

export const formatRelativeDate = (date: Date): string => {
  return formatRelative(date, new Date());
};

export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};
