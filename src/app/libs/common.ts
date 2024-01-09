export const getDateFormat = (date: Date) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
  return formattedDate;
};