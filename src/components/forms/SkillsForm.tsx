import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Trash } from 'lucide-react';

interface SkillsFormProps {
  languages: string[];
  tools: string[];
  updateLanguages: (languages: string[]) => void;
  updateTools: (tools: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  languages = [],
  tools = [],
  updateLanguages,
  updateTools,
}) => {
  const handleChange = (type: 'languages' | 'tools', index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (type === 'languages') {
      const updatedLanguages = [...languages];
      updatedLanguages[index] = value;
      updateLanguages(updatedLanguages);
    } else {
      const updatedTools = [...tools];
      updatedTools[index] = value;
      updateTools(updatedTools);
    }
  };

  const addLanguage = () => {
    updateLanguages([...languages, '']);
  };

  const addTool = () => {
    updateTools([...tools, '']);
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    updateLanguages(updatedLanguages);
  };

  const removeTool = (index: number) => {
    const updatedTools = [...tools];
    updatedTools.splice(index, 1);
    updateTools(updatedTools);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
      </div>

      <div className="space-y-6">
        {/* Languages Section */}
        <div>
          <h3 className="text-lg font-semibold my-2 text-gray-800">Languages</h3>
          <Button variant="primary" size="sm" onClick={addLanguage}>
            Add Language
          </Button>

          {languages.length === 0 && (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No languages added yet. Click "Add Language" to get started.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((language, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg flex items-center gap-4 bg-white shadow-sm"
              >
                <div className="flex-1">
                  <Input
                    label="Language"
                    name="language"
                    value={language}
                    onChange={(e) => handleChange('languages', index, e)}
                    placeholder="e.g., JavaScript, Python"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors self-end mb-2"
                  aria-label="Remove language"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tools/Technologies Section */}
        <div>
          <h3 className="text-lg font-semibold my-2 text-gray-800">Tools/Technologies</h3>
          <Button variant="primary" size="sm" onClick={addTool}>
            Add Tool/Technology
          </Button>

          {tools.length === 0 && (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No tools/technologies added yet. Click "Add Tool/Technology" to get started.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg flex items-center gap-4 bg-white shadow-sm"
              >
                <div className="flex-1">
                  <Input
                    label="Tool/Technology"
                    name="tool"
                    value={tool}
                    onChange={(e) => handleChange('tools', index, e)}
                    placeholder="e.g., React, Node.js, Git"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeTool(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors self-end mb-2"
                  aria-label="Remove tool"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
