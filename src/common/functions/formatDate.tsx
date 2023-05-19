export const formatDate = (date: string, time = true) => {
  try {
    return new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "short",
      timeStyle: time ? "short" : undefined,
    }).format(new Date(date));
  } catch (error) {
    return "";
  }
};
