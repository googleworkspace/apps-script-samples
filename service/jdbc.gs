// [START apps_script_jdbc_create]
// Replace the variables in this block with real values.
// You can find the "Instance connection name" in the Google Cloud
//   Platform Console, on the instance Overview page.
var connectionName = 'Instance_connection_name';
var rootPwd = 'root_password';
var user = 'user_name';
var userPwd = 'user_password';
var db = 'database_name';

var root = 'root';
var instanceUrl = 'jdbc:google:mysql://' + connectionName;
var dbUrl = instanceUrl + '/' + db;

/**
 * Create a new database within a Cloud SQL instance.
 */
function createDatabase() {
  var conn = Jdbc.getCloudSqlConnection(instanceUrl, root, rootPwd);
  conn.createStatement().execute('CREATE DATABASE ' + db);
}

/**
 * Create a new user for your database with full privileges.
 */
function createUser() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, root, rootPwd);

  var stmt = conn.prepareStatement('CREATE USER ? IDENTIFIED BY ?');
  stmt.setString(1, user);
  stmt.setString(2, userPwd);
  stmt.execute();

  conn.createStatement().execute('GRANT ALL ON `%`.* TO ' + user);
}

/**
 * Create a new table in the database.
 */
function createTable() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);
  conn.createStatement().execute('CREATE TABLE entries '
      + '(guestName VARCHAR(255), content VARCHAR(255), '
      + 'entryID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(entryID));');
}
// [END apps_script_jdbc_create]

// [START apps_script_jdbc_write]
// Replace the variables in this block with real values.
// You can find the "Instance connection name" in the Google Cloud
//   Platform Console, on the instance Overview page.
var connectionName = 'Instance_connection_name';
var user = 'user_name';
var userPwd = 'user_password';
var db = 'database_name';

var dbUrl = 'jdbc:google:mysql://' + connectionName + '/' + db;

/**
 * Write one row of data to a table.
 */
function writeOneRecord() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);

  var stmt = conn.prepareStatement('INSERT INTO entries '
      + '(guestName, content) values (?, ?)');
  stmt.setString(1, 'First Guest');
  stmt.setString(2, 'Hello, world');
  stmt.execute();
}

/**
 * Write 500 rows of data to a table in a single batch.
 */
function writeManyRecords() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);
  conn.setAutoCommit(false);

  var start = new Date();
  var stmt = conn.prepareStatement('INSERT INTO entries '
      + '(guestName, content) values (?, ?)');
  for (var i = 0; i < 500; i++) {
    stmt.setString(1, 'Name ' + i);
    stmt.setString(2, 'Hello, world ' + i);
    stmt.addBatch();
  }

  var batch = stmt.executeBatch();
  conn.commit();
  conn.close();

  var end = new Date();
  Logger.log('Time elapsed: %sms for %s rows.', end - start, batch.length);
}
// [END apps_script_jdbc_write]

// [START apps_script_jdbc_read]
/**
 * Replace the variables in this block with real values.
 * You can find the "Instance connection name" in the Google Cloud
 * Platform Console, on the instance Overview page.
 */
var connectionName = 'Instance_connection_name';
var user = 'user_name';
var userPwd = 'user_password';
var db = 'database_name';

var dbUrl = 'jdbc:google:mysql://' + connectionName + '/' + db;

/**
 * Read up to 1000 rows of data from the table and log them.
 */
function readFromTable() {
  var conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);

  var start = new Date();
  var stmt = conn.createStatement();
  stmt.setMaxRows(1000);
  var results = stmt.executeQuery('SELECT * FROM entries');
  var numCols = results.getMetaData().getColumnCount();

  while (results.next()) {
    var rowString = '';
    for (var col = 0; col < numCols; col++) {
      rowString += results.getString(col + 1) + '\t';
    }
    Logger.log(rowString);
  }

  results.close();
  stmt.close();

  var end = new Date();
  Logger.log('Time elapsed: %sms', end - start);
}
// [END apps_script_jdbc_read]
