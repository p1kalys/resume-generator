import React, { useState } from 'react';
import { cn } from '../../utils/helpers';

interface TabProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, value, onChange, className }) => {
  return (
    <div className={cn("flex border-b", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
            value === tab.value
              ? "border-blue-900 text-blue-900"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          )}
          onClick={() => onChange(tab.value)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

interface TabPanelProps {
  value: string;
  tabValue: string;
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ value, tabValue, children }) => {
  if (value !== tabValue) return null;
  return <div>{children}</div>;
};