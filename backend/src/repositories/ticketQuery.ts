export const ticketQueries = {
  getAll: `
    SELECT t.*, u.name as username 
    FROM ticket t
    JOIN user u ON t.id_user = u.id
  `,
  insert: `
    INSERT INTO ticket (title, description, level, id_status, id_user)
    VALUES (?, ?, ?, ?, ?)
    RETURNING *
  `,
} as const;