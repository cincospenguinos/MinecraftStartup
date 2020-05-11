const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const name = (input) => {
  if (!input) {
    return ['Name cannot be empty'];
  }

  return [];
};

const email = (input) => {
  const errors = [];

  if (!input) {
    errors.push('Email address cannot be empty');
  }

  if (!EMAIL_REGEX.test(input)) {
    errors.push('Email address must follow correct format');
  }

  return errors;
};

const password = (input) => {
  const errors = [];

  if (!input) {
    errors.push('Passwords cannot be empty');
  }

  if (input.length < 8) {
    errors.push('Passwords must be at least 8 characters long');
  }

  return errors;
}

export default {
  name,
  email,
  password,
};