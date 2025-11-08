import { Github, Settings, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-lg" />
            <div className="relative w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white">R</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg">Radis App</h1>
            <p className="text-xs text-muted-foreground">Infrared Molecular Spectra</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <HelpCircle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-accent" asChild>
            <a href="https://github.com/radis/radis-app" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
