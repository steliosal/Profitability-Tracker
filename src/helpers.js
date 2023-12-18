export function getFirstDayOfWeek(date) {
  const dayOfWeek = date.getDay(); // Get the day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Calculate the difference for Monday

  const firstDay = new Date(date);
  firstDay.setDate(diff); // Set the date to the first day of the week (Monday)

  return firstDay;
}

export function getLastDayOfWeek(date) {
  const dayOfWeek = date.getDay(); // Get the day of the week (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
  const diff = 7 - dayOfWeek; // Calculate the difference to Sunday

  const lastDay = new Date(date);
  lastDay.setDate(date.getDate() + diff); // Set the date to the last day of the week (Sunday)

  return lastDay;
}

export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (months are zero-based) and pad with leading zero if needed
  const year = date.getFullYear(); // Get full year

  return `${day}/${month}/${year}`;
}

export function addDaysToDate(date, offset) {
  const modifiedDate = new Date(date);
  modifiedDate.setDate(date.getDate() + offset);
  return modifiedDate;
}

export function isWithinWeek(date, weekStart) {
  const firstDayOfWeek = getFirstDayOfWeek(weekStart);
  const lastDayOfWeek = getLastDayOfWeek(firstDayOfWeek);
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
}


const ClickOutsideDirective = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};


export { ClickOutsideDirective };