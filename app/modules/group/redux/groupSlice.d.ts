type RoleType = "owner" | "guest";

interface IGroupState {
  id: string;
  name: string;

  users: {
    id: string;
    name: string;
    role: RoleType | string;
  }[];
}

//
//
//

interface IOpenGroup {
  id: string;
  name: string;

  users: {
    id: string;
    name: string;
    role: RoleType | string;
  }[];
}