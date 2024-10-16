import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database";

const RadioButton = ({ value, selectedValue, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
    <View style={styles.radioCircle}>
      {selectedValue === value && <View style={styles.selectedRb} />}
    </View>
    <Text>{value}</Text>
  </TouchableOpacity>
);

const Dashboard = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [localLevelGovernment, setLocalLevelGovernment] = useState("");
  const [ward, setWard] = useState("");
  const [censusUnitType, setCensusUnitType] = useState("");
  const [workloadNo, setWorkloadNo] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);
  const [persons, setPersons] = useState<Person[]>([]);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [householdMembers, setHouseholdMembers] = useState(1);
  const [personData, setPersonData] = useState(Array.from({ length: 2 }, () => ({
    givenName: "",
    surname: "",
    relationship: "",
    sex: "",
    dob: new Date(),
    age: 0,
    maritalStatus: "",
    citizenship: "PNG Citizen",
    nonPngCitizenship: "",
    above20: "",
    forgot: "",
    comments: "",
  })));

  const onChangeDob = (index: number, event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || personData[index].dob;
    setPersonData((prev) => {
      const updated = [...prev];
      updated[index].dob = currentDate;
      return updated;
    });
  };

  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
    };

    setupDatabase();
  }, []);

  const handleEdit = (person: Person) => {
    setEditingPersonId(person.id);
    setProvince(person.province);
    setDistrict(person.district);
    setLocalLevelGovernment(person.localLevelGovernment);
    setWard(person.ward);
    setCensusUnitType(person.censusUnitType);
    setWorkloadNo(person.workloadNo);
    setDate(new Date(person.date));
    setHouseholdMembers(person.householdMembers);
    setPersonData([{
      givenName: person.givenName,
      surname: person.surname,
      relationship: person.relationship,
      sex: person.sex,
      dob: new Date(person.dob),
      age: person.age ?? 0,
      maritalStatus: person.maritalStatus,
      citizenship: person.citizenship,
      nonPngCitizenship: person.nonPngCitizenship || "",
      above20: "",
      forgot: "",
      comments: ""
    }]);
  };

  const handleDelete = async (id: number) => {
    await deletePerson(id);
    fetchPersons();
  };

  const handleSubmit = async () => {
    if (
      !province ||
      !district ||
      !localLevelGovernment ||
      !ward ||
      !censusUnitType ||
      !workloadNo ||
      householdMembers < 1 ||
      !personData[0].givenName ||
      !personData[0].surname ||
      !personData[0].relationship ||
      !personData[0].sex ||
      !personData[0].dob ||
      personData[0].age <= 0 ||
      !personData[0].maritalStatus
    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      for (const person of personData) {
        if (editingPersonId) {
          await updatePerson(
            editingPersonId,
            province,
            district,
            localLevelGovernment,
            ward,
            censusUnitType,
            workloadNo,
            date.toISOString(),
            householdMembers,
            person.givenName,
            person.surname,
            person.relationship,
            person.sex,
            person.dob.toISOString(),
            person.age,
            person.maritalStatus,
            person.citizenship,
            person.nonPngCitizenship,
            person.above20,
            person.forgot,
            person.comments
          );
        } else {
          const id = await addPerson(
            province,
            district,
            localLevelGovernment,
            ward,
            censusUnitType,
            workloadNo,
            date.toISOString(),
            householdMembers,
            person.givenName,
            person.surname,
            person.relationship,
            person.sex,
            person.dob.toISOString(),
            person.age,
            person.maritalStatus,
            person.citizenship,
            person.nonPngCitizenship,
            person.above20,
            person.forgot,
            person.comments
          );
          console.log("Entry created successfully with ID:", id);
        }
      }
      resetForm();
      fetchPersons();
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  const resetForm = () => {
    setProvince("");
    setDistrict("");
    setLocalLevelGovernment("");
    setWard("");
    setCensusUnitType("");
    setWorkloadNo("");
    setDate(new Date());
    setHouseholdMembers(1);
    setPersonData(Array.from({ length: 2 }, () => ({
      givenName: "",
      surname: "",
      relationship: "",
      sex: "",
      dob: new Date(),
      age: 0,
      maritalStatus: "",
      citizenship: "PNG Citizen",
      nonPngCitizenship: "",
      above20: "",
      forgot: "",
      comments: "",
    })));
    setEditingPersonId(null);
  };

  const renderForm = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.subheader}>Indicative Information</Text>
      <Text style={styles.subheaders}>Provincial Information:</Text>

      <Text style={styles.fieldtext}>Province:</Text>
      <TextInput
        style={styles.input}
        placeholder="Province"
        value={province}
        onChangeText={setProvince}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>District:</Text>
      <TextInput
        style={styles.input}
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Local Level Government:</Text>
      <TextInput
        style={styles.input}
        placeholder="Local Level Government"
        value={localLevelGovernment}
        onChangeText={setLocalLevelGovernment}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Ward:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ward"
        value={ward}
        onChangeText={setWard}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Census Unit Type:</Text>
      <TextInput
        style={styles.input}
        placeholder="Census Unit Type"
        value={censusUnitType}
        onChangeText={setCensusUnitType}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Workload Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Workload Number"
        value={workloadNo}
        onChangeText={setWorkloadNo}
        placeholderTextColor="#888"
      />

      <Text style={styles.fieldtext}>Date:</Text>
      <Button title="Show Date Picker" onPress={() => setShowDatePicker(0)} />
      {showDatePicker !== null && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(null);
            setDate(selectedDate || date);
          }}
        />
      )}

      <Text style={styles.subheaders}>Household Members:</Text>
      {Array.from({ length: householdMembers }).map((_, index) => (
        <View key={index} style={styles.memberContainer}>
          <Text style={styles.fieldtext}>Member {index + 1}:</Text>
          <TextInput
            style={styles.input}
            placeholder="Given Name"
            value={personData[index]?.givenName}
            onChangeText={(text) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], givenName: text };
              setPersonData(updatedPersons);
            }}
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={personData[index]?.surname}
            onChangeText={(text) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], surname: text };
              setPersonData(updatedPersons);
            }}
            placeholderTextColor="#888"
          />
          <Text style={styles.fieldtext}>Relationship:</Text>
          <Picker
            selectedValue={personData[index]?.relationship}
            onValueChange={(itemValue) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], relationship: itemValue };
              setPersonData(updatedPersons);
            }} >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Head of Household" value="Head of Household" />
            <Picker.Item label="Husband/Wife" value="Husband/Wife" />
            <Picker.Item label="Own Son" value="Own Son" />
            <Picker.Item label="Own Daughter" value="Own Daughter" />
            <Picker.Item label="Son/Daughter in-law" value="Son/Daughter in-law" />
            <Picker.Item label="Adopted/Step child" value="Adopted/Step child" />
            <Picker.Item label="Father/Mother" value="Father/Mother" />
            <Picker.Item label="Brother/Sister" value="Brother/Sister" />
            <Picker.Item label="Grand/Great-grand child" value="Grand/Great-grand child" />
            <Picker.Item label="Father/Mom in-law" value="Father/Mom in-law" />
            <Picker.Item label="Brother/Sister in-law" value="Brother/Sister in-law" />
            <Picker.Item label="Other relative" value="Other relative" />
            <Picker.Item label="Non-relative" value="Non-relative" />
          </Picker>
          <Text style={styles.fieldtext}>Sex:</Text>
          <Picker
            selectedValue={personData[index]?.sex}
            onValueChange={(itemValue) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], sex: itemValue };
              setPersonData(updatedPersons);
            }} >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <Text style={styles.fieldtext}>Date of Birth:</Text>
          <Button title="Select DOB" onPress={() => setShowDatePicker(index + 1)} />
          {showDatePicker === index + 1 && (
            <DateTimePicker
              value={personData[index]?.dob || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => onChangeDob(index, event, selectedDate)}
            />
          )}
          <Text style={styles.fieldtext}>Age:</Text>
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={String(personData[index]?.age)}
            onChangeText={(text) => {
              const ageValue = parseInt(text, 10);
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], age: isNaN(ageValue) ? 0 : ageValue };
              setPersonData(updatedPersons);
            }}
            placeholderTextColor="#888"
          />
          <Text style={styles.fieldtext}>Marital Status:</Text>
          <Picker
            selectedValue={personData[index]?.maritalStatus}
            onValueChange={(itemValue) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], maritalStatus: itemValue };
              setPersonData(updatedPersons);
            }} >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Never married" value="Never married" />
            <Picker.Item label="Married/living together" value="Married/living together" />
            <Picker.Item label="Separated" value="Separated" />
            <Picker.Item label="Divorced" value="Divorced" />
            <Picker.Item label="Widowed" value="Widowed" />
          </Picker>
          <Text style={styles.fieldtext}>Citizenship:</Text>
          <Picker
            selectedValue={personData[index]?.citizenship}
            onValueChange={(itemValue) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], citizenship: itemValue };
              setPersonData(updatedPersons);
            }} >
            <Picker.Item label="PNG Citizen" value="PNG Citizen" />
            <Picker.Item label="Non-PNG Citizen" value="Non-PNG Citizen" />
          </Picker>
          {personData[index]?.citizenship === "Non-PNG Citizen" && (
            <TextInput
              style={styles.input}
              placeholder="Specify Non-PNG Citizenship"
              value={personData[index]?.nonPngCitizenship}
              onChangeText={(text) => {
                const updatedPersons = [...personData];
                updatedPersons[index] = { ...updatedPersons[index], nonPngCitizenship: text };
                setPersonData(updatedPersons);
              }}
              placeholderTextColor="#888"
            />
          )}
          <Text style={styles.fieldtext}>Planning to move out of the country:</Text>
          <Picker
            selectedValue={personData[index]?.above20}
            onValueChange={(itemValue) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], above20: itemValue };
              setPersonData(updatedPersons);
            }} >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
          <Text style={styles.fieldtext}>Forgot any Household members:</Text>
          <TextInput
            style={styles.input}
            placeholder="Forgot"
            value={personData[index]?.forgot}
            onChangeText={(text) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], forgot: text };
              setPersonData(updatedPersons);
            }}
            placeholderTextColor="#888"
          />
          <Text style={styles.fieldtext}>Additional comments:</Text>
          <TextInput
            style={styles.input}
            placeholder="Comments"
            value={personData[index]?.comments}
            onChangeText={(text) => {
              const updatedPersons = [...personData];
              updatedPersons[index] = { ...updatedPersons[index], comments: text };
              setPersonData(updatedPersons);
            }}
            placeholderTextColor="#888"
          />
        </View>
      ))}
      <Button title="Add Member" onPress={() => setHouseholdMembers(householdMembers + 1)} />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {renderForm()}
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.personContainer}>
            <Text>{item.givenName} {item.surname}</Text>
            <Text>{item.relationship}</Text>
            <Text>{item.sex}</Text>
            <Text>{item.dob}</Text>
            <Text>{item.age}</Text>
            <Text>{item.maritalStatus}</Text>
            <Text>{item.citizenship}</Text>
            <Text>{item.nonPngCitizenship}</Text>
            <Text>{item.above20}</Text>
            <Text>{item.forgot}</Text>
            <Text>{item.comments}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  formContainer: {
    marginBottom: 20,
  },
  memberContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  fieldtext: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  personContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  subheader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  subheaders: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textDecorationLine: "underline"
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});

export default Dashboard;
