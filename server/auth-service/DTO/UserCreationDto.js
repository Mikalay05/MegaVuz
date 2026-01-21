class UserCreationDto {
  constructor({ login, password, role }) {
    this.login = login;
    this.password = password;
    this.role = role;
  }
}

module.exports = UserCreationDto;
