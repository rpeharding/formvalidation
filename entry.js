const schema = {
  name: Joi.string().min(3),
  email: Joi.string().email(),
  dateOfBirth: Joi.date().max("1-1-2005").required(),
  phone: Joi.number(),
  password: Joi.string().min(8).required(),
};

const formRef = document.getElementById("infoForm");

const userInput = {};

formRef.addEventListener("input", (e) => {
  userInput[e.target.name] = e.target.value;

  Joi.validate(userInput, schema, { abortEarly: false }, (errors) => {
    const errorsDom = {};

    if (errors) {
      errors.details.forEach((err) => {
        errorsDom[err.context.key] = err.message;
      });
    }
    const errorRefs = document.querySelectorAll(".error");
    Array.from(errorRefs).forEach((err) => {
      err.innerHTML = "";
    });

    for (const err in errorsDom) {
      document.getElementById(`${err}Error`).innerHTML = errorsDom[err];
    }
  });
});
