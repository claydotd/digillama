// blobs from https://www.blobmaker.app

import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export default function Layout() {
  return (
    <div className="site-layout">
      <Nav />
      <div className="site-content">
        <div className="site-blobs" aria-hidden="true">
          <div className="blob-1">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFCAD4" d="M51.7,-64.6C66.6,-60.3,77.9,-44.7,77.3,-29.2C76.7,-13.7,64.3,1.6,56.2,15.8C48.2,30,44.5,43.2,35.9,54.3C27.3,65.5,13.6,74.6,1.7,72.2C-10.2,69.8,-20.3,55.8,-31.5,45.5C-42.6,35.2,-54.8,28.5,-63.3,17.1C-71.8,5.7,-76.6,-10.4,-74.1,-25.9C-71.6,-41.4,-61.7,-56.5,-48.2,-61.1C-34.6,-65.8,-17.3,-60.2,0.6,-61C18.4,-61.8,36.8,-68.9,51.7,-64.6Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="blob-2">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#BAE6FF" d="M47.4,-46C61.5,-33.4,72.9,-16.7,72,-0.8C71.2,15,58.1,30,44,41.3C30,52.7,15,60.4,-1.9,62.3C-18.9,64.2,-37.7,60.4,-52,49.1C-66.3,37.7,-75.9,18.9,-75.3,0.6C-74.6,-17.6,-63.7,-35.2,-49.4,-47.8C-35.2,-60.4,-17.6,-68.1,-0.4,-67.6C16.7,-67.2,33.4,-58.6,47.4,-46Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="blob-3">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#A7F0BA" d="M28.9,-54.4C33.4,-42.2,30.2,-27.2,39,-15.6C47.8,-3.9,68.6,4.5,68.1,9.9C67.5,15.4,45.6,17.9,31.7,19.3C17.8,20.7,12,21,3.8,32.2C-4.4,43.3,-15,65.2,-28.4,72.4C-41.9,79.6,-58.2,72.1,-59.3,58.3C-60.4,44.6,-46.4,24.6,-47.6,7.6C-48.8,-9.4,-65.3,-23.4,-67.3,-35.6C-69.3,-47.8,-56.7,-58.3,-43.1,-66.4C-29.5,-74.5,-14.7,-80.3,-1.3,-78.4C12.2,-76.4,24.5,-66.7,28.9,-54.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
        <main>
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} C Leslie. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
