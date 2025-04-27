const templateTex = `
\\documentclass{resume} % Use the custom resume.cls style

\\usepackage[left=0.4 in,top=0.4in,right=0.4 in,bottom=0.3in]{geometry} % Document margins
\\newcommand{\\tab}[1]{\\hspace{.2\\textwidth}\\rlap{#1}} 
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}

\\name{ {{name}} } % Your name
\\address{
\\href{mailto:{{email}}}{ {{email}}} \\\\ 
\\href{ {{linkedinUrl}} }{LinkedIn} \\\\
\\href{ {{githubUrl}} }{Github} \\\\ 
\\href{tel:{{phone}}}{ {{phone}} }
}

\\begin{document}

%----------------------------------------------------------------------------------------
% TECHNICAL STRENGTHS
%----------------------------------------------------------------------------------------
\\vspace{-1.2em}
\\begin{rSection}{SKILLS}
\\textbf{Languages:} {{skills.languages}} \\\\
\\textbf{Technologies/Tools:} {{skills.tools}}
\\end{rSection}

%----------------------------------------------------------------------------------------
\\vspace{-0.9em}
\\begin{rSection}{EXPERIENCE}

{% for exp in experience %}
\\textbf{ {{exp.title}} } \\hfill {{exp.startDate}} - {{exp.endDate}} \\\\
\\textbf{\\href{ {{exp.companyUrl}} }{ {{exp.companyName}} }} \\hfill \\textit{ {{exp.location}} }
\\vspace{-0.6em}
\\begin{itemize}
    \\itemsep -6pt {}
    {% for point in exp.points %}
    \\item {{point}}
    {% endfor %}
\\end{itemize}
\\vspace{-0.4em}
{% endfor %}

\\end{rSection}

%----------------------------------------------------------------------------------------
\\vspace{-0.9em}
\\begin{rSection}{PROJECTS}
{% for project in projects %}
\\textbf{\\href{ {{project.liveUrl}} }{ {{project.name}} (Live)}} - {{project.technologies}} \\\\
\\vspace{-1.8em}
\\begin{itemize}
    \\itemsep -6pt {}
    {% for point in project.points %}
    \\item {{point}}
    {% endfor %}
\\end{itemize}
\\vspace{-0.6em}
{% endfor %}
\\end{rSection} 

%----------------------------------------------------------------------------------------
\\vspace{-0.9em}
\\begin{rSection}{EDUCATION}
{% for education in educationList %}
    {\\bf {{education.institution}}}, {{education.location}} \\hfill {{education.startYear}} - {{education.endYear}} \\\\
    {{education.degree}} \\hfill \\textit{CGPA: {{education.cgpa}}}

    \\vspace{-0.6em}
{% endfor %}
\\end{rSection}

\\end{document}
`;

export default templateTex;