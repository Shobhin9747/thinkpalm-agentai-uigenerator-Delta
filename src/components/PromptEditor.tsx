'use client';

import React, { useState } from 'react';
import { Settings2, FileText, ChevronDown, ChevronUp, Sparkles, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptEditorProps {
  prd: string;
  setPrd: (val: string) => void;
  systemPrompt: string;
  setSystemPrompt: (val: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const PromptEditor: React.FC<PromptEditorProps> = ({
  prd,
  setPrd,
  systemPrompt,
  setSystemPrompt,
  onGenerate,
  isGenerating
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="flex flex-col h-full p-4 space-y-6">
      {/* Header Segment */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <BrainCircuit className="text-cyan-400 w-5 h-5" />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">Requirement Input</h2>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`p-2 rounded-lg transition-all ${showAdvanced ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
        >
          <Settings2 size={18} />
        </button>
      </div>

      {/* Advanced Settings */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="glass-inset p-4 rounded-xl mb-4 space-y-3 border-cyan-500/10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-tighter">System Persona</span>
                <div className="h-px flex-1 bg-cyan-500/10" />
              </div>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Influence the AI's coding style..."
                className="w-full h-24 bg-transparent border-none p-0 text-sm text-slate-400 focus:outline-none placeholder:text-slate-600 resize-none font-mono"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Main PRD Input */}
      <div className="flex-1 flex flex-col min-h-0 space-y-3">
        <textarea
          value={prd}
          onChange={(e) => setPrd(e.target.value)}
          placeholder="Paste your PRD, feature list, or prompt here..."
          className="flex-1 w-full bg-white/[0.02] border border-white/5 focus:border-cyan-500/30 rounded-2xl p-5 text-slate-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/5 transition-all resize-none font-sans text-sm leading-relaxed placeholder:text-slate-600 shadow-inner"
        />
        <div className="flex items-center justify-between px-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span>Tokens: {prd.length} chars</span>
          <span>Formatting: MD Supported</span>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isGenerating || !prd.trim()}
        className="relative group overflow-hidden py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex items-center justify-center gap-3">
          {isGenerating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <Sparkles className="w-5 h-5 text-white group-hover:animate-pulse" />
          )}
          <span className="font-black text-white uppercase tracking-widest text-sm">
            {isGenerating ? 'Synthesizing...' : 'Generate UI Tree'}
          </span>
        </div>
      </motion.button>
    </div>
  );
};

export default PromptEditor;
