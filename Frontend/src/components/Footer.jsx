import React from 'react'
import { Linkedin, Github , CircleUserRound  } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <div className="container mx-auto">
        <p className="text-lg">© 2025 HabitAura. All rights reserved.</p>
        <p className="text-md">Made with ❤️ by Mr. Balaram</p>
        <div className="flex items-center justify-center gap-4 mt-2">
          <a href="https://www.linkedin.com/in/balaramsarkar/" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/Balaramsarkar-007" aria-label="GitHub">
            <Github size={24} />
          </a>
          <a href="https://balaram.free.nf/?i=1" aria-label="Portfolio">
            <CircleUserRound size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
