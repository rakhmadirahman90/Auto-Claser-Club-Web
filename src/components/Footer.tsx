import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-theme-bg py-4 sm:py-6 border-t border-theme-border shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-theme-muted text-xs text-center">
          © {new Date().getFullYear()} Auto Claser Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

