# 🎓 Student Enrollment System: JPDB Integration

## Table of Contents
1.  [Description](#description)
2.  [Scope of Functionalities](#scope-of-functionalities)
3.  [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
4.  [Examples of Use](#examples-of-use)
5.  [Project Status](#project-status)
6.  [Release History](#release-history)
7.  [Sources](#sources)

***

## 📝 Description

This project implements a single-page web application (SPA) for a **Student Enrollment Form**. It is designed to manage student data using **CRUD (Create, Read, Update)** operations.

The application uses **HTML**, **Bootstrap** (for styling), **jQuery**, and the **JsonPowerDB (JPDB)** NoSQL database to perform operations directly via its REST API.

### Database Details
* **Database Name:** `SCHOOL-DB`
* **Relation (Table) Name:** `STUDENT-TABLE`
* **Primary Key:** `Roll No`

***

## 🔭 Scope of Functionalities

The form dynamically changes its state (buttons enabled/disabled and fields unlocked/locked) based on a primary key lookup.

### Data Fields

| Field | Primary Key |
| :--- | :--- |
| **Roll No** | **Yes** |
| Full Name | No |
| Class | No |
| Birth Date | No |
| Address | No |
| Enrollment Date | No |

### Control Logic
* **Initial State / Reset:** Only the **Roll No** field is enabled and focused. **[Save]** and **[Update]** are disabled.
* **Roll No Lookup (`onchange`):**
    * **If NOT Found (Status 400):** Enables **[Save]** and all other fields for new data entry.
    * **If Found (Status 200):** Populates fields with existing data, disables the **Roll No** field, and enables **[Update]**.

***

## ✨ Benefits of using JsonPowerDB

JsonPowerDB is utilized for its efficiency and simplicity in this client-side application:

* **Serverless Architecture:** Eliminates the need to set up and maintain a traditional backend server, handling all database commands directly via REST API calls from JavaScript.
* **Schema Flexibility:** As a document-oriented database, it requires **no predefined schema**, allowing for rapid development and iteration.
* **Simplified Operations:** The project leverages JPDB helper functions (`jpdb-commons.js`) like `createPUTRequest` (Save) and `createUPDATERecordRequest` (Update), significantly reducing the complexity of database interaction code.

***

## 💡 Examples of Use

| Action | Condition | JPDB Command Used | Button Enabled |
| :--- | :--- | :--- | :--- |
| **Create New** | Roll No is **new** | `PUT` | **[Save]** |
| **Update Existing** | Roll No is **found** | `UPDATE` | **[Update]** |
| **Reset** | Clear form, restore initial state. | N/A | **[Reset]** |

***

## 🚀 Project Status

**Status: Complete (MVP)**

The project successfully implements all required dynamic form control and data persistence logic (Save, Lookup, and Update) using the JsonPowerDB API.

***

## 📅 Release History

| Version | Date | Description |
| :--- | :--- | :--- |
| **v1.0.0** | 2025-11-05 | Initial release integrating all HTML, CSS (Bootstrap), and JavaScript logic for dynamic form control and data CRUD operations with JPDB. |

***

## 🌐 Sources

* **Database Service:** [JsonPowerDB](http://login2explore.com)
* **Frameworks:** Bootstrap 3.x, jQuery 3.5.1
* **JPDB Library:** `http://login2explore.com/jpdb/resources/js/0.0.4/jpdb-commons.js`
* **Code Files:** `index.html`, `index.js` 
