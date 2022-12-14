/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START people_get_connections]
/**
 * Gets a list of people in the user's contacts.
 * @see https://developers.google.com/people/api/rest/v1/people.connections/list
 */
function getConnections() {
  try {
    // Get the list of connections/contacts of user's profile
    const people = People.People.Connections.list('people/me', {
      personFields: 'names,emailAddresses'
    });
    // Print the connections/contacts
    console.log('Connections: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developers) - Handle exception here
    console.log('Failed to get the connection with an error %s', err.message);
  }
}
// [END people_get_connections]

// [START people_get_self_profile]
/**
 * Gets the own user's profile.
 * @see https://developers.google.com/people/api/rest/v1/people/getBatchGet
 */
function getSelf() {
  try {
    // Get own user's profile using People.getBatchGet() method
    const people = People.People.getBatchGet({
      resourceNames: ['people/me'],
      personFields: 'names,emailAddresses'
      // Use other query parameter here if needed
    });
    console.log('Myself: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developer) -Handle exception
    console.log('Failed to get own profile with an error %s', err.message);
  }
}
// [END people_get_self_profile]

// [START people_get_account]
/**
 * Gets the person information for any Google Account.
 * @param {string} accountId The account ID.
 * @see https://developers.google.com/people/api/rest/v1/people/get
 */
function getAccount(accountId) {
  try {
    // Get the Account details using account ID.
    const people = People.People.get('people/' + accountId, {
      personFields: 'names,emailAddresses'
    });
    // Print the profile details of Account.
    console.log('Public Profile: %s', JSON.stringify(people, null, 2));
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed to get account with an error %s', err.message);
  }
}
// [END people_get_account]

// [START people_get_group]

/**
 * Gets a contact group with the given name
 * @param {string} name The group name.
 * @see https://developers.google.com/people/api/rest/v1/contactGroups/list
 */
function getContactGroup(name) {
  try {
    const people = People.ContactGroups.list();
    // Finds the contact group for the person where the name matches.
    const group = people['contactGroups'].find((group) => group['name'] === name);
    // Prints the contact group
    console.log('Group: %s', JSON.stringify(group, null, 2));
  } catch (err) {
    // TODO (developers) - Handle exception
    console.log('Failed to get the contact group with an error %s', err.message);
  }
}

// [END people_get_group]

// [START people_get_contact_by_email]

/**
 * Gets a contact by the email address.
 * @param {string} email The email address.
 * @see https://developers.google.com/people/api/rest/v1/people.connections/list
 */
function getContactByEmail(email) {
  try {
    // Gets the person with that email address by iterating over all contacts.
    const people = People.People.Connections.list('people/me', {
      personFields: 'names,emailAddresses'
    });
    const contact = people['connections'].find((connection) => {
      return connection['emailAddresses'].some((emailAddress) => emailAddress['value'] === email);
    });
    // Prints the contact.
    console.log('Contact: %s', JSON.stringify(contact, null, 2));
  } catch (err) {
    // TODO (developers) - Handle exception
    console.log('Failed to get the connection with an error %s', err.message);
  }
}

// [END people_get_contact_by_email]

// [START people_get_full_name]
/**
 * Gets the full name (given name and last name) of the contact as a string.
 * @see https://developers.google.com/people/api/rest/v1/people/get
 */
function getFullName() {
  try {
    // Gets the person by specifying resource name/account ID
    // in the first parameter of People.People.get.
    // This example gets the person for the user running the script.
    const people = People.People.get('people/me', {personFields: 'names'});
    // Prints the full name (given name + family name)
    console.log(`${people['names'][0]['givenName']} ${people['names'][0]['familyName']}`);
  } catch (err) {
    // TODO (developers) - Handle exception
    console.log('Failed to get the connection with an error %s', err.message);
  }
}

// [END people_get_full_name]

// [START people_get_phone_numbers]
/**
 * Gets all the phone numbers for this contact.
 * @see https://developers.google.com/people/api/rest/v1/people/get
 */
function getPhoneNumbers() {
  try {
    // Gets the person by specifying resource name/account ID
    // in the first parameter of People.People.get.
    // This example gets the person for the user running the script.
    const people = People.People.get('people/me', {personFields: 'phoneNumbers'});
    // Prints the phone numbers.
    console.log(people['phoneNumbers']);
  } catch (err) {
    // TODO (developers) - Handle exception
    console.log('Failed to get the connection with an error %s', err.message);
  }
}

// [END people_get_phone_numbers]

// [START people_get_single_phone_number]
/**
 * Gets a phone number by type, such as work or home.
 * @see https://developers.google.com/people/api/rest/v1/people/get
 */
function getPhone() {
  try {
    // Gets the person by specifying resource name/account ID
    // in the first parameter of People.People.get.
    // This example gets the person for the user running the script.
    const people = People.People.get('people/me', {personFields: 'phoneNumbers'});
    // Gets phone number by type, such as home or work.
    const phoneNumber = people['phoneNumbers'].find((phone) => phone['type'] === 'home')['value'];
    // Prints the phone numbers.
    console.log(phoneNumber);
  } catch (err) {
    // TODO (developers) - Handle exception
    console.log('Failed to get the connection with an error %s', err.message);
  }
}

// [END people_get_single_phone_number]
