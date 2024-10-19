export const formatRupiah = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export const trimUsername = (username, strLength) => {
  // Trim max 10 char from username
  if (username?.length > strLength) {
    return username.substring(0, strLength) + "...";
  } else {
    return username;
  }
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
};
