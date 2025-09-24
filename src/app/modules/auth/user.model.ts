type User = { username: string; password: string };
export const users: User[] = [];

export function addUser(user: User) {
  users.push(user);
}

export function findUserByUsername(username: string) {
  return users.find((u) => u.username === username);
}
