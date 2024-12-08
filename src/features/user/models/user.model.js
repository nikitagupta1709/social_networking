// Array to store all registered users
const users = [];
let id = 0; // Counter for assigning unique IDs to users

// UserSchema class to define the structure of a user
class UserSchema {
  constructor(name, email, password) {
    this.id = ++id; // Automatically incrementing ID for each new user
    this.name = name; // User's name
    this.email = email; // User's email
    this.password = password; // User's password
  }
}

// Function to register a new user
export const registerUser = (data) => {
  const { name, email, password } = data; // Extract user details from input data
  if (!name || !email || !password) {
    // Check if any required fields are missing
    return; // Return without creating a user if validation fails
  }
  const newUser = new UserSchema(name, email, password); // Create a new user object
  users.push(newUser); // Add the new user to the users array
  return newUser; // Return the newly created user
};

// Register some default users for testing
registerUser({ name: "Nikita", email: "niki@gmail.com", password: "1234" });
registerUser({ name: "Kukky", email: "kukky@test.com", password: "1234" });

// Function to log in a user
export const loginUser = (data) => {
  const { email, password } = data; // Extract login credentials from input data
  let userResult = null; // Variable to store the matching user, if found
  users.forEach((user) => {
    // Iterate through all users
    if (user.email === email && user.password === password) {
      // Check if email and password match
      userResult = user; // Assign the matching user to userResult
    }
  });
  return userResult; // Return the matching user or null if not found
};

// Function to retrieve all registered users
export const getAllUsers = () => {
  return users; // Return the array of all users
};
