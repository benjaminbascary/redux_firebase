export const dateFormatter = (date: {seconds: number, nanoseconds: number}): string => {
    return new Date(date.seconds * 1000).toDateString();
}