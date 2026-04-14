'use client';

import React, { useState } from 'react';
import { Eye, Monitor, Tablet, Smartphone, RefreshCw, Box, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComponentPreviewProps {
  code: string;
  isGenerating: boolean;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ code, isGenerating }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getWidth = () => {
    switch (viewMode) {
      case 'tablet': return '768px';
      case 'mobile': return '375px';
      default: return '100%';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Eye size={16} className="text-cyan-400" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Interactive Render</span>
        </div>
        
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/5">
          <button 
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${viewMode === 'desktop' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Monitor size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Desktop</span>
          </button>
          <button 
            onClick={() => setViewMode('tablet')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${viewMode === 'tablet' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Tablet size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Tablet</span>
          </button>
          <button 
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${viewMode === 'mobile' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Smartphone size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-slate-950/50 backdrop-blur-3xl relative overflow-hidden flex items-center justify-center p-8">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin" />
              <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 w-4 h-4 animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-black text-slate-200 uppercase tracking-widest">Building Components</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em]">Assembling Tailwind Node Tree...</p>
            </div>
          </div>
        ) : !code ? (
          <div className="text-center space-y-6 max-w-sm">
            <div className="w-20 h-20 glass-morphism rounded-3xl flex items-center justify-center mx-auto border-cyan-500/10">
              <Box size={32} className="text-slate-700 hover:text-cyan-500/50 transition-colors" />
            </div>
            <div className="space-y-2">
              <p className="text-slate-300 font-bold uppercase tracking-widest text-sm">Waiting for Architecture</p>
              <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-wider">Define your PRD in the editor to synthesize a functional UI preview here.</p>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex items-center justify-center"
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ease-[0.23,1,0.32,1] ring-1 ring-black/5"
              style={{ width: getWidth(), height: '100%', maxHeight: '800px' }}
            >
              <iframe
                title="Preview"
                className="w-full h-full border-none"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
                      <style>
                        body { font-family: 'Inter', sans-serif; background: white; margin: 0; padding: 0; }
                      </style>
                    </head>
                    <body>
                      <div id="root">
                        <!-- We show the raw code as a placeholder since we can't eval imports safely in this context -->
                        <div class="p-12 text-center flex flex-col items-center justify-center min-h-screen gap-4">
                           <div class="text-xs font-black uppercase tracking-widest text-slate-400">Synthesized Component Ready</div>
                           <div class="text-[10px] font-mono text-slate-500 bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-md break-all">
                              ${code.substring(0, 500)}...
                           </div>
                           <div class="text-xs text-slate-400 mt-4 italic">Note: In this dev environment, view Source Code for full logic.</div>
                        </div>
                      </div>
                    </body>
                  </html>
                `}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComponentPreview;
