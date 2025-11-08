import { useState } from 'react';
import { SubtleGradient } from './components/SubtleGradient';
import { Header } from './components/Header';
import { CalculationPanel } from './components/CalculationPanel';
import { SpectrumChart } from './components/SpectrumChart';
import { StatsCard } from './components/StatsCard';
import { Activity, Database, Clock, Layers } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { Badge } from './components/ui/badge';

// Generate mock spectrum data
const generateSpectrumData = (params: any) => {
  const data = [];
  const { waveMin, waveMax, molecule } = params;
  
  for (let i = waveMin; i <= waveMax; i += 2) {
    // Create realistic-looking spectral lines with peaks
    let absorbance = 0.05 + Math.random() * 0.1;
    
    // Add some spectral peaks based on molecule type
    if (molecule === 'CO') {
      if (Math.abs(i - 2143) < 50) {
        absorbance += 0.8 * Math.exp(-Math.pow((i - 2143) / 10, 2));
      }
      if (Math.abs(i - 2100) < 30) {
        absorbance += 0.5 * Math.exp(-Math.pow((i - 2100) / 8, 2));
      }
    } else if (molecule === 'CO2') {
      if (Math.abs(i - 2000) < 40) {
        absorbance += 0.9 * Math.exp(-Math.pow((i - 2000) / 12, 2));
      }
    } else if (molecule === 'H2O') {
      if (Math.abs(i - 2050) < 60) {
        absorbance += 0.7 * Math.exp(-Math.pow((i - 2050) / 15, 2));
      }
    }
    
    data.push({
      wavenumber: i,
      absorbance: Math.max(0, absorbance),
    });
  }
  
  return data;
};

export default function App() {
  const [spectrumData, setSpectrumData] = useState(
    generateSpectrumData({
      waveMin: 1900,
      waveMax: 2300,
      molecule: 'CO',
    })
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [computationTime, setComputationTime] = useState('1.5');

  const handleCalculate = (params: any) => {
    setIsCalculating(true);
    toast.loading('Calculating spectrum...', { id: 'calc' });
    
    const startTime = Date.now();
    
    // Simulate calculation delay
    setTimeout(() => {
      const newData = generateSpectrumData(params);
      setSpectrumData(newData);
      setIsCalculating(false);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      setComputationTime(elapsed);
      toast.success('Spectrum calculated successfully!', { id: 'calc' });
    }, 1500);
  };

  const handleExport = (format: string) => {
    toast.success(`Exporting spectrum as ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SubtleGradient />
      
      <Header />
      
      <main className="container mx-auto px-6 py-8 relative z-10">
        <div className="space-y-6">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Status"
              value={isCalculating ? 'Calculating' : 'Ready'}
              icon={Activity}
            />
            <StatsCard
              title="Database"
              value="HITRAN"
              icon={Database}
            />
            <StatsCard
              title="Computation Time"
              value={`${computationTime}s`}
              icon={Clock}
            />
            <StatsCard
              title="Overlays"
              value="0"
              icon={Layers}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CalculationPanel
                onCalculate={handleCalculate}
                onExport={handleExport}
              />
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              <SpectrumChart data={spectrumData} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Spectrum Details</CardTitle>
                    <CardDescription>Current calculation information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Data Points</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {spectrumData.length}
                      </Badge>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Resolution</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        High
                      </Badge>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Range</span>
                      <span className="text-foreground">1900-2300 cm⁻¹</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>About RADIS</CardTitle>
                    <CardDescription>Fast line-by-line spectroscopy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      RADIS is a fast line-by-line code for high-resolution infrared 
                      molecular spectra, capable of computing millions of spectral lines 
                      in just minutes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
