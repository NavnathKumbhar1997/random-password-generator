import React, { useState, useEffect } from 'react';
import { generatePassword } from './utils/passwordGenerator';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined, ReloadOutlined } from '@ant-design/icons';
import './App.css';
import { Button, Card, Input, Tooltip,message,Col, InputNumber, Row, Slider, Space } from 'antd';
import { Checkbox, Divider } from 'antd';
import Title from 'antd/es/skeleton/Title';
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

function App() {
  const [length, setLength] = useState(12); // State for password length
  const [includeNumbers, setIncludeNumbers] = useState(true); // State for including numbers
  const [includeAlphabets, setIncludeAlphabets] = useState(true); // State for including alphabets
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true); // State for including special characters
  const [password, setPassword] = useState(''); // State for generated password
  const [passwordHistory, setPasswordHistory] = useState([]); // State for password history
  const [showPasswordHistory, setShowPasswordHistory] = useState(false); // State for displaying password history
  const [checkedList, setCheckedList] = useState(defaultCheckedList); // State for checked checkboxes
  const [inputValue, setInputValue] = useState(1);
  const checkAll = plainOptions.length === checkedList.length; // Check all checkboxes
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length; // Check indeterminate checkboxes

  // Handle checkbox change
  const onChange = (list) => {
    setCheckedList(list);
  };

  // Handle password length change
  const onChangeLength = (newValue) => {
    setInputValue(newValue);
  };

  // Handle checkbox toggle for all options
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  // Load saved passwords from local storage on initial render
  useEffect(() => {
    const savedPasswords = JSON.parse(localStorage.getItem('passwordHistory'));
    if (savedPasswords) {
      setPasswordHistory(savedPasswords);
    }
    generateNewPassword(); // Generate new password on initial render
  }, []);

  // Generate new password
  const generateNewPassword = () => {
    const newPassword = generatePassword(length, includeNumbers, includeAlphabets, includeSpecialChars);
    setPassword(newPassword);
    const updatedHistory = [newPassword, ...passwordHistory.slice(0, 4)];
    setPasswordHistory(updatedHistory);
    localStorage.setItem('passwordHistory', JSON.stringify(updatedHistory));
  };

  // Handle password copy to clipboard
  const handleCopy = () => {
    message.success('Password copied to clipboard');
  };


  return (
    <>

    <div className="App" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Card bordered={false} style={{
      width: 700,backgroundColor:'#eddcfa'
    }}>
      <h1>Random Password Generator</h1>
      {password ? (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Password</h2>
          <Input
            value={password}
            style={{
              border: '1px solid black',
              borderRadius: '40px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            // addonAfter={
            //   <CopyToClipboard text={password}>
            //   </CopyToClipboard>
            // }
            readOnly
            />
             <Tooltip title="Copy to Clipboard">
                <CopyToClipboard text={password} onCopy={handleCopy}>
                  <Button style={{width:"50px",margin:'10px'}} icon={<CopyOutlined />} />
                </CopyToClipboard>
              </Tooltip>
              <Tooltip title="Generate Password">
             <Button style={{width:"50px"}} onClick={generateNewPassword} icon ={<ReloadOutlined />} /></Tooltip>
        </div>
      ):(
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Password</h2>
          <Input
            value={password}
            style={{
              border: '1px solid black',
              borderRadius: '40px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            
            readOnly
            />
             <Tooltip title="Copy to Clipboard">
                <CopyToClipboard text={password} onCopy={handleCopy}>
                  <Button icon={<CopyOutlined />} />
                </CopyToClipboard>
              </Tooltip>
              <Tooltip title="Generate Password">
             <Button onClick={generateNewPassword} icon ={<ReloadOutlined />} /></Tooltip>
        </div>
      )}
      <div>
      <label>
          Password Length:
          </label>
      <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={30}
          onChange={(value) => setLength(value)}
          value={length}
          style={{ trackColor: 'blue', height: 10 }} // Change color and height of the track
  railStyle={{ backgroundColor: 'lightblue', height: 3 }}
          
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={20}
          style={{
            margin: '0 16px',
          }}
          onChange={(value) => setLength(value)}
              value={length}
        />
      </Col>
    </Row>
      </div>
      <div>
        <label>
          <Checkbox checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          Include Numbers
        </label>
      </div>
      <div>
        <label>
          <Checkbox checked={includeAlphabets} onChange={(e) => setIncludeAlphabets(e.target.checked)} />
          Include Alphabets
        </label>
      </div>
      <div>
        <label>
          <Checkbox checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} />
          Include Special Characters
        </label>
      </div>
      
      <Button onClick={() => setShowPasswordHistory(!showPasswordHistory)} style={{ marginTop: '20px' }}>
          {showPasswordHistory ? 'Hide Last 5 Passwords' : 'Show Last 5 Passwords'}
        </Button>
        {showPasswordHistory && (
          <div>
            <ul>
              {passwordHistory.map((pwd, index) => (
                <li key={index}>{pwd}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
    </>
  );
}

export default App;
