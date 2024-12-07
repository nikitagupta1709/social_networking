const users = [];
let id = 0;

class UserSchema {
  constructor(name, email, password) {
    this.id = ++id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export const registerUser = (data) => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    return;
  }
  const newUser = new UserSchema(name, email, password);
  users.push(newUser);

  return newUser;
};

registerUser({ name: "Nikita", email: "niki@gmail.com", password: "1234" });
registerUser({ name: "Kukky", email: "kukky@test.com", password: "1234" });

export const loginUser = (data) => {
  const { email, password } = data;
  let userResult = null;
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      userResult = user;
    }
  });
  return userResult;
};

export const getAllUsers = () => {
  return users;
};
