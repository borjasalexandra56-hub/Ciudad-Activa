import React from 'react';
import { Recycle, MapPin, Trophy, Leaf, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
  { title: 'Puntos de Reciclaje', desc: 'Encuentra los centros de reciclaje más cercanos en Collique y alrededores.', icon: MapPin, color: 'bg-success/10 text-success' },
  { title: 'Campañas Ecológicas', desc: 'Participa en campañas de limpieza y reciclaje en tu comunidad.', icon: Leaf, color: 'bg-accent/10 text-accent' },
  { title: 'Recompensas Verdes', desc: 'Acumula puntos por reciclar y canjéalos por beneficios.', icon: Trophy, color: 'bg-secondary/10 text-secondary' },
];

export default function Recycling() {
  return (
    <div className="px-4 lg:px-8 py-6 max-w-3xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-foreground mb-1">Reciclaje</h1>
      <p className="text-muted-foreground text-sm mb-6">Únete a programas ambientales y cuida tu comunidad</p>

      <div className="bg-gradient-to-r from-success/20 to-success/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center">
            <Recycle className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-foreground">Programa Eco-Activo</h3>
            <p className="text-muted-foreground text-sm">Collique más verde, futuro mejor</p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Participa en nuestros programas de reciclaje y sostenibilidad. Cada acción cuenta para construir una comunidad más limpia y saludable.
        </p>
        <Button className="bg-success hover:bg-success/90 text-white rounded-xl font-heading font-semibold">
          Comenzar a reciclar
        </Button>
      </div>

      <div className="space-y-4">
        {programs.map(p => (
          <div key={p.title} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${p.color}`}>
                <p.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground">{p.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}