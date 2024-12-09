import connection from './db/db_config.js';

export const insertData = (data, callback) => {
    const query = 'INSERT INTO numbers (number) VALUES (?)';
    connection.query(query, [data], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

export const fetchAllData = (callback) => {
    const query = 'SELECT * FROM numbers';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};
