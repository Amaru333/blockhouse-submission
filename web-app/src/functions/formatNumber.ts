export function formatNumber(num: number): string {
  if (num < 10000) {
    return num.toLocaleString("en-US");
  }

  let shortened;
  let suffix;
  if (num < 1e6) {
    shortened = num / 1e3;
    shortened = shortened < 10 ? shortened.toFixed(2) : shortened.toFixed(1);
    suffix = "K";
  } else if (num < 1e9) {
    shortened = num / 1e6;
    shortened = shortened.toFixed(2);
    suffix = "M";
  } else if (num < 1e12) {
    shortened = num / 1e9;
    shortened = shortened.toFixed(2);
    suffix = "B";
  } else {
    shortened = num / 1e12;
    shortened = shortened.toFixed(2);
    suffix = "T";
  }
  shortened = parseFloat(shortened);
  return shortened + suffix;
}
