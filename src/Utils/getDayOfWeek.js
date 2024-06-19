export function getDayOfWeek(dateString) {
  const daysOfWeek = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

  const date = new Date(dateString);

  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
}


