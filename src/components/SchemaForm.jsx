

import React, { useState } from 'react';
import { Card, Button, Tabs, Space, Typography, message } from 'antd';
import SchemaField from './SchemaField';

const { Title } = Typography;

const SchemaForm = ({ onSubmit }) => {
  const [fields, setFields] = useState([]);
  const [activeTab, setActiveTab] = useState('json');

  const updateField = (path, updatedField) => {
    const newFields = [...fields];
    let currentLevel = newFields;
    
    for (let i = 0; i < path.length - 1; i++) {
      const index = currentLevel.findIndex(f => f.id === path[i]);
      currentLevel = currentLevel[index].value;
    }
    
    const finalIndex = currentLevel.findIndex(f => f.id === path[path.length - 1]);
    currentLevel[finalIndex] = updatedField;
    setFields(newFields);
  };

  const addNestedField = (path, newField) => {
    const newFields = [...fields];
    let currentLevel = newFields;
    
    for (let i = 0; i < path.length; i++) {
      const index = currentLevel.findIndex(f => f.id === path[i]);
      if (i === path.length - 1) {
        if (!Array.isArray(currentLevel[index].value)) {
          currentLevel[index].value = [];
        }
        currentLevel[index].value.push(newField);
      } else {
        currentLevel = currentLevel[index].value;
      }
    }
    
    setFields(newFields);
  };

  const removeField = (path) => {
    const newFields = [...fields];
    let currentLevel = newFields;
    
    for (let i = 0; i < path.length - 1; i++) {
      const index = currentLevel.findIndex(f => f.id === path[i]);
      currentLevel = currentLevel[index].value;
    }
    
    const finalIndex = currentLevel.findIndex(f => f.id === path[path.length - 1]);
    currentLevel.splice(finalIndex, 1);
    setFields(newFields);
  };

  const convertToJSON = () => {
    const buildObject = (fieldsArray) => {
      if (!Array.isArray(fieldsArray)) return {};
      
      const result = {};
      fieldsArray.forEach(field => {
        if (field.type === 'nested' && Array.isArray(field.value)) {
          result[field.key] = buildObject(field.value);
        } else if (field.type === 'array' && Array.isArray(field.value)) {
          result[field.key] = field.value;
        } else {
          result[field.key] = field.value;
        }
      });
      return result;
    };
    
    return fields.length > 0 ? buildObject(fields) : {};
  };

  const handleSubmit = () => {
    const jsonData = convertToJSON();
    if (Object.keys(jsonData).length === 0) {
      message.warning('Please add at least one field before submitting');
      return;
    }
    
    if (onSubmit) {
      onSubmit(jsonData);
    } else {
      console.log('Form data:', jsonData);
      message.success('Form submitted successfully!');
    }
  };

  const tabItems = [
    {
      key: 'json',
      label: 'JSON',
      children: (
        <pre className="bg-gray-50 p-4 rounded">
          {JSON.stringify(convertToJSON(), null, 2)}
        </pre>
      ),
    },
  ];

  return (
    <div className="flex p-4 gap-4" style={{ minHeight: '100vh' }}>
      <Card 
        title={<Title level={4} className="mb-0">Schema Builder</Title>}
        className="flex-1"
      >
        <Space direction="vertical" className="w-full">
          {fields.map(field => (
            <SchemaField
              key={field.id}
              field={field}
              onFieldChange={updateField}
              onAddNestedField={addNestedField}
              onRemoveField={removeField}
            />
          ))}
          <Button 
            type="primary" 
            onClick={() => setFields([...fields, {
              id: Date.now(),
              key: '',
              type: 'string',
              value: '',
            }])}
          >
            + Add Field
          </Button>
        </Space>
      </Card>

      <Card 
        title={<Title level={4} className="mb-0">JSON Output</Title>}
        className="flex-1"
      >
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
        />
        <div style={{ marginTop: 16, textAlign: 'right' }}>
          <Button 
            type="primary" 
            onClick={handleSubmit}
            disabled={fields.length === 0}
          >
            Submit Form
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SchemaForm;