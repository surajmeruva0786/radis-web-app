import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Play, Download, Layers } from 'lucide-react';
import { Separator } from './ui/separator';

interface CalculationPanelProps {
  onCalculate: (params: any) => void;
  onExport: (format: string) => void;
}

export function CalculationPanel({ onCalculate, onExport }: CalculationPanelProps) {
  const [database, setDatabase] = useState('HITRAN');
  const [mode, setMode] = useState('Absorbance');
  const [waveMin, setWaveMin] = useState('1900');
  const [waveMax, setWaveMax] = useState('2300');
  const [tgas, setTgas] = useState('300');
  const [pressure, setPressure] = useState('1.01325');
  const [pathLength, setPathLength] = useState('1');
  const [molecule, setMolecule] = useState('CO');
  const [moleFraction, setMoleFraction] = useState('0.1');
  const [useNonEquilibrium, setUseNonEquilibrium] = useState(false);

  const handleCalculate = () => {
    onCalculate({
      database,
      mode,
      waveMin: parseFloat(waveMin),
      waveMax: parseFloat(waveMax),
      tgas: parseFloat(tgas),
      pressure: parseFloat(pressure),
      pathLength: parseFloat(pathLength),
      molecule,
      moleFraction: parseFloat(moleFraction),
      useNonEquilibrium,
    });
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Spectrum Calculation</CardTitle>
            <CardDescription>Configure parameters for spectral analysis</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-border/50 hover:bg-accent">
            <Layers className="w-4 h-4 mr-2" />
            Overlay
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="database" className="text-sm">Database</Label>
                <Select value={database} onValueChange={setDatabase}>
                  <SelectTrigger id="database" className="bg-background/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HITRAN">HITRAN</SelectItem>
                    <SelectItem value="HITEMP">HITEMP</SelectItem>
                    <SelectItem value="GEISA">GEISA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode" className="text-sm">Mode</Label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger id="mode" className="bg-background/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Absorbance">Absorbance</SelectItem>
                    <SelectItem value="Transmittance">Transmittance</SelectItem>
                    <SelectItem value="Radiance">Radiance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Wavenumber Range (cm⁻¹)</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  value={waveMin}
                  onChange={(e) => setWaveMin(e.target.value)}
                  placeholder="Min"
                  className="bg-background/50 border-border/50"
                />
                <Input
                  type="number"
                  value={waveMax}
                  onChange={(e) => setWaveMax(e.target.value)}
                  placeholder="Max"
                  className="bg-background/50 border-border/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tgas" className="text-sm">Temperature (Tgas)</Label>
              <div className="relative">
                <Input
                  id="tgas"
                  type="number"
                  value={tgas}
                  onChange={(e) => setTgas(e.target.value)}
                  className="bg-background/50 border-border/50 pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  K
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pressure" className="text-sm">Pressure</Label>
              <div className="relative">
                <Input
                  id="pressure"
                  type="number"
                  value={pressure}
                  onChange={(e) => setPressure(e.target.value)}
                  className="bg-background/50 border-border/50 pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  bar
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pathLength" className="text-sm">Path Length</Label>
              <div className="relative">
                <Input
                  id="pathLength"
                  type="number"
                  value={pathLength}
                  onChange={(e) => setPathLength(e.target.value)}
                  className="bg-background/50 border-border/50 pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  cm
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="molecule" className="text-sm">Molecule</Label>
                <Select value={molecule} onValueChange={setMolecule}>
                  <SelectTrigger id="molecule" className="bg-background/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CO">CO</SelectItem>
                    <SelectItem value="CO2">CO₂</SelectItem>
                    <SelectItem value="H2O">H₂O</SelectItem>
                    <SelectItem value="CH4">CH₄</SelectItem>
                    <SelectItem value="NO">NO</SelectItem>
                    <SelectItem value="O2">O₂</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="moleFraction" className="text-sm">Mole Fraction</Label>
                <Input
                  id="moleFraction"
                  type="number"
                  value={moleFraction}
                  onChange={(e) => setMoleFraction(e.target.value)}
                  className="bg-background/50 border-border/50"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30">
              <div className="space-y-0.5">
                <Label className="text-sm">Use Non-Equilibrium Calculations</Label>
                <p className="text-xs text-muted-foreground">
                  Enable for non-LTE conditions
                </p>
              </div>
              <Switch
                checked={useNonEquilibrium}
                onCheckedChange={setUseNonEquilibrium}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Isotopologue</Label>
              <div className="p-4 rounded-lg border border-border/50 bg-muted/30 text-sm text-muted-foreground">
                Automatic selection enabled
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="bg-border/50" />

        <div className="space-y-3">
          <Button onClick={handleCalculate} className="w-full" size="lg">
            <Play className="w-4 h-4 mr-2" />
            Calculate Spectrum
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => onExport('spec')}
              className="border-border/50 hover:bg-accent"
            >
              <Download className="w-4 h-4 mr-2" />
              Export SPEC
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onExport('txt')}
              className="border-border/50 hover:bg-accent"
            >
              <Download className="w-4 h-4 mr-2" />
              Export TXT
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
