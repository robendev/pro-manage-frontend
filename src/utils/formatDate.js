export const formatDate = (dateString, timeZone = 'America/Argentina/Buenos_Aires') => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(dateString));
};