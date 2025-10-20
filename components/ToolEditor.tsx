
import React from 'react';
import { Tool, ToolParameter } from '../types';
import { ContextEditorCard } from './ContextEditorCard';
import { WrenchIcon } from './IconComponents';
import { v4 as uuidv4 } from 'uuid';

interface ToolEditorProps {
  tools: Tool[];
  setTools: React.Dispatch<React.SetStateAction<Tool[]>>;
}

export const ToolEditor: React.FC<ToolEditorProps> = ({ tools, setTools }) => {
  const addTool = () => {
    setTools([...tools, { id: uuidv4(), name: '', description: '', parameters: [] }]);
  };

  const removeTool = (toolId: string) => {
    setTools(tools.filter(t => t.id !== toolId));
  };
  
  const updateTool = (toolId: string, field: keyof Tool, value: any) => {
    setTools(tools.map(t => t.id === toolId ? { ...t, [field]: value } : t));
  };
  
  const addParameter = (toolId: string) => {
     setTools(tools.map(t => t.id === toolId ? { ...t, parameters: [...t.parameters, { id: uuidv4(), name: '', type: 'string', description: '', required: true }] } : t));
  };

  const removeParameter = (toolId: string, paramId: string) => {
      setTools(tools.map(t => t.id === toolId ? { ...t, parameters: t.parameters.filter(p => p.id !== paramId)} : t));
  };
  
  const updateParameter = (toolId: string, paramId: string, field: keyof ToolParameter, value: any) => {
    setTools(tools.map(t => {
      if (t.id === toolId) {
        return { ...t, parameters: t.parameters.map(p => p.id === paramId ? { ...p, [field]: value } : p) };
      }
      return t;
    }));
  };

  return (
    <ContextEditorCard title="Tools" icon={<WrenchIcon className="w-5 h-5" />}>
      <p className="text-sm text-gray-400 mb-4">Define functions or capabilities the agent can execute.</p>
      <div className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input type="text" value={tool.name} onChange={e => updateTool(tool.id, 'name', e.target.value)} placeholder="Tool Name" className="bg-gray-700 border border-gray-600 rounded p-2 text-sm w-full" />
              <input type="text" value={tool.description} onChange={e => updateTool(tool.id, 'description', e.target.value)} placeholder="Description" className="bg-gray-700 border border-gray-600 rounded p-2 text-sm w-full" />
            </div>
            <h4 className="text-sm font-semibold mb-2">Parameters</h4>
            <div className="space-y-3">
              {tool.parameters.map((param) => (
                <div key={param.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                   <input type="text" value={param.name} onChange={e => updateParameter(tool.id, param.id, 'name', e.target.value)} placeholder="Param Name" className="md:col-span-1 bg-gray-700 border border-gray-600 rounded p-1 text-xs"/>
                   <input type="text" value={param.description} onChange={e => updateParameter(tool.id, param.id, 'description', e.target.value)} placeholder="Description" className="md:col-span-2 bg-gray-700 border border-gray-600 rounded p-1 text-xs"/>
                   <div className="flex items-center gap-2 justify-end">
                      <label className="flex items-center text-xs gap-1 cursor-pointer">
                        <input type="checkbox" checked={param.required} onChange={e => updateParameter(tool.id, param.id, 'required', e.target.checked)} className="form-checkbox h-4 w-4 bg-gray-700 border-gray-600 text-violet-500 rounded focus:ring-violet-500"/>
                        Req
                      </label>
                      <button onClick={() => removeParameter(tool.id, param.id)} className="text-red-400 hover:text-red-300">&times;</button>
                   </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button onClick={() => addParameter(tool.id)} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 py-1 px-2 rounded">+ Add Parameter</button>
              <button onClick={() => removeTool(tool.id)} className="text-xs text-red-400 hover:text-red-300">Remove Tool</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addTool} className="mt-4 w-full text-sm bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500 text-violet-300 py-2 px-4 rounded-md">+ Add Tool</button>
    </ContextEditorCard>
  );
};
