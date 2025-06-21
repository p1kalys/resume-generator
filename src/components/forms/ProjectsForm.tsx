import React from 'react';
import { Project } from '../../types/resume';
import { generateId } from '../../utils/helpers';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import { Trash } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  updateData: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    updateData(updatedData);
  };

  const handlePointsChange = (projectIndex: number, pointIndex: number, value: string) => {
    const updatedData = [...data];
    updatedData[projectIndex].points[pointIndex] = value;
    updateData(updatedData);
  };

  const addPoint = (projectIndex: number) => {
    const updatedData = [...data];
    updatedData[projectIndex].points.push('');
    updateData(updatedData);
  };

  const removePoint = (projectIndex: number, pointIndex: number) => {
    const updatedData = [...data];
    updatedData[projectIndex].points.splice(pointIndex, 1);
    updateData(updatedData);
  };

  const addProject = () => {
    updateData([
      ...data,
      {
        id: generateId(),
        title: '',
        liveUrl: '',
        technologies: '',
        points: [''],
      },
    ]);
  };

  const removeProject = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    updateData(updatedData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <Button variant="primary" size="sm" onClick={addProject}>
          Add Project
        </Button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No projects added yet. Click "Add Project" to get started.</p>
        </div>
      )}

      {data.map((project, projectIndex) => (
        <div
          key={project.id}
          className="p-4 border border-gray-200 rounded-lg space-y-4 relative bg-white shadow-sm"
        >
          <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
            Project {projectIndex + 1}
          <button
            type="button"
            onClick={() => removeProject(projectIndex)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove project"
          >
            <Trash size={18} />
          </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="title"
              value={project.title}
              onChange={(e) => handleChange(projectIndex, e)}
              placeholder="Project Name (e.g., Portfolio Website)"
            />

            <Input
              name="liveUrl"
              value={project.liveUrl}
              onChange={(e) => handleChange(projectIndex, e)}
              placeholder="Project Link (optional)"
            />
          </div>

          <Input
            name="technologies"
            value={project.technologies}
            onChange={(e) => handleChange(projectIndex, e)}
            placeholder="Technologies Used (e.g., React, Node.js)"
          />

          {/* Points Section */}
          <div>
            <h3 className="text-md font-semibold text-gray-800">Project Points</h3>
            <div className='py-2'>
            {project.points.map((point, pointIndex) => (
              <div key={pointIndex} className="flex items-center space-x-2">
                <Input
                  name="points"
                  value={point}
                  onChange={(e) => handlePointsChange(projectIndex, pointIndex, e.target.value)}
                  placeholder="Project Point"
                />
                <button
                  type="button"
                  onClick={() => removePoint(projectIndex, pointIndex)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove point"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => addPoint(projectIndex)}
            >
              Add Point
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
