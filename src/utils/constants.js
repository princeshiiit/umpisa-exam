export const ROLES = {
  ADMIN: { id: 1, name: 'admin' },
  USER: { id: 2, name: 'user' }
};

export const getRoleId = (roleName) => {
  const role = Object.values(ROLES).find(r => r.name === roleName.toLowerCase());
  return role ? role.id : ROLES.USER.id;
};

export const getRoleName = (roleId) => {
  const role = Object.values(ROLES).find(r => r.id === roleId);
  return role ? role.name : ROLES.USER.name;
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
};
