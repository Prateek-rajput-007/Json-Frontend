

import React, { useState } from 'react';
import { Input, Select, Button, Space, Form, Tag } from 'antd';
import { DeleteOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';

const { Option } = Select;

const SchemaField = ({
  field,
  onFieldChange,
  onAddNestedField,
  onRemoveField,
  parentPath = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [arrayInput, setArrayInput] = useState('');
  const path = [...parentPath, field.id];

  const handleTypeChange = (value) => {
    let newValue;
    switch(value) {
      case 'string': newValue = ''; break;
      case 'number': 
      case 'float': newValue = 0; break;
      case 'boolean': newValue = false; break;
      case 'objectid': newValue = 'objectId'; break;
      case 'array': newValue = []; break;
      case 'nested': newValue = []; break;
      default: newValue = '';
    }

    onFieldChange(path, { ...field, type: value, value: newValue });
  };

  const handleKeyChange = (e) => {
    onFieldChange(path, { ...field, key: e.target.value });
  };

  const handleValueChange = (value) => {
    onFieldChange(path, { ...field, value });
  };

  const handleArrayInputChange = (e) => {
    setArrayInput(e.target.value);
  };

  const handleArrayInputConfirm = () => {
    if (arrayInput.trim()) {
      let newItems = arrayInput.split(',')
        .map(item => item.trim())
        .filter(Boolean);
      
      if (field.type === 'number' || field.type === 'float') {
        newItems = newItems.map(item => parseFloat(item) || 0);
      }

      const newValue = [...(Array.isArray(field.value) ? field.value : []), ...newItems];
      onFieldChange(path, { 
        ...field, 
        value: newValue 
      });
      setArrayInput('');
    }
  };

  const removeArrayItem = (index) => {
    const newValue = [...field.value];
    newValue.splice(index, 1);
    onFieldChange(path, { ...field, value: newValue });
  };

  return (
    <div className="ml-6 pl-4 border-l-2 border-gray-200 mb-3">
      <Space align="start" className="w-full">
        {field.type === 'nested' && (
          <Button
            type="text"
            size="small"
            icon={isExpanded ? <DownOutlined /> : <RightOutlined />}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        )}

        <Form.Item className="mb-0">
          <Input
            placeholder="Field name"
            value={field.key}
            onChange={handleKeyChange}
            style={{ width: 150 }}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Select
            placeholder="Field type"
            value={field.type}
            onChange={handleTypeChange}
            style={{ width: 120 }}
          >
            <Option value="string">String</Option>
            <Option value="number">Number</Option>
            <Option value="boolean">Boolean</Option>
            <Option value="objectid">ObjectId</Option>
            <Option value="float">Float</Option>
            <Option value="array">Array</Option>
            <Option value="nested">Nested</Option>
          </Select>
        </Form.Item>

        {field.type === 'boolean' ? (
          <Form.Item className="mb-0">
            <Select
              value={field.value}
              onChange={handleValueChange}
              style={{ width: 100 }}
            >
              <Option value={true}>true</Option>
              <Option value={false}>false</Option>
            </Select>
          </Form.Item>
        ) : field.type === 'array' ? (
          <Form.Item className="mb-0">
            <Space.Compact style={{ width: 250 }}>
              <Input
                value={arrayInput}
                onChange={handleArrayInputChange}
                placeholder="Enter comma-separated values"
                onPressEnter={handleArrayInputConfirm}
              />
              <Button type="primary" onClick={handleArrayInputConfirm}>
                Add
              </Button>
            </Space.Compact>
          </Form.Item>
        ) : (
          <Form.Item className="mb-0">
            <Input
              type={['number', 'float'].includes(field.type) ? 'number' : 'text'}
              value={field.value}
              onChange={(e) => handleValueChange(
                ['number', 'float'].includes(field.type) 
                  ? parseFloat(e.target.value) || 0 
                  : e.target.value
              )}
              placeholder="Value"
              style={{ width: 150 }}
            />
          </Form.Item>
        )}

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveField(path)}
        />
      </Space>

      {field.type === 'array' && Array.isArray(field.value) && field.value.length > 0 && (
        <div className="mt-2">
          <Space size={[0, 8]} wrap>
            {field.value.map((item, index) => (
              <Tag
                key={index}
                closable
                onClose={() => removeArrayItem(index)}
              >
                {item}
              </Tag>
            ))}
          </Space>
        </div>
      )}

      {field.type === 'nested' && isExpanded && (
        <div className="mt-2">
          {Array.isArray(field.value) && field.value.map((nestedField) => (
            <SchemaField
              key={nestedField.id}
              field={nestedField}
              onFieldChange={onFieldChange}
              onAddNestedField={onAddNestedField}
              onRemoveField={onRemoveField}
              parentPath={path}
            />
          ))}
          <Button
            type="dashed"
            size="small"
            onClick={() => onAddNestedField(path, {
              id: Date.now(),
              key: 'newField',
              type: 'string',
              value: '',
            })}
            className="mt-2"
          >
            + Add Nested Field
          </Button>
        </div>
      )}
    </div>
  );
};

export default SchemaField;