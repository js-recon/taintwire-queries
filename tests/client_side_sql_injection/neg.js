db.transaction((tx) => tx.executeSql("SELECT * FROM notes WHERE id = ?", [1]));
