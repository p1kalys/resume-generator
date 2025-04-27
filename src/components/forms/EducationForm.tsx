import React from 'react';
import { Education } from '../../types/resume';
import { generateId } from '../../utils/helpers';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Trash } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  updateData: (data: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    updateData(updatedData);
  };

  const addEducation = () => {
    updateData([
      ...data,
      {
        id: generateId(),
        institution: '',
        degree: '',
        location: '',
        startYear: '',
        endYear: '',
        cgpa: '',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    updateData(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <Button variant="primary" size="sm" onClick={addEducation}>
          Add Education
        </Button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}

      {data.map((education, index) => (
        <div
          key={education.id}
          className="p-4 border border-gray-200 rounded-lg space-y-4 relative bg-white shadow-sm"
        >
          <button
            type="button"
            onClick={() => removeEducation(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove education"
          >
            <Trash size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="University/Institution Name"
              name="institution"
              value={education.institution}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter your University Name"
              required
            />
            <Input
              label="Degree"
              name="degree"
              value={education.degree}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter Degree (e.g., Bachelor of Technology)"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location"
              name="location"
              type="text"
              value={education.location}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter your location"
              required
            />
            <Input
              label="Start Year"
              name="startYear"
              type="text"
              value={education.startYear}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter year"
              required
            />
            <Input
              label="End Year"
              name="endYear"
              type="text"
              value={education.endYear}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter year"
              required
            />
            <Input
              label="CGPA"
              name="cgpa"
              type="text"
              value={education.cgpa}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter CGPA (e.g., 9.8/10.0)"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
