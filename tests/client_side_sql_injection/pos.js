const id = location.hash.slice(1);
db.transaction((tx) => tx.executeSql("SELECT * FROM notes WHERE id = " + id));
