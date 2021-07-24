const getCustomDate = (dateTime) => {
    let date = new Date(new Date(dateTime).getTime());
    date.setHours(0, 0, 0, 0);
    return date;
}

export default getCustomDate