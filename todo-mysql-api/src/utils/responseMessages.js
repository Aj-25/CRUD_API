exports.Success = {
  DEFAULT: { statusCode: 200, customMessage: 'Success', type: 'DEFAULT' },
  USER_REGISTERED: { statusCode: 201, customMessage: 'User registered successfully.', type: 'USER_REGISTERED' },
  USER_LOGGED_IN: { statusCode: 200, customMessage: 'User logged in successfully.', type: 'USER_LOGGED_IN' },
  USER_LOGGED_OUT: { statusCode: 200, customMessage: 'User logged out successfully.', type: 'USER_LOGGED_OUT' },
  TODO_CREATED: { statusCode: 201, customMessage: 'To-do item created successfully.', type: 'TODO_CREATED' },
  TODO_FETCHED: { statusCode: 200, customMessage: 'To-do items fetched successfully.', type: 'TODO_FETCHED' },
  TODO_UPDATED: { statusCode: 200, customMessage: 'To-do item updated successfully.', type: 'TODO_UPDATED' },
  TODO_DELETED: { statusCode: 200, customMessage: 'To-do item deleted successfully.', type: 'TODO_DELETED' }
};

exports.Error = {
  DEFAULT: { statusCode: 501, customMessage: 'Something went wrong.', type: 'DEFAULT' },
  INVALID_ACCESS_TOKEN: { statusCode: 400, customMessage: 'Invalid access token.', type: 'INVALID_ACCESS_TOKEN' },
  UNAUTHORIZED_ACCESS: { statusCode: 403, customMessage: 'You dont have access to perform this action.', type: 'UNAUTHORIZED_ACCESS' },
  USER_REGISTRATION_FAIL: { statusCode: 401, customMessage: 'User registration failed.', type: 'USER_REGISTRATION_FAIL' },
  USER_LOGIN_FAIL: { statusCode: 401, customMessage: 'Invalid email or password.', type: 'USER_LOGIN_FAIL' },
  TODO_CREATION_FAIL: { statusCode: 400, customMessage: 'Failed to create to-do item.', type: 'TODO_CREATION_FAIL' },
  TODO_NOT_FOUND: { statusCode: 404, customMessage: 'To-do item not found.', type: 'TODO_NOT_FOUND' },
  VALIDATION_ERROR: { statusCode: 422, customMessage: 'Validation failed. Please check your input.', type: 'VALIDATION_ERROR' }
};
