import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Deve criar uma conta válida", async () => {
  const inputSignup = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    inputSignup
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(
    `http://localhost:3000/accounts/${outputSignup.accountId}`
  );
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(inputSignup.name);
  expect(outputGetAccount.email).toBe(inputSignup.email);
  expect(outputGetAccount.document).toBe(inputSignup.document);
});

test("Não deve criar uma conta com nome inválido", async () => {
  const inputSignup = {
    name: "John",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE123",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    inputSignup
  );
  const outputSignup = responseSignup.data;
  expect(responseSignup.status).toBe(422);
  expect(outputSignup.error).toBe("Invalid name");
});

test("Não deve criar uma conta com email inválido", async () => {
  const inputSignup = {
    name: "John Doe",
    email: "john.doe",
    document: "97456321558",
    password: "asdQWE123",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    inputSignup
  );
  const outputSignup = responseSignup.data;
  expect(responseSignup.status).toBe(422);
  expect(outputSignup.error).toBe("Invalid email");
});

test.each(["111", "abc", "7897897897"])(
  "Não deve criar uma conta com cpf inválido",
  async (document: string) => {
    const inputSignup = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      document,
      password: "asdQWE123",
    };
    const responseSignup = await axios.post(
      "http://localhost:3000/signup",
      inputSignup
    );
    const outputSignup = responseSignup.data;
    expect(responseSignup.status).toBe(422);
    expect(outputSignup.error).toBe("Invalid document");
  }
);

test("Não deve criar uma conta com senha inválida", async () => {
  const inputSignup = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    document: "97456321558",
    password: "asdQWE",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    inputSignup
  );
  const outputSignup = responseSignup.data;
  expect(responseSignup.status).toBe(422);
  expect(outputSignup.error).toBe("Invalid password");
});
