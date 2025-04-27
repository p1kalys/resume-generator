import React from 'react';
import { PersonalInfo } from '../../types/resume';
import Input from '../ui/Input';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  updateData: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, updateData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        
        <Input
          label="Phone Number"
          name="phone"
          value={data.phone}
          onChange={handleChange}
          placeholder="Enter your mobile number"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="LinkedIn URL"
          name="linkedinUrl"
          value={data.linkedinUrl}
          onChange={handleChange}
          placeholder="Enter your LinkedIn Url"
        />

        <Input
          label="GitHub URL"
          name="githubUrl"
          value={data.githubUrl}
          onChange={handleChange}
          placeholder="Enter your GitHub Url"
        />
      </div>

    </div>
  );
};

export default PersonalInfoForm;
