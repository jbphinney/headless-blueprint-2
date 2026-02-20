import { getFormattedDate } from './formatDateLogic';

export default function FormatDate({ date }) {
  const formattedDate = getFormattedDate(date);

  if (!formattedDate) {
    return null;
  }

  return <>{formattedDate}</>;
}
