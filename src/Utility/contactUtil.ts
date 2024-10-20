export const getContactFullName = (firstName: string, lastName = '') => {
  if (firstName && lastName) {
    return firstName + ' ' + lastName;
  } else if (firstName) {
    return firstName;
  } else {
    return '';
  }
};

export const isEmailValid = (email: string) => {
  return (
    !email ||
    email
      .toLocaleLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
  );
};

export const getInitials = (firstName?: string, lastName?: string) => {
  const firstInitialExists = firstName && firstName[0];
  const lastInitialExists = lastName && lastName[0];
  return firstInitialExists && lastInitialExists
    ? firstName[0]?.toLocaleUpperCase() + lastName[0].toLocaleUpperCase()
    : firstInitialExists
      ? firstName[0].toLocaleUpperCase()
      : lastInitialExists
        ? lastName[0].toLocaleUpperCase()
        : '';
};

export const maskPhoneNumber = (raw: string) => {
  let result = '';
  let dashFound = false;
  for (let i = 0; i < raw?.length; i++) {
    if (i < 3) {
      result += raw[i];
    } else {
      if (raw[i] === '-') {
        dashFound = true;
        result += raw[i];
      } else {
        if (i === 3 || (i === 6 && !dashFound) || (i === 7 && dashFound)) {
          result += '-' + raw[i];
        } else {
          result += raw[i];
        }
      }
    }
  }
  return result;
};
