import React from 'react';
const getHighlightedCode = (code) => {

    code = code.replace(/await|const|import|from|new|return|try|catch|function|export|class|this|if|else/g, '<span style="color: #c678dd;">$&</span>'); // Purple Keywords
    code = code.replace(/"(.*?)"/g, '<span style="color: #98c379;">$&</span>'); // Green Strings
    code = code.replace(/\/\/.*/g, '<span style="color: #5c6370;">$&</span>'); // Gray Comments
    code = code.replace(/([A-Za-z]+)\(/g, '<span style="color: #61afef;">$1</span>('); // Blue Functions
    code = code.replace(/([a-zA-Z0-9_]+)\./g, '<span style="color: #e5c07b;">$&</span>'); // Yellow Methods (client.collection)
    return code;
};

const CodeBlock = ({ language, children }) => {
    // Menghapus backtick pembungkus jika ada
    let codeContent = children.trim().startsWith('`') ? children.trim().slice(1, -1) : children;
    
    // Perbaikan: Hapus simbol {` dan `}
    codeContent = codeContent.replace(/\{`|`\}/g, '');

    const highlightedCode = getHighlightedCode(codeContent);

    return (
        <div className="bg-[#050505] rounded-lg border border-white/10 p-4 overflow-x-auto my-4">
          <pre className="font-mono text-xs text-gray-300" style={{color: '#abb2bf', whiteSpace: 'pre-wrap'}}>
             <code 
               className={`language-${language}`} 
               dangerouslySetInnerHTML={{ __html: highlightedCode }} 
             />
          </pre>
        </div>
    );
};

export default CodeBlock;