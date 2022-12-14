/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Replace the variables in this block with real values.
 * You can find the "Instance connection name" in the Google Cloud
 * Platform Console, on the instance Overview page.
 */
const connectionName = 'Instance_connection_name';
const rootPwd = 'root_password';
const user = 'user_name';
const userPwd = 'user_password';
const db = 'database_name';

const root = 'root';
const instanceUrl = 'jdbc:google:mysql://' + connectionName;
const dbUrl = instanceUrl + '/' + db;

// [START apps_script_jdbc_create]
/**
 * Create a new database within a Cloud SQL instance.
 */
function createDatabase() {
  try {
    const conn = Jdbc.getCloudSqlConnection(instanceUrl, root, rootPwd);
    conn.createStatement().execute('CREATE DATABASE ' + db);
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}

/**
 * Create a new user for your database with full privileges.
 */
function createUser() {
  try {
    const conn = Jdbc.getCloudSqlConnection(dbUrl, root, rootPwd);

    const stmt = conn.prepareStatement('CREATE USER ? IDENTIFIED BY ?');
    stmt.setString(1, user);
    stmt.setString(2, userPwd);
    stmt.execute();

    conn.createStatement().execute('GRANT ALL ON `%`.* TO ' + user);
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}

/**
 * Create a new table in the database.
 */
function createTable() {
  try {
    const conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);
    conn.createStatement().execute('CREATE TABLE entries ' +
      '(guestName VARCHAR(255), content VARCHAR(255), ' +
      'entryID INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(entryID));');
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}
// [END apps_script_jdbc_create]

// [START apps_script_jdbc_write]
/**
 * Write one row of data to a table.
 */
function writeOneRecord() {
  try {
    const conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);

    const stmt = conn.prepareStatement('INSERT INTO entries ' +
      '(guestName, content) values (?, ?)');
    stmt.setString(1, 'First Guest');
    stmt.setString(2, 'Hello, world');
    stmt.execute();
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}

/**
 * Write 500 rows of data to a table in a single batch.
 */
function writeManyRecords() {
  try {
    const conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);
    conn.setAutoCommit(false);

    const start = new Date();
    const stmt = conn.prepareStatement('INSERT INTO entries ' +
      '(guestName, content) values (?, ?)');
    for (let i = 0; i < 500; i++) {
      stmt.setString(1, 'Name ' + i);
      stmt.setString(2, 'Hello, world ' + i);
      stmt.addBatch();
    }

    const batch = stmt.executeBatch();
    conn.commit();
    conn.close();

    const end = new Date();
    console.log('Time elapsed: %sms for %s rows.', end - start, batch.length);
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}
// [END apps_script_jdbc_write]

// [START apps_script_jdbc_read]
/**
 * Read up to 1000 rows of data from the table and log them.
 */
function readFromTable() {
  try {
    const conn = Jdbc.getCloudSqlConnection(dbUrl, user, userPwd);
    const start = new Date();
    const stmt = conn.createStatement();
    stmt.setMaxRows(1000);
    const results = stmt.executeQuery('SELECT * FROM entries');
    const numCols = results.getMetaData().getColumnCount();

    while (results.next()) {
      let rowString = '';
      for (let col = 0; col < numCols; col++) {
        rowString += results.getString(col + 1) + '\t';
      }
      console.log(rowString);
    }

    results.close();
    stmt.close();

    const end = new Date();
    console.log('Time elapsed: %sms', end - start);
  } catch (err) {
    // TODO(developer) - Handle exception from the API
    console.log('Failed with an error %s', err.message);
  }
}
// [END apps_script_jdbc_read]
