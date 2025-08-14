'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <Shield className="h-8 w-8 text-blue-600" />
              <CheckCircle className="h-4 w-4 text-green-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CheckMate
              </h1>
              <p className="text-sm text-gray-600">AI-Powered Fact Checker</p>
            </div>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <motion.a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              How it Works
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              About
            </motion.a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
