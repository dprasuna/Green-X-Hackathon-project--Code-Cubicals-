import React from 'react'
import {Link} from 'react-router-dom'


export default function Footer() {
  return (
    <div>
         <footer className="bg-teal-600 text-white py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            {/* <LeafIcon className="h-6 w-6" /> */}
            Agri-Invest
          </div>
          <nav className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
              Invest
            </Link>
            <Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
              Farmers
            </Link>
            <Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
              Impact
            </Link>
            <Link href="#" className="hover:text-primary-foreground/80" prefetch={false}>
              About
            </Link>
          </nav>
          <div className="text-sm text-primary-foreground/80">&copy; 2024 Agri-Invest. All rights reserved.</div>
        </div>
      </footer>
      
    </div>
  )
}
