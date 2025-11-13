/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** 
 * This file contains functions to access headings and data for sample files.
 * 
 * Sample data is stored in the variable SAMPLE_DATA.
 */

// Fictitious sample data.
const SAMPLE_DATA = {
  "headings": [
    "PropertyName",
    "LeaseID",
    "LeaseLocation",
    "OwnerName",
    "SquareFootage",
    "RenewDate",
    "LastAmount",
    "LastPaymentDate",
    "Revenue"
  ],
  "csvFiles": [
    {
      "name": "Sample One.CSV",
      "rows": [
        {
          "PropertyName": "The Modern Building",
          "LeaseID": "271312",
          "LeaseLocation": "Mountain View CA 94045",
          "OwnerName": "Yuri",
          "SquareFootage": "17500",
          "RenewDate": "12/15/2022",
          "LastAmount": "100000",
          "LastPaymentDate": "3/01/2022",
          "Revenue": "12000"
        },
        {
          "PropertyName": "Garage @ 45",
          "LeaseID": "271320",
          "LeaseLocation": "Mountain View CA 94045",
          "OwnerName": "Luka",
          "SquareFootage": "1000",
          "RenewDate": "6/2/2022",
          "LastAmount": "50000",
          "LastPaymentDate": "4/01/2022",
          "Revenue": "20000"
        },
        {
          "PropertyName": "Office Park Deluxe",
          "LeaseID": "271301",
          "LeaseLocation": "Mountain View CA 94045",
          "OwnerName": "Sasha",
          "SquareFootage": "5000",
          "RenewDate": "6/2/2022",
          "LastAmount": "25000",
          "LastPaymentDate": "4/01/2022",
          "Revenue": "1200"
        }
      ]
    },
    {
      "name": "Sample Two.CSV",
      "rows": [
        {
          "PropertyName": "Tours Jumelles Minuscules",
          "LeaseID": "271260",
          "LeaseLocation": "8 Rue du Nom Fictif 341 Paris",
          "OwnerName": "Lucian",
          "SquareFootage": "1000000",
          "RenewDate": "7/14/2022",
          "LastAmount": "1250000",
          "LastPaymentDate": "5/01/2022",
          "Revenue": "77777"
        },
        {
          "PropertyName": "Barraca da Praia",
          "LeaseID": "271281",
          "LeaseLocation": "Avenida da Pastelaria 1903 Lisbon 1229-076",
          "OwnerName": "Raha",
          "SquareFootage": "1000",
          "RenewDate": "6/2/2022",
          "LastAmount": "50000",
          "LastPaymentDate": "4/01/2022",
          "Revenue": "20000"
        }
      ]
    },
    {
      "name": "Sample Three.CSV",
      "rows": [
        {
          "PropertyName": "Round Building in the Square",
          "LeaseID": "371260",
          "LeaseLocation": "8 Rue du Nom Fictif 341 Paris",
          "OwnerName": "Charlie",
          "SquareFootage": "75000",
          "RenewDate": "8/1/2022",
          "LastAmount": "250000",
          "LastPaymentDate": "6/01/2022",
          "Revenue": "22222"
        },
        {
          "PropertyName": "Square Building in the Round",
          "LeaseID": "371281",
          "LeaseLocation": "Avenida da Pastelaria 1903 Lisbon 1229-076",
          "OwnerName": "Lee",
          "SquareFootage": "10000",
          "RenewDate": "6/2/2022",
          "LastAmount": "5000",
          "LastPaymentDate": "4/01/2022",
          "Revenue": "1800"
        }
      ]
    }
  ]
}


/**
 * Returns headings for use in destination spreadsheet and CSV files.
 * @return {string[][]} array of each column heading as string.
 */
function getHeadings() {
  let headings = [[]];
  for (let i in SAMPLE_DATA.headings)
    headings[0].push(SAMPLE_DATA.headings[i]);
  return (headings)
}

/**
 * Returns CSV file names and content to create sample CSV files.
 * @return {object[]} {"file": ["name","csv"]}
 */
function getCSVFilesData() {

  let files = [];

  // Gets headings once - same for all files/rows.
  let csvHeadings = "";
  for (let i in SAMPLE_DATA.headings)
    csvHeadings += (SAMPLE_DATA.headings[i] + ',');

  // Gets data for each file by rows.
  for (let i in SAMPLE_DATA.csvFiles) {
    let sampleCSV = "";
    sampleCSV += csvHeadings;
    let fileName = SAMPLE_DATA.csvFiles[i].name
    for (let j in SAMPLE_DATA.csvFiles[i].rows) {
      sampleCSV += '\n'
      for (let k in SAMPLE_DATA.csvFiles[i].rows[j]) {
        sampleCSV += SAMPLE_DATA.csvFiles[i].rows[j][k] + ','
      }
    }
    files.push({ name: fileName, csv: sampleCSV })
  }
  return (files)
}

/*
 * Checks data functions are working as necessary.
 */
function test_getHeadings() {
  let h = getHeadings()
  console.log(h);
  console.log(h[0].length);
}

function test_getCSVFilesData() {
  const csvFiles = getCSVFilesData();
  console.log(csvFiles)

  for (const file of csvFiles) {
    console.log(file.name)
    console.log(file.csv)
  }
}