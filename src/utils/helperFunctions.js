export const createDate = () => {
  let date = new Date()
  let options = {year: 'numeric', month: 'long', day: 'numeric'};
  return date.toLocaleDateString('en-US', options);
}

export const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  } else {
    return text;
  }
}

export const getDatesFromString = (str) => {
  const matches = str.match(/\d{1,2}\/\d{1,2}\/\d{4}/g);
  return matches ? matches.join(', ') : '';
}