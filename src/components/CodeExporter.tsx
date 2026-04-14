'use client';

import React, { useEffect, useState } from 'react';
import { Copy, Download, Check, Code, Terminal, FileCode, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeExporterProps {
  code: string;
}

const CodeExporter: React.FC<CodeExporterProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (code) {
      Prism.highlightAll();
    }
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'GeneratedComponent.tsx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Code Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileCode size={16} className="text-purple-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Source Tree Output</span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              copied 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'COPIED_TO_CLIPBOARD' : 'COPY_CODE'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 text-white text-xs font-bold transition-all hover:bg-purple-600 shadow-lg shadow-purple-500/20"
          >
            <Download size={14} />
            EXPORT_.TSX
          </button>
        </div>
      </div>

      {/* Code Viewport */}
      <div className="flex-1 overflow-hidden relative group bg-[#010204]">
        <div className="absolute top-4 right-6 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity">
          <Terminal size={40} className="text-slate-800" />
        </div>
        
        <div className="h-full overflow-auto p-8 custom-scrollbar relative z-10">
          {code ? (
            <pre className="m-0 !bg-transparent !p-0">
              <code className="language-tsx text-[13px] font-mono leading-relaxed !bg-transparent">
                {code}
              </code>
            </pre>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <Code size={40} className="text-slate-800" />
              <div className="space-y-1">
                <p className="text-slate-700 text-sm font-bold uppercase tracking-widest leading-relaxed">System Idle</p>
                <p className="text-slate-800 text-[10px] uppercase tracking-[0.2em]">Generate a component to see the source code architecture</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Decorative Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default CodeExporter;
