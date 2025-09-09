// Initialize mermaid for rendering diagrams
document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      themeVariables: {
        primaryColor: '#9c27b0',
        primaryTextColor: '#fff',
        primaryBorderColor: '#7b1fa2',
        lineColor: '#5e35b1',
        secondaryColor: '#512da8',
        tertiaryColor: '#fff'
      }
    });
    
    // For any dynamically loaded content
    mermaid.contentLoaded();
  }
});