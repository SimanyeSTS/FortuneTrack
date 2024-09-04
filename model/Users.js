import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/UserAuth.js";
import bcrypt from 'bcryptjs';

class Users {
  async fetchUsers() {
    try {
      const strQry = `
        SELECT UserID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile, createdAt, updatedAt
        FROM Users;
      `
      const [results] = await db.execute(strQry)
      return results
    } catch (err) {
      throw err
    }
  }

  async fetchUser(UserID) {
    try {
      const strQry = `
        SELECT UserID, firstName, lastName, userAge, gender, emailAdd, userPass, userProfile, createdAt, updatedAt
        FROM Users
        WHERE UserID = ?;
      `
      const [result] = await db.execute(strQry, [UserID])
      return result[0]
    } catch (err) {
      throw err
    }
  }

  async registerUser(data) {
    try {
      if (!data.userPass) {
        throw { status: 400, msg: "Password is required" }
      }
      
      const hashedPassword = await bcrypt.hash(data.userPass.toString(), 10)
      data.userPass = hashedPassword
      
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      
      const strQry = `
        INSERT INTO Users (${columns})
        VALUES (${placeholders});
      `
      
      const values = Object.values(data);
      
      const [results] = await db.execute(strQry, values)
      const token = createToken({ emailAdd: data.emailAdd })
      return { token }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw { status: 409, msg: "Email is already registered. Please log in or choose a different email." }
      }
      throw err
    }
  }

  async updateUser(UserID, data) {
    try {
      if (data.userPass) {
        data.userPass = await bcrypt.hash(data.userPass, 10)
      }
      
      const columns = Object.keys(data).map((column) => `${column} = ?`).join(', ');
      
      const strQry = `
        UPDATE Users
        SET ${columns}
        WHERE UserID = ?;
      `
      
      const values = [...Object.values(data), UserID];
      
      const [result] = await db.execute(strQry, values)
      return result
    } catch (err) {
      throw err
    }
  }

  async deleteUser(UserID) {
    try {
      const strQry = `
        DELETE FROM Users
        WHERE UserID = ?;
      `
      const [result] = await db.execute(strQry, [UserID])
      return result.affectedRows > 0
    } catch (err) {
      throw err
    }
  }

  async loginUser(data) {
    try {
      const { emailAdd, userPass } = data
      const strQry = `
      SELECT UserID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile, createdAt, updatedAt
      FROM Users
      WHERE emailAdd = ?;
      `
      const [result] = await db.execute(strQry, [emailAdd])
      
      if (!result.length) {
        throw { status: 401, msg: "Invalid email or password." }
      }
      
      const ValidPass = await bcrypt.compare(userPass, result[0].userPass)
      if (!ValidPass) {
        throw { status: 401, msg: "Invalid email or password." }
      }
      
      const token = createToken({
        emailAdd: result[0].emailAdd,
        userPass: result[0].userPass
      })
      
      return {
        token,
        user: {
          UserID: result[0].UserID,
          firstName: result[0].firstName,
          lastName: result[0].lastName,
          userRole: result[0].userRole,
          emailAdd: result[0].emailAdd
        }
      }
    } catch (err) {
      throw err
    }
  }
}
export { 
    Users } 