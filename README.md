
# JSON Schema Builder

A dynamic JSON schema builder built with React and Ant Design that allows users to create and edit JSON schemas through an intuitive interface.

![Schema Builder Demo](https://github.com/Prateek-rajput-007/Json-Frontend/raw/main/public/schema-builder-demo.gif)

## Features

- **Dynamic Field Management**:
  - Add/remove fields of different types (String, Number, Nested)
  - Edit field names and values
  - Recursive nested field creation

- **Real-time Preview**:
  - Live JSON output display
  - Formatted JSON view with syntax highlighting

- **Responsive Design**:
  - Works on both desktop and mobile devices
  - Clean, intuitive UI with Ant Design components

## Tech Stack

- **Frontend**: React.js, Ant Design
- **Build Tool**: Vite
- **Styling**: CSS/Tailwind (via Ant Design)

## Project Structure

```
src/
├── components/
│   ├── SchemaBuilder/
│   │   ├── SchemaField.jsx
│   │   ├── SchemaForm.jsx
│   │   └── index.js
├── App.js
├── index.js
├── styles/
│   └── globals.css
```

## Live Demo

- [Live Application](https://json-frontend-sand.vercel.app/)
- [Demo Video](https://drive.google.com/file/d/1aGB5Y_eoj8vnMWCUewUZnu6LtkIi49Ob/view?usp=sharing)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Prateek-rajput-007/Json-Frontend.git
   ```

2. Install dependencies:
   ```bash
   cd Json-Frontend
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Click "+ Add Field" to create new fields
2. Select field type from dropdown (String, Number, or Nested)
3. Edit field names and values directly
4. For nested fields, click "+ Add Nested Field" to create child fields
5. View the generated JSON in the preview panel
6. Use the "Submit" button to process the final JSON

## Implementation Details

- Uses recursive components for nested field rendering
- State management with React hooks
- Real-time JSON generation with proper formatting
- Responsive layout with mobile support
- Clean UI with Ant Design components
