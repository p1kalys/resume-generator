import React from 'react';
import { Experience } from '../../types/resume';
import { generateId } from '../../utils/helpers';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Trash, Plus } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = [...data];
    updated[index] = { ...updated[index], [name]: value };
    updateData(updated);
  };

  const addExperience = () => {
    updateData([
      ...data,
      {
        id: generateId(),
        company: '',
        companyUrl: '',
        position: '',
        location: '',
        startYear: '',
        endYear: '',
        points: [''],
      },
    ]);
  };

  const removeExperience = (index: number) => {
    const updated = [...data];
    updated.splice(index, 1);
    updateData(updated);
  };

  const handlePointChange = (expIndex: number, pointIndex: number, value: string) => {
    const updated = [...data];
    updated[expIndex].points[pointIndex] = value;
    updateData(updated);
  };

  const addPoint = (expIndex: number) => {
    const updated = [...data];

    if (!updated[expIndex].points) {
      updated[expIndex].points = [];
    }

    updated[expIndex].points.push('');
    updateData(updated);
  };

  const removePoint = (expIndex: number, pointIndex: number) => {
    const updated = [...data];
    updated[expIndex].points.splice(pointIndex, 1);
    updateData(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <Button variant="primary" size="sm" onClick={addExperience}>
          Add Experience
        </Button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No experience entries yet. Click "Add Experience" to get started.</p>
        </div>
      )}

      {data.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-white space-y-4 relative shadow-sm">
          <button
            type="button"
            onClick={() => removeExperience(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove experience"
          >
            <Trash size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              name="company"
              value={exp.company}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter Company name"
              required
            />
            <Input
              label="Company URL"
              name="companyUrl"
              value={exp.companyUrl}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter Company URL"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Position"
              name="position"
              value={exp.position}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter your role/position"
              required
            />
            <Input
              label="Location"
              name="location"
              value={exp.location}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter Company Location"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Year"
              name="startYear"
              value={exp.startYear}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter year"
              required
            />
            <Input
              label="End Year"
              name="endYear"
              value={exp.endYear}
              onChange={(e) => handleChange(index, e)}
              placeholder="Enter year"
              required
            />
          </div>

          {/* Responsibilities & Achievements Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Responsibilities & Achievements</label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => addPoint(index)}
                className="px-2 py-1"
              >
                <Plus size={16} className="mr-1" /> Add Point
              </Button>
            </div>

            {exp.points && exp.points.length === 0 && (
              <div className="flex gap-2">
                <Input
                  value=""
                  onChange={(e) => handlePointChange(index, 0, e.target.value)}
                  placeholder="e.g., Developed scalable API services..."
                  className="w-full"
                  maxLength={250}
                />
                <button
                  type="button"
                  onClick={() => removePoint(index, 0)}
                  className="text-gray-400 hover:text-red-500 transition-colors mt-2"
                >
                  <Trash size={16} />
                </button>
              </div>
            )}

            {exp.points && exp.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => handlePointChange(index, pointIndex, e.target.value)}
                  placeholder="e.g., Developed scalable API services..."
                  className="w-full"
                  maxLength={250}
                />
                <button
                  type="button"
                  onClick={() => removePoint(index, pointIndex)}
                  className="text-gray-400 hover:text-red-500 transition-colors mt-2"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
