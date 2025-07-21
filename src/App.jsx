

import { ConfigProvider, message } from 'antd';
import SchemaForm from './components/SchemaForm';

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    message.success('Form data submitted successfully!');
    
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 6,
        },
      }}
    >
      <div className="min-h-screen bg-gray-50 p-4">
        <SchemaForm onSubmit={handleFormSubmit} />
      </div>
    </ConfigProvider>
  );
}

export default App;