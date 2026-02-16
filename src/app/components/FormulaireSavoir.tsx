import { useState } from 'react';
import { Leaf, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export interface SavoirData {
  nomLocal: string;
  nomScientifique: string;
  pathologies: string[];
  modesPreparation: string;
  dosages: string;
  contraindications: string;
  autreInfos: string;
}

interface FormulaireSavoirProps {
  data: SavoirData;
  onChange: (data: SavoirData) => void;
}

export function FormulaireSavoir({ data, onChange }: FormulaireSavoirProps) {
  const [newPathologie, setNewPathologie] = useState('');

  const handleChange = (field: keyof SavoirData, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const addPathologie = () => {
    if (newPathologie.trim()) {
      handleChange('pathologies', [...data.pathologies, newPathologie.trim()]);
      setNewPathologie('');
    }
  };

  const removePathologie = (index: number) => {
    const updated = data.pathologies.filter((_, i) => i !== index);
    handleChange('pathologies', updated);
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border border-[#87a878]/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#87a878]/10 flex items-center justify-center">
          <Leaf className="w-6 h-6 text-[#87a878]" />
        </div>
        <div>
          <h3 className="text-[#5a5245]">Enregistrer un savoir thérapeutique</h3>
          <p className="text-sm text-[#717182]">Complétez les informations sur la plante médicinale</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Plant Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nomLocal" className="text-[#5a5245]">
              Nom local de la plante *
            </Label>
            <Input
              id="nomLocal"
              value={data.nomLocal}
              onChange={(e) => handleChange('nomLocal', e.target.value)}
              placeholder="Ex: Neem, Karité..."
              className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomScientifique" className="text-[#5a5245]">
              Nom scientifique
            </Label>
            <Input
              id="nomScientifique"
              value={data.nomScientifique}
              onChange={(e) => handleChange('nomScientifique', e.target.value)}
              placeholder="Ex: Azadirachta indica"
              className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] h-12 text-base"
            />
          </div>
        </div>

        {/* Pathologies */}
        <div className="space-y-2">
          <Label htmlFor="pathologie" className="text-[#5a5245]">
            Pathologies traitées *
          </Label>
          <div className="flex gap-2">
            <Input
              id="pathologie"
              value={newPathologie}
              onChange={(e) => setNewPathologie(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPathologie())}
              placeholder="Ex: Paludisme, fièvre..."
              className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] h-12 text-base flex-1"
            />
            <Button
              type="button"
              onClick={addPathologie}
              className="bg-[#87a878] hover:bg-[#87a878]/90 text-white h-12 px-6"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          
          {data.pathologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.pathologies.map((pathologie, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#87a878]/10 text-[#5a5245] rounded-full text-sm"
                >
                  {pathologie}
                  <button
                    onClick={() => removePathologie(index)}
                    className="hover:text-[#d4183d] transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Preparation Methods */}
        <div className="space-y-2">
          <Label htmlFor="modesPreparation" className="text-[#5a5245]">
            Modes de préparation *
          </Label>
          <Textarea
            id="modesPreparation"
            value={data.modesPreparation}
            onChange={(e) => handleChange('modesPreparation', e.target.value)}
            placeholder="Décrivez comment préparer le remède : décoction, infusion, cataplasme..."
            className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] min-h-[100px] text-base resize-none"
            required
          />
        </div>

        {/* Dosages */}
        <div className="space-y-2">
          <Label htmlFor="dosages" className="text-[#5a5245]">
            Dosages et posologie *
          </Label>
          <Textarea
            id="dosages"
            value={data.dosages}
            onChange={(e) => handleChange('dosages', e.target.value)}
            placeholder="Indiquez les quantités et la fréquence d'utilisation..."
            className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] min-h-[80px] text-base resize-none"
            required
          />
        </div>

        {/* Contraindications */}
        <div className="space-y-2">
          <Label htmlFor="contraindications" className="text-[#5a5245]">
            Contraindications
          </Label>
          <Textarea
            id="contraindications"
            value={data.contraindications}
            onChange={(e) => handleChange('contraindications', e.target.value)}
            placeholder="Indiquez les contraindications..."
            className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] min-h-[80px] text-base resize-none"
          />
        </div>

        {/* Additional Info */}
        <div className="space-y-2">
          <Label htmlFor="autreInfos" className="text-[#5a5245]">
            Autres informations
          </Label>
          <Textarea
            id="autreInfos"
            value={data.autreInfos}
            onChange={(e) => handleChange('autreInfos', e.target.value)}
            placeholder="Précautions, contre-indications, transmission du savoir..."
            className="bg-[#f9f7f5] border-[#87a878]/20 focus:border-[#87a878] min-h-[80px] text-base resize-none"
          />
        </div>
      </div>
    </div>
  );
}