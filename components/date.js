import { parseISO, format } from 'date-fns'

const Date = ({ dateString }) => {
    return dateString;
//   const date = parseISO(dateString)
//   return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}

export default Date;