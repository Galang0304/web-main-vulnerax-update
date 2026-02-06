// Category color mapping
const categoryColors = {
  'Security': '#DE1A34',
  'Vulnerability': '#FF6B35',
  'AI Security': '#7C3AED',
  'Cybercrime': '#DC2626',
  'Investigate': '#059669',
  'Cybersecurity Tips': '#2563EB',
  'National Security': '#1F2937',
  'Deepfake': '#DB2777',
};

export function getCategoryColor(category) {
  return categoryColors[category] || '#DE1A34';
}

export function getCategoryColorHover(category) {
  const hoverColors = {
    'Security': '#E4334B',
    'Vulnerability': '#FF8555',
    'AI Security': '#8B5CF6',
    'Cybercrime': '#EF4444',
    'Investigate': '#10B981',
    'Cybersecurity Tips': '#3B82F6',
    'National Security': '#374151',
    'Deepfake': '#EC4899',
  };
  return hoverColors[category] || '#E4334B';
}

export default categoryColors;
