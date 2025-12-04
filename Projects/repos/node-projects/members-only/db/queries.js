const pool = require("./pool");

exports.getAllMessages = async () => {
  try {
    const result = await pool.query(`
      SELECT messages.id, messages.body, messages.created_at,
          users.first_name, users.last_name, users.membership_status
      FROM messages
      JOIN users ON messages.user_id = users.id;
    `);
    return result.rows;
  } catch (error) {
    console.error("Error Fetching messages: ", error);
    throw error;
  }
};

exports.insertUser = async (firstName, lastName, email, hashedPassword, isAdmin) => {
  try {
    const result = await pool.query(`
      INSERT INTO users (first_name, last_name, email, password_hash, membership_status, is_admin)
      VALUES ($1, $2, $3, $4, 'inactive', $5)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `, [firstName, lastName, email, hashedPassword, isAdmin]);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user into database:", error);
    throw error;
  }
};

exports.insertMemberStatus = async (userId) => {
  try {
    const result = await pool.query(`
      UPDATE users
      SET membership_status = 'active'
      WHERE id = $1
      RETURNING *;
    `, [userId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating membership status:", error);
    throw error;
  }
};

exports.insertMessage = async (userId, title, body) => {
  try {
    const result = await pool.query(
      `INSERT INTO messages (user_id, title, body)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [userId, title, body]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting message:", error);
    throw error;
  }
};

exports.deleteMessages = async (messageId) => {
  try {
    const result = await pool.query(
      `DELETE FROM messages WHERE id = $1;`,
      [messageId]
    );
    return result;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

