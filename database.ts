import * as SQLite from 'expo-sqlite'; 

const db = SQLite.openDatabaseSync('census'); // Using openDatabase

export interface Person {
  above20?: string; // Made optional to match your usage
  forgot?: string; // Made optional to match your usage
  comments?: string; // Made optional to match your usage
  id: number;
  province: string;
  district: string;
  localLevelGovernment: string;
  ward: string;
  censusUnitType: string;
  workloadNo: string;
  date: string; // Date of census
  householdMembers: number; // Number of household members
  givenName: string; // Given name
  surname: string; // Surname
  relationship: string; // Relationship
  sex: string; // Sex
  dob: string; // Date of birth
  age: number; // Age
  maritalStatus: string; // Marital status
  citizenship: string; // Citizenship
  nonPngCitizenship?: string; // Optional field for non-PNG citizenship
}

export const initializeDB = async () => {
  // Drop the table if it exists (for development purposes)
  await db.execAsync(`DROP TABLE IF EXISTS person;`);
  
  await db.execAsync(` 
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      localLevelGovernment TEXT NOT NULL,
      ward TEXT NOT NULL,
      censusUnitType TEXT NOT NULL,
      workloadNo TEXT NOT NULL,
      date TEXT NOT NULL,
      householdMembers INTEGER NOT NULL,
      givenName TEXT NOT NULL,
      surname TEXT NOT NULL,
      relationship TEXT NOT NULL,
      sex TEXT NOT NULL,
      dob TEXT NOT NULL,
      age INTEGER NOT NULL,
      maritalStatus TEXT NOT NULL,
      citizenship TEXT NOT NULL,
      nonPngCitizenship TEXT
    );
  `);
};

export const addPerson = async (
  province: string, 
  district: string, 
  localLevelGovernment: string, 
  ward: string, 
  censusUnitType: string, 
  workloadNo: string, 
  date: string, 
  householdMembers: number, 
  givenName: string, 
  surname: string, 
  relationship: string, 
  sex: string, 
  dob: string, 
  age: number, 
  maritalStatus: string, 
  citizenship: string, 
  nonPngCitizenship?: string, 
  above20?: string, 
  forgot?: string, 
  comments?: string
) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO person (province, district, localLevelGovernment, ward, censusUnitType, workloadNo, date, householdMembers, givenName, surname, relationship, sex, dob, age, maritalStatus, citizenship, nonPngCitizenship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
      [
        province,
        district,
        localLevelGovernment,
        ward,
        censusUnitType,
        workloadNo,
        date,
        householdMembers,
        givenName,
        surname,
        relationship,
        sex,
        dob,
        age,
        maritalStatus,
        citizenship,
        nonPngCitizenship || null
      ]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding person:", error);
  }
};

export const updatePerson = async (
id: number, province: string, district: string, localLevelGovernment: string, ward: string, censusUnitType: string, workloadNo: string, date: string, householdMembers: number, givenName: string, surname: string, relationship: string, sex: string, dob: string, age: number, maritalStatus: string, citizenship: string, nonPngCitizenship?: string, above20?: string, forgot?: string, comments?: string) => {
  try {
    await db.runAsync(
      'UPDATE person SET province = ?, district = ?, localLevelGovernment = ?, ward = ?, censusUnitType = ?, workloadNo = ?, date = ?, householdMembers = ?, givenName = ?, surname = ?, relationship = ?, sex = ?, dob = ?, age = ?, maritalStatus = ?, citizenship = ?, nonPngCitizenship = ? WHERE id = ?',
      [
        province,
        district,
        localLevelGovernment,
        ward,
        censusUnitType,
        workloadNo,
        date,
        householdMembers,
        givenName,
        surname,
        relationship,
        sex,
        dob,
        age,
        maritalStatus,
        citizenship,
        nonPngCitizenship || null,
        id
      ]
    );
  } catch (error) {
    console.error("Error updating person:", error);
  }
};

export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting person:", error);
  }
};

export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error("Error getting persons:", error);
    return [];
  }
};

// Initialize the database (call this once when the app starts)
initializeDB();
