export const rolesCanBe = {
  adming: "admin",
  student: "student",
  instructor: "instructor",
  guestInstructor: "guestInstructor",
}
export type RoleType = keyof typeof rolesCanBe

export const statusCanBe = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}

export type StatusType = keyof typeof statusCanBe

export type UserType = {
  role: RoleType | "student"
  firstName: string
  lastName: string
  userName: string
  email: string
  userPassword: string | "password"
  mobileNumber: string
  statusId: StatusType | "ACTIVE"
}
