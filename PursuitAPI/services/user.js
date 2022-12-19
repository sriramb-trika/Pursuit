let validateFields = (fields, params, res) => {
  let requiredFieldsMessages = [];

  for (let key in fields) {
    if (fields[key] == true) {
      if (!params[key] || params[key].length <= 0) {
        requiredFieldsMessages.push(key + " is required.");
      }
    }
  }

  if (requiredFieldsMessages.length > 0) {
    if (res) {
      res.status(403).send({
        message: "Required filed is missing.",
        data: requiredFieldsMessages,
      });
    }

    return {
      success: false,
    };
  } else {
    return {
      success: true,
    };
  }
};

module.exports = {
  validateFields,
};
